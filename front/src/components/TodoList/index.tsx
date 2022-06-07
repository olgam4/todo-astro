import Card from '@components/Card'
import { useCategories } from '@components/CategoryList/reactivity';
import { SearchIcon } from '@components/Icons';
import { createMemo, createSignal, For, Show } from "solid-js";
import { Todo, useTodos } from './reactivity';

export default function () {
  const { todos } = useTodos()
  const { categories } = useCategories()

  const [search, setSearch] = createSignal('')
  const [checkedCategories, setCheckedCategories] = createSignal([])
  const [showCategories, setShowCategories] = createSignal(false)

  const filteredTodos = createMemo(() => {
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

  return (
    <>
      <ul
        class="relative flex px-4 space-x-2 flex-wrap space-y-2"
      >
        <div class="absolute top-[1em] left-[2em] text-gray-400">
          <SearchIcon />
        </div>
        <input
          class="pl-[2.5em] bg-gray-200 rounded-md"
          value={search()}
          onInput={(e) => setSearch(e.target.value)}
          type="text"
          />
        <Show
          when={showCategories()}
          children={(
            <For
              each={categoriesState()}
              children={(category) => (
                <li
                  class="flex p-2 rounded-md items-center space-x-2"
                  style={{ background: category.checked ? category.color : '#eee' }}
                >
                  <input id={category.id} type="checkbox" checked={category.checked} onChange={newCategoryState} />
                  <p>{category.title}</p>
                </li>
              )} />
          )}
          fallback={(
            <button
              class="text-4xl text-gray-300"
              onClick={() => setShowCategories(true)}
            >
              &gt;
            </button>
          )}
          />
      </ul>
      <div class="grid p-3 w-full lg:grid-cols-3 pb-[120px] sm:grid-cols-2 grid-cols-1 overflow-scroll">
        <For each={filteredTodos()}
          children={(t: Todo) => (
            <Card
              status={t.status}
              id={t.id}
              content={t.content}
              color={t.categories[0] ? t.categories[0].color : '#fff'}
              />
          )}
          />
      </div>
      </>
  )
}
