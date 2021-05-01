const service = require('../service/comment.js')
const { check } = require('../blacklist/index.js')
const robot = require('../robot/index.js')
const cloud = require('wx-server-sdk')

// data: { name: 'XXX', comment: 'xxxx'}
const add = async data => {
  // 检查评论是否符合要求

  // 腾讯api检测
  {
    const { code, msg } = await cloud.openapi.security.msgSecCheck({
      content: data.comment
    }).catch(err => {
      return { code: 1, msg: '大喜日子不要搞这些😡😡😡！！！\n内容包含敏感信息！！！' }
    })

    if (code === 1) {
      return { code, msg }
    }
  }
  // 自己low逼检测
  {
    const { code, msg } = await check(data)
    if (code !== 0) {
      return { code, msg }
    }
  }
  const { OPENID } = cloud.getWXContext()
  data.time = Date.now()
  data._openid = OPENID
  await service.add(data)
  // 对于某些言论 进行回复 （界面以弹窗形式展示）
  const { code, msg } = await robot(data)
  return { data, code, msg }
}

// 获取评论列表
const getList = async data => {
  const { pageSize = 10, pageNum = 1, isDel = false } = data

  const result = await service.getList({
    pageSize,
    pageNum,
    isDel
  })
  if (!result.length) {
    return { data: result, code: 2, msg: '没有更多啦~~😝' }
  }
  return { data: result }
}
const getAllList = async () => {
  const result = await service.getAllList()
  return { data: result }
}

// 更新列表
const updateList = async params => {
  const { ids, data } = params
  const result = await service.updateList(ids, data)
  return { code: 0 }
}

const getAllRemarkList = async () => {
  const result = await service.getAllRemarkList();
  return result
}

module.exports = {
  add,
  getList,
  getAllList,
  updateList,
  getAllRemarkList
}
