import { LogoutIcon } from '@components/Icons'
import Cookies from 'js-cookie'
import { createEffect, createSignal } from 'solid-js'

export default function() {
  const [location, setLocation] = createSignal('')

  createEffect(() => {
    setLocation(window.location.pathname)
  })

  return (
    <ul
      class="flex pl-4 py-4"
    >
      <li
        class={`mr-4 ${location() === '/' ? 'text-blue-500' : 'text-gray-500'}`}
      >
        <a href="/">Todos</a>
      </li>
      <li
        class={`mr-4 ${location() === '/category' ? 'text-blue-500' : 'text-gray-500'}`}
      >
        <a href="/category">Tags</a>
      </li>
      <li
        class="ml-auto pr-4"
      >
        <button
          class="text-gray-500"
          onClick={() => {
            Cookies.remove('tokentodov0')
            window.location.href = '/'
          }}
        >
          <LogoutIcon />
        </button>
      </li>
    </ul>
  )
}
