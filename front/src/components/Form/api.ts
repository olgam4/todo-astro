import { notify } from '@lib/notification'
import { update } from '@lib/update'

export const fn = async (form: any) => {
  const content = form.innerText
  // find every hashtag in the content, remove them and keep them in a list
  const hashtags = content.match(/#\w+/g) || []
  const hashtagsList = hashtags.map(hashtag => hashtag.slice(1))
  // remove the hashtags from the content
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
  await update()
}

