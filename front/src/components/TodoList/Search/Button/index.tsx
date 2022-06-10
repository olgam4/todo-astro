interface ButtonProps {
  icon: Element
  action: () => void
}
export default function Button({ action, icon }: ButtonProps) {
  return (
    <button
      class="text-4xl h-10 w-10 text-gray-300 transition-colors hover:text-blue-200"
      onClick={action}
    >
      {icon}
    </button>
  )
}
