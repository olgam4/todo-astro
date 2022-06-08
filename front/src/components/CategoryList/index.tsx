import { For } from 'solid-js'
import Add from './Add'
import { addCategory, deleteCategory, updateCategoryColor } from './api'
import Card from './Card'
import { useCategories } from './reactivity'


export default function() {
  const { categories, mutate } = useCategories()

  const cbDelete = (id: string) => {
    const optimist = () => mutate((prev) => prev.filter((category) => category.id !== +id))
    deleteCategory(optimist, id)
  }

  const cbUpdate = (id: string, color: string) => {
    const optimist = () => mutate((prev) => prev.map((category) => category.id === +id ? { ...category, color } : category))
    updateCategoryColor(optimist, id, color)
  }

  const cbAdd = (title: string, color: string) => {
    const optimist = () => mutate((prev) => [...prev, { title, color, id: 0 }])
    addCategory(optimist, title, color)
  }

  return (
    <div>
      <div
        class="flex flex-wrap gap-3 p-3"
      >
        <For
          each={categories()}
          children={category => (
            <Card
              id={category.id.toString()}
              title={category.title}
              color={category.color}
              deleteCategory={cbDelete}
              updateCategoryColor={cbUpdate}
              />
          )}
          />
        <Add add={cbAdd} />
      </div>
    </div>
  )
}
