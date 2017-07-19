const lk = require('../../utils/Linkage.js');



Page({

  /**
   * 页面的初始数据
   */
  data: {
    provinces: [],
    cities: [],
    districts: [],



    OneCity: [],
    OneDistricts: [],


    provinces_name: '请选择',
    cities_name: '请选择',
    districts_name: '请选择',




  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取省 市 数据
    var provinces = lk.provinces
    var cities = lk.cities
    var districts = lk.districts

    var that = this
    this.setData({
      provinces: provinces,
      cities: cities,
      districts: districts
    })
    // this.getPos()
  },


  getPos: function () {
    wx.chooseLocation({
      success: function (result) { console.log('result', result) }
    })
  },

  _province: function (e) {
    var provinces = this.data.provinces
    this.separationCitys(provinces[e.detail.value].AreaCode.substr(0, 2))
    this.setData({
      provinces_name: provinces[e.detail.value].Name,
      cities_name: '请选择',
      districts_name: '请选择',
    })
  },
  separationCitys(id) {
    var cities = this.data.cities
    var OneCity = []
    for (var i of cities) {
      if (i.AreaCode.substr(0, 2) == id) {
        OneCity.push(i)
      }
    }
    this.setData({
      OneCity: OneCity
    })
  },
  _city: function (e) {
    var OneCity = this.data.OneCity
    this.separationDistricts(OneCity[e.detail.value].AreaCode.substr(0, 4))
    this.setData({
      cities_name: OneCity[e.detail.value].Name,
      districts_name: '请选择',
    })
  },
  separationDistricts(id) {
    var districts = this.data.districts
    var OneDistricts = []
    for (var i of districts) {
      if (i.AreaCode.substr(0, 4) == id) {
        OneDistricts.push(i)
      }
    }
    this.setData({
      OneDistricts: OneDistricts
    })
  },
  _area: function (e) {
    var OneDistricts = this.data.OneDistricts
    this.setData({
      districts_name: OneDistricts[e.detail.value].Name,
    })
  },
  formSubmit: function (e) {
    var params = e.detail.value
    params.receiver_province_name = this.data.provinces_name
    params.receiver_city_name	 = this.data.cities_name
    params.receiver_district_name = this.data.districts_name
    console.log('params', params)


    if (params.receiver_name == "" || params.receiver_telphone == "" || params.receiver_address == "" ){

      wx.showModal({
        title: '提示',
        content: '请填写完整的信息',
      })
      return
    }


    if (params.receiver_province_name == "请选择" || params.receiver_city_name == "请选择" || params.receiver_district_name == "请选择") {
      wx.showModal({
        title: '提示',
        content: '请选择地区信息，如有疑问请联系客服',
      })
      return
    }
    try {
      wx.setStorageSync('recipient', params)
      wx.navigateTo({
        url: '../order3/order3',
      })
    } catch (e) {
    }


  },
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  }



})