const page = require('../../framework/page.js')
const { sleep } = require('../../lib/util.js')
const Event = require('../../lib/event.js')
const app = getApp()

page({
  data: {
    // 当前第几幕
    stage: 0,
    // 页面风格
    isShowCover: true,
    isFirst: true,
    current: 0,
    isMoving: false,
    y: 0
  },
  onReady() {
    const { $ready } = this.data
    if (!$ready) {
      Event.on(
        'infoChange',
        ({ $ready }) => {
          if (!$ready) return
          this.startStage()
        },
        this.route
      )
    } else {
      this.startStage()
    }
  },
  // 开始图片播放
  startStage() {
    const res = wx.getStorageSync('flashComplete')

    if (res == 1) {
      this.setData({
        stage: 1
      })
    } else {
      this.setData({
        isShowCover: true
      })
      this.setData({
        stage: 0
      })
    }

  },
  flashStart() {
    const { stage } = this.data

    this.setData({
      stage: 0
    })
    wx.setStorageSync('flashComplete', 1)
  },
  // 一个flash播放结束
  flashEnd() {
    const { stage } = this.data

    this.setData({
      stage: stage + 1
    })

    wx.setStorageSync('flashComplete', 1)
  },
  // 切换 封面是否显示
  toggleCover({
    currentTarget: {
      dataset: { type }
    }
  }) {
    const { isShowCover } = this.data
    if (type === 'swiper' && !isShowCover) {
      return
    }
    this.setData({
      isFirst: false,
      isShowCover: !isShowCover
    })
  },
  // 补充滑动切换背景图事件
  start({ changedTouches }) {
    if (!changedTouches[0]) return
    const { clientY } = changedTouches[0]
    this.setData({
      isMoving: true,
      y: clientY
    })
  },
  move({ changedTouches }) {
    if (!changedTouches[0]) return
    const { clientY } = changedTouches[0]
    const { y, isMoving, current, $indexBanners } = this.data
    const len = $indexBanners.length

    if (!isMoving) {
      return
    }
    if (y - clientY >= 30) {
      this.setData({
        current: current + 1 >= len ? 0 : current + 1,
        isMoving: false
      })
    }
    if (y - clientY <= -30) {
      this.setData({
        current: current - 1 <= -1 ? len - 1 : current - 1,
        isMoving: false
      })
    }
  },
  onShareAppMessage() {
    const { info } = app.globalData
    return {
      title: `邀请您于${info.$date1} ${info.$date2}参加${info.$groom}与${info.$bride}的结婚典礼。`,
      // path: '/index/index'
    }
  },
  onShareTimeline(res) {
    const { info } = app.globalData
    return {
      title: `邀请您于${info.$date1} ${info.$date2}参加${info.$groom}与${info.$bride}的结婚典礼。`,
      path: '/index/index'
    }
  }
})
