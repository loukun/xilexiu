const app = getApp()
Page({
  data: {
    address1: '',
    address2: '',
    markers: []
  },
  onShow: function() {
    var that = this;
    this.setData({
      address1: app.globalData.address2,
      address2: app.globalData.address1,
      markers: [{
        id: 0
        , iconPath: "../../imgs/ic_position.png"
        , longitude: app.globalData.address2
        , latitude: app.globalData.address1
        , width: 30
        , height: 30
      }]
    })
  }
})