import { createEffect } from "solid-js";

export default function () {
  createEffect( () => {
    const events = new EventSource('/api/todo-stream');
    events.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);
      console.log(parsedData)
    };
  });
  return (
    <div />
  )
}
