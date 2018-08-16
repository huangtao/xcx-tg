//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        if (res.code) {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          wx.request({
            url: 'https://www.yunpai8.cn/ldyx/xcx/ldyxTg/login.php',
            data: {
              code: res.code
            },
            success: res => {
              console.log(res.data)
              if (res.data.sessionid) {
                this.globalData.header.Cookie = res.data.sessionid;
              }
              if (res.data.code == 0) {
                this.globalData.userInfo.cash = res.data.cash;
                this.globalData.userInfo.superid = res.data.superid;
                // 已经取到推广员信息,跳转到主页
                wx.navigateTo({
                  url: '../main/main'
                })
              } else if (res.data.code == -6) {
                if (res.data.dbret == -1) {
                  // 不是推广员
                  wx.navigateTo({
                    url: '../register/register'
                  })
                } else if (res.data.dbret == -2) {
                  wx.showToast({
                    title: '账号已冻结',
                    icon: 'none',
                    duration: 2000
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
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    header: {
      'Cookie': ''
    }
  }
})