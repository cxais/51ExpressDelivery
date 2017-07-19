const re = require('../../utils/request.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    couriers: [],

    chooseCouriers:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    re.getKuaidi(function (result) {
      console.log('order', result.result)
      that.setData({ couriers: result.result })
    })
  },
  chooseCouriers: function (e) {

    console.log(e.currentTarget.id)
    var couriers = this.data.couriers

    for (var i of couriers) {
      i.choose = false
    }
    couriers[e.currentTarget.id].choose = true

    this.setData({
      couriers: couriers,
      chooseCouriers: couriers[e.currentTarget.id]
    })


  },

  next: function () {

    console.log('chooseCouriers', this.data.chooseCouriers)
    if (this.data.chooseCouriers==''){

      wx.showModal({
        title: '提示',
        content: '请选择快递公司',
      })
      return;

    }
    try {
      wx.setStorageSync('chooseCouriers', this.data.chooseCouriers)

      wx.navigateTo({
        url: '../order1/order1',
      })

    } catch (e) {
    }




  }




})