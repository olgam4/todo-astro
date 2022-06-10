import { subscribe } from '@lib/update'
import { DateTime } from 'luxon'
import { createMemo, createResource } from 'solid-js'

export interface Todo {
  id: number
  content: string
  status: boolean
  categories: any[]
  dueDate: DateTime
}

const useTodos = () => {
  const [todosResponse, { refetch }] = createResource<Array<Todo>>(async () => {
    const response = await fetch('/api/todo', {
      method: 'GET',
    })
    const data = await response.json()
    const todos = data.map(todo => ({
      ...todo,
      dueDate: todo.dueDate && DateTime.fromISO(todo.dueDate),
    }))
    return todos.sort((a, b) => {
      if (!a.dueDate) {
        return -1
      } else if (!b.dueDate) {
        return 1
      }

      return a.dueDate.toMillis() - b.dueDate.toMillis()
    })
  })
  subscribe(refetch)

  return {
    todos: todosResponse,
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
