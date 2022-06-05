// import { DBClient } from '@lib/db'
// import { hash } from '@lib/hash'

// const Error = new Response(
//   'nope',
//   {
//     status: 400
//   }
// )

// export async function post({ request }) {
//   const { name, email, password } = await request.json()

//   if (!name || !email || !password) {
//     return Error
//   }

//   const hashedPass = await hash(password)
//     .then(response => response.text())

//   await DBClient.createUser({ name, email, password: hashedPass })

//   return new Response(
//     'ok',
//     {
//       status: 201,
//     }
//   )
// }

