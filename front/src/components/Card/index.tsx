import { DeleteIcon } from "@components/Icons"
import { registerAnimation } from "@lib/animation"
import { onMount } from "solid-js"
import { deleteTodo } from "./api"
import { disappear, onChange } from "./reactivity"

interface CardProps {
  status: boolean
  content: string
  id: number
  category: string
  color?: string
}

export default function Card({
  status,
  content,
  id,
  color,
  category,
}: CardProps) {
  let ref: any
  let buttonRef: any

  const lid = `d-${id}`

  onMount(() => registerAnimation(lid, ref, 'appear'))

  return (
    <div
      ref={ref}
      class="transition-all min-h-[50px] m-3 flex items-center bg-blue-100 shadow-md rounded-md"
      style={{ background: color }}
    >
      <div class="w-[93%] h-full flex">
        <div ref={buttonRef} class="w-[60px] h-full rounded-l-md rounded-r-3xl mr-3">
          <input
            class="todo-checkbox"
            type="checkbox"
            checked={status}
            onChange={() => onChange(buttonRef, id, status)}
            />
        </div>
        {category && <p
          class="flex items-center mr-2 opacity-70 font-semibold text-sm text-white"
        >
          {category}
        </p>}
        <p class={`overflow-hidden flex items-center overflow-ellipsis w-full py-1 ${status && 'line-through'}`}>{content}</p>
      </div>
      <button
        onClick={() => deleteTodo(id, () => disappear(ref))}
        class="transition-colors ml-auto text-black/10 mr-2 hover:text-red-600"
      >
        <DeleteIcon />
      </button>
    </div>
  )
}
