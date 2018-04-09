// pages/order_list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [
      { order_id: '123456789', created_at: '2018-03-06 10:25:32', order_type: 0, cover_src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'},
      { order_id: '123456789', created_at: '2018-03-06 10:25:32', order_type: 0, cover_src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'},
      { order_id: '123456789', created_at: '2018-03-06 10:25:32', order_type: 0, cover_src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'},
      { order_id: '123456789', created_at: '2018-03-06 10:25:32', order_type: 0, cover_src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'},
      { order_id: '123456789', created_at: '2018-03-06 10:25:32', order_type: 0, cover_src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '我的订单' });
  },
  // 跳转订单详情画面
  detail: function() {
    wx.navigateTo({
      url: '../order_details/index'
    })
  }
})