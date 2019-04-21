//tgm.js
// 扫码代码参考了https://github.com/demi520/wxapp-qrcode

//获取应用实例
const app = getApp();
var QR = require("../../utils/qrcode.js");

Page({
  data: {
  },
  //事件处理函数
  onLoad: function() {
    // 构造扫码地址
    var redirectUrl = encodeURI("https://www.yunpai8.cn/ldyx/scanDownload.php");
    var tgUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?";
    // 注意是公众号的APPID
    tgUrl += "appid=wxb45d8aa1960d8f93";
    tgUrl += "&redirect_uri=" + redirectUrl;
    // 我们需要获取unionid,使用snsapi_userinfo
    // 只需要openid的snsapi_base即可,不会弹出授权
    // state传salerid
    tgUrl += "&response_type=code&scope=snsapi_userinfo";
    tgUrl += "&state=" + app.globalData.userInfo.salerid + "#wechat_redirect";

    var size = this.setCanvasSize();
    this.createQrCode(tgUrl, "mycanvas", size.w, size.h);
  },
  // 适配不同屏幕大小的canvas
  setCanvasSize: function() {
    var size = {};
    try {
      var res = wx.getSystemInfoSync();
      var scale = 750 / 686; //不同屏幕下canvas的适配比例；设计稿是750宽
      var width = res.windowWidth / scale;
      var height = width; //canvas画布为正方形
      size.w = width;
      size.h = height;
    } catch (e) {
      // Do something when catch error
      console.log("获取设备信息失败" + e);
    }
    return size;
  },
  createQrCode: function (url, canvasId, cavW, cavH) {
    //调用插件中的draw方法，绘制二维码图片
    QR.api.draw(url, canvasId, cavW, cavH, this, null, '/images/ldyx.png');
  }
})