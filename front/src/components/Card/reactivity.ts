import create from 'solid-zustand';


export const ise = create<any>(set => ({
  add: (id, el) => set(state => {
    state[id] = el
    console.log(id, state)
    return state
  })
}))
