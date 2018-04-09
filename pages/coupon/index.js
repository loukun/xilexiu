// pages/coupon/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0, //预设当前项的值
    currentTabIdx: 0,
    scrollLeft: 0, //tab标题的滚动条位置
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  switchTab: function (e) {
    this.setData({
      currentTabIdx: e.detail.current
    })
  }
})