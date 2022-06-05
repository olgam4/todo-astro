import { notify } from '@lib/notification'
import Cookies from 'js-cookie'

export const fn = async (form: any) => {
  const name = form.name.value
  const password = form.password.value
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Accept': 'appliaction/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, password }),
  })
  if (response.status === 200) {
    Cookies.set('tokentodov0', await response.text())
    window.location.href = '/'
  } else {
    notify('Login failed')
  }
}
