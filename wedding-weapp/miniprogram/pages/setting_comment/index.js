const page = require('../../framework/page.js')
const {
  getList,
  updateList,
  getAllList,
  getAllDelList
} = require('../../services/comment.js')
page({
  data: {
    // 1、全部评论 2、已删除
    active: 1,
    // 所有评论
    allList: [],
    // 被删除的评论
    delList: [],
    $pageReady: false
  },
  onLoad() {
    wx.getSystemInfo({
      success: ({
        windowHeight
      }) => {
        this.setData({
          height: windowHeight - 106
        })
      }
    })
    this.fetchData();
  },

  fetchData() {
    // 获取所有的评论
    getAllList({
      isDel: 0
    }).then(res => {
      this.setData({
        allList: res,
        $pageReady: true
      })
    })
    // 获取删除列表
    getAllDelList({
      isDel: 1
    }).then(res => {
      this.setData({
        delList: res
      })
    })
  },


  // 删除评论
  del({
    currentTarget: {
      dataset: {
        item
      }
    }
  }) {
    this.$alert(`确认删除${item.nickName}的该条评论吗？`)
      .then(() => {
        const params = {
          id: item.id,
          isDel: true
        }
        return updateList(params)
      })
      .then(() => {
        this.$hint('删除成功')
        this.fetchData();
      })
  },
  // 恢复评论
  remain({
    currentTarget: {
      dataset: {
        item
      }
    }
  }) {
    this.$alert(`确认要恢复${item.nickName}的该条评论吗？`)
      .then(() => {
        const params = {
          id: item.id,
          isDel: false
        }
        return updateList(params)
      })
      .then(() => {
        this.$hint('恢复成功');
        this.fetchData();
      })
  },
  // 切换标签
  toggleLabel({
    currentTarget: {
      dataset: {
        index
      }
    }
  }) {
    this.setData({
      active: +index
    })
  }
})