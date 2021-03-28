// pages/Inventory_records/list/list.js
import request from "../../../utils/request"
import config from "../../../config/config"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    name: '',
    code: '',
    typePicker: [],
    typeIndex: 0,
    deptPicker: [],
    deptIndex: 0,
    userPicker: [],
    userIndex: 0,
    statesPicker: [],
    statesIndex: 0
  },
  toDetail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/inventory_records/detail/detail?id=${id}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getInfoList(id) {
    request._post(config.getInfoList, {
      params: {
        summaryId: id
      }
    }, res => {

      if (res.data.code == 200) {
        console.log(res)
        this.setData({
          list: res.data.data
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
  dictData(dict, data) {
    request._post(config.dictData, {
      dictType: dict
    }, res => {
      let picker = []
      res.data.data.forEach(item => {
        picker.push({ dictLabel: item.dictLabel, dictValue: item.dictValue })
      })
      picker.unshift({dictLabel: '请选择', dictValue: ''})

      if (data == 'type') {
        this.setData({
          typePicker: picker
        })
      }
      if (data == 'dept') {
        this.setData({
          deptPicker: picker
        })
      }
      if (data == 'user') {
        this.setData({
          userPicker: picker
        })
      }
      if (data == 'states') {
        this.setData({
          statesPicker: picker
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
  typePickerChange(e) {
    let dictValue = e.detail.value;
    this.setData({
      typeIndex: dictValue
    })
    console.log(this.data.typeIndex)

  },
  deptPickerChange(e) {
    let dictValue = e.detail.value;
    this.setData({
      deptIndex: dictValue
    })
    console.log(this.data.deptIndex)

  },
  userPickerChange(e) {
    let dictValue = e.detail.value;
    this.setData({
      userIndex: dictValue
    })
    console.log(this.data.userIndex)

  },
  statesPickerChange(e) {
    let dictValue = e.detail.value;
    this.setData({
      statesIndex: dictValue
    })
    console.log(this.data.statesIndex)

  },
  nameInput(e) {
    let name = e.detail.value
    this.setData({
      name: name
    })
  },
  codeInput(e) {
    let code = e.detail.value
    this.setData({
      code: code
    })
  },
  searchBtn() {
    let type = this.data.typePicker[this.data.typeIndex].dictValue
    let deptId = this.data.deptPicker[this.data.deptIndex].dictValue
    let name = this.data.name
    let code = this.data.code
    let userId = this.data.userPicker[this.data.userIndex].dictValue
    let states = this.data.statesPicker[this.data.statesIndex].dictValue

    request._post(config.getInfoList, {
      type, deptId, name, code, userId, states
    }, res => {

      if (res.data.code == 200) {
        console.log(res)
        if(res.data.data){
          this.setData({
            list: res.data.data
          })
        }else{
          wx.showToast({
            title: '未查询到此记录',
            icon:'none',
            duration:2000
          })
        }
      

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
    this.getInfoList(options.id)
    this.dictData('dict_assets_type', 'type')
    this.dictData('dict_dept', 'dept')
    this.dictData('dict_user', 'user')
    this.dictData('dict_assets_info_status', 'states')
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