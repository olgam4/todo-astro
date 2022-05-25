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
    notify()
  }
}

export default function () {
  const [value, setValue] = createTodo()
  return (
    <div>
      <form use:submit={fn}>
        <input
          onInput={(e: any) => {
            setValue(e.currentTarget.value)
          }}
          value={value()}
          name="content"
          id="content"
          placeholder="TODO"
          />
        <input
          id="token"
          name="token"
          placeholder="Token"
          />
        <button type="submit">
          ok
        </button>
      </form>
    </div>
  )
}
