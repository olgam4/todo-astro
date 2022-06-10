interface Props {
  message: () => string;
}

export default function ({ message }: Props) {
  return (
    <p
      class="pl-3 text-gray-600"
    >
      {message()}
    </p>
  )
}
