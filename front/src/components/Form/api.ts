import { notify } from '@lib/notification'
import { update } from '@lib/update'

export const fn = async (form: any) => {
  const content = form.content.value
  const token = form.token.value
  const response = await fetch('/api/todo', {
    method: 'POST',
    headers: {
      'Accept': 'appliaction/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token, content }),
  })
  if (!response.ok) {
    notify('You don\'t have the right token')
  }
  await update()
}

