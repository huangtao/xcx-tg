//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    realName: '',
    SID: '',
    mobile: '',
    hasAgreed: false,
  },
  //事件处理函数
  checkboxChange: function (e) {
    this.setData({
      hasAgreed: !this.data.hasAgreed
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }
  },
  onInputName: function (e) {
    this.data.realName = e.detail.value;
  },
  onInputSID: function (e) {
    this.data.SID = e.detail.value;
  },
  onInputMobile: function (e) {
    this.data.mobile = e.detail.value;
  },
  onButtonRegister: function (e) {
    if (this.data.realName == '') {
      wx.showToast({
        title: '姓名不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (this.data.SID.length != 18) {
      wx.showToast({
        title: '身份证号码不对',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (this.data.mobile == '') {
      wx.showToast({
        title: '手机号码不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }
    // 提交申请请求到服务器
    wx.request({
      url: 'https://www.yunpai8.cn/ldyx/xcx/ldyxTg/register.php',
      header: app.globalData.header,
      data: {
        realname: this.data.realname,
        sid: this.data.SID,
        mobile: this.data.mobile
      },
      success: res => {
        console.log(res.data)
        if (res.data.code == 0) {
          // 申请状态页面
          wx.navigateTo({
            url: '../register/register'
          })
        } else {
          // 递交错误
          wx.showModal({
            title: '提示',
            content: '申请递交失败,请稍后再试!',
            showCancel: false
          })
        }
      }
    })
  }
})
