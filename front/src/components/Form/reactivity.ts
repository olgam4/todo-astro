import { createSignal } from 'solid-js'

const submit = (ref, accessor) => {
  const callback = accessor() || (() => {});
  ref.onsubmit = async (e) => {
    e.preventDefault();
    callback(ref)
  }
}

const createTodo = () => {
  return createSignal('')
}

export {
  createTodo,
  submit,
}
