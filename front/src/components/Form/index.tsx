import { AddIcon } from '@components/Icons';
import { setCaretAtTheEndOFTheDocument } from '@lib/document';
import { fn } from './api';

const submit = (ref, accessor) => {
  const callback = accessor() || (() => {});
  ref.onsubmit = async (e) => {
    e.preventDefault();
    callback(ref)
  }
}

export default function () {
  let ref
  let bref
  return (
    <form
      use:submit={fn}
      class="relative w-full"
    >
      <div
        class="flex py-5 px-16 flex-col space-y-1"
      >
        <div
          ref={ref}
          class="border rounded-sm p-1"
          name="content"
          id="content"
          placeholder="TODO"
          contenteditable="true"
          onKeyPress={(evt) => {
            const text = ref.innerText;
            const regex = /#[^\s]+/gim;
            const newText = text.replace(regex, (match: string) => {
              return `<span class="font-semibold text-blue-300">${match}</span>`
            })
            ref.innerHTML = newText;
            setCaretAtTheEndOFTheDocument(ref);
            if (evt.key === 'Enter') {
              evt.preventDefault();
              bref.click();
            }
          }}

          />
        <button
          ref={bref}
          type="submit"
          class="shadow-xl shadow-black-900 absolute right-3 top-4 h-10 w-10 transition-all rounded-full flex justify-center items-center bg-blue-300 hover:bg-blue-700 hover:text-white"
        >
          <AddIcon />
        </button>
      </div>
    </form>
  )
}
