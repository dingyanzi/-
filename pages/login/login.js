// pages/login/login.js
var utils = require("../../utils/util")
const app = getApp()
Page({
  data: {
    isDialog: true,
    dialogCnt: "",
    mobile: "",
    code: "",
    codetext: "获取手机验证码",
    isCode: false,
  },
  mobileInput: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  codeInput: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  loginFn: function () {
    let mobile = this.data.mobile
    let verifyCode = this.data.code
    let that = this
    console.log(mobile)
    if (!utils.isPhone(mobile)) {
      this.setData({
        isDialog: false,
        dialogCnt: "手机格式不正确"
      })
      setTimeout(function () { that.setData({ isDialog: true, dialogCnt: "" }) }, 2000)
      return
    }
    let fm = mobile.substring(0, 3)
    if (fm == "170" || fm == "171") {   //虚拟号段
      this.setData({
        isDialog: false,
        dialogCnt: "禁止注册",
        isCode: false
      })
      setTimeout(function () { that.setData({ isDialog: true, dialogCnt: "" }) }, 2000)
      return
    }
    let url = "api/micro/member/login.json";
    app.ajaxLog(url, {
      mobile: mobile,
      verifyCode: verifyCode
    }, function (res) {
      app.globalData.memberInfo = res.data
      wx.setStorage({
        key: "memberInfo",
        data: res.data
      })
      wx.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 2000
      });
      setTimeout(function () {
          wx.switchTab({
              url: '../index/index'
          })
      }, 400)
    },function(){
      console.log("失败")
    })
  },
  getCode: function () {
    this.setData({
      isCode: true
    })
    let mobile = this.data.mobile
    let url = "api/micro/member/getVerifyCode.json"
    let that = this
    if (!utils.isPhone(mobile)) {
      this.setData({
        isDialog: false,
        dialogCnt: "手机格式不正确",
        isCode: false
      })
      setTimeout(function () { that.setData({ isDialog: true, dialogCnt: "" }) }, 2000)
      return
    }
    let fm = mobile.substring(0, 3)
    if (fm == "170" || fm == "171") {
      this.setData({
        isDialog: false,
        dialogCnt: "禁止注册",
        isCode: false
      })
      setTimeout(function () { that.setData({ isDialog: true, dialogCnt: "" }) }, 2000)
      return
    }
    app.ajaxLog(url, {
      mobile: mobile
    }, function (res) {
      let i = 59
      let obj = res.data
      let interval = setInterval(function () {
        that.setData({
          codetext: i + "秒后重新获取",
          isCode: true
        })
        i--
        if (i <= 0) {
          that.setData({
            codetext: "获取手机验证码",
            isCode: false
          })
          clearInterval(interval)
        }
      }, 1000)
    }, function (res) {
      wx.showToast({
        title: res.message,
        icon: 'loading',
        duration: 2500
      })
      that.setData({
        isCode: false
      })
    })
  }
})