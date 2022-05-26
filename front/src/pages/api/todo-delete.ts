import { DBClient } from '@lib/db'
import { update } from '@lib/update'

export async function post({ request }) {
  const { id } = await request.json()

  await DBClient.deleteTodo(id)
  await update()

  return new Response(
    'ok',
    {
      status: 200,
    }
  )
}

