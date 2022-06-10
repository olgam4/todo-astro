import { Category } from "@components/CategoryList/reactivity"
import { CalendarIcon, DeleteIcon } from "@components/Icons"
import { registerAnimation } from "@lib/animation"
import { DateTime } from "luxon"
import { For, onMount } from "solid-js"
import { deleteTodo } from "./api"
import { disappear, onChange } from "./reactivity"

interface CardProps {
  status: boolean
  content: string
  id: number
  categories: Category[]
  dueDate?: DateTime
}

export default function Card({
  status,
  content,
  id,
  categories,
  dueDate,
}: CardProps) {
  let ref: any
  let buttonRef: any

  const lid = `d-${id}`

  onMount(() => registerAnimation(lid, ref, 'appear'))

  const style = categories.length === 0 ? { "background": '#aaf'}
    :
    categories.length > 1 ? {
      "background-image" : `linear-gradient(to left, ${categories.map(c => c.color).join(', ')})`
    } : {
        "background" : `${categories[0].color}`
      }
  return (
    <div
      ref={ref}
      class="transition-all min-h-[50px] m-3 flex items-center shadow-md rounded-md"
      style={style}
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
        <div
          class="flex flex-col flex-wrap gap-2 mr-3 py-2"
        >
          <For each={categories} children={(category) => (
            <p
              class={`flex justify-center items-center opacity-70 p-1 rounded-md font-semibold text-sm text-white border border-gray-400`} 
              style={{ background: category.color }}
            >
              {category.title}
            </p>
          )} />
        </div>
        <p class={`overflow-hidden flex items-center overflow-ellipsis w-full py-1 ${status && 'line-through'}`}>{content}</p>
      </div>
      {dueDate && (
        <span
          class="flex w-[80px] items-center gap-2 opacity-70 text-white"
        >
          <CalendarIcon />
          <p class="text-sm">{dueDate.toFormat('dd-MM')}</p>
        </span>
      )}
      <button
        onClick={() => deleteTodo(id, () => disappear(ref))}
        class="transition-colors ml-auto text-black/10 mr-2 hover:text-red-600"
      >
        <DeleteIcon />
      </button>
    </div>
  )
}
