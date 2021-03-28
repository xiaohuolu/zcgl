// pages/to_audit/to_audit.js
import request from "../../utils/request"
import config from "../../config/config"
Page({

  /**
   * 页面的初始数据
   */
  data: {
  list:[]
  },
  toDetail(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/audit/audit_list/audit_list?id=${id}`,
    })
  },
  toAudit(e){
    let id = e.currentTarget.dataset.id

    wx.navigateTo({
      url: `/pages/audit/to_audit/to_audit?id=${id}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getSummaryList() {
    request._post(config.getSummaryList, {
    }, res => {

      if (res.data.code == 200) {
        console.log(res)
        this.setData({
          list:res.data.data
        })
        
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 1,
          })
        }, 2000)
      }

    }, err => {
      wx.showToast({
        title: '请求失败，请重试',
        icon: 'none',
        duration: 2000
      })
    })
  },
  onLoad: function (options) {
  this.getSummaryList()
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