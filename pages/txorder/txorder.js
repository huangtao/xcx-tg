//customer.js
const util = require('../../utils/util.js')

Page({
  data: {
    motto: '正在请求数据...',
    orders: [],
    winWidth: 0,
    winHeight: 0,
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      },
    });

    // 提交申请请求到服务器
    var cookie = wx.getStorageSync('cookieKey');
    var header = {};
    if (cookie) {
      header.Cookie = cookie;
    }
    wx.request({
      url: 'https://www.yunpai8.cn/ldyx/xcx/ldyxTg/txorder.php',
      header: header,
      success: res => {
        //console.log(res.data);
        if (res.data.code == 0) {
          this.setData({
            orders: res.data.list
          });
        }
      }
    })
  },
  bindChange: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
  },
  switchNav: function (e) {
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      this.setData({
        currentTab: e.target.dataset.current
      });
    }
  }
})
