import create from 'solid-zustand'

const ise = create<any>((set: any) => ({
  add: (id: string, el: boolean, animation: string) => set((state: any) => {
    state[id] = {
      animation,
      ran: el,
    }
    return state
  }),
  reset: () => set({}),
  remove: (id: string) => set((state: any) => {
    delete state[id]
    return state
  }),
  update: (id: string, el: boolean) => set((state: any) => {
    state[id].ran = el
    return state
  }),
}))

export const registerAnimation = (lid: string, ref: any, animationName: string) => {
  const state = ise()
  if (!state[lid] || !state[lid].ran) {
    ref.classList.add(animationName)
    state.add(lid, true, animationName)
  }
}

export const resetAnimation = (lid: string) => {
  const state = ise()
  state[lid] && state.update(lid, false)
}

export const unregisterAllAnimations = () => {
  const state = ise()
  state.reset()
}

export const resetAnimationType = (animationName: string) => {
  const state = ise()
  Object.keys(state).forEach((key) => {
    if (state[key].animation === animationName) {
      state.update(key, false)
    }
  })
}
