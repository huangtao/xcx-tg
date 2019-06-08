//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    realname: '',
    mobile: '',
    wxid: '',
    superID: '',
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
  onInputMobile: function (e) {
    this.data.mobile = e.detail.value;
  },
  onInputSuperID: function (e) {
    this.data.superID = e.detail.value;
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
    if (this.data.mobile == '') {
      wx.showToast({
        title: '手机号码不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (this.data.superID == '') {
      wx.showToast({
        title: '上级不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }
    // if (this.data.wxid == '') {
    //   wx.showToast({
    //     title: '微信ID不能为空',
    //     icon: 'none',
    //     duration: 2000
    //   })
    //   return
    // }
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
        mobile: this.data.mobile,
        superid: this.data.superID,
        tgDesc: this.data.tgDesc
      },
      success: res => {
        console.log(res.data)
        if (res.data.code == 0) {
          // 申请状态页面
          app.globalData.infoData.text = "推广员资格审核中..."
          wx.redirectTo({
            url: '../info/info'
          })
        } else if (res.data.code == -3) {
          wx.showModal({
            title: '提示',
            content: '申请失败,真实姓名为空!',
            showCancel: false
          })
        } else if (res.data.code == -4) {
          wx.showModal({
            title: '提示',
            content: '申请失败,上级ID为空!',
            showCancel: false
          })
        } else if (res.data.code == -6) {
          // 数据库成功,但是逻辑不对
          if (res.data.dbret == -1) {
            // 没有上级ID
            wx.showModal({
              title: '提示',
              content: '申请失败,上级不是有效推广员,请核查上级手机号码!',
              showCancel: false
            })
          } else if (res.data.dbret == -2) {
            // 上级ID下级数量已满
            wx.showModal({
              title: '提示',
              content: '申请失败,此上级的下级数量已满!',
              showCancel: false
            })
          } else if (res.data.dbret == -3) {
            // 已经是推广员了
            wx.showModal({
              title: '提示',
              content: '您已经是推广员了!',
              showCancel: false
            })
          }
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
