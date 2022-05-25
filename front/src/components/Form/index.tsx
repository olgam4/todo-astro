import { AddIcon } from '@components/Icons';
import { notify } from '@lib/notification';
import { createTodo } from './reactivity';

const submit = (ref, accessor) => {
  const callback = accessor() || (() => {});
  ref.onsubmit = async (e) => {
    e.preventDefault();
    callback(ref)
  }
}

const fn = async (form: any) => {
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
}

export default function () {
  const [value, setValue] = createTodo()
  return (
    <form
      use:submit={fn}
        class="relative p-10"
    >
      <div
        class="flex flex-col space-y-1 w-[400px]"
      >
        <input
          class="border rounded-sm p-1"
          onInput={(e: any) => {
            setValue(e.currentTarget.value)
          }}
          value={value()}
          name="content"
          id="content"
          placeholder="TODO"
          />
        <input
          class="border rounded-sm p-1"
          id="token"
          name="token"
          placeholder="Token"
          />
      </div>
      <div
        class="absolute top-[55px] -right-3"
      >
        <button
          type="submit"
          class="h-10 w-10 transition-all rounded-full flex justify-center items-center bg-blue-200 hover:bg-blue-700"
        >
          <AddIcon />
        </button>
      </div>
    </form>
  )
}
