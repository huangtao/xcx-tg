//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    userid: '',
    realname: '',
    mobile: '',
    reward: 0.6,
    wxid: '',
    superID: '',
    tgDesc: '',
  },
  //事件处理函数
  onLoad: function () { },
  onInputUserid: function (e) {
    this.data.userid = e.detail.value;
  },
  onInputName: function (e) {
    this.data.realname = e.detail.value;
  },
  onInputMobile: function (e) {
    this.data.mobile = e.detail.value;
  },
  onInputReward: function (e) {
    if (e.detail.value >= 0.8 || e.detail.value < 0) {
      wx.showToast({
        title: '无效的激励比例',
      });
      this.setData({
        reward: 0.6
      });
    } else {
      this.data.reward = e.detail.value;
    }
  },
  onInputTgDesc: function (e) {
    this.data.tgDesc = e.detail.value;
  },
  onButtonRegister: function (e) {
    if (this.data.userid == '') {
      wx.showToast({
        title: 'ID不能为空',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    if (this.data.realname == '') {
      wx.showToast({
        title: '姓名不能为空',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    if (this.data.mobile == '') {
      wx.showToast({
        title: '手机号码不能为空',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    // 检查ID如果没有wx_则加上
    var userid = this.data.userid;
    if (userid.indexOf("wx_") == -1) {
      userid = "wx_" + this.data.userid;
    }
    // 提交申请请求到服务器
    var cookie = wx.getStorageSync('cookieKey');
    var header = {};
    if (cookie) {
      header.Cookie = cookie;
    }
    wx.request({
      url: 'https://www.yunpai8.cn/ldyx/xcx/ldyxTg/kt_tgy.php',
      header: header,
      data: {
        userid: userid,
        realname: this.data.realname,
        mobile: this.data.mobile,
        superid: app.globalData.userInfo.salerid,
        tgDesc: this.data.tgDesc
      },
      success: res => {
        console.log(res.data);
        if (res.data.code == 0) {
          wx.showModal({
            title: '提示',
            content: '开通成功!',
            showCancel: false
          });
        } else if (res.data.code == -6) {
          // 数据库成功,但是逻辑不对
          if (res.data.dbret == -1) {
            // 没有上级ID
            wx.showModal({
              title: '提示',
              content: '开通失败,不是有效推广员!',
              showCancel: false
            });
          } else if (res.data.dbret == -2) {
            // 上级ID下级数量已满
            wx.showModal({
              title: '提示',
              content: '开通失败,下级数量已满!',
              showCancel: false
            });
          } else if (res.data.dbret == -3) {
            // 已经是推广员了
            wx.showModal({
              title: '提示',
              content: '已经是推广员了!',
              showCancel: false
            });
          } else if (res.data.dbret == -4) {
            // 上级没有足够的客户数量
            wx.showModal({
              title: '提示',
              content: '开通失败,您没有足够的客户数量!',
              showCancel: false
            });
          } else if (res.data.dbret == -5) {
            wx.showModal({
              title: '提示',
              content: '开通失败,此用户不是您的客户!',
              showCancel: false
            });
          }
        } else {
          // 申请失败
          wx.showModal({
            title: '提示',
            content: '申请递交失败,请稍后再试!',
            showCancel: false
          });
        }
      }
    });
  }
});