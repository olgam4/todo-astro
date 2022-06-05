import {
  Router,
  ServerSentEvent,
  Application,
  createHash,
  oakCors,
  createJwt,
  verifyJwt,
  getNumericDate,
} from "./deps.ts";
const router = new Router();
const et = new EventTarget();
const seeEvent = new CustomEvent('see');
const dataEvent = new ServerSentEvent('data', {});

router.get('/sse', (ctx) => {
  const target = ctx.sendEvents();
  const event = new ServerSentEvent('ping', { 'hello': 'world' });
  et.addEventListener('see', (evt) => {
    console.log('from the rout', evt);
    target.dispatchEvent(dataEvent);
  })
  target.addEventListener('close', () => {
    console.log('We lost connection');
  })
  console.log(`Connected with new user`);
  target.dispatchEvent(event);
})

router.post('/hash', async (ctx) => {
  console.log('Hashing');
  const body = await ctx.request.body().value;
  const hashed = createHash('sha256').update(body.key);
  ctx.response.body = hashed.toString();
  ctx.response.status = 200;
})

router.post('/verify', async (ctx) => {
  const body = await ctx.request.body().value;
  const hashed = createHash('sha256').update(body.key);
  if (hashed.toString() === body.hash) {
    ctx.response.body = `${await createJwtToken()}`;
    ctx.response.status = 200;
  } else {
    ctx.response.body = 'FAIL';
    ctx.response.status = 400;
  }
})

function createJwtToken() {
  const jwt = createJwt( { alg: 'HS512', type: 'JWT' }, { exp: getNumericDate(60 * 60) }, 'secret' );
  return jwt;
}

router.post('/auth', async (ctx) => {
  const body = await ctx.request.body().value;
  await verifyJwt(body.token, 'secret' , 'HS512')
  .then(() => {
    ctx.response.body = 'OK';
    ctx.response.status = 200;
  })
  .catch((err) => {
    console.log(err);
    ctx.response.body = 'FAIL';
    ctx.response.status = 400;
  })
})

router.post('/see', (ctx) => {
  console.log('SEE ?');
  et.dispatchEvent(seeEvent);
  ctx.response.status = 200;
})

router.get('/', (ctx) => {
  ctx.response.body = 'HelloWorld';
})

const app = new Application();
app.use(oakCors({
  origin: [/^.+localhost:(1234|3000)$/, 'https://todo.glo.quebec']
}));
app.use(router.routes());
console.log(`Listening on port 8000`);
await app.listen({ port: 8000 });
