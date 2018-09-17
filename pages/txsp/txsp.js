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
      url: 'https://www.yunpai8.cn/ldyx/xcx/ldyxTg/txsplist.php',
      header: header,
      success: res => {
        console.log(res.data);
        if (res.data.code == 0) {
          this.setData({
            orders: res.data.list
          });
        }
      }
    })
  },
  // 同意提现操作,请求后台支付到用户钱包
  onButtonPayCash: function (e) {
    // 发送支付请求
    var id = e.currentTarget.dataset.orderId;
    var salerid = e.currentTarget.dataset.orderSalerid;
    var cash = e.currentTarget.dataset.orderCash;
    var cookie = wx.getStorageSync('cookieKey');
    var header = {};
    if (cookie) {
      header.Cookie = cookie;
    }
    wx.request({
      url: 'https://www.yunpai8.cn/ldyx/xcx/ldyxTg/payCash.php',
      header: header,
      data: {
        id: id,
        salerid: salerid,
        cash: cash
      },
      success: res => {
        console.log(res.data);
        if (res.data.code == 0) {
          wx.showToast({
            title: '支付成功!',
            icon: 'none',
            duration: 3000
          })
          // 删除列表数据
          for (var i = 0;  i < this.data.orders.length; i++ ) {
            if (this.data.orders[i].id == res.data.id) {
              this.data.orders.splice(i, 1);
              break;
            }
          }
          this.setData({
            orders: this.data.orders
          });
        } else {
          wx.showToast({
            title: '支付失败:'+res.data.errMsg,
            icon: 'none',
            duration: 3000
          })
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
