import { notify } from '@lib/notification'
import { update } from '@lib/update'

export const fn = async (form: any) => {
  const content = form.innerText
  if (content.length <= 0) {
    notify(`Please enter a some text`)
    return
  }
  const { hashtags, ats, content: contentWithoutKeywords } = extractKeywords(
    content
  )
  const response = await fetch('/api/todo', {
    method: 'POST',
    headers: {
      'Accept': 'appliaction/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content: contentWithoutKeywords,
      hashtags,
      ats,
    }),
  })
  if (!response.ok) {
    notify('There seems to have been a mistake...')
  }
  resetInput(form)
  await update()
}

const resetInput = (form: any) => {
  const input = form.querySelector('#content')
  input.innerText = ''
}

const extractKeywords = (content: string) => {
  const hastaged = getHashtags(content)
  const atted = getAts(hastaged.contentWithoutHashtags)
  return {
    hashtags: hastaged.hashtagsList,
    ats: atted.atsList,
    content: atted.contentWithoutAts,
  }
}

const getHashtags = (content: string) => {
  const hashtags: string[] = content.match(/#\w+/g) || []

  const hashtagsList = hashtags.map(hashtag => hashtag.slice(1))
  const contentWithoutHashtags = content.replace(/#\w+/g, '')

  return { contentWithoutHashtags, hashtagsList }
}

const getAts = (content: string) => {
  const ats: string[] = content.match(/@\w+/g) || []

  const atsList = ats.map(at => at.slice(1))
  const contentWithoutAts = content.replace(/@\w+/g, '')

  return { contentWithoutAts, atsList }
}
