import { fn } from "./api";

const submit = async (ref, accessor) => {
  const callback = accessor() || (() => {})
  ref.onsubmit = async (e) => {
    e.preventDefault()
    await callback(ref)
  }
}

export default function Login() {
  return (
    <form 
      use:submit={fn}
      class="flex flex-col w-1/2 h-1/2 space-y-10 items-center justify-center"
    >
      <h1>Login</h1>
      <label for="name">
        <input name="name" id="name" type="text" placeholder="Username" />
      </label>
      <label for="password">
        <input name="password" id="password" type="password" placeholder="Password" />
      </label>
      <button 
        type="submit"
        class="bg-blue-500 w-[100px] p-3 rounded-md hover:bg-blue-700 hover:text-white"
      >
        Login
      </button>
    </form>
  )
}
