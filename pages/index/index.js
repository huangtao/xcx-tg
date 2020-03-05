//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '正在授权...',
    userInfo: {},
    hasUserInfo: false,
    hasAgreed: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  //事件处理函数
  checkboxChange: function(e) {
    this.setData({
      hasAgreed: !this.data.hasAgreed
    })
  },
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      this.doLogin();
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        this.doLogin();
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          this.doLogin();
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e);
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
    this.doLogin();
  },
  // 开始登录服务器
  doLogin: function() {
    this.setData({
      motto: '获取授权码...',
      hasUserInfo: true
    });
    // 登录
    wx.login({
      success: res => {
        if (res.code) {
          this.setData({
            motto: '登录推广系统...',
            hasUserInfo: true
          });
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          wx.request({
            url: 'https://www.yunpai8.cn/ldyx/xcx/ldyxTg/login.php',
            data: {
              code: res.code,
              //nickname: '😂😂😂'
              nickname: app.globalData.userInfo.nickName
            },
            success: res => {
              //console.log(res);
              console.log(res.data)
              // 保存session
              if (res.header && res.header['Set-Cookie']) {
                wx.setStorage({
                  key: 'cookieKey',
                  data: res.header['Set-Cookie'],
                })
              }
              if (res.data.code == 0) {
                app.globalData.userInfo.salerid = res.data.salerid;
                app.globalData.userInfo.cash = res.data.cash;
                app.globalData.userInfo.superid = res.data.superid;
                app.globalData.userInfo.maxsub = res.data.maxsub;
                app.globalData.userInfo.qx_tgsp = res.data.qx_tgsp;
                app.globalData.userInfo.qx_txsp = res.data.qx_txsp;
                app.globalData.userInfo.diamond = res.data.diamond;
                app.globalData.userInfo.gold = res.data.gold;
                // 已经取到推广员信息,跳转到主页
                wx.redirectTo({
                  url: '../main/main'
                })
              } else if (res.data.code == -6) {
                if (res.data.dbret == -1) {
                  // 不是推广员,提示不能登录
                  // wx.redirectTo({
                  //   url: '../register/register'
                  // })
                  app.globalData.infoData.text = "只有推广员才能登录!"
                  wx.redirectTo({
                    url: '../info/info'
                  })
                } else if (res.data.dbret == -2) {
                  wx.showToast({
                    title: '账号已冻结',
                    icon: 'none',
                    duration: 2000
                  })
                } else if (res.data.dbret == -3) {
                  // 审核中
                  app.globalData.infoData.text = "推广员资格审核中..."
                  wx.redirectTo({
                    url: '../info/info'
                  })
                }
              }
            }
          })
        } else {
          console.log('登录失败!' + res.errMsg)
        }
      }
    })
  }
})