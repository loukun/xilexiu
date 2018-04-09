// pages/home/index.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}, // 用户登录信息
    coverShow: 'auto',
    videoShow: 'none',
    showCenter: false,
    autoplay: false,
    loop: true,
    direction: 90,
    objectFit: 'cover',
    initialTime: 0,
    videoSrc: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    this.videoContext = wx.createVideoContext('myVideo');
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
          })
        }
      })
    }
  },
  // 播放视频全屏并隐藏封面
  play: function() {
    this.setData({
      coverShow: 'none',
      videoShow: 'auto'
    })
    this.videoContext = wx.createVideoContext('myVideo');
    this.videoContext.play();
    this.videoContext.requestFullScreen();
  },
  // 退出全屏暂停播放
  screenChange: function(e) {
    if(!e.detail.fullScreen) {
      this.videoContext.pause();
    }
  },
  // 全屏播放
  fullScreen: function () {
    this.videoContext.requestFullScreen();
  },
  // 了解喜乐秀
  understand: function() {
    wx.navigateTo({
      url: '../record/index'
    })
  },
  // 立即制作
  make: function() {
    wx.navigateTo({
      url: '../templet/index'
    })
  },
  // 我的账户
  account: function() {
    wx.navigateTo({
      url: '../account/index'
    })
  }
})