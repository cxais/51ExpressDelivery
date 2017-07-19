const re = require('../../utils/request.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooseCouriers: '',
    recipient: '',
    sender: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'chooseCouriers',
      success: function (res) {
        console.log(res.data)
        that.setData({ chooseCouriers: res.data })
      }
    })
    wx.getStorage({
      key: 'recipient',
      success: function (res) {
        console.log(res.data)
        that.setData({ recipient: res.data })

      }
    })
    wx.getStorage({
      key: 'sender',
      success: function (res) {
        console.log(res.data)
        that.setData({ sender: res.data })
      }
    })
  },

  com: function (e) {

    var params = this.mergeJsonObject(this.data.recipient, this.data.sender, this.data.chooseCouriers)

    var url =
      // 快递信息
      'openId=' + getApp().globalData.openId.data +
      // 快递信息
      '&carrier_code=' + params.carrier_code +
      // 货物名称
      '&item_name=' + params.item_name +
      // 收件人信息
      '&receiver_address=' + params.receiver_address +
      '&receiver_city_name=' + params.receiver_city_name +
      '&receiver_district_name=' + params.receiver_district_name +
      '&receiver_name=' + params.receiver_name +
      '&receiver_province_name=' + params.receiver_province_name +
      '&receiver_telphone=' + params.receiver_telphone +
      // 发件人信息
      '&sender_address=' + params.sender_address +
      '&sender_district_name=' + params.sender_district_name +
      '&sender_city_name=' + params.sender_city_name +
      '&sender_name=' + params.sender_name +
      '&sender_province_name=' + params.sender_province_name +
      '&sender_telphone=' + params.sender_telphone

    console.log('params', params)
    console.log('url', url)


    wx.showModal({
      title: '注意事项',
      content: '下单后,快递员会在2小时内上门取件,请保持手机开机,如果在快递员联系你之前不想寄了,请在我的寄件订单中及时取消！',
      complete: function () {
        wx.showLoading({
          title: '下单中',
        })
        re.placeTheOrder(url,function(){
          setTimeout(function () {
            wx.hideLoading();
            wx.showToast({
              title: '下单成功',
              icon: 'success',
              duration: 2000
            });
            wx.navigateBack({
              delta: 4
            })
          }, 2000)
        })
      }
    })
  },
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },


  mergeJsonObject(jsonbject1, jsonbject2, jsonbject3) {
    var resultJsonObject = {};
    for (var attr in jsonbject1) {
      resultJsonObject[attr] = jsonbject1[attr];
    }
    for (var attr in jsonbject2) {
      resultJsonObject[attr] = jsonbject2[attr];
    }
    for (var attr in jsonbject3) {
      resultJsonObject[attr] = jsonbject3[attr];
    }

    return resultJsonObject;
  }



})