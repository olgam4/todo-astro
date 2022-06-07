import { AddIcon } from '@components/Icons'
import { update } from '@lib/update'
import { createSignal, For, Show } from 'solid-js'
import { useCategories } from './reactivity'

interface CardProps {
  title: string
  color: string
}

function Card({ title, color }: CardProps) {
  return (
    <div
      class="center p-4 h-28 w-28 rounded-md transition hover:scale-105 hover:shadow-xl cursor-pointer"
      style={{ background: color }}
    >
      <p>{title}</p>
    </div>
  )
}

interface AddProps {
  add: (title: string, color: string) => void
}

function Add({ add }: AddProps) {
  let newRef
  const [show, setShow] = createSignal(false)
  const [color, setColor] = createSignal('#fff')
  return (
    <>
      <Show when={show()} children={(
        <div
          class="center p-4 h-28 w-28 rounded-md"
          style={{ background: `#${color()}` }}
        >
          <input
            ref={newRef}
            class="bg-transparent w-full text-center"
            type="text"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                add(newRef.value, `#${color()}`)
                newRef.value = ''
                setShow(false)
              }
            }}
            onBlur={() => {
              setShow(false)
              newRef.value = ''
            }}
            />
        </div>
      )} />
      <button
        class="center p-4 h-28 w-28 bg-gray-200 rounded-md transition hover:bg-gray-300 hover:text-white"
        onClick={() => {
          setShow(true)
          newRef.focus()
          setColor(Math.floor(Math.random() * 0xffffff).toString(16))
        }}
      >
        <AddIcon />
      </button>
      </>
  )
}

export default function() {
  const { categories } = useCategories()

  const addCategory = async (title: string, color: string) => {
    await fetch('/api/category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        content: {
          title,
          color,
        }
      })
    })
    update()
  }

  return (
    <div>
      <div
        class="flex flex-wrap gap-3 p-3"
      >
        <For
          each={categories()}
          children={category => (
            <Card
              title={category.title}
              color={category.color}
              />
          )}
          />
        <Add add={addCategory} />
      </div>
    </div>
  )
}
