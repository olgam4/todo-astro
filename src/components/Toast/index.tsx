import { Show } from 'solid-js';
import { Transition } from 'solid-transition-group';
import { useNotification } from './reactivity';

export default function () {
  const state = useNotification()
  return (
    <Transition
      onEnter={(el, done) => {
        const a = el.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: 600,
        });
        a.finished.then(done);
      }}
      onExit={(el, done) => {
        const a = el.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: 600,
        });
        a.finished.then(done);
      }}
    >
      <Show when={state.visible} children={0}>
        <div class="absolute rounded-md shadow-md p-5 bg-red-400 h-[65px] w-[300px] top-1 left-1">
          <p>
            {state.detail}
          </p>
        </div>
      </Show>
    </Transition>
  )
}
