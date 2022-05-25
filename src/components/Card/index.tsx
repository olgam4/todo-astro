interface Props {
  status: boolean
  content: string
}

export default function Card({
  status,
  content,
}: Props) {
  return (
    <div class="min-w-[400px] items-center space-x-2 flex px-3 py-1 border rounded-md">
      <input type="checkbox"/>
      <p>{content}</p>
    </div>
  )
}
