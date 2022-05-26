import { DeleteIcon } from "@components/Icons"
import { update } from "@lib/update"

interface Props {
  status: boolean
  content: string
  id: number
}

const markTodo = async (id: number, value: boolean) => {
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
  return (
    <div class="mb-3 w-[30%] flex items-center px-3 py-1 border rounded-md">
      <div class="space-x-2 flex items-center">
        <input type="checkbox" checked={status} onChange={(e) => markTodo(id, !status)}/>
        <p>{content}</p>
      </div>
      <button
        onClick={() => deleteTodo(id)}
        class="transition-colors ml-auto text-gray-200 hover:text-red-600"
      >
        <DeleteIcon />
      </button>
    </div>
  )
}
