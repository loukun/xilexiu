// pages/template_show/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    controls: true,
    autoplay: false,
    loop: true,
    direction: 90,
    objectFit: 'fill',
    initialTime: 1,
    videoSrc: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.videoContext = wx.createVideoContext('myVideo');
    var name = options.name;
    var apply = options.apply;
    wx.setNavigationBarTitle({ title: name + ' | ' + apply });
  },
  // 全屏播放
  fullScreen: function() {
    this.videoContext.requestFullScreen();
  },
  // 预览图片
  previewImg: function(e) {
    var index = e.target.dataset.index;
    var imgArr = this.data.imgUrls;
    wx.previewImage({
      current: imgArr[index],     //当前图片地址
      urls: imgArr,               //所有要预览的图片的地址集合 数组形式
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // 跳转照片上传页面
  uploadPhoto: function() {
    wx.navigateTo({
      url: '../upload/index'
    })
  }
})