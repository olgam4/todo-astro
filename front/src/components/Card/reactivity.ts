import create from 'solid-zustand'

export const ise = create<any>((set: any) => ({
  add: (id: string, el: boolean) => set((state: any) => {
    state[id] = el
    return state
  })
}))
