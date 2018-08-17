//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    realname: '',
    SID: '',
    mobile: '',
    wxid: '',
    superID: '',
    tgArea: '',
    tgDesc: '',
    hasAgreed: false,
  },
  //事件处理函数
  checkboxChange: function (e) {
    this.setData({
      hasAgreed: !this.data.hasAgreed
    })
  },
  onLoad: function () {
  },
  onInputName: function (e) {
    this.data.realname = e.detail.value;
  },
  onInputSID: function (e) {
    this.data.SID = e.detail.value;
  },
  onInputMobile: function (e) {
    this.data.mobile = e.detail.value;
  },
  onInputWxID: function (e) {
    this.data.wxid = e.detail.value;
  },
  onInputSuperID: function (e) {
    this.data.superID = e.detail.value;
  },
  onInputTgArea: function (e) {
    this.data.tgArea = e.detail.value;
  },
  onInputTgDesc: function (e) {
    this.data.tgDesc = e.detail.value;
  },
  onButtonRegister: function (e) {
    if (this.data.realname == '') {
      wx.showToast({
        title: '姓名不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }
    // if (this.data.SID.length != 18) {
    //   wx.showToast({
    //     title: '身份证号码不对',
    //     icon: 'none',
    //     duration: 2000
    //   })
    //   return
    // }
    if (this.data.mobile == '') {
      wx.showToast({
        title: '手机号码不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (this.data.wxid == '') {
      wx.showToast({
        title: '微信ID不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (this.data.tgArea == '') {
      wx.showToast({
        title: '推广地区不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }
    // 提交申请请求到服务器
    var cookie = wx.getStorageSync('cookieKey');
    var header = {};
    if (cookie) {
      header.Cookie = cookie;
    }
    wx.request({
      url: 'https://www.yunpai8.cn/ldyx/xcx/ldyxTg/register.php',
      header: header,
      data: {
        realname: this.data.realname,
        nickname: app.globalData.userInfo.nickName,
        sid: this.data.SID,
        mobile: this.data.mobile,
        wxid: this.data.wxid,
        superid: this.data.superID,
        tgArea: this.data.tgArea,
        tgDesc: this.data.tgDesc
      },
      success: res => {
        console.log(res.data)
        if (res.data.code == 0) {
          // 申请状态页面
          app.globalData.infoData.text = "推广员资格审核中..."
          wx.navigateTo({
            url: '../info/info'
          })
        } else {
          // 申请失败
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
