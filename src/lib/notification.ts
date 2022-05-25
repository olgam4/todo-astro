import { useNotification } from '@components/Toast/reactivity'

const state = useNotification()

const notify = state.notify

export {
  notify
}
