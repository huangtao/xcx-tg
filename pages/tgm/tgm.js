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
    var redirectUrl = "https://www.yunpai8.cn/scanDownload.php";
    var tgUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?";
    tgUrl += "appid=wxc761787fa285b1d3";
    tgUrl += "&redirect_uri=" + redirectUrl;
    tgUrl += "&response_type=code&scope=snsapi_base&state=1#wechat_redirect";

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
    QR.api.draw(url, canvasId, cavW, cavH);
  }
})