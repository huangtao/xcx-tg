//main.js
//获取应用实例
const app = getApp()

Page({
  data: {
    cash: 0.00,
    superid: '',
    routers: [
      {
        name: '推广码',
        url: '/pages/tgm/tgm',
        icon: 'iconfont icon-qrcode'
      },
      {
        name: '客户',
        url: '/pages/customer/customer',
        icon: 'iconfont icon-nav_promoter'
      },
      {
        name: '游戏充值',
        url: '',
        icon: 'iconfont icon-48'
      },
      {
        name: '提现记录',
        url: '',
        icon: 'iconfont icon-jizhangben'
      }
    ]
  },
  //事件处理函数
  onLoad: function () {
    this.setData({
      cash: app.globalData.userInfo.cash
    })
  },
  onButtonCode: function (e) {
    wx.navigateTo({
      url: '../tgm/tgm'
    })
  },
  onButtonCustomer: function (e) {
    wx.navigateTo({
      url: '../customer/customer'
    })
  },
  onButtonCZ: function (e) {

  },
  onButtonTX: function (e) {
    // if (this.data.cash < 10) {
    //   // 10元以下不能提现
    //   wx.showToast({
    //     title: '超过10元才能提现!',
    //     icon: 'none',
    //     duration: 3000
    //   })
    //   return
    // }
    // 发送提现请求
    var cookie = wx.getStorageSync('cookieKey');
    var header = {};
    if (cookie) {
      header.Cookie = cookie;
    }
    wx.request({
      url: 'https://www.yunpai8.cn/ldyx/xcx/ldyxTg/reqtx.php',
      header: header,
      data: {
        cash: this.data.cash
      },
      success: res => {
        console.log(res.data);
        if (res.data.code == 0) {
          wx.showToast({
            title: '申请提现成功，审核中...',
            icon: 'none',
            duration: 3000
          })
          this.setData({
            cash: 0
          });
        } else {
          wx.showToast({
            title: '申请提现失败!',
            icon: 'none',
            duration: 3000
          })
        }
      }
    })
  }
})
