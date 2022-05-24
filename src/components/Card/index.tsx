interface Props {
  status: boolean
  content: string
}

export default function Card({
  status,
  content,
}: Props) {
  return (
    <div class="px-3 py-1 border rounded-md">
      <p>{content}</p>
      <input type="checkbox"/>
    </div>
  )
}
