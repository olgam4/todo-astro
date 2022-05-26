import { DBClient } from '@lib/db'

export async function post({ request }) {
  const { id } = await request.json()

  await DBClient.deleteTodo(id)

  return new Response(
    'ok',
    {
      status: 200,
    }
  )
}

