import { DeleteIcon } from "@components/Icons"

interface Props {
  status: boolean
  content: string
  id: string
}

const deleteTodo = async (id: string) => {
  const response = await fetch('/api/todo-delete', {
    method: 'POST',
    headers: {
      'Accept': 'appliaction/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id })
  })
}

export default function Card({
  status,
  content,
  id,
}: Props) {
  return (
    <div class="mb-3 min-w-[400px] flex items-center px-3 py-1 border rounded-md">
      <div class="space-x-2 flex items-center">
        <input type="checkbox"/>
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
