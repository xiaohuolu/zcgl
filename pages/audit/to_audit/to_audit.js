// pages/inventory_add/immediately/immediately.js
import request from "../../../utils/request"
import config from "../../../config/config"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    picker: [],
    params: {
      id: 0,
      approveStatus: 0,
      remark: null
    }
  },
  bindTextAreaBlur(e) {
    let remark = e.detail.value
    this.setData({
      'params.remark': remark
    })
  },

  bindPickerChange(e) {
    console.log(e)
    let dictValue = e.detail.value;
    this.setData({
      'params.approveStatus': dictValue,
      index: dictValue
    })
  },
  toAudit() {
    if (!this.data.params.remark) {
      wx.showToast({
        title: '请填写描述',
        icon: 'none'
      })
    }

    let params = this.data.params
    console.log(params)

    this.saveSummaryReview(params)

  },

  /**
   * 生命周期函数--监听页面加载
   */
  saveSummaryReview(params) {
    request._post(config.saveSummaryReview, params, res => {
      console.log(res)
      if (res.data.code == 200) {
        wx.showToast({
          title: '提交成功',
          icon: 'none',
          duration: 2000
        })
        setTimeout(()=>{
          wx.redirectTo({
            url: '/pages/audit/audit',
          })
        },2000)
      }else{
        wx.showToast({
          title: '提交失败，请联系管理员',
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
  },
  dictData(params) {
    request._post(config.dictData, {
      dictType: 'dict_assets_approve_status'
    }, res => {
      console.log(res)
      let picker = []
      res.data.data.forEach(item => {
        picker.push({ dictLabel: item.dictLabel, dictValue: item.dictValue })
      })
      this.setData({
        picker: picker
      })
    }, err => {
      wx.showToast({
        title: '请求失败，请重试',
        icon: 'none',
        duration: 2000
      })
    })
  },
  onLoad: function (options) {
    console.log(options.id)
    this.setData({
      'params.id': options.id
    })
    this.dictData()
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