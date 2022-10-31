const { api, request } = require('./request.js')
const { dateFormat } = require('../lib/util.js')

function parseComment(data) {
  const { time } = data
  data.time = dateFormat(time, 'yyyy.mm.dd HH:MM:ss')
  return data
}

// 新增评论
const add = data => request('POST', 'comment/add', data).then(parseComment)
// const add = data => api( 'comment/add', data).then(parseComment)

// 获取所有评论
const getAllList = (params) => request('GET', 'comment/getAllList', params).then(res => {
  return res.map(parseComment)
})

const getAllDelList = (params) => request('GET', 'comment/getAllDelList', params).then(res => {
  return res.map(parseComment)
})
// // 获取分页评论
// const getList = data =>
//   api('comment/getList', data).then(res => {
//     return res.map(parseComment)
//   })

// 获取分页评论
const getList = data => request('GET', 'comment/getList', data).then(res => {
  return res.map(parseComment)
})
const updateList = data => request('POST', 'comment/updateList', data)

const getAllRemarkList = () => request('GET', 'comment/getCommentTemplate')
module.exports = {
  add,
  getAllList,
  getAllDelList,
  getList,
  updateList,
  getAllRemarkList
}
