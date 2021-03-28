// pages/inventory_add/immediately/immediately.js
import request from "../../../utils/request"
import config from "../../../config/config"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    state: ['正常', '在账', '不在账', '报废'],
    id: '',
    remark: ''
  },
  getScancode: function () {
    var _this = this;
    // 允许从相机和相册扫码

    let id = this.data.id
    let remark = this.data.remark
    let params = {}
    params.assetsInfoStatus = this.data.state[this.data.index].dictValue

    request._post(config.saveAssetsRecord, {
      id: id,
      remark: remark,
      params: params
    }, res => {
      console.log(res)
      if (res.data.code == 500) {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
      }


    }, err => {
      wx.showToast({
        title: '请求失败，请重试',
        icon: 'none',
        duration: 2000
      })
    })



    setTimeout(() => {
      wx.scanCode({
        success: (res) => {
          if (res.result) {
            let id = res.result
            wx.navigateTo({
              url: `/pages/inventory_add/detail/detail?id=${id}`,
            })
          } else {
            wx.showToast({
              title: '扫码失败，请检查二维码内容',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    }, 2000)


  },
  toIndex() {
    wx.navigateBack({
      delta: 1,
    })
  },
  bindTextAreaInput(e) {
    console.log(e)
    this.setData({
      remark: e.detail.value
    })
  },
  bindPickerChange(e) {
    console.log(e)
    this.setData({
      index: e.detail.value
    })
  },
  dictData(dict) {
    request._post(config.dictData, {
      dictType: dict
    }, res => {
      console.log(res)
      let picker = []
      res.data.data.forEach(item => {
        picker.push({ dictLabel: item.dictLabel, dictValue: item.dictValue })
      })
      this.setData({
        state: picker
      })

    }, err => {
      wx.showToast({
        title: '请求失败，请重试',
        icon: 'none',
        duration: 2000
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id: options.id
    })

    this.dictData('dict_assets_info_status')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})