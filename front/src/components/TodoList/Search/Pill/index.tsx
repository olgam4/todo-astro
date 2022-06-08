import { Category } from "@components/CategoryList/reactivity"

interface CategoryWithCheck extends Category {
  checked: boolean
}

interface Props {
  category: CategoryWithCheck
  newCategoryState: (e) => void
}

export default function Pill({ category, newCategoryState }: Props) {
  return (
    <li
      class="flex p-2 rounded-md items-center space-x-2"
      style={{ background: category.checked ? `${category.color} !important` : '#eee' }}
    >
      <input id={category.id} type="checkbox" checked={category.checked} onChange={newCategoryState} />
      <p>{category.title}</p>
    </li>
  )
}
