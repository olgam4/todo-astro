import Card from '@components/Card'
import { For } from "solid-js";
import { filterTodos, Todo, useTodos } from './reactivity';
import Search from './Search';
import { useSearch } from './Search/reactivity';

export default function () {
  const { todos } = useTodos()
  const searchHook = useSearch()
  const { search, checkedCategories } = searchHook

  const filteredTodos = filterTodos(search, checkedCategories, todos)

  return (
    <>
      <Search {...searchHook} />
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
