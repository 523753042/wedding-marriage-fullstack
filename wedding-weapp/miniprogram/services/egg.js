const {
  api,
  request
} = require('./request.js')
const {
  dateFormat
} = require('../lib/util.js')

function parseComment(data) {
  const {
    time
  } = data
  data.time = dateFormat(time, 'mm.dd HH:MM')
  return data
}

const clue = data => request('POST', 'egg/clue', data)

const getList = data => request('GET', 'egg/getList', data).then(res => {
  return res.map(parseComment)
})

module.exports = {
  clue,
  getList
}