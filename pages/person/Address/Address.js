var network = require("../../../utils/untils.js");
var url = 'https://dev.unionglasses.com/'

Page({
  data: {
    goodList:[],
  },
  onLoad: function (options) {
    var that = this
    var Url = url + 'api/Address/lists';
    var params = {}
    network.POST(Url, params,
      {
        success: function (res) {
          if (res.statusCode == 200){
           
              that.setData({
                goodList: res.data.address
              })
              
            }else{
              wx.showToast({
                title: '网络错误',
              })
            }
        },
        fail: function (res) {
          wx.showToast({
            title: '网络错误',
          })
        },
      })
  },
  edit:function(e){
    var index = e.target.dataset.index;
    var name = this.data.goodList[index]; 
    name = JSON.stringify(name); 
    wx.navigateTo({
      url: '../Address/edit/edit?addrIfo=' + name, 
    })
  },
  del:function (e) {
    var that = this
    let deldeid = e.currentTarget.dataset.id;
    console.log(deldeid)
    let goodList = that.data.goodList;
    let newallData = [];
    for (var i in goodList) {
      var item = goodList[i];
      if (item.id != deldeid) {
        newallData.push(item);
      }
    }
    console.log(newallData)
      wx.showModal({
        title: '提示',
        content: '确定要删除吗？',
        success: function (sm) {
          if (sm.confirm) {
            // var ids = nums.id
            var Urls = url + 'api/Address/del';
            var params = {}
            params.id = deldeid;
            network.POST(Urls, params,
              {
                success: function (res) {
                  if (res.data._c == 0){
                    wx.showToast({
                      title: '删除成功',
                    })
                    that.setData({
                      goodList: newallData
                    });
                  }else{
                    wx.showToast({
                      title: res.data._m,
                    })
                  }
                },
                fail: function (res) {
                  wx.showToast({
                    title: '网络错误',
                  })
                },
              })
            } else if (sm.cancel) {
              console.log('用户点击取消')
              onLoad()
            }
        }
      })
  },
  onReady: function () {
  },
  bindViewTab: function () {
    wx.navigateTo({
      url: "add/add"
    })
  },
  radioChange: function (e) {
    var that = this
    var goodList = that.data.goodList
    var index = e.detail.value;
    var nums = goodList[index];
    var ids = nums.id
    console.log(ids)
    for (var i in goodList) {
      var item = goodList[i];
      if (item.id != ids) {
        item.is_default = 2;
      } else {
        item.is_default = 1;
      }
    }
    var Urls = url + 'api/Address/setDefAdd';
    var params = {}
    params.id = ids
    network.POST(Urls, params,
      {
        success: function (res) {
          if (res.statusCode == 200 && res.data._c == 0) {
            wx.showToast({
              title: '设置成功',
            })
          } else {
            wx.showToast({
              title: '网络错误',
            })
          }
        },
        fail: function (res) {
          wx.showToast({
            title: '网络错误',
          })
        },
      })

  },
})