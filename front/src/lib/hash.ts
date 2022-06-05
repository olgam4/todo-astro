const api = 'https://olgam4-todo-astro.deno.dev'

async function hash(value: string) {
  return await fetch(`${api}/hash`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      key: value,
    }),
  })
}

async function verify(value: string, hash: string) {
  return await fetch(`${api}/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      key: value,
      hash,
    }),
  })
}

async function auth(token: string) {
  return await fetch(`${api}/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token,
    }),
  })
}

export {
  auth,
  hash,
  verify,
}
