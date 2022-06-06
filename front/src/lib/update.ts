import { createEffect } from "solid-js";

const api = 'https://olgam4-todo-astro.deno.dev';
const localhost = 'http://localhost:8000';

const update = async () => {
  await fetch(`${api}/see`, {
    method: 'POST',
  })
}

const subscribe = async (refetch: () => void) => {
  createEffect( () => {
    const es = new EventSource(`${api}/sse`);
    es.addEventListener('data', (evt) => {
      refetch()
    })
  });
}

export {
  update,
  subscribe,
}
