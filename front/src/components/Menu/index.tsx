import { LogoutIcon } from '@components/Icons'
import Cookies from 'js-cookie'
import Link from './Link'

export default function() {
  return (
    <ul
      class="flex pl-4 py-4"
    >
      <Link to="/" name="Todos"/>
      <Link to="/category" name="Tags"/>
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
