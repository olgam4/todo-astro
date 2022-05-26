import { Application, ServerSentEvent, ServerSentEventTarget, Router } from 'https://deno.land/x/oak/mod.ts';
import { oakCors } from "https://deno.land/x/cors/mod.ts";

type Client = {
  id: number
  target: ServerSentEventTarget
}

const router = new Router();
let clients: Array<Client> = [];

router.get('/sse', (ctx) => {
  const target = ctx.sendEvents();
  const event = new ServerSentEvent('ping', { 'hello': 'world' })
  target.addEventListener('close', (e) => {
    console.log('We lost connection');
    clients = [];
  })
  console.log(`Connected with new user`)
  target.dispatchEvent(event)
  const client = {
    id: Date.now(),
    target,
  } as Client
  clients.push(client)
})

const dataEvent = new ServerSentEvent('data', { new: 'todo' })

router.post('/see', async () => {
  console.log('SEE ? ')
  for (const client of clients) {
    client.target.dispatchEvent(dataEvent)
  }
})

router.get('/', (ctx) => {
  ctx.response.body = 'HelloWorld'
})

const app = new Application();
app.use(oakCors({
  origin: /^.+localhost:(1234|3000)$/,
}));
app.use(router.routes());
console.log(`Listening on port 8000`);
await app.listen({ port: 8000 });
