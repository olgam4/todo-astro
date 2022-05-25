import { useNotification } from '@components/Toast/reactivity'

const state = useNotification()

const notify = !state.visible && state.notify

export {
  notify
}
