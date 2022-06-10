import { DateTime } from '@lib/date'
import { DBClient } from '@lib/db'


export async function get() {
  const todos = await DBClient.getTodos()
  return new Response(
    JSON.stringify(todos),
    {
      status: 200,
    }
  )
}

export async function post({ request }) {
  const { content, ats, hashtags } = await request.json()

  const datetime = mapStringToDatetime(ats)
  if (datetime === 'oops') return new Response('There was an error', { status: 400 })

  await DBClient.saveTodo(content, hashtags, datetime)

  return new Response(
    'ok',
    {
      status: 201,
    }
  )
}

const mapStringToDatetime = (str: string) => {
  if (str === '') {
    return 'oops'
  } else if (str.includes('today') || str.includes('aujourdhui')) {
    return DateTime.now().set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
  } else if (str.includes('tomorrow') || str.includes('demain')) {
    return DateTime.now().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).plus({ days: 1 })
  } else if (new RegExp('^[0-9]{1,2}-[0-9]{1,2}$').test(str)) {
    return DateTime.fromFormat(str, 'dd-MM')
  } else if (new RegExp('^in [0-9]{1,99} (days|weeks|months)$').test(str)) {
    const [, num, unit] = str.match(/^in ([0-9]{1,99}) (days|weeks|months)$/)
    const delay = {}
    delay[unit] = parseInt(num, 10)
    return DateTime.now().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).plus(delay)

  }
  return 'oops'
}
