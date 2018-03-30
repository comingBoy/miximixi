// pages/homePage/homePage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    x: [],
    y: [],
    realX: [],
    realY: [],
    disappearAnimation: [],
    hiddenP: [],
    currentIndex: 0,
    allNum: 0,
    photoList: [],
    disabled: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //初始化数据
    var photoList = [1, 2, 3, 4, 5, 6]
    var allNum = photoList.length
    var currentIndex = 0
    var hiddenP = []
    var x = []
    var y = []
    var realX = []
    var realY = []
    var disabled = []
    for (var index = 0; index < photoList.length; index++) {
      hiddenP.push(false)
      if (index == 0) {
        disabled.push(false)
      } else {
        disabled.push(true)
      }
      x.push(0)
      if (index < 2) {
        y.push(index * 10 - 20)
      } else {
        y.push(0)
      }
    }
    this.setData({
      photoList,
      allNum,
      currentIndex,
      hiddenP,
      x,
      y,
      realX,
      realY,
      disabled,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 移动相册时保存xy轴数据
   */
  move: function (e) {
    var x = e.detail.x
    var y = e.detail.y
    this.setData({
      realX: x,
      realY: y,
    })
  },
  /**
   * 完成移动动作
   */
  moveover: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index
    var currentX = this.data.realX
    var currentY = this.data.realY
    var x = that.data.x
    var y = that.data.y
    var allNum = this.data.allNum
    var currentIndex = this.data.currentIndex
    if (Math.abs(currentX) < 30) {
      //当未超出范围 返回中心点
      x[index] = 0
      y[index] = -20
      this.setData({
        x,
        y,
      })
    } else if (currentX > 30) {
      //当超出有边界,启动动画效果从右侧移除
      //创建动画实例
      var animation = wx.createAnimation({
        transformOrigin: "50% 50%",
        duration: 1000,
        timingFunction: "ease",
        delay: 0
      })
      that.animation = animation
      that.animation.translate(1000, 1000).rotate(90).step()
      var disappearAnimation = []
      disappearAnimation[index] = that.animation.export()
      that.setData({
        disappearAnimation
      })
      if (index < allNum - 3) {
        this.setData({
          ['y[' + (index + 1) + ']']: -20,
          ['y[' + (index + 2) + ']']: -10,
          ['y[' + (index + 3) + ']']: 0,
        })
      } else if (index == allNum - 3) {
        this.setData({
          ['y[' + (index + 1) + ']']: -20,
          ['y[' + (index + 2) + ']']: -10,

        })
      } else if (index == allNum - 2) {
        this.setData({
          ['y[' + (index + 1) + ']']: -20,
        })
      }
      setTimeout(function () {
        var hiddenP = that.data.hiddenP
        var currentIndex = that.data.currentIndex
        currentIndex++
        hiddenP[index] = true
        that.setData({
          hiddenP,
          currentIndex
        })
      }, 1000)

    } else {
      //当超出有边界,启动动画效果从左侧移除
      //创建动画实例
      var animation = wx.createAnimation({
        transformOrigin: "50% 50%",
        duration: 1000,
        timingFunction: "ease",
        delay: 0
      })
      that.animation = animation
      that.animation.translate(-1000, 1000).rotate(-90).step()
      var disappearAnimation = []
      disappearAnimation[index] = that.animation.export()
      that.setData({
        disappearAnimation
      })
      if (index < allNum - 3) {
        this.setData({
          ['y[' + (index + 1) + ']']: -20,
          ['y[' + (index + 2) + ']']: -10,
          ['y[' + (index + 3) + ']']: 0,
        })
      } else if (index == allNum - 3) {
        this.setData({
          ['y[' + (index + 1) + ']']: -20,
          ['y[' + (index + 2) + ']']: -10,

        })
      } else if (index == allNum - 2) {
        this.setData({
          ['y[' + (index + 1) + ']']: -20,
        })
      }
      setTimeout(function () {
        var hiddenP = that.data.hiddenP
        var currentIndex = that.data.currentIndex
        currentIndex++
        hiddenP[index] = true
        that.setData({
          hiddenP,
          currentIndex
        })
      }, 1000)
    }

  },
  moveTo: function (x, y, index) {
    var that = this
    this.animation.translate(x, y).step()
    var disapearAnimation = []
    disapearAnimation[index] = this.animation.export()

    this.setData({
      disapearAnimation
    })
    setTimeout(function () {
      var hiddenP = that.data.hiddenP
      hiddenP[index] = true
      that.setData({
        hiddenP
      })

    }, 1000)

  },
  getStartTouch: function (e) {
    console.log(e)
    var xStart = e.touches[0].pageX
    var yStart = e.touches[0].pageY
    this.setData({
      xStart,
      yStart
    })
  },
  moveTouch: function (e) {
    console.log(e)
    var xEnd = e.touches[0].pageX
    var yEnd = e.touches[0].pageY
    var xStart = this.data.xStart
    var yStart = this.data.yStart
    var x = xEnd - xStart
    var y = yEnd - yStart
    this.setData({
      x,
      y
    })
  }
})