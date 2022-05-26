import { createEffect, createResource } from 'solid-js';

export interface Todo {
  id: number
  content: string
  status: boolean
}

const useTodos = () => {
  const [todos, { refetch }] = createResource<Array<Todo>>(async () => {
    const response = await fetch('/api/todo', {
      method: 'GET',
    })
    const data = await response.json()
    return data
  });

  createEffect( () => {
    const es = new EventSource('https://olgam4-todo-astro.deno.dev');
    es.addEventListener('data', refetch)
  });

  return {
    todos
  }
}

export {
  useTodos,
}
