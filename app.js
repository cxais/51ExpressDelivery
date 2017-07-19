//app.js
globalData: {
  openId:"";
};
App({
  onLaunch: function () {
    var that = this
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.login({
      success: function (loginCode) {
        //调用request请求api转换登录凭证
        wx.request({
          url: 'https://51kuaidi.cxais.com/login.php',
          data: {
            loginCode: loginCode.code
          },
          header: {
            'content-type': 'application/json',
          },
          success: function (res) {
            getApp().globalData.openId=res;
            console.log("login",res) //获取openid
          }
        })
      }
    })
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null
  }
})