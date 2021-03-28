// pages/Inventory_records/detail/detail.js
import request from "../../../utils/request"
import config from "../../../config/config"
Page({

  /**
   * 页面的初始数据
   */
  data: {
info:{}
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  getInfo(id) {
    request._post(config.getInfo, {
      id:id
    }, res => {
 
     if(res.data.code == 200){
       this.setData({
         info:res.data.data
       })
       console.log(this.data.info)
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
this.getInfo(options.id)
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