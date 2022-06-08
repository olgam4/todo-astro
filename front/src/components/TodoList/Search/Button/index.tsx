interface ButtonProps {
  icon: Element
  action: () => void
}
export default function Button({ action, icon }: ButtonProps) {
  return (
    <button
      class="text-4xl text-gray-300"
      onClick={action}
    >
      {icon}
    </button>
  )
}
