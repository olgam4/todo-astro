import { notify } from '@lib/notification'
import { update } from '@lib/update'

export const fn = async (form: any) => {
  const content = form.innerText

  if (content.length <= 0) {
    notify(`Please enter a some text`)
    return
  }

  const hashtags: string[] = content.match(/#\w+/g) || []

  const hashtagsList = hashtags.map(hashtag => hashtag.slice(1))
  const contentWithoutHashtags = content.replace(/#\w+/g, '')

  const response = await fetch('/api/todo', {
    method: 'POST',
    headers: {
      'Accept': 'appliaction/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content: contentWithoutHashtags, hashtags: hashtagsList }),
  })

  if (!response.ok) {
    notify('There seems to have been a mistake...')
  }

  const input = form.querySelector('#content')
  input.innerText = ''

  await update()
}

