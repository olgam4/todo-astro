import { DBClient } from '@lib/db'

const Error = new Response(
  'nope',
  {
    status: 403
  }
)

export async function post({ request }) {
  const { content, token } = await request.json()

  if (`&TlbDN6&Bh%#7wC6I` !== token) return Error

  await DBClient.saveTodo(content)

  return new Response(
    'ok',
    {
      status: 201,
    }
  )
}

