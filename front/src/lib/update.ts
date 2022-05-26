const update = async () => {
  console.log('updating....')
  await fetch('https://olgam4-todo-astro.deno.dev/see', {
    method: 'POST',
  })
}

export {
  update,
}
