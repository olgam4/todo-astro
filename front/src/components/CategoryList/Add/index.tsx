import { AddIcon } from "@components/Icons"
import { generateArandomColorHsl, hslToHex } from "@lib/colors"
import { createSignal, Show } from "solid-js"

interface AddProps {
  add: (title: string, color: string) => void
}

export default function Add({ add }: AddProps) {
  let newRef
  const [show, setShow] = createSignal(false)
  const [color, setColor] = createSignal('#fff')
  return (
    <>
      <Show when={show()} children={(
        <div
          class="center p-4 h-28 w-28 rounded-md"
          style={{ background: `${color()}` }}
        >
          <input
            ref={newRef}
            class="bg-transparent w-full text-center"
            type="text"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                add(newRef.value, `${color()}`)
                newRef.value = ''
                setShow(false)
              }
            }}
            onBlur={() => {
              setShow(false)
              newRef.value = ''
            }}
            />
        </div>
      )} />
      <button
        class="center p-4 h-28 w-28 bg-gray-200 rounded-md transition hover:bg-gray-300 hover:text-white"
        onClick={() => {
          setShow(true)
          newRef.focus()
          const randomHsl = generateArandomColorHsl()
          const randomHex = hslToHex(randomHsl)
          setColor(randomHex)
        }}
      >
        <AddIcon />
      </button>
      </>
  )
}

