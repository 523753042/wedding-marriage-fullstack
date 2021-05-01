/*
 * @Description
 * @Version: 1.0
 * @Autor: 王兴欣
 * @Date: 2020-03-27 20:58:11
 * @LastEditors: 王兴欣
 * @LastEditTime: 2020-04-10 09:59:20
 */
const { keyword, probability } = require('../static/config')
const lexicon = [
  {
    reg: /婚姻是爱情的坟墓/g,
    reply: '我可不认为婚姻是爱情的坟墓哟~🤔'
  },
  {
    reg: /早生贵子/g,
    reply: '孩子嘛还是别着急~哈哈哈'
  },
  {
    reg: /不同意|我们?反对/g,
    reply: '滚犊子'
  },
  {
    reg: /私房钱/g,
    reply: '嘘🤫🤫🤫 哪里有什么私房钱！🤥'
  },
  {
    reg: /搓衣板/g,
    reply: '🙅‍♂️我们家地位平等，没有这些工具🙅‍♀️'
  },
  {
    reg: /新郎.*帅/g,
    reply: '可惜个人小程序没有发红包功能，不然我一定给你个大红包😜😜😜'
  },
  {
    reg: /新娘.*美/g,
    reply: '可惜个人小程序没有发红包功能，不然我一定给你个大红包😜😜😜'
  },
  {
    reg: /好帅|美/g,
    reply: '可惜个人小程序没有发红包功能，不然我一定给你个大红包😜😜😜'
  },
  {
    reg: /恭喜/g,
    reply: '谢谢~谢谢~😝'
  }
]

if (keyword) {
  lexicon.unshift({
    reg: keyword,
    reply(){
      const num = Math.ceil(Math.random() * 100)
      if (num <= probability()) {
        return '小道消息：据说相册里有一张照片可以拖拽🤔🤔🤔'
      }
    }
  })
}
module.exports = lexicon
