// pages/order_details/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: {
      order_id: 12345678,
      cover_src:'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      subject: '萌宝',
      technics: '书籍胶装',
      paper: '高级铜版',
      paper_number: '34.00',
      qty: 1,
      preferential: '0.00',
      coupon: '0.00',
      balance: '0.00',
      total: '57.00',
      logistics_status: '未发货',
      logistics_name: '中通快递',
      logistics_code: '',
      consignee_name: '张三',
      consignee_phone: '15122222222',
      consignee_address: '辽宁省大连市高新区火炬路7号',
      created_at: '2018-1-1 09:00:00',
      pay_time: '2018-1-1 09:00:00',
      },
    status_name: '正在印刷',
    color: '#09BB07'
      
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '订单详情' });
  },
})