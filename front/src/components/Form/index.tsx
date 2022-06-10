import { AddIcon } from '@components/Icons';
import { setCaretAtTheEndOFTheDocument } from '@lib/document';
import { createSignal } from 'solid-js';
import { fn } from './api';

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
          onKeyPress={(evt) => {
            if (evt.key === 'Enter') {
              evt.preventDefault();
              buttonRef.click();
            }
            const text = ref.innerText;
            const regex = /#[^\s]+/gim;
            const newText = text.replace(regex, (match: string) => {
              return `<span class="font-semibold text-blue-300">${match}</span>`
            })
            ref.innerHTML = newText;
            setCaretAtTheEndOFTheDocument(ref);
          }}
          onInput={(evt) => {
            setValue(evt.target.innerText)
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
