import { ArrowLeftIcon, ArrowRightIcon, SearchIcon } from "@components/Icons"
import { registerAnimation, resetAnimationType } from "@lib/animation"
import { For, onMount, Show } from "solid-js"
import Button from "./Button"
import Pill from "./Pill"
import { useSearch } from './reactivity'

type Props = ReturnType<typeof useSearch>

export default function Search({
  search,
  setSearch,
  showCategories,
  setShowCategories,
  categoriesState,
  newCategoryState,
}: Props) {
  return (
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
          <>
            <For
              each={categoriesState()}
              children={(category) => {
                let ref: any
                const id = `search-category-${category.id}`
                onMount(() => registerAnimation(id, ref, 'fade-in'))
                return (
                  <li ref={ref}>
                    <Pill category={category} newCategoryState={newCategoryState} />
                  </li>
                )}}
              />
            <Button icon={<ArrowLeftIcon />} action={() => {
              setShowCategories(false)
              resetAnimationType('fade-in')
            }}/>
            </>
        )}
        fallback={(
          <Button icon={<ArrowRightIcon />} action={() => setShowCategories(true)}/>
        )}
        />
    </ul>
  )
}
