import Cookies from 'js-cookie'

export default function() {
  return (
    <div>
      <ul
        className="flex space-x-4 pl-4 py-4"
      >
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/category">Categories</a>
        </li>
        <li>
          <button
            class=""
            onClick={() => {
              Cookies.remove('tokentodov0')
              window.location.href = '/'
            }}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}
