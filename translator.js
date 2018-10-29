import { isString, get, head, map } from 'lodash'

const translatorText = (text, translator, getDefault) => {
  if (text) {
    if (isString(text)) return text
    const lang = getDefault
      ? get(translator, 'default', 'currentLanguage')
      : get(translator, 'currentLanguage', 'default')
    return text[lang] || text.default || head(map(text, t => t))
  } else return ''
}

export { translatorText }
