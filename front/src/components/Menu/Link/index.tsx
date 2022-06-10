import { useLocation } from "../reactivity";

interface Props {
  to: string;
  name: string;
}

export default function ({ name, to }: Props) {
  const { is } = useLocation()

  return (
      <li
        class={`mr-4 transition-colors ${is(to) ? 'text-blue-500' : 'text-gray-500 hover:text-blue-300'}`}
      >
        <a href={to}>{name}</a>
      </li>
  )
}
