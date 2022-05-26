import create from 'solid-zustand';


export const ise = create<any>(set => ({
  add: (id, el) => set(state => {
    state[id] = el
    return state
  })
}))
