import { useLocation } from "../reactivity";

interface Props {
  to: string;
  name: string;
}

export default function ({ name, to }: Props) {
  const { is } = useLocation()

  return (
      <li
        class={`mr-4 ${is(to) ? 'text-blue-500' : 'text-gray-500'}`}
      >
        <a href={to}>{name}</a>
      </li>
  )
}
