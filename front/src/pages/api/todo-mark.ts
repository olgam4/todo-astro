import { DBClient } from "@lib/db"

export async function post({ request }) {
  const { id, status } = await request.json()

  await DBClient.markTodo(id, status)

  return new Response(
    'ok',
    {
      status: 200
    })
}
