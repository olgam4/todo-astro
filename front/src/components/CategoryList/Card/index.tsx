import { DeleteIcon } from "@components/Icons"
import { hexToHsv, hslToHex } from "@lib/colors"
import { createEffect, createSignal, Show } from "solid-js"

interface CardProps {
  title: string
  color: string
  id: string
  deleteCategory: (id: string) => void
  updateCategoryColor: (id: string, color: string) => void
}

export default function Card({ deleteCategory, id, title, color, updateCategoryColor }: CardProps) {
  let rainbowRef
  let handleRef

  const [selected, setSelected] = createSignal(false)
  const [position, setPosition] = createSignal({ x: 0, y: 0 })
  const [colorHex, setColorHex] = createSignal(color)

  createEffect(() => {
    const initialPosition = hexToHsv(color)[0] / 360 * 112
    setPosition({ x: initialPosition, y: 0 })
  })

  //@ts-ignore
  interact(`#drag-handle-${id}`).draggable({
    listeners: {
      move (event: any) {
        const maxWidth = rainbowRef.offsetWidth - handleRef.offsetWidth
        setPosition(prev => ({ ...prev, x: prev.x + event.dx }))
        if (position().x < 0) {
          setPosition(prev => ({ ...prev, x: 0 }))
        } else if (position().x > maxWidth) {
          setPosition(prev => ({ ...prev, x: maxWidth }))
        }
        setColorHex(hslToHex([position().x / 112 * 360, 100, 50]))
      },
    }})

  return (
    <div
      class={`relative center p-4 h-28 w-28 rounded-md transition-zoom hover:scale-105 hover:shadow-xl cursor-pointer ${selected() && 'scale-105 shadow-xl'}`}
      style={{ background: colorHex() }}
      onClick={() => setSelected(!selected())}
    >
      <Show when={selected()} children={(
        <button
          class="absolute -top-2 -right-2 m-4 transition hover:text-white"
          onClick={() => {
            deleteCategory(id)
          }}
        >
          <DeleteIcon />
        </button>
      )} />
      <p>{title}</p>
      <Show when={selected()} children={(
        <div
          ref={rainbowRef}
          class="absolute w-full h-4 rainbow bottom-0 rounded-b-md"
        >
          <div
            ref={handleRef}
            class="h-4 w-2 border-2 rounded-md bg-transparent"
            id={`drag-handle-${id}`}
            style={{
              transform: `translateX(${position().x}px)`,
            }}
            onClick={(e: MouseEvent) => {
              e.stopPropagation()
              updateCategoryColor(id, hslToHex([position().x / 112 * 360, 100, 50]))
            }}
            />
        </div>
      )} />
    </div>
  )
}
