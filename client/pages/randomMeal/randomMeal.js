// pages/randomMeal/randomMeal.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    logged: false,
    budget: "",
    ifShowBudget: false,
    ifShowRecharge: true,
    budgetAnimationData: {},
    inputBudgetAnimationData: {},
    chooseState: true,
    likeAnimation: {},
    dislikeAnimation: {},
    superDislikeAnimation: {},
    superLikeAnimation: {},
    items: [
      { value: '外卖' },
      { value: '打包' },
      { value: '正在营业' },
      { value: '一键下单' }
    ],
    ifHiddenMenu: true,
    menuAnimation: {},
    menuBackAnimation: {},
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
  // 用户登录示例
  login: function () {
    if (this.data.logged) return
    var that = this

    // 调用登录接口
    qcloud.login({
      success(result) {
        if (result) {
          getApp().globalData.userInfo = result
          getApp().globalData.logged = true
          that.setData({
            userInfo: result,
            logged: true
          })
          wx.setStorage({
            key: "userInfo",
            data: result
          })
        } else {
          // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
          qcloud.request({
            url: config.service.requestUrl,
            login: true,
            success(result) {
              getApp().globalData.userInfo = result.data.data
              getApp().globalData.logged = true
              that.setData({
                userInfo: result.data.data,
                logged: true
              })
              wx.setStorage({
                key: "userInfo",
                data: result.data.data
              })
            },

            fail(error) {
              util.showModel('请求失败', error)
              console.log('request fail', error)
            }
          })
        }
      },

      fail(error) {
        util.showModel('登录失败', error)
        console.log('登录失败', error)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try {
      var value = wx.getStorageSync('userInfo')
      if (value) {
        console.log("获取用户信息成功")
        // Do something with return value
        getApp().globalData.userInfo = value
        getApp().globalData.logged = true
        this.setData({
          userInfo: value,
          logged: true
        })
      } else {
        console.log("无用户信息")
        this.login()
      }
    } catch (e) {
      // Do something when catch error
    }

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
   * 输入预算
   */
  inputBudget: function (e) {
    var budget = e.detail.value
    budget = parseInt(budget)
    this.setData({
      budget
    })
  },
  /**
   * 确认预算，隐藏预算画面，显示选择画面
   */
  comfirmBudget: function () {
    var budget = this.data.budget
    //空判断
    if (budget == 0 || budget == null || budget == "") {
      wx.showToast({
        title: '请输入预算',
        icon: '',
        image: '../../images/mark.png',
        duration: 2000,
        mask: true,
      })
    } else if (budget == 1) {
      wx.showModal({
        title: 'emmm',
        content: '要不来根棒棒糖？',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      this.showBudget()
      this.hiddenInputBudget()
    }
  },
  /**
   * 动画1
   */
  showBudget: function () {
    var ifShowBudget = true
    this.setData({
      ifShowBudget
    })
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    animation.opacity(1).step()
    this.setData({
      budgetAnimationData: animation.export()
    })
  },
  /**
   * 动画2
   */
  hiddenInputBudget: function () {
    var that = this
    var ifShowRecharge = false
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    animation.translate(200, 200).rotate(45).scale(0, 0).step()
    this.setData({
      inputBudgetAnimationData: animation.export()
    })
    setTimeout(function () {
      that.setData({
        ifShowRecharge
      })
    }, 1000)
  },
  like: function (e) {
    var src = e.currentTarget.dataset.src
    if (src == 'like') {
      console.log('like')
    } else {
      console.log('superlike')
    }
    var chooseState = this.data.chooseState
    if (chooseState) {
      var animation1 = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease',
        transformOrigin: '100% 100%',
      })
      animation1.scale(0, 0).step()
      var animation2 = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease',
        transformOrigin: '0 100%',
      })
      animation2.scale(1, 1).step()
      this.setData({
        chooseAnimation1: animation1.export(),
        chooseAnimation2: animation2.export(),
        chooseState: !chooseState
      })
    } else {
      var animation1 = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease',
        transformOrigin: '0 100%',
      })
      animation1.scale(1, 1).step()
      var animation2 = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease',
        transformOrigin: '100% 100%',
      })
      animation2.scale(0, 0).step()
      this.setData({
        chooseAnimation1: animation1.export(),
        chooseAnimation2: animation2.export(),
        chooseState: !chooseState
      })
    }

  },
  dislike: function (e) {
    var src = e.currentTarget.dataset.src
    if (src == 'dislike') {
      console.log('dislike')
    } else {
      console.log('superDislike')
    }
    var chooseState = this.data.chooseState
    if (chooseState) {
      var animation1 = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease',
        transformOrigin: '0 100%',
      })
      animation1.scale(0, 0).step()
      var animation2 = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease',
        transformOrigin: '100% 100%',
      })
      animation2.scale(1, 1).step()
      this.setData({
        chooseAnimation1: animation1.export(),
        chooseAnimation2: animation2.export(),
        chooseState: !chooseState
      })
    } else {
      console.log(1213)
      var animation1 = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease',
        transformOrigin: '100% 100%',
      })
      animation1.scale(1, 1).step()
      var animation2 = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease',
        transformOrigin: '0 100%',
      })
      animation2.scale(0, 0).step()
      this.setData({
        chooseAnimation1: animation1.export(),
        chooseAnimation2: animation2.export(),
        chooseState: !chooseState
      })
    }

  },
  beChoosedStart: function (e) {
    var src = e.currentTarget.dataset.src
    var animation3 = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
      transformOrigin: '50% 50%'
    })
    this.animation3 = animation3
    animation3.scale(1.2, 1.2).step()
    if (src == 'like') {
      this.setData({

        likeAnimation: animation3.export(),
      })
    } else if (src == 'dislike') {
      this.setData({

        dislikeAnimation: animation3.export(),
      })
    } else if (src == 'superLike') {
      this.setData({
        superLikeAnimation: animation3.export(),
      })
    } else if (src == 'superDislike') {
      this.setData({
        superDislikeAnimation: animation3.export(),
      })
    }
  },
  beChoosedEnd: function (e) {
    var src = e.currentTarget.dataset.src
    var that = this
    setTimeout(function () {
      this.animation3.scale(0.8, 0.8).step({ duration: 300 })
      this.animation3.scale(1, 1).step({ duration: 300 })
      if (src == 'like') {
        this.setData({
          likeAnimation: that.animation3.export(),
        })
      } else if (src == 'dislike') {
        this.setData({
          dislikeAnimation: that.animation3.export(),
        })
      } else if (src == 'superLike') {
        this.setData({
          superLikeAnimation: that.animation3.export(),
        })
      } else if (src == 'superDislike') {
        this.setData({
          superDislikeAnimation: that.animation3.export(),
        })
      }
    }.bind(this), 300)
  },
  showMenu: function () {

    var menuAnimation = wx.createAnimation({
      duration: 10,
      transformOrigin: '50% 100% 0'
    })
    var menuBackAnimation = wx.createAnimation({
      duration: 10,
    })
    menuAnimation.opacity(0).scaleY(0).step()
    menuBackAnimation.opacity(0).step()

    this.setData({
      menuAnimation: menuAnimation.export(),
      menuBackAnimation: menuBackAnimation.export()
    })
    setTimeout(function () {
      this.setData({
        ifHiddenMenu: false
      })
      setTimeout(function () {
        menuAnimation.opacity(1).scaleY(1).step({ duration: 300, transformOrigin: '50% 100% 0' })
        menuBackAnimation.opacity(0.5).step({ duration: 300, })
        this.setData({
          menuAnimation: menuAnimation.export(),
          menuBackAnimation: menuBackAnimation.export()
        })
      }.bind(this), 50)

    }.bind(this), 10)
  },
  hiddenMenu: function () {
    var menuAnimation = wx.createAnimation({
      duration: 300,
      transformOrigin: '50% 100% 0'
    })
    var menuBackAnimation = wx.createAnimation({
      duration: 300,
    })
    menuAnimation.opacity(0).scaleY(0).step()
    menuBackAnimation.opacity(0).step()

    this.setData({
      menuAnimation: menuAnimation.export(),
      menuBackAnimation: menuBackAnimation.export()
    })
    setTimeout(function () {
      this.setData({
        ifHiddenMenu: true
      })
    }.bind(this), 300)
  }
})