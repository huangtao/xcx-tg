//logs.js
const util = require('../../utils/util.js')
//获取应用实例
const app = getApp()

Page({
  data: {
    text: ''
  },
  onLoad: function () {
    this.setData({
      text: app.globalData.infoData.text
    })
  }
})
