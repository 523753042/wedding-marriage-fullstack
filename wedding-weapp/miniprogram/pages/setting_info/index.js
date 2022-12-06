const page = require('../../framework/page.js')
const {
  setInfo
} = require('../../services/info.js')
const Event = require('../../lib/event.js')
const {
  newUploadFile
} = require('../../services/upload.js')
const {
  baseUrl
} = require('../../services/request.js')
const app = getApp()
page({
  // 上传小程序信息
  submit() {
    const {
      $groom,
      $bride,
      $phone1,
      $phone2,
      $date1,
      $date2,
      $time,
      $_id
    } = this.data
    const params = {
      id: $_id,
      data: {
        $groom,
        $bride,
        $phone1,
        $phone2,
        $date1,
        $date2,
        $time
      }
    }
    setInfo(params).then(() => {
      Event.emit('infoChange', params.data)
    })
  },
  chooseMusic() {
    wx.chooseMessageFile({
      count: 1
    }).then(res => {
      console.log('res', res);
      newUploadFile(res.tempFiles[0]).then(res => {
        console.log('res', res);
        const {
          $_id
        } = this.data;
        const $music = {
          id: res.data.id,
          name: res.data.filename,
          url: `${baseUrl}/upload/${res.data.id}/readaudio`
        }
        const params = {
          id: $_id,
          data: {
            $music
          }
        }
        setInfo(params).then(() => {
          Event.emit('infoChange', params.data)
        })
        // Event.emit('infoChange', {
        //   $music: {
        //     id: res.data.id,
        //     name: res.data.filename,
        //     url: `${baseUrl}/upload/${res.data.id}/readaudio`
        //   }
        // })
      })
    })
  }
})