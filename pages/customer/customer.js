//customer.js
const util = require('../../utils/util.js')

Page({
  data: {
    motto: '正在请求数据...',
    customers: [],
    subs: [],
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
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
    this.getMyData(0);
  },
  getMyData: function (lx) {
    // 提交申请请求到服务器
    var cookie = wx.getStorageSync('cookieKey');
    var header = {};
    if (cookie) {
      header.Cookie = cookie;
    }
    wx.request({
      url: 'https://www.yunpai8.cn/ldyx/xcx/ldyxTg/customer.php',
      header: header,
      data: {
        leixin: lx
      },
      success: res => {
        //console.log(res.data);
        if (res.data.code == 0) {
          if (lx == 0) {
            this.setData({
              customers: res.data.list
            });
          } else if (lx == 1) {
            this.setData({
              subs: res.data.list
            });            
          }
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
    if (this.data.currentTab === e.target.dataset.current)
      return false;
    if (e.target.dataset.current == 1) {
      // 获取下级
      this.getMyData(1);
    }
    this.setData({
      currentTab: e.target.dataset.current
    });
  }
})
