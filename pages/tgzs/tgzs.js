//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    zsid: '',
    diamond: 0,
    gold: 0,
    zsDesc: '',
  },
  //事件处理函数
  onLoad: function() {},
  onInputZsid: function(e) {
    this.data.zsid = e.detail.value;
  },
  onInputDiamond: function(e) {
    if (e.detail.value.length > 0) {
      this.data.diamond = e.detail.value;
    } else {
      this.data.diamond = 0;
    }
  },
  onInputGold: function(e) {
    if (e.detail.value.length > 0) {
      this.data.gold = e.detail.value;
    } else {
      this.data.gold = 0;
    }
  },
  onInputZsDesc: function(e) {
    this.data.ZsDesc = e.detail.value;
  },
  onButtonRegister: function(e) {
    if (this.data.zsid == '') {
      wx.showToast({
        title: 'ID不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }
    var diamond = parseInt(this.data.diamond);
    if (isNaN(diamond)) {
      wx.showToast({
        title: '数量不对',
        icon: 'none',
        duration: 2000
      })
      return
    }
    var gold = parseInt(this.data.gold);
    if (isNaN(gold)) {
      wx.showToast({
        title: '数量不对',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (diamond > app.globalData.userInfo.diamond) {
      wx.showToast({
        title: '您的钻石数量不足',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (gold > app.globalData.userInfo.gold) {
      wx.showToast({
        title: '您的银子数量不足',
        icon: 'none',
        duration: 2000
      })
      return
    }
    // 检查ID如果没有wx_则加上
    var zsid = this.data.zsid;
    if (zsid.indexOf("wx_") == -1) {
      zsid = "wx_" + this.data.zsid;
    }
    // 提交申请请求到服务器
    var cookie = wx.getStorageSync('cookieKey');
    var header = {};
    if (cookie) {
      header.Cookie = cookie;
    }
    wx.request({
      url: 'https://www.yunpai8.cn/ldyx/xcx/ldyxTg/kt_zs.php',
      header: header,
      data: {
        salerid: app.globalData.userInfo.salerid,
        zsid: zsid,
        subid: this.data.zsid,
        diamond: this.data.diamond,
        gold: this.data.gold,
        zsDesc: this.data.zsDesc
      },
      success: res => {
        console.log(res.data)
        if (res.data.code == 0) {
          wx.showModal({
            title: '提示',
            content: '赠送成功!',
            showCancel: false
          })
          app.globalData.userInfo.diamond -= this.data.diamond;
          app.globalData.userInfo.gold -= this.data.gold;
        } else if (res.data.dbret == -1) {
          wx.showModal({
            title: '提示',
            content: '赠送失败,ID错误!',
            showCancel: false
          })
        } else if (res.data.dbret == -2) {
          wx.showModal({
            title: '提示',
            content: '您的钻石或者银子不足!',
            showCancel: false
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '赠送失败,请稍后再试!',
            showCancel: false
          })
        }
      }
    })
  }
})