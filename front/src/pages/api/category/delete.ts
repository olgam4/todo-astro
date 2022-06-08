import { DBClient } from '@lib/db'

export async function post({ request }) {
  const { id } = await request.json()

  const numberId = parseInt(id, 10) || 0

  await DBClient.deleteCategory(numberId)

  return new Response(
    'ok',
    {
      status: 200,
    }
  )
}

