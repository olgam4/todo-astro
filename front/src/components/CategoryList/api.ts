import { update } from "@lib/update"

export const addCategory = async (optimist: any, title: string, color: string) => {
  optimist()
  await api('/api/category', JSON.stringify({ content: { title, color } }))
}

export const deleteCategory = async (optimist: any,id: string) => {
  optimist()
  await api('/api/category/delete', JSON.stringify({ id }))
}

export const updateCategoryColor = async (optimist: any, id: string, color: string) => {
  optimist()
  await api('/api/category/update', JSON.stringify({ id, color }))
}

const api = async (route: string, body: string) => {
  await fetch(route, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  })
  await update()
}
