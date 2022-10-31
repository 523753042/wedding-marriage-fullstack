import { lexicon } from './lexicon'
export async function robot({ comment }) {

  const result = lexicon.filter(item => item.reg.test(comment));
  console.log('result', result);
  if (result && result.length) {
    let code = 2, msg = ''
    for (let i = 0; i < result.length; i++) {
      const item = result[i]
      item.reg.lastIndex = 0
      const message = typeof item.reply === 'string' ? item.reply : item.reply()
      if (message) {
        msg = message
        break
      }
    }
    return { code, msg }
  }
  return { code: 0, msg: 'success' }
}

