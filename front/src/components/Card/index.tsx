import { DeleteIcon } from "@components/Icons"
import { onMount } from "solid-js"
import { deleteTodo, markTodo } from "./api"
import { ise } from "./reactivity"
import party from 'party-js'

interface Props {
  status: boolean
  content: string
  id: number
}

export default function Card({
  status,
  content,
  id,
}: Props) {
  const state = ise()
  let ref: any
  let buttonRef: any
  const lid = `d-${id}`

  !state[lid] && onMount(() => {
    ref.classList.add('appear')
    state.add(lid, true)
  })

  const disappear = () => {
    ref.classList.add('disappear')
    return new Promise<void>(resolve => setTimeout(() => {
      ref.classList.add('display-none')
      resolve()
    }, 500));
  }

  const onChange = (id: number, status: boolean) => {
    !status && party.confetti(buttonRef, {
      count: party.variation.range(20, 40)
    })
    markTodo(id, !status)
  }

  return (
    <div id={`d-${id}`} ref={ref} class="transition-all min-h-[50px] m-3 flex items-center bg-blue-100 shadow-md rounded-md">
      <div class="w-[93%] h-full flex">
        <div ref={buttonRef} class="w-[60px] h-full rounded-l-md rounded-r-3xl mr-3">
          <input class="todo-checkbox" type="checkbox" checked={status} onChange={() => onChange(id, status)}/>
        </div>
        <p class="overflow-hidden flex items-center overflow-ellipsis w-full py-1">{content}</p>
      </div>
      <button
        onClick={() => deleteTodo(id, disappear)}
        class="transition-colors ml-auto text-blue-300/60 mr-2 hover:text-red-600"
      >
        <DeleteIcon />
      </button>
    </div>
  )
}
