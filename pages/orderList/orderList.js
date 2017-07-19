const re = require('../../utils/request.js')
var id, url1, url2, list = [], that, data, listadd;
Page({
  data: {},
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    // this.setData({
    // id:options.id //options.id是上个页面传来的参数 赋值给此js对应的html
    // })
    that = this;//在请求数据时setData使用
    //id = options.id;//options.id为上个页面传来的参数
    // console.log(id)
    url1 = "https://51kuaidi.cxais.com/queryOrder.php?openId=" + getApp().globalData.openId.data +"&pageSize=10&currentPage="+1;
    queryRequest(url1);
  },
  lower: function (e) {
    url2 = "https://51kuaidi.cxais.com/queryOrder.php?openId=" + getApp().globalData.openId.data + "&pageSize=10&currentPage="+parseInt(url1.charAt(str.length - 1))+1;
    getmoreRequest(url2);
  },
  //撤单监听事件
  item22_chedan_click:function(e){
    console.log(e);
    var orderId = e.currentTarget.id;

      wx.showModal({
        title: '注意事项',
        content: '撤单后，不可恢复，每天仅允许一次撤单行为！',
        complete: function () {
          wx.showLoading({
            title: '正在撤单...',
          })
          cancelTheOrder(orderId, function () {
            setTimeout(function () {
              wx.hideLoading()
              wx.showToast({
                title: '撤单成功',
                icon: 'success',
                duration: 2000
              })
            }, 2000)
          })
        }
      })
  }
})

// 撤单
function cancelTheOrder(orderId, callback) {
  console.log('撤单')
  wx.request({
    // 下单的地址，加上传进来的url  
    //url: baseUrl +'http://v.juhe.cn/expressonline/getCarriers.php?' + url,
    url: 'https://51kuaidi.cxais.com/cancelOrder.php?id=' + orderId,
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      callback(res.data);
      wx.navigateBack({
        delta: 1
      })
    },
    fail: function (err) {
      ShowModal()
    }
  })
}

//请求数据
function queryRequest(url) {
  wx.request({
    url: url,
    data: {},
    method: 'GET',
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      // success
      console.log(res.data);
      list = res.data;
      that.setData({
        list: list
      })
    }
  })
}

//下拉加载的请求
function getmoreRequest(url) {
  wx.request({
    url: url,
    data: {},
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      // success
      console.log(res.data);
      listadd = res.data;
      list = list.concat(listadd);
      that.setData({
        list: list
      })
      

    },
    fail: function () {
      // fail
    },
    complete: function () {
      // complete
    }
  })
}

//时间戳转换为时间
function timeString(time) {
  var newDate = new Date();
  newDate.setTime(time);
  // console.log(newDate.toLocaleDateString());
  var result = newDate.toLocaleDateString();
  return result;
}

