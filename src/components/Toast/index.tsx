import { Show } from 'solid-js';
import { useNotification } from './reactivity';

export default function () {
  const state = useNotification()
  return (
    <Show when={state.visible} children={0}>
      <div class="absolute rounded-md shadow-md p-5 bg-red-400 h-[65px] w-[200px] top-1 left-1">
        <p>
          Whoop
        </p>
      </div>
    </Show>
  )
}
