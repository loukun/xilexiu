// pages/account/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topImage: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
    userInfo: {},
    redPackets: 999,
    currentTab: 0, //预设当前项的值
    currentTabIdx: 0,
    scrollLeft: 0, //tab标题的滚动条位置
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '我的账户' });
    this.setData({
      userInfo: app.globalData.userInfo,
    })
  },
  // 订单一览
  myOrder: function() {
    wx.navigateTo({
      url: '../order_list/index'
    })
  },
  // 我的视频
  myVideo: function() {
    wx.navigateTo({
      url: '../video/index'
    })
  },
  // 优惠券
  coupon: function() {
    wx.navigateTo({
      url: '../coupon/index'
    })
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTabIdx == cur) { return false; }
    else {
      this.setData({
        currentTabIdx: cur,
        currentTab: cur
      })
    }
  },
  // 滑动Tab页面切换
  switchTab:function(e) {
    this.setData({
      currentTabIdx: e.detail.current
    })
  }
})