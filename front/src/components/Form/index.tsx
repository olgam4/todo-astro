import { AddIcon } from '@components/Icons';
import { fn } from './api';
import { createTodo } from './reactivity';

export default function () {
  const [value, setValue] = createTodo()
  return (
    <form
      use:submit={fn}
      class="relative w-full"
    >
      <div
        class="flex py-5 px-16 flex-col space-y-1"
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
        <button
          type="submit"
          class="shadow-xl shadow-black-900 absolute right-3 top-8 h-10 w-10 transition-all rounded-full flex justify-center items-center bg-blue-300 hover:bg-blue-700 hover:text-white"
        >
          <AddIcon />
        </button>
      </div>
    </form>
  )
}
