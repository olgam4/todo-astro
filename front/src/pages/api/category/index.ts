import { DBClient } from '@lib/db'

export async function get() {
  const categories = await DBClient.getCategories()
  return new Response(
    JSON.stringify(categories),
    {
      status: 200,
    }
  )
}

export async function post({ request }) {
  const { content } = await request.json()

  await DBClient.createCategory(content)

  return new Response(
    'ok',
    {
      status: 201,
    }
  )
}
