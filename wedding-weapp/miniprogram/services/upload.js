const {
  setInfo
} = require('./info.js')
const {
  hint
} = require('../framework/message.js')
const {
  request,
  baseUrl
} = require('./request.js')
// 保存数据信息
const saveData = data => {
  let page = getCurrentPages()
  page = page[page.length - 1]
  const {
    $_id
  } = page.data
  wx.showLoading({
    title: `数据保存中...`,
    mask: true
  })
  return setInfo({
    id: $_id,
    data
  })
}

// 上传单个文件
const uploadFile = (cloudPath, filePath) => {
  return new Promise((resolve, reject) => {
    wx.cloud.uploadFile({
      cloudPath,
      filePath,
      success(res) {
        resolve(res.fileID)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}
/**
 * 获取图片地址
 */
const getImageUrl = ids => {
  return ids.map(id => ({
    id,
    url: `${baseUrl}/upload/${id}/readimage`
  }))
};
// 获取链接地址
const getUrl = ids => {
  wx.showLoading({
    title: `正在获取链接地址`,
    mask: true
  })
  return new Promise((resolve, reject) => {
    wx.cloud.getTempFileURL({
      fileList: ids,
      success({
        fileList
      }) {
        resolve(
          fileList.map(item => {
            return {
              id: item.fileID,
              url: item.tempFileURL
            }
          })
        )
      },
      fail(err) {
        reject(err)
      }
    })
  })
}
const getFileName = name => {
  name = name.replace(/^\s+|\s+$/, '').replace(/\s+/g, '_')
  const arr = name.split('.').reverse()
  return `${encodeURIComponent(arr[1].replace(/[\/:]/g, ''))}.${arr[0]}`
}

const uploadImg = filePaths => {
  const ids = []
  // 上传图片
  let resolve = Promise.resolve();
  console.log('filePaths', filePaths);
  for (let i = 0; i < filePaths.length; i++) {
    resolve = resolve.then(() => {
      const path = filePaths[i]
      if (i === 0) {
        wx.showLoading({
          title: `正在上传第1张图片`,
          mask: true
        })
      }
      return newUploadFile({
          path,
          name: '',
        })
        .then(res => {
          const id = res.data.id;
          wx.showLoading({
            title: `正在上传第${i + 2}张图片`,
            mask: true
          })
          ids.push(id)
        })
        .catch(err => {
          wx.showLoading({
            title: `正在上传第${i + 2}张图片`,
            mask: true
          })
        })
    })
  }

  // 获取真实链接地址
  resolve = resolve.then(() => {
    return getImageUrl(ids)
  })
  // 存储数据库
  let page = getCurrentPages()
  page = page[page.length - 1]
  const {
    $_id,
    $photos
  } = page.data;
  resolve = resolve.then(res => {
    if (!ids.length) return Promise.reject('上传失败');
    $photos.push(...res)
    '11'.toString()
    return saveData({
      $photos: $photos.filter(p => {
        console.log('p', p.id);
        return !p.id.toString().startsWith('cloud')
        return true
      })
    })
  })

  // 返回数据
  resolve = resolve
    .then(() => {
      wx.hideLoading({
        fail() {}
      })
      return $photos
    })
    .catch(err => {
      wx.hideLoading({
        fail() {}
      })
      hint(err)
      return Promise.reject(err)
    })
  return resolve
}

const delImg = id => {
  // 修改数据库
  let page = getCurrentPages()
  page = page[page.length - 1]
  let {
    $_id,
    $photos
  } = page.data
  $photos = $photos.filter(item => item.id !== id);
  const params = {
    id: $_id,
    data: {
      $photos
    }
  }
  return Promise.all([setInfo(params), delFile(id)]).then(
    () => {
      console.log('$photos', $photos);
      return $photos
    }
  )
}
const delFile = id => {
  return request('GET', `upload/${id}/delete`)
}

const del = ids => {
  return new Promise((resolve, reject) => {
    wx.cloud.deleteFile({
      fileList: ids,
      success({
        fileList
      }) {
        resolve(fileList.map(item => item.fileID))
      },
      fail() {
        reject()
      }
    })
  })
}

const newUploadFile = ({
  path,
  name
}) => {
  console.log('filePath', path);
  console.log('fileName', name);
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: `${baseUrl}/upload/file`,
      filePath: path,
      name: 'file',
      formData: {
        originalname: name
      },
      success(res) {
        resolve(JSON.parse(res.data))
      },
      fail(err) {
        console.log('err', err);
        reject(err)
      }
    })
  })
}

const newUpLoad = (filePath, fileName) => {


}



module.exports = {
  newUploadFile,
  uploadImg,
  delImg,
}