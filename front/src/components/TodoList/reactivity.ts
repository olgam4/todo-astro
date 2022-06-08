import { subscribe } from '@lib/update'
import { createMemo, createResource } from 'solid-js'

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

const filterTodos = (search: () => string, checkedCategories: () => number[], todos: () => Todo[]) => {
  return createMemo(() => {
    const regex = new RegExp(search(), 'i')
    const filteredTodosByRegex = todos()?.filter(todo => regex.test(todo.content))
    if (checkedCategories().length > 0) {
      return filteredTodosByRegex?.filter(todo => {
        return checkedCategories().filter(c => todo.categories.map(c => c.id.toString()).includes(c)).length > 0
      })
    } else {
      return filteredTodosByRegex
    }
  })
}

export {
  filterTodos,
  useTodos,
}
