// pages/inventory_add/inventory_add.js
import request from "../../utils/request"
import config from "../../config/config"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    code: '',
    list: [],
    multiIndex: [0, 0, 0],
    deptPicker: [],
    deptIndex: 0,
    userPicker: [],
    userIndex: 0,
    isNoInventory: false,
    assets: [],  //向服务器传的参数
    labelList: [],
    isDiglog: false
  },
  nameInput(e) {
    let name = e.detail.value
    this.setData({
      name
    })
  },
  codeInput(e) {
    let code = e.detail.value
    this.setData({
      code
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  dictData(dict, data) {
    request._post(config.dictData, {
      dictType: dict
    }, res => {
      console.log(res)
      let picker = []
      res.data.data.forEach(item => {
        picker.push({ dictLabel: item.dictLabel, dictValue: item.dictValue })
      })
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
  getScancode: function () {
    var _this = this;

    if (this.data.isNoInventory) {
      let name = ''
      let code = ''
      let deptId = this.data.deptPicker[this.data.deptIndex].dictValue
      let recordUserId = this.data.userPicker[this.data.userIndex].dictValue
      let params = {}
      if (!this.data.name) {
        wx.showToast({
          title: '请填写盘点名称',
          icon: 'none',
          duration: 2000
        })
        return
      } else {
        name = this.data.name
      }

      if (!this.data.code) {
        wx.showToast({
          title: '请填写盘点编号',
          icon: 'none',
          duration: 2000
        })
        return
      } else {
        code = this.data.code
      }
      params.assets = this.data.assets



      request._post(config.addAssetsSummary, {
        name: name,
        code: code,
        deptId: deptId,
        recordUserId: recordUserId,
        params: params
      }, res => {
        console.log(res)

      }, err => {
        wx.showToast({
          title: '请求失败，请重试',
          icon: 'none',
          duration: 2000
        })
      })

    }


    // 允许从相机和相册扫码
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


  },
  showDialog() {
    this.setData({
      isDiglog: true
    })
  },
  confirm() {
    let labelList = this.data.labelList;
    let assets = this.data.assets
    let checkboxList = this.data.checkboxList
    assets.forEach(item => {
      checkboxList.forEach(checkboxListItem => {
        checkboxListItem.children.forEach(childrenItem => {
          if (item[1] == childrenItem.value) {
            labelList.push(childrenItem.label)
          }
        })
      })
    })
    this.setData({
      labelList,
      isDiglog: false
    })

  },
  getAssetsSummaryByUser() {
    let that = this
    request._post(config.getAssetsSummaryByUser, {}, res => {
      console.log(res)
      if (!res.data.data.length) {
        that.setData({
          isNoInventory: true
        })
        that.dictData('dict_dept', 'dept')
        that.dictData('dict_user', 'user')
        that.getAssetsInfoLevel()
      } else {
        that.setData({
          list: res.data.data
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

  // 选择物资
  getAssetsInfoLevel() {
    request._post(config.getAssetsInfoLevel, {}, res => {
      res.data.data.forEach((items) => {
        items.checked = false;
        items.children.forEach((item) => {
          item.checked = false
          item.parentId = items.value
        })
      })
      console.log(111, res)

      this.setData({
        checkboxList: res.data.data
      })

    }, err => {
      wx.showToast({
        title: '请求失败，请重试',
        icon: 'none',
        duration: 2000
      })
    })
  },
  deptCheckbox(e) {
    let value = e.detail.value
    let index = e.currentTarget.dataset.index
    let checkboxList = this.data.checkboxList
    let assets = this.data.assets
    let arr = []

    checkboxList[index].checked = !checkboxList[index].checked
    if (checkboxList[index].checked == true) {

      checkboxList[index].children.forEach(item => {
        item.checked = true
        arr.push([checkboxList[index].value, item.value])
      })
      assets.push(arr)
    } else {
      checkboxList[index].children.forEach(item => {
        item.checked = false
      })
      if (assets.length <= 1) {
        assets.splice(0, 1)
      } else {
        assets.splice(index, 1)
      }

    }
    this.setData({
      checkboxList,
      assets
    })

    console.log(this.data.assets)

  },
  childrenCheckbox(e) {
    console.log(e)
    let value = e.detail.value
    let parentId = e.currentTarget.dataset.parentid
    let value1 = e.currentTarget.dataset.value
    let assets = this.data.assets
    let checkboxList = this.data.checkboxList

    checkboxList.forEach(items => {
      if (items.value == parentId) {
        items.checked = true
      }
      items.children.forEach((item) => {
        if (item.value == value1) {
          item.checked = !item.checked
          if (item.checked) {
            assets.push([items.value, item.value])
          } else {
            if (assets.length <= 1) {
              assets.splice(0, 1)
            } else {
              assets.forEach((item, i) => {
                if (item.includes(value1)) {
                  assets.splice(i, 1)
                }
              })
            }
          }
        }

      })
    })


    console.log(assets)



    this.setData({
      checkboxList,
      assets
    })
  },
  onLoad: function (options) {
    this.getAssetsSummaryByUser()
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