import { setCaretAtTheEndOFTheDocument } from '@lib/document';
import { createSignal } from 'solid-js'

export const createTodo = () => {
  return createSignal('')
}

export const styleKeywords = (evt: KeyboardEvent, ref: any, buttonRef: any) => {
  if (evt.key === 'Enter') {
    evt.preventDefault();
    buttonRef.click();
  }
  const text = ref.innerText;
  ref.innerHTML = replace(text);
  setCaretAtTheEndOFTheDocument(ref);
}

const replace = (text: string) => {
  const hasgtaged = replaceHashtags(text);
  const ated = replaceAt(hasgtaged);
  return ated;
}

const replaceHashtags = (text: string) => {
  const regex = /#[^\s]+/gim;
  return text.replace(regex, (match: string) => {
    return `<span class="font-semibold text-blue-300 ml-1">${match}</span>`
  })
}

const replaceAt = (text: string) => {
  const regex = /@[^\s]+/gim;
  return text.replace(regex, (match: string) => {
    return `<span class="font-semibold text-fuchsia-700 ml-1">${match}</span>`
  })
}
