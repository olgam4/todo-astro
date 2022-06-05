import { DBClient } from '@lib/db'

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
  const { content } = await request.json()

  await DBClient.saveTodo(content)

  return new Response(
    'ok',
    {
      status: 201,
    }
  )
}

