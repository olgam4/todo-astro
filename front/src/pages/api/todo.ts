import { DBClient } from '@lib/db'
import { update } from '@lib/update'

const Error = new Response(
  'nope',
  {
    status: 403
  }
)

export async function get() {
  const todos = await DBClient.getTodos()
  return new Response(
    JSON.stringify(todos),
    {
      status: 200,
    }
  )
}

export async function post({ request }) {
  const { content, token } = await request.json()

  if (`&TlbDN6&Bh%#7wC6I` !== token) return Error

  await DBClient.saveTodo(content)
  await update()

  return new Response(
    'ok',
    {
      status: 201,
    }
  )
}

