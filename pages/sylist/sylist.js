//customer.js
const util = require('../../utils/util.js')

Page({
  data: {
    motto: '正在请求数据...',
    mxlist: [],
    winWidth: 0,
    winHeight: 0,
    selDate: util.formatDate(new Date())
  },
  onLoad: function() {
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
  bindDateChange: function(e) {
    this.setData({
      selDate: e.detail.value
    })
    this.getMyData(this.data.currentTab);
  },
  getMyData: function(lx) {
    // 提交申请请求到服务器
    var cookie = wx.getStorageSync('cookieKey');
    var header = {};
    if (cookie) {
      header.Cookie = cookie;
    }
    wx.request({
      url: 'https://www.yunpai8.cn/ldyx/xcx/ldyxTg/sylist.php',
      header: header,
      data: {
        leixin: lx,
        date: this.data.selDate
      },
      success: res => {
        //console.log(res.data);
        if (res.data.code == 0) {
          // 日期不需要秒,生成描述
          for (var i = 0; i < res.data.list.length; i++) {
            var dbdata = res.data.list[i].date.date;
            var pos = dbdata.indexOf(".");
            if (pos != -1) {
              res.data.list[i].date = dbdata.substring(0, pos);
            }
            var userid = res.data.list[i].id;
            pos = userid.indexOf("wx_");
            if (pos != -1) {
              userid = res.data.list[i].id.substring(pos+3);
            }
            if (res.data.list[i].type == "player") {
              res.data.list[i].desc = res.data.list[i].nickname + "(" + userid + ")充值" + res.data.list[i].PayPrice + "元";
            } else {
              res.data.list[i].desc = res.data.list[i].nickname + "(" + userid + ")下级推广奖励";
            }
          }
          // 按日期排序
          res.data.list.sort((a, b) => {
            var arr_a = a.date.split(" ");
            var strDate_a = arr_a[0].split("-");
            var strTime_a = arr_a[1].split(":");
            var arr_b = b.date.split(" ");
            var strDate_b = arr_b[0].split("-");
            var strTime_b = arr_b[1].split(":");

            var da = new Date(strDate_a[0], (strDate_a[1]-parseInt(1)), strDate_a[2], strTime_a[0], strTime_a[1], strTime_a[2]);
            var db = new Date(strDate_b[0], (strDate_b[1] - parseInt(1)), strDate_b[2], strTime_b[0], strTime_b[1], strTime_b[2]);
            var tma = da.getTime();
            var tmb = db.getTime();
            return tma > tmb;
          });
          res.data.list.reverse();
          this.setData({
            mxlist: res.data.list
          });
        }
      }
    })
  },
  bindChange: function(e) {
    this.setData({
      currentTab: e.detail.current
    });
  },
  switchNav: function(e) {
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