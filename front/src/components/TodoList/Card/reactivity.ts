import { markTodo } from "./api"

export const disappear = (ref) => {
  ref.classList.add('disappear')
  return new Promise<void>(resolve => setTimeout(() => {
    ref.classList.add('display-none')
    resolve()
  }, 500));
}

export const onChange = (buttonRef: any, id: number, status: boolean) => {
  //@ts-ignore
  !status && party.confetti(buttonRef, {
    //@ts-ignore
    count: party.variation.range(20, 40)
  })
  markTodo(id, !status)
}
