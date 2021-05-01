const cloud = require('wx-server-sdk')
const db = cloud.database()
const COMMENT = db.collection('comment')
const REMARK = db.collection('remark')
const add = async data => {
  return await COMMENT.add({
    data
  })
}

const update = async (id, data) => {
  return await COMMENT.doc(id).update({
    data
  })
}

const getList = async data => {
  const { pageSize, pageNum, isDel } = data
  return await COMMENT.where({
    isDel
  })
    .skip(pageSize * pageNum - pageSize)
    .limit(pageSize)
    .orderBy('time', 'desc')
    .get()
}

const getCount = async () => {
  return await COMMENT.count()
}

const getAllRemarkList = async () => {
  return await REMARK
    .field({
      remark: true
    })
    .get()
}

module.exports = {
  add,
  getList,
  getCount,
  update,
  getAllRemarkList,
}
