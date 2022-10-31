const map = {}
const {
  hint
} = require('../framework/message.js')
const api = (url, data = {}) => {
  if (map[url]) {
    wx.showLoading({
      title: '不要着急嘛...'
    })
    return Promise.reject()
  }
  map[url] = true
  return wx.cloud
    .callFunction({
      name: 'api',
      data: {
        url,
        data
      }
    })
    .catch(err => {
      map[url] = false
      wx.hideLoading({
        fail() {}
      })
      hint((err && err.errorMessage) || '网络错误啦 QoQ!')
      return Promise.reject(err)
    })
    .then(({
      result
    }) => {
      map[url] = false
      wx.hideLoading({
        fail() {}
      })
      const {
        code,
        data,
        msg
      } = result
      // 0、成功 1、失败 2、成功但是要显示msg
      if (code !== 0) {
        hint(msg)
      }
      if (code === 1) {
        return Promise.reject(msg)
      } else {
        return data
      }
    })
}

const request = (method, url, data = {}) => {
  return new Promise((resolve, reject) => {
    const baseUrl = 'https://www.xtybusiness.cn/api/';
    if (map[url]) {
      wx.showLoading({
        title: '不要着急嘛...'
      })
      return Promise.reject()
    }
    map[url] = true

    return wx.request({
      method,
      url: baseUrl + url,
      data,
      success: (res) => {
        map[url] = false;
        wx.hideLoading({
          fail() {}
        })
        const {
          statusCode
        } = res;
        const {
          code,
          data,
          msg,
        } = res.data;
        // 0、成功 
        // 1、失败 
        // 2、成功但是要显示msg
        if (statusCode === 500) {
          reject(JSON.stringify(res.data.message));
          hint((JSON.stringify(res.data.message)) || '网络错误啦 QoQ!')
        }
        if (statusCode !== 200 && statusCode !== 201) {
          reject(JSON.stringify(res.data))
        }
        if (code > 0) {
          hint(msg)
        }
        if (code === 1) {
          reject(msg)
        } else {
          resolve(data)
        }
      },
      fail: (err) => {
        console.log('err', err);
        map[url] = false;
        wx.hideLoading({
          fail() {}
        })
        hint((err && err.errorMessage) || '网络错误啦 QoQ!')
        reject(err)
      },
    })
  })

}

module.exports = {
  api,
  request
}