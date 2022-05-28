import Card from '@components/Card'
import { createEffect, For, onMount } from "solid-js";
import { Todo, useTodos } from './reactivity';

export default function () {
  const { todos } = useTodos()

  return (
    <For each={todos()}
      children={(t: Todo) => (
        <Card
          status={t.status}
          id={t.id}
          content={t.content}
          />
      )}
      />
  )
}
