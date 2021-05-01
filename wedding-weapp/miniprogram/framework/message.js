const hint = (msg, time) => {
  msg = String(msg)
  const options = {
    icon: 'none',
    title: msg,
    duration: time || 3000
  }
  wx.showToast(options)
}

const alert = msg => {
  return new Promise((resolve, reject) => {
    const options = {
      content: msg,
      title: '提示',
      success({ cancel, confirm }) {
        if (confirm) {
          resolve()
        } else {
          reject()
        }
      }
    }
    wx.showModal(options)
  })
}
const loading = msg => {
  const options = {
    title: String(msg)
  }
  wx.showLoading(options)
}
module.exports = {
  hint,
  alert,
  loading
}
