import { update } from "@lib/update"
import { ise } from "./reactivity"

export const markTodo = async (id: number, value: boolean) => {
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

export const deleteTodo = async (id: number, callback: () => Promise<void>) => {
  await Promise.all([
    callback(),
    fetch('/api/todo-delete', {
      method: 'POST',
      headers: {
        'Accept': 'appliaction/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id })
    })])
  await update()
}
