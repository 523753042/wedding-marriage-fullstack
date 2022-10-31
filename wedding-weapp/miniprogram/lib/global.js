const info = require('../services/info.js')
const Event = require('./event.js')
const setTabBar = require('./setTabBar.js')
const { getopenid } = require('../services/info')
const getInfo = function (app, code) {
  getopenid({ code }).then(res2 => {
    info.get({ openid: res2.openid }).then((res1) => {
      res1.$ready = true;
      // res1.openid = res2.openid;
      // res2.session_key = res2.session_key;
      Event.emit('infoChange', res1)
      Event.emit('openidChange', res2.openid)
    })
  })


}

module.exports = {
  getInfo
}
