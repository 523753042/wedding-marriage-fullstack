const page = require('../../framework/page.js')
const comment = require('../../services/comment.js')
const attend = require('../../services/attend.js')
const app = getApp()

function createGetUserInfo(msg, showLayer) {
  return ({ detail: { userInfo } }) => { }
}
let ghostBlood = 5,
  isFirstShow = true

page({
  data: {
    zhufu: '发送祝福',
    $pageReady: false,
    height: 0,
    // 祝福的列表
    list: [],
    // 用户信息
    userInfo: null,
    // 是否显示祝福弹窗
    isLayerShow: false,
    // 是否显示出席弹窗
    isAttendShow: false,
    isWanted: false,
    // 祝福
    value: '',
    // 当前祝福页数
    pageNum: 1,
    remarkList: [{ remark: '相敬如宾，相亲相爱。' }],
    // 出席的信息
    name: '',
    mobile: '',
    remark: '',
    attendArr: ['一人出席', '两人出席', '三人出席', '三人以上'],
    index: 0,
    _id: null
  },
  onLoad() {
    console.log('load')
    wx.getSystemInfo({
      success: ({ windowHeight }) => {
        this.setData({
          height: windowHeight - 80
        })
      }
    })
    // 获取祝福
    this.getComment(1).then(() => {
      // 如果直接进入祝福页 祝福加载完成 但是信息还未加载完成
      this.setData({
        $pageReady: true
      })
    })
    comment.getAllRemarkList().then(res => {
      if (res.length && res.length > 0) {
        this.setData({
          // value: this.getRandRemark(),
          remarkList: res
        })
      }
    })
  },
  onShow() {
    if (isFirstShow) {
      isFirstShow = false
      return
    }
    this.$showLoading('获取祝福中...')
    this.getComment(1).then(() => {
      wx.hideLoading({
        fail() { }
      })
    })
  },
  // 获取祝福信息
  getComment(pageNum) {
    let { list } = this.data
    if (pageNum === 1) {
      list = []
    }
    return comment.getList({ pageNum }).then(res => {
      if (res&&res.length) {
        this.setData({
          list: list.concat(res),
          pageNum
        })
      }
    })
  },
  randValue() {
    this.setData({
      value: this.getRandRemark()
    })
  },
  // 滚动到底时
  scrollToLower() {
    wx.showLoading({
      title: '祝福加载中...'
    })
    const { pageNum, list } = this.data

    this.getComment(pageNum + 1)
  },

  // 校验祝福内容
  validate() {
    const { value } = this.data
    if (!value.replace(/\s/g, '')) {
      this.$hint('难道你就没有话对我们说吗~')
      return false
    }
    return true
  },
  // 出席人数改变
  numChange({ detail: { value } }) {
    this.setData({
      index: +value
    })
  },
  // 获取用户信息
  getUserInfo({
    detail: { userInfo },
    target: {
      dataset: { type }
    }
  }) {
    let msg = '',
      fn
    // 1、祝福  2、出席
    switch (+type) {
      case 1:
        msg = '咋滴，还想匿名发言呐？'
        fn = this.showLayer
        break
      case 2:
        msg = '你得让我知道你是谁呀😂'
        fn = this.showAttend
        break
    }
    if (!userInfo) {
      // 没有授权
      this.$hint(msg)
      return
    }
    this.setData({
      userInfo
    })
    app.globalData.userInfo = userInfo
    fn()
  },
  // 提交祝福
  submit() {
    const { userInfo, value, list } = this.data
    if (!this.validate()) return
    wx.showLoading({
      title: '祝福提交中...'
    })
    comment.add(Object.assign({}, userInfo, { comment: value })).then(data => {
      list.unshift(data)
      this.setData({
        list,
        isLayerShow: false
      })
    })
  },
  // 提交出席信息
  submitAttend() {
    const { name, mobile, index, remark, userInfo, _id } = this.data
    if (!name) {
      return this.$hint('请输入姓名')
    }
    if (!mobile) {
      return this.$hint('请输入手机号码')
    }
    const attendInfo = {
      name,
      mobile,
      attendNum: index + 1,
      remark
    }
    let service,
      params = { attendInfo }
    if (!_id) {
      service = attend.add
      params = {
        userInfo,
        attendInfo
      }
    } else {
      service = attend.update
      params = {
        id: _id,
        data: attendInfo
      }
    }
    service(params).then(() => {
      this.hideAttend()
    })
  },
  getAttendInfo() {
    wx.showLoading({
      title: '信息加载中...'
    })
    attend
      .get()
      .then(res => {
        if (!res) {
          const { userInfo } = this.data
          this.setData({
            name: userInfo.nickName,
            remark: this.getRandRemark()
          })
          return
        }
        const { attendInfo, _id } = res
        const { attendNum, mobile, name, remark } = attendInfo
        this.setData({
          index: attendNum - 1,
          _id,
          mobile,
          name,
          remark: this.getRandRemark()
        })
      })
      .finally(() => {
        wx.hideLoading({
          fail() { }
        })
      })
  },
  // 生成随机祝福
  getRandRemark() {
    const { remarkList } = this.data
    const rand = Math.floor(Math.random() * remarkList.length);
    return remarkList[rand].remark;
  },
  // layer的开关
  showLayer() {
    this.setData({
      isLayerShow: true
    })
  },
  hideLayer() {
    this.setData({
      isLayerShow: false
    })
  },
  showAttend() {
    this.setData({
      isAttendShow: true
    })
    this.getAttendInfo()
  },
  hideAttend() {
    this.setData({
      isAttendShow: false
    })
  },
  showWanted() {
    this.setData({
      isWanted: true
    })
  },
  hideWanted() {
    this.setData({
      isWanted: false
    })
  },
  ghostAction() {
    if (--ghostBlood <= 0) {
      ghostBlood = 5
      this.$go('/pages/setting/index')
    }
  }
})
