// var hasClick = false;

const http = (method, url, data, response, error) => {
//   if (hasClick) {
//     return
//   }
//  hasClick = true

  wx.showLoading({
    title: '加载中...',
    mask: true 
  })
  
  wx.request({
    method: method,
    url: url,
    header: { 
      'content-type': 'application/json',
      'Authorization': `Bearer ${wx.getStorageSync('token')}`
     },
    data:data,
    success: res => {
      return response(res)
    },
    fail: err => {
      wx.showToast({
        title: '请求失败，请重试',
        icon:'none',
        duration: 2000
      })
      return error(err)
    },
    complete: info => {
      wx.hideLoading();
    //  hasClick = false
    }
  })
}



module.exports = {
  _get: (url, data, response, error) => http('GET', url, data, response, error),
  _post: (url, data, response, error) => http('POST', url, data, response, error),
   _put: (url, data, response, error) => http('PUT', url, data, response, error),
  _delete: (url, data, response, error) => http('DELETE', url, data, response, error),
}