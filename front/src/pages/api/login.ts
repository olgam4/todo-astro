import { DBClient } from '@lib/db'
import { verify } from '@lib/hash'

const FAILED_LOGIN = new Response('Failed to login', { status: 401 })

export async function post({ request }) {
  const { name, password } = await request.json()

  const savedHash = await DBClient.getUser(name)
    .catch(() => null)

  if (!savedHash) {
    return new Response('Login failed', { status: 400 })
  }

  return await verify(password, savedHash)
    .then(async response => {
      if(response.status === 400) {
        return FAILED_LOGIN
      }
      if(response.status === 200) {
        return new Response(await response.text(), {
          status: 200,
        })
      }
    })
}
