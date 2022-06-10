import { Category } from "@components/CategoryList/reactivity"

interface CategoryWithCheck extends Category {
  checked: boolean
}

interface Props {
  category: CategoryWithCheck
  newCategoryState: (e) => void
}

export default function Pill({ category, newCategoryState }: Props) {
  let ref: any
  return (
    <li
      class="flex p-2 rounded-md items-center select-none cursor-pointer hover:opacity-80"
      style={{ background: category.checked ? `${category.color}` : '#eee' }}
      onClick={() => ref.click()}
    >
      <input
        ref={ref}
        id={category.id}
        type="checkbox"
        checked={category.checked}
        onChange={newCategoryState}
        class="cursor-pointer display-none"
        />
      <p
        class="text-sm text-gray-600 font-medium leading-6"
      >{category.title}</p>
    </li>
  )
}
