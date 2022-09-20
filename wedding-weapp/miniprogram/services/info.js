const {
  api,
  request
} = require('./request.js')

// 获取小程序所需配置信息
const get = () => {
 return request('GET', 'info/getinfo')
  // return api('info/get')
}

// 修改小程序信息
const setInfo = params => {
  const data = {}
  // 所有字段去掉$
  for (let key in params.data) {
    data[key.replace('$', '')] = params.data[key]
  }
  const obj = {
    id: params.id,
    data
  }
  return api('info/setInfo', obj)
}

module.exports = {
  get,
  setInfo
}