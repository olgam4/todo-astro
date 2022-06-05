import { auth } from "@lib/hash";

export async function post({ request }) {
  const { token } = await request.json();
  return await auth(token)
    .then(response => {
      if (response.status === 400) {
        return new Response('OUT', { status: 400 });
      }
      if (response.status === 200) {
        return new Response('OK', { status: 200 });
      }
    })
}
