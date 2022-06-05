import { AddIcon } from '@components/Icons'
import { createSignal, For, Show } from 'solid-js'

interface CardProps {
  title: string
}

function Card({ title }: CardProps) {
  return (
    <div
      class="center p-4 h-28 w-28 bg-red-900 rounded-md"
    >
      <p>{title}</p>
    </div>
  )
}

interface AddProps {
  add: (category: string) => void
}

function Add({ add }: AddProps) {
  let newRef
  const [show, setShow] = createSignal(false)
  return (
    <>
      <Show when={show()} children={(
        <div
          class="center p-4 h-28 w-28 bg-gray-200 rounded-md"
        >
          <input
            ref={newRef}
            class="bg-transparent w-full"
            type="text"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                add(newRef.value)
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
        class="center p-4 h-28 w-28 bg-gray-200 rounded-md"
        onClick={() => {
          setShow(true)
          newRef.focus()
        }}
      >
        <AddIcon />
      </button>
      </>
  )
}

export default function() {
  const [categories, setCategories] = createSignal([
    'Uni',
    'Work',
    'Home',
  ])

  const addCategory = (category: string) => {
    setCategories([...categories(), category])
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
              title={category}
              />
          )}
          />
        <Add add={addCategory} />
      </div>
    </div>
  )
}
