import { Application, ServerSentEvent, Router } from 'https://deno.land/x/oak/mod.ts';

const app = new Application();
const router = new Router();

router.get('/sse', (ctx) => {
  const target = ctx.sendEvents();
  const event = new ServerSentEvent('ping', { 'hello': 'world' })
  target.addEventListener('close', (e) => {
    console.log('We lost connection')
  })
  target.dispatchEvent(event)
})

router.post('/see', async (ctx) => {
  const body = await ctx.request.body().value
  console.log(body.content)
})

router.get('/', (ctx) => {
  ctx.response.body = 'HelloWorld'
})

app.use(router.routes())
await app.listen({ port: 8000 });
