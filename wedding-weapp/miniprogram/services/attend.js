const { api, request } = require('./request.js')

const add = data => request('POST', 'attend/add', data)

const get = (params) => request('GET', 'attend/get', params)

const getAll = () => request('GET', 'attend/getAll')

const update = data => request('POST', 'attend/update', data)

module.exports = {
  add,
  get,
  getAll,
  update
}
