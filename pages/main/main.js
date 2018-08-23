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

  }
})
