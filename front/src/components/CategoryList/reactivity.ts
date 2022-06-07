import { subscribe } from '@lib/update'
import { createResource } from 'solid-js'

export interface Category {
  id: number
  title: string
  color: string
}

const useCategories = () => {
  const [categories, { mutate, refetch }] = createResource<Array<Category>>(async () => {
    const response = await fetch('/api/category', {
      method: 'GET',
    })
    const data = await response.json()
    return data
  })

  subscribe(refetch)

  return {
    categories,
    mutate,
  }
}

export {
  useCategories,
}
