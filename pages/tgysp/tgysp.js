//customer.js
const util = require('../../utils/util.js')
const app = getApp()

Page({
  data: {
    motto: '正在请求数据...',
    tgylist: [],
  },
  onLoad: function () {
    var that = this;

    // 提交申请请求到服务器
    var cookie = wx.getStorageSync('cookieKey');
    var header = {};
    if (cookie) {
      header.Cookie = cookie;
    }
    wx.request({
      url: 'https://www.yunpai8.cn/ldyx/xcx/ldyxTg/tgysplist.php',
      header: header,
      success: res => {
        //console.log(res.data);
        if (res.data.code == 0) {
          this.setData({
            tgylist: res.data.list
          });
        }
      }
    })
  },
  // 同意推广员申请
  onButtonAgree: function (e) {
    // 发送支付请求
    var salerid = e.currentTarget.dataset.tgySalerid;
    var cookie = wx.getStorageSync('cookieKey');
    var header = {};
    if (cookie) {
      header.Cookie = cookie;
    }
    wx.request({
      url: 'https://www.yunpai8.cn/ldyx/xcx/ldyxTg/tgyAgree.php',
      header: header,
      data: {
        salerid: salerid
      },
      success: res => {
        console.log(res.data);
        if (res.data.code == 0) {
          wx.showToast({
            title: '审核成功!',
            icon: 'none',
            duration: 3000
          })
          // 删除列表数据
          for (var i = 0;  i < this.data.tgylist.length; i++ ) {
            if (this.data.tgylist[i].salerid == res.data.salerid) {
              this.data.tgylist.splice(i, 1);
              break;
            }
          }
          this.setData({
            tgylist: this.data.tgylist
          });
        } else {
          wx.showToast({
            title: '审核失败!',
            icon: 'none',
            duration: 3000
          })
        }
      }
    })
  }
})
