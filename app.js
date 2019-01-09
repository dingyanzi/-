//app.js
App({
    globalData: {
      BaseUrl: "https://tthb.mtyiyuan.cn/",
      userInfo: null,
      session_key: null,
      memberInfo: null
    },
    onLaunch: function (scene) {
      var that = this;
      if (wx.getStorageSync('memberInfo') != "") {
        this.globalData.memberInfo = wx.getStorageSync('memberInfo')
      }
      that.login();
      wx.checkSession({
          success: function(e){
              //console.log("没过期");
          },
          fail: function(){
              //console.log("过期了");
              that.login();
          }
      });

    },
    init: function (code) {
        var that = this;
        that.getOpenId(code);
    },
    login: function () {
        wx.login({
            success: res => {
                var code = res.code;
                console.log(code)
                this.init(code);
            }
        })
    },
    getOpenId: function (code) {
        var that = this;
        wx.request({
            url: that.globalData.BaseUrl + 'app/api/login.json?',
            data: {
                code: code
            },
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                //console.log(JSON.stringify(res))
                if (res.data.flag == 100101) {
                    that.globalData.session_key = res.data.data.session_key;

                }
            },
            fail: function () {
                that.porpMsg("☹ 服务器走丢了,请稍后再试", "none", 2000);
            },
        })
    },
    porpMsg: function (title, icon, duration) {
        wx.showToast({
            title: title,
            icon: icon,
            duration: duration
        })
    }
})