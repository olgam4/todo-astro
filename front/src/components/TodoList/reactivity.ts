import { subscribe } from '@lib/update'
import { createResource } from 'solid-js'

export interface Todo {
  id: number
  content: string
  status: boolean
  categories: any[]
}

const useTodos = () => {
  const [todos, { refetch }] = createResource<Array<Todo>>(async () => {
    const response = await fetch('/api/todo', {
      method: 'GET',
    })
    const data = await response.json()
    return data
  })

  subscribe(refetch)

  return {
    todos
  }
}

export {
  useTodos,
}
