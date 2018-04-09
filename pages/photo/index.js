// pages/photo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    allFilePaths: ['http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',],
    left: 200,
    top: 60,
    right: 200,
    bottom: 200,
    out: true,
    inertia: false,
    pointerEvents: 'none',
    imageWidth: 375,
    imageHeight: 380,
    areaWidth: 0,
    areaHeight: 0,
    x: 0,
    y: 0,
    animation: {},
    rotate: 0,
    rotateY: 0,
    imagePath: '',
    smallerCount: 0,
    biggerCount: 0,
    buttonDisplay: 'none'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '照片编辑' });
    this.setData({
      areaWidth: 375,
      areaHeight: 380
    })
  },
  onReady: function(e) {
    var _this = this;
    var context = wx.createCanvasContext();
    context.drawImage(_this.data.tempFilePaths, 20, 20, 250, 140);
    wx.drawCanvas({
      canvasId: 'myCanvas',
      actions: context.getActions()
    })
  },
  // 替换照片来源选择
  changePhoto: function() {
    var _this = this;
    wx.showActionSheet({
      itemList: ['上传照片', '从已上传中选择'],
      itemColor: "#353535",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            _this.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            _this.openSidebar();
          }
        }
      }
    })
  },
  // 从手机相册中替换照片
  chooseWxImage: function (type) {
    var that = this;
    wx.chooseImage({
      count: 20,
      sizeType: ['original'],
      sourceType: [type],
      success: function (res) {
        console.log(res);
        that.setData({
          tempFilePaths: res.tempFilePaths,
        })
      }
    })
  },
  // 从已上传中的图片替换
  chooseUpImage: function (e) {
    var index = e.currentTarget.dataset.index;
    var _this = this;
    _this.closeSidebar();
    this.setData({
      tempFilePaths: _this.data.allFilePaths[index]
    })
  },
  // 照片放大
  bigger: function() {
    this.setData({
      imageWidth: this.data.imageWidth * 1.1,
      imageHeight: this.data.imageHeight * 1.1,
      // x: this.data.x - 50,
      // y: this.data.y - 50,
    })
  },
  // 照片缩小
  smaller: function() {
    this.setData({
      imageWidth: this.data.imageWidth / 1.1,
      imageHeight: this.data.imageHeight / 1.1,
      // x: this.data.x + 50,
      // y: this.data.y + 50,
    })
  },
  // 照片顺时针旋转
  rotate: function() {
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease'
    })
    this.animation = animation
    this.setData({
      rotate: this.data.rotate + 1
    })
    this.animation.rotate(90 * this.data.rotate).step()
    this.setData({
      animationData: this.animation.export(),
    })
  },
  // 照片镜像
  mirrorImage: function() {
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease'
    })
    this.animation = animation
    this.setData({
      rotateY: this.data.rotateY + 1
    })
    this.animation.rotateY(180 * this.data.rotateY).step()
    this.setData({
      animationData: this.animation.export(),
    })
  },
  // 照片适配
  adaptation: function() {

  },
  // 照片保存
  save: function() {
    var _this = this; 
    wx.canvasToTempFilePath({
      x: this.data.left,
      y: this.data.top,
      width: this.data.areaWidth,
      height: this.data.areaHeight,
      destWidth: this.data.areaWidth,
      destHeight: this.data.areaHeight,
      canvasId: 'myCanvas',
      success: function (res) {
        _this.setData({
          tempFilePaths: res.tempFilePath
        })
      }
    })
  },
  // 弹出侧边栏
  openSidebar: function (e) { //点击筛选事件
    wx.setNavigationBarTitle({ title: '替换 | 上传照片' });
    var animation = wx.createAnimation({//创建动画
      duration: 1000,
      timingFunction: 'ease',
      width: 300,
      height: 800,
      top: 0,
      bottom: 0,
      right: 0,
      backgroundColor: '#FFF',
      opcity: 0.5
    })
    this.animation = animation;
    animation.translateX(-100 + 'vh').step() //动画效果向右滑动100vh
    this.setData({
      sidebarData: animation.export(),
      buttonDisplay: 'block'
    })
  },
  // 关闭侧边栏
  closeSidebar: function(e) {
    wx.setNavigationBarTitle({ title: '照片编辑' });
    var animation = wx.createAnimation({//创建动画
      duration: 1000,
      timingFunction: 'ease',
      width: 300,
      height: 800,
      top: 0,
      bottom: 0,
      right: 0,
      backgroundColor: '#FFF',
      opcity: 0.5
    })
    this.animation = animation;
    animation.translateX(100 + 'vh').step() //动画效果向右滑动
    this.setData({
      sidebarData: animation.export(),
      buttonDisplay: 'block'
    })
  },

})