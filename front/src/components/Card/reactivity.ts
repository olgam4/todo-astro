import create from 'solid-zustand'
import { markTodo } from "./api"

export const ise = create<any>((set: any) => ({
  add: (id: string, el: boolean) => set((state: any) => {
    state[id] = el
    return state
  })
}))

export const registerAnimation = (lid: string, ref: any) => {
  const state = ise()
  if (!state[lid]) {
    ref.classList.add('appear')
    state.add(lid, true)
  }
}

export const disappear = (ref) => {
  ref.classList.add('disappear')
  return new Promise<void>(resolve => setTimeout(() => {
    ref.classList.add('display-none')
    resolve()
  }, 500));
}

export const onChange = (buttonRef: any, id: number, status: boolean) => {
  console.log(id, status)
  //@ts-ignore
  !status && party.confetti(buttonRef, {
    //@ts-ignore
    count: party.variation.range(20, 40)
  })
  markTodo(id, !status)
}
