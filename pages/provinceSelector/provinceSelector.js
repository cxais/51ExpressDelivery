// pages/index/index.js
// var local = require('../../utils/location.js');
const lk = require('../../utils/Linkage.js');

Page({
  data: {

    lastProvince: -1,
    // 选择地区显隐
    condition1: true,
    condition2: true,
    condition3: true,
    // 选择picker属性
    country: '中国',
    sheng: '',
    shi: '',
    // 正文
    content: '',
    // ~~~~~~~~~~~~~~~~
    provinces: [],
    cities: [],
    districts: [],
    OneCity: [],
    OneDistricts: [],

    provinces_name:'',
    cities_name:'',
    districts_name:'',

    place:-1

  },
  path: '',
  _province: '',
  _city: '',
  // 改变condition1的状态
  showid1: function (e) {
    this.setData({
      condition1: !this.data.condition1,
      condition2:true,
      condition3:true,
    })
  },
  // 改变condition2的状态
  showid2: function (e) {
    this.setData({
      condition2: !this.data.condition2,
       condition1:true,
      condition3:true,
    })
  },
  // 改变condition3的状态
  showid3: function (e) {
    this.setData({
      condition3: !this.data.condition3,
       condition2:true,
      condition1:true,
    })
  },
  navtosearch: function () {
    if (this.data.place == -1) {
      wx.showModal({
        title: '提示',
        content: '请选择地区',
        success: function (res) {
        }
      })
    } else {
      wx.navigateTo({
        url: '../search/search?place_id=' + this.data.place
      })
    }
  },
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

  },

  // 分享
  onShareAppMessage: function () {
    return {
      title: '本地批发',
      path: '/pages/index/index',
      success: function (res) {
        // 分享成功
      },
    }
  },
  _province: function (e) {
    var provinces = this.data.provinces
    this.separationCitys(provinces[e.currentTarget.id].AreaCode.substr(0, 2))
    this.setData({
      condition1: true,
      condition2: true,
      condition3: true,
      provinces_name:provinces[e.currentTarget.id].Name,
      cities_name:'',
      districts_name:'',
      place:provinces[e.currentTarget.id].AreaCode
    })
  },
  _city: function (e) {
    var OneCity = this.data.OneCity
    this.separationDistricts(OneCity[e.currentTarget.id].AreaCode.substr(0,4))
    this.setData({
      condition1: true,
      condition2: true,
      condition3: true,
      cities_name:OneCity[e.currentTarget.id].Name,
      districts_name:'',
      place:OneCity[e.currentTarget.id].AreaCode
    })
  },
  _area: function (e) {
    console.log('e', e.currentTarget.id)
    var OneDistricts=this.data.OneDistricts
    console.log('OneDistricts',OneDistricts[e.currentTarget.id])
    this.setData({
      condition1: true,
      condition2: true,
      condition3: true,
      districts_name:OneDistricts[e.currentTarget.id].Name,
      place:OneDistricts[e.currentTarget.id].AreaCode
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
    console.log('OneCity', OneCity)
  },
  separationDistricts(id) {
    var districts = this.data.districts
    var OneDistricts = []
    console.log('districts[9]', districts[9])
    for (var i of districts) {
      if (i.AreaCode.substr(0,4) == id) {
        OneDistricts.push(i)
      }
    }
    this.setData({
      OneDistricts: OneDistricts
    })
    console.log('OneDistricts', OneDistricts)
  }
})