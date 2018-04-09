// pages/order/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qty: 1, // 订单数量
    coupon: 8, //优惠券
    top: 30,
    showDialog: false,
    scrolly: false,
    showCouponFlag: false,
    couponList: [
      { id: 1, price: '8', date: ' 2018年1月1日', checked: 'true' },
      { id: 2, price: '2', date: ' 2018年4月1日' },
      { id: 3, price: '2', date: ' 2018年4月1日' }],
    balance: 9.00,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '下单' });
  },
  // 减少数量
  bindMinus: function() {
    if(this.data.qty > 1) {
      this.setData({
        qty: this.data.qty - 1
      })
    } 
  },
  // 增加数量
  bindPlus: function() {
    if (this.data.qty > 0) {
      this.setData({
        qty: this.data.qty + 1
      })
    } 
  },
  // 地址选择
  chooseAddress: function() {

  },
  // 包邮说明
  illustrate: function() {
    wx.showModal({
      title: '全国包邮',
      content: '新疆、西藏、香港、澳门、台湾等偏远地区除外。',
      showCancel: false
    })
  },
  // 优惠券一览
  couponShow: function() {
    this.setData({
      showDialog: !this.data.showDialog
    });
  },
  // 优惠券选择
  radioChange: function(e) {
    console.log(e.detail.value);
  },
  balanceShow: function(e) {
    this.setData({
      showCouponFlag: !this.data.showCouponFlag
    });
  },
  preventD: function(e) {
    this.setData({
      scrolly: false
    });
  }
})