import { AddIcon } from '@components/Icons';
import { createSignal } from 'solid-js';
import { fn } from './api';
import { styleKeywords } from './reactivity';

const submit = (ref, accessor) => {
  const callback = accessor() || (() => {});
  ref.onsubmit = async (e) => {
    e.preventDefault();
    callback(ref)
  }
}

export default function () {
  let ref: any
  let buttonRef: any

  const [value, setValue] = createSignal('')

  return (
    <form
      use:submit={fn}
      class="w-full"
    >
      <div
        class="flex py-5 px-4"
      >
        <div
          ref={ref}
          as="input"
          role="input"
          class="border grow transition-all flex items-center rounded-sm p-4 bg-white"
          name="content"
          id="content"
          contenteditable="true"
          onKeyPress={(evt: KeyboardEvent) => styleKeywords(evt, ref, buttonRef)}
          onInput={(evt: InputEvent) => {
            setValue((evt.target as HTMLInputElement).innerText)
          }}
          />
        <button
          ref={buttonRef}
          type="submit"
          class={`transition-all rounded-md bg-blue-400 hover:bg-blue-300 hover:text-white ${value().length > 0 ? 'p-4 w-auto ml-2' : 'p-0 ml-0 opacity-0 w-0'}`}
        >
          <AddIcon />
        </button>
      </div>
    </form>
  )
}
