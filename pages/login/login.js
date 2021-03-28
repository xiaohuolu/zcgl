// pages/login/login.js
import request from "../../utils/request"
import config from "../../config/config"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: "#fff", //按钮颜色
    disabled: false, //是否可以点击
    getCode: "获取验证码", //显示文字
    bgColor: "#1eabf1",
    telephone: '',
    password: '',
    // codeVal: '',
    code: 'noVerificationCode'
  },

  toIndex() {
    // if (!this.data.telephone || this.data.telephone.length != 11) {
    //   wx.showToast({
    //     title: '请输入正确的手机号',
    //     icon: 'none',
    //     duration: 2000
    //   })
    //   return
    // }

    // if (!this.data.password) {
    //   wx.showToast({
    //     title: '请输入密码',
    //     icon: 'none',
    //     duration: 2000
    //   })
    //   return
    // }

    this.login()
  },
  getCode(e) {
    console.log(e)
    let codeVal = e.detail.value
    this.setData({
      codeVal
    })
  },
  getPhoneValue(e) {
    console.log(e)

    this.setData({
      telephone: e.detail.value
    })

  },
  getPassWord(e) {
    console.log(e)

    this.setData({
      password: e.detail.value
    })

  },
  login() {
    console.log('进入点击事件')
    let _this = this
    //  username:'yw',
    //  password:'12345',
    // username:'admin',
    // password:'1234qwer',

    let params = {};
    params.username = this.data.telephone;
    params.password = this.data.password;
    params.code = this.data.code;

    wx.request({
      url: config.login,
      data: params,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res)
        if (res.data.code == 200) {
          wx.setStorageSync('token', res.data.token)

          wx.switchTab({
            url: '/pages/index/index',
          })

        } else {
          console.log('haha')
          wx.showToast({
            title: '登录失败，请重试',
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail(err) {
        console.log(err)
        wx.showToast({
          title: '服务器暂时无法访问，请联系管理员',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


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