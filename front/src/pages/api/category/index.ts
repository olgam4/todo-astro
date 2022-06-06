import { DBClient } from '@lib/db'

export async function get() {
  console.log('get category')
  const categories = await DBClient.getCategories()
  console.log(categories)
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
