import { AddIcon } from '@components/Icons';
import { fn } from './api';

const submit = (ref, accessor) => {
  const callback = accessor() || (() => {});
  ref.onsubmit = async (e) => {
    e.preventDefault();
    callback(ref)
  }
}

export default function () {
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
          name="content"
          id="content"
          placeholder="TODO"
          />
        <button
          type="submit"
          class="shadow-xl shadow-black-900 absolute right-3 top-4 h-10 w-10 transition-all rounded-full flex justify-center items-center bg-blue-300 hover:bg-blue-700 hover:text-white"
        >
          <AddIcon />
        </button>
      </div>
    </form>
  )
}
