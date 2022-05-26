import { Application, ServerSentEvent, Router } from 'https://deno.land/x/oak/mod.ts';
import { oakCors } from "https://deno.land/x/cors/mod.ts";

const router = new Router();
const et = new EventTarget()
const seeEvent = new CustomEvent('see')
const dataEvent = new ServerSentEvent('data', {})

router.get('/sse', (ctx) => {
  const target = ctx.sendEvents();
  const event = new ServerSentEvent('ping', { 'hello': 'world' })
  et.addEventListener('see', (evt) => {
    console.log('from the rout')
    target.dispatchEvent(dataEvent);
  })
  target.addEventListener('close', (e) => {
    console.log('We lost connection');
  })
  console.log(`Connected with new user`)
  target.dispatchEvent(event)
})

router.post('/reset', async () => {
  console.log('Reseting with client...')
})

router.post('/see', (ctx) => {
  console.log('SEE ?')
  console.log(ctx.request.url)
  et.dispatchEvent(seeEvent)
  ctx.response.status = 200
})

router.get('/', (ctx) => {
  ctx.response.body = 'HelloWorld'
})

const app = new Application();
app.use(oakCors({
  origin: [/^.+localhost:(1234|3000)$/, 'https://todo.glo.quebec']
}));
app.use(router.routes());
console.log(`Listening on port 8000`);
await app.listen({ port: 8000 });
