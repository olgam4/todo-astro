import { useCategories } from "@components/CategoryList/reactivity"
import { createMemo, createSignal } from "solid-js"

export const useSearch = () => {
  const { categories } = useCategories()

  const [search, setSearch] = createSignal('')
  const [checkedCategories, setCheckedCategories] = createSignal([])
  const [showCategories, setShowCategories] = createSignal(false)

  const categoriesState = createMemo(() => {
    return categories()?.map(category => {
      return {
        ...category,
        checked: checkedCategories().includes(category.id.toString())
      }
    })
  })

  const newCategoryState = (e) => {
    const { checked, id } = e.target
    setCheckedCategories(prev => {
      return checked ? [...prev, id] : prev.filter(c => c !== id)
    })
  }

  return {
    search,
    setSearch,
    checkedCategories,
    setCheckedCategories,
    showCategories,
    setShowCategories,
    categoriesState,
    newCategoryState
  }
}
