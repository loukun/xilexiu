//app.js
App({
  onLaunch: function () {
    var that = this;
    // 打开调试
    wx.setEnableDebug({
      enableDebug: true
    })
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // wx.getLocation({
    //   type: 'wgs84',
    //   success: function (res) {
    //     that.globalData.address1 = res.latitude;
    //     that.globalData.address2 = res.longitude;
    //   }
    // })
    wx.getSystemInfo({
      success: function (res) {
        that.globalData.windowWidth = res.windowWidth;
        that.globalData.windowHeight = res.windowHeight;
      }
    })
  },
  requestData: function (url, params, callback) {
    wx.showToast({
      title: '数据加载中!',
      duration: 2000
    })
    wx.request({
      url: url,
      data: params,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: { 'Content-Type': 'application/json' }, // 设置请求的 header
      success: function (res) {
        callback(null, res.data);
        wx.hideToast()
      },
      fail: function (e) {
        wx.hideToast()
        callback(e)
      }
    })
  },
  globalData: {
    userInfo: null,
    windowWidth: null,
    windowHeight: null,
    address1: 'ddd',
    address2: '',
  },
})