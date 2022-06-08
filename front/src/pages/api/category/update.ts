import { DBClient } from '@lib/db'

export async function post({ request }) {
  const { id, color } = await request.json()

  await DBClient.updateCategoryColor(+id, color)

  return new Response(
    'ok',
    {
      status: 200,
    }
  )
}


