import Card from './Card'
import { For } from "solid-js"
import NoTodos from './NoTodos'
import { filterTodos, Todo, useTodos } from './reactivity'
import Search from './Search'
import { useSearch } from './Search/reactivity'

export default function () {
  const { todos } = useTodos()
  const searchHook = useSearch()
  const { search, checkedCategories } = searchHook

  const filteredTodosMemo = filterTodos(search, checkedCategories, todos)

  const why = () => {
    if (todos() == undefined) {
      return "Loading..."
    } else if (todos().length == 0) {
      return 'No todos yet - add some!'
    }
    return 'No todos matching your search'
  }

  return (
    <>
      <Search {...searchHook} />
      <div class="grid p-3 w-full lg:grid-cols-3 pb-[120px] sm:grid-cols-2 grid-cols-1 overflow-scroll">
        <For each={filteredTodosMemo()}
          children={(t: Todo) => (
            <Card
              status={t.status}
              id={t.id}
              content={t.content}
              categories={t.categories}
              dueDate={t.dueDate}
              />
          )}
          fallback={<NoTodos message={why}/>}
          />
      </div>
      </>
  )
}
