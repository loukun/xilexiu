// pages/picture/index.js
//获取应用实例
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    templates: [
      { imageUrl: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', idx: 0, number: 15, name: '宝贝寄语', apply: '亲子'},
      { imageUrl: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg', idx: 1, number: 60, name: '宝贝成长', apply: '亲子'},
      { imageUrl: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg', idx: 2, number: 40, name: '温馨一刻', apply: '家庭'}
    ],
    reserveImg: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    autoplay: false,
    interval: 5000,
    duration: 500,
    scrollLeft: 0,
    current: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
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
  durationChange: function (e) {
    this.setData({
      current: e.detail.current
    })
  },
  show: function() {
    var templateId = this.data.templates[this.data.current].idx;
    var name = this.data.templates[this.data.current].name;
    var apply = this.data.templates[this.data.current].apply;
    wx.navigateTo({
      url: '../template_show/index?templateId=' + templateId + '&name=' + name + '&apply=' + apply,
    })
  },
  login: function() {
    var _this = this;
    if (_this.data.userInfo) {
      wx.navigateTo({
        url: '../account/index'
      })
    }
    wx.getSetting({
      success: res => {
        //这里打印res 得到authSetting数组里scope 三条相关信息都是true 如果拒绝授权
        if (res.authSetting['scope.userInfo'] == false) {
          wx.showModal({
            title: '警告',
            content: '您点击了拒绝授权,将无法正常显示个人信息,点击确定重新获取授权。',
            success: function (e) {
              wx.openSetting({
                success: function (res) {
                  if (!res.authSetting["scope.userInfo"] || !res.authSetting["scope.userLocation"]) {
                    wx.getUserInfo({
                      success: res => {
                        this.setData({
                          userInfo: res.userInfo,
                          hasUserInfo: true,
                        })
                      }
                    });
                  }
                }
              })
            }
          })
        } else {
          wx.getUserInfo({
            success: res => {
              this.setData({
                userInfo: res.userInfo,
                hasUserInfo: true,
              })
            }
          });
        }
      }
    })
  },
  goHome: function() {
    wx.navigateTo({
      url: '../photo/index'
    })
  }
})