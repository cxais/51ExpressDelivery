//获取应用实例
var app = getApp()
Page({
  clickContactItem2: function (event) {
    console.log(event);
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },
  item2_order_click: function () {
    wx.navigateTo({
      url: '../orderList/orderList'
    })
  }
})