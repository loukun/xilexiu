import api from '../../utils/api'
let songUrl = '', name = ''

const recorderManager = wx.getRecorderManager();
const innerAudioContext = wx.createInnerAudioContext()
var tempFilePath;
const options = {
  duration: 10000,//指定录音的时长，单位 ms
  sampleRate: 16000,//采样率
  numberOfChannels: 1,//录音通道数
  encodeBitRate: 96000,//编码码率
  format: 'mp3',//音频格式，有效值 aac/mp3
  frameSize: 50,//指定帧大小，单位 KB
}
Page({
  data: {
    startOrStop: '开始',
    method: 'start',
    style: '',

    ctrl: "音乐控制区域",
    cpTime: '00:00',
    duration: '00:00',
    lrcList: [],
    title: '《我爱你，谢谢你》',
    time: '1分30秒',
    active: true,
  },
  onLoad: function (param) {
    // let id = '418603077'
    // this.getSong(id)
    // this.getLrc(id)
  },
  //开始录音
  start: function() {
    //开始录音
    recorderManager.start(options);
    recorderManager.onStart(() => {
      console.log('recorder start')
    });
    let id = '418603077'
    this.getSong(id)
    this.getLrc(id)
    let that = this
    this.setData({
      startOrStop: '完成录制',
      method: 'stop',
      active: false
    })
    setInterval(() => {
      wx.getBackgroundAudioPlayerState({
        success: (res) => {
          let status = res.status
          let currentPosition = res.currentPosition
          let duration = res.duration
          if (status === 1) {
            console.log(this.data.cpTime + ':' + this.data.duration);
            that.setData({
              ct: currentPosition,
              cpTime: this.formatTime(currentPosition),
              duration: this.formatTime(duration),
              style: 'animation:light1 13.3s linear forwards;'
            })
          }
        }
      })
    }, 1000);
  },
  //停止录音
  stop: function () {
    recorderManager.stop();
    recorderManager.onStop((res) => {
      this.tempFilePath = res.tempFilePath;
    })
    this.setData({
      startOrStop: '开始',
      method: 'start',
      style: ''
    })
  },
  //播放声音
  play: function () {
    innerAudioContext.autoplay = true
    innerAudioContext.src = this.tempFilePath,
      innerAudioContext.onPlay(() => {
        console.log('开始播放')
      })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },
  // 取得音频
  getSong: function (id) {
    let that = this
    wx.request({
      url: api.apiUrl.host + api.apiUrl.song || '',
      method: 'GET',
      data: {
        id: id,
        ids: [id]
      },
      success: (res) => {
        // songUrl = res.data.songs[0].mp3Url
        songUrl = 'http://music.163.com/song/media/outer/url?id=317151.mp3'
        let song_info = res.data.songs[0]
        let album_big = song_info.album.blurPicUrl
        let album_small = song_info.album.picUrl
        name = song_info.name
        let author = song_info.artists[0].name
        that.setData({
          nowPlay: songUrl,
          songAuthor: author,
          songName: name,
          album: album_big
        })
        this.playSong(songUrl, name)
      }
    })
  },
  // 播放音频
  playSong: function (songUrl, name) {
    console.log(songUrl);
    wx.playBackgroundAudio({
      dataUrl: songUrl,
      title: name
    })
  },
  // 获取字幕
  getLrc: function (id) {
    wx.request({
      url: api.apiUrl.host + api.apiUrl.lrc || '',
      method: 'GET',
      data: {
        id: id,
        lv: -1
      },
      success: (res) => {
        this.lrcReq(res)
      }
    })
  },
  // 字幕格式化
  lrcReq: function (res) {
    let strFot = /\[(\d{2}:\d{2})\.\d{2,}\](.*)/
    let that = this
    var outLrc = {}
    var lrcList = []
    let lrc = res.data.lrc.lyric
    console.log(lrc);
    if (!lrc) return
    let lrcArr = lrc.split('\n') || []

    lrcArr.forEach(function (txt) {
      let forLrc = txt.match(strFot)
      if (!forLrc) return

      let lrcTime = forLrc[1]
      let lrcText = forLrc[2] || '(这段明显是间奏！)'
      outLrc[lrcTime] = lrcText
    }, that);

    for (let i in outLrc) {
      let ts = i.split(':')
      let time = parseInt(ts[0]) * 60 + parseInt(ts[1])

      if (lrcList.length) {
        lrcList[lrcList.length - 1].endtime = time;
      }

      lrcList.push({
        time: time,
        lrc: outLrc[i]
      })
    }
    that.setData({
      lrcList: lrcList
    })
    console.log(this.data.lrcList);
  },
  formatTime: (time) => {
    time = Math.floor(time);
    var m = Math.floor(time / 60).toString();
    m = m.length < 2 ? '0' + m : m;
    var s = (time - parseInt(m) * 60).toString();
    s = s.length < 2 ? '0' + s : s;
    return m + ':' + s;
  }
})
