import { DeleteIcon } from "@components/Icons"
import { update } from "@lib/update"
import { ise } from "./reactivity"

interface Props {
  status: boolean
  content: string
  id: number
}

const markTodo = async (id: number, value: boolean) => {
  const state = ise()
  state.add(id, false)
  await fetch('/api/todo-mark', {
    method: 'POST',
    headers: {
      'Accept': 'appliaction/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, status: value })
  })
  await update()
}

const deleteTodo = async (id: number) => {
  await fetch('/api/todo-delete', {
    method: 'POST',
    headers: {
      'Accept': 'appliaction/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id })
  })
  await update()
}

export default function Card({
  status,
  content,
  id,
}: Props) {
  const state = ise()
  const lid = `d-${id}`
  setTimeout(() => {
    if(!state[lid]) {
      const el = document.querySelector(`#${lid}`)
      el.classList.add('appear')
    }
    state.add(lid, true)
  })
  return (
    <div id={`d-${id}`} class="transition-all min-h-[50px] m-3 flex items-center bg-blue-100 shadow-md rounded-md">
      <div class="w-[93%] h-full flex">
        <div class="w-[60px] h-full rounded-l-md rounded-r-3xl mr-3">
          <input class="todo-checkbox" type="checkbox" checked={status} onChange={(e) => markTodo(id, !status)}/>
        </div>
        <p class="overflow-hidden flex items-center overflow-ellipsis w-full py-1">{content}</p>
      </div>
      <button
        onClick={() => deleteTodo(id)}
        class="transition-colors ml-auto text-blue-300/60 mr-2 hover:text-red-600"
      >
        <DeleteIcon />
      </button>
    </div>
  )
}
