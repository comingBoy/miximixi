//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')
var util = require('./utils/util.js')

App({
  globalData: {
    userInfo: {},
    logged: false,
  },
  onLaunch: function () {
    qcloud.setLoginUrl(config.service.loginUrl)

  },
  
})