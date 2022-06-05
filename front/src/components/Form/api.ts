import { notify } from '@lib/notification'
import { update } from '@lib/update'

export const fn = async (form: any) => {
  const content = form.content.value
  const response = await fetch('/api/todo', {
    method: 'POST',
    headers: {
      'Accept': 'appliaction/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  })
  if (!response.ok) {
    notify('There seems to have been a mistake...')
  }
  await update()
}

