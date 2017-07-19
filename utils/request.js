// 获取快递公司信息

const appKey = '793bedc9caad3188a5e155e12cb6afca';
const baseUrl = 'https://51kuaidi.cxais.com/proxy.php?url=';
function getKuaidi(callback) {
  console.log('获取快递公司信息');
  wx.request({
    url: baseUrl+'http://v.juhe.cn/expressonline/getCarriers.php?key=' + appKey,
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      callback(res.data);
    },
    fail: function (err) {
      console.log('获取快递公司信息失败');
      console.log(err);
      ShowModal(err);
    }
  })
}

// 下单
function placeTheOrder(url,callback) {
  console.log('下单')
  wx.request({
    // 下单的地址，加上传进来的url  
    //url: baseUrl +'http://v.juhe.cn/expressonline/getCarriers.php?' + url,
    url: 'https://51kuaidi.cxais.com/saveOrder.php?' + url,
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      callback(res.data)
    },
    fail: function (err) {
      ShowModal()
    }
  })
}



function ShowModal(err) {
  wx.showModal({
    title: '提示',
    content: '请求失败，请联系客服',
  })
}
module.exports = {
  test: function () {
    console.log('test')
  },
  getKuaidi: getKuaidi,
  placeTheOrder: placeTheOrder
}

