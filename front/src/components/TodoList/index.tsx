import { createEffect } from "solid-js";

export default function () {
  createEffect( () => {
    const events = new EventSource('http://localhost:8000/see');
    events.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);
      console.log(parsedData)
    };
  });
  return (
    <div />
  )
}
