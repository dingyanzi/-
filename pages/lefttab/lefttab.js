const util = require('../../utils/util.js');
var app = getApp();
Page({
  data: {
    page:0,
    id:'',
    ids:'',
    ency:'',
    iv:'',
    phoneNumber:'',
    activeIndex: 0,
    searchLoading: false,
    flag:false,
    iflogo:false,
    ifphone:true,
    ifshou:false,
    tabs: [],
    contentList: [],
  },
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: (res) => {
          that.setData({
          deviceWidth: res.windowWidth,
          deviceHeight: res.windowHeight
        });
      }
    });
    that.getTemplateTypeList();
      // 查看是否授权
      wx.getSetting({
          success: function(res){
              if (res.authSetting['scope.userInfo']) {
                  console.log("已授权");
                  wx.getUserInfo({
                      success: function(res) {
                          that.setData({
                              flag:true
                          })
                      }
                  });
              }else {
                  console.log("未授权");
                  that.setData({
                      flag:false
                  })
              }
          }
      });
  },
  onShow:function(){
      var that = this;

  },
  /*模板分类接口*/
  getTemplateTypeList(){
      var that = this;
      wx.request({
          url: app.globalData.BaseUrl+'app/api/getTemplateTypeList.json',
          header: {
              'content-type': 'application/json' ,
              'Cookie': 'JSESSIONID=' + app.globalData.sessionId
          },
          success: function(res) {
              //console.log(JSON.stringify(res))
              if(res.data.flag == 100101){
                  var typeList = res.data.data;
                  var ids = res.data.data[0].id;
                  that.setData({
                      tabs:typeList,
                      id:ids
                  });
                  that.getContent();
              }
          },
          fail: function () {
              app.porpMsg("☹ 服务器走丢了,请稍后再试", "none", 2000);
          },
      })
  },
 /*切换菜单*/
  changeTab: function (e) {
    var that = this;
    this.setData({
      page:0,
      activeIndex: e.currentTarget.dataset.index,
      id: e.currentTarget.dataset.id,
      searchLoading:false,
      contentList:[],
    });
    that.getContent();
  },
 /*模板列表接口*/
  getContent(){
    var that = this;
    var page = that.data.page;
    wx.request({
        url: app.globalData.BaseUrl +'app/api/getTemplateList.json',
        data: {
            templateType:that.data.id,
            pageStart:page,
            pageSize:10
        },
        header: {
            'content-type': 'application/json' ,
            'Cookie': 'JSESSIONID=' + app.globalData.sessionId
        },
        success: function(res) {
            if(res.data.flag == 100101){
                var contentList = that.data.contentList;
                var reqRooms = res.data.data;
                if(reqRooms.length == 0) {
                    wx.showToast({
                        title: "没有更多的数据了...",
                        icon: 'fail',
                        duration: 600
                    });
                    that.setData({
                        searchLoading:false,
                    });
                }else {
                    that.setData({
                        contentList: contentList.concat(reqRooms)
                    })

                }

            }
        },
        fail: function () {
            app.porpMsg("☹ 服务器走丢了,请稍后再试", "none", 2000);
        },
    })
  },
  getMore:function(e){
    var that = this;
    var page = that.data.page;
    that.setData({
        page:++page
    });
    setTimeout(function () {
      that.setData({
          searchLoading:true
      });
        that.getContent()
    }, 1000)
  },
  styleDetail(event){
    var postid = event.currentTarget.dataset.postid;
    var typeid = event.currentTarget.dataset.typeid;
    var index = event.currentTarget.dataset.index;
    wx.navigateTo({
        url: '/pages/detail/detail?id='+postid+'&typeid='+typeid+'&index='+index
    })
  },
  bindGetUserInfo: function(e) {
    var that = this;
    if(!e.detail.userInfo){
        wx.showModal({
            title: '用户未授权',
            content: '如需正常使用，请点击允许。',
            showCancel: false,
            success: function (res) {
                if (res.confirm) {}
            }
        });
        return false;
    }else {
        that.setData({
            ifshou:true,
            ifphone:false
        });
        wx.getUserInfo({
            lang:"zh_CN",
            success: res => {
                var that = this;
                var userInfo = res.userInfo
                var nickName = userInfo.nickName
                var avatarUrl = userInfo.avatarUrl
                var gender = userInfo.gender //性别 0：未知、1：男、2：女
                var province = userInfo.province
                var city = userInfo.city
                var country = userInfo.country
                that.setData({
                    userInfo:userInfo,
                    nickName:nickName,
                    avatarUrl:avatarUrl,
                    gender:gender,
                    province:province,
                    city:city,
                    country:country
                })
            }
        })
    }
  },
  getPhoneNumber: function (e) {//点击获取手机号码按钮
      var that = this;
      var ency = e.detail.encryptedData;
      var iv = e.detail.iv;
      var session_key = app.globalData.session_key;
      console.log(app.globalData.session_key);
      if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
          that.setData({
              flag: false
          });
      } else {//同意授权
          wx.request({
              method: "GET",
              url: app.globalData.BaseUrl + 'app/api/deciyptionData.json',
              data: {
                  encryptedData: ency,
                  iv: iv,
                  session_key: session_key
              },
              header: {
                  'content-type': 'application/json' // 默认值
              },
              success: (res) => {
                  var phone = res.data.data.phoneNumber;
                  that.setData({
                      flag: true,
                      phoneNumber:phone
                  });
                  that.saveMember();
              }, fail: function (res) {
                  console.log(res);
              }
          });
      }
    },
    //保存微信用户信息给后台
    saveMember(){
      var that = this;
        wx.request({
            url: app.globalData.BaseUrl + 'app/api/saveMember.json',
            data: {
                name: that.data.nickName,
                path: that.data.avatarUrl,
                gender: that.data.gender,
                province: that.data.province,
                city:that.data.city,
                country:that.data.country,
                phoneNumber:that.data.phoneNumber
            },
            header: {
                'content-type': 'application/json',
            },
            success: function (res) {
                console.log(res)
            },
            fail: function () {
                app.porpMsg("☹ 服务器走丢了,请稍后再试", "none", 2000);
            },
        })
    }


})