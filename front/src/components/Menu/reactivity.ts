import { createEffect, createSignal } from "solid-js"

export const useLocation = (link?: string) => {
  const [location, setLocation] = createSignal('')

  createEffect(() => {
    setLocation(window.location.pathname)
  })

  const is = (link: string) => location() === link

  return {
    is,
  }
}
