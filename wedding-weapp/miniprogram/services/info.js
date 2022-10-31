const {
  api,
  request
} = require('./request.js')

// 获取小程序所需配置信息
const get = (params) => {
  return request('GET', 'info/getinfo', params)
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

const getopenid = ({ code }) => request('GET', 'auth', { code });


module.exports = {
  get,
  setInfo,
  getopenid
}