// pages/upload/index.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowWidth: null,
    windowHeight: null,
    totalCount: 74,
    selectCount: 10,
    tempFilePaths: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      windowWidth: app.globalData.windowWidth,
      windowHeight: app.globalData.windowHeight,
    })
    wx.setNavigationBarTitle({ title: '上传照片 | 智能排版' });
  },
  add: function () {
    var _this = this;
    var arrs = [];
    arrs = this.data.tempFilePaths;
    wx.chooseImage({
      count: 9,
      sizeType: ['original'],
      sourceType: ['album'],
      success: function (res) {
        arrs = arrs.concat(res.tempFilePaths);
        _this.setData({
          tempFilePaths: arrs,
        })
      }
    })
  },
  delPic: function(e) {
    var index = e.currentTarget.dataset.index;
    console.log(index);
    var imgArr = this.data.tempFilePaths;
    imgArr.splice(index,1);
    this.setData({
      tempFilePaths: imgArr
    })
  },
  next: function() {
    wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})