var app = getApp();
let Canvas = require('../../utils/drawText.js');
Page({
	data: {
		id: '',
		typeid: '',
		canvasH: 0,
		canvasW: 0,
		screenRatio: 0,
		offA: false,
		offB: false,
		offC: false,
		offD: false,
		flag: true,
		logoImgfile: '',
		shareTempFilePath: "",
		shareImgPath: "",
		screenWidth: 0,
		screenHeight: '',
		deviceWidth: '',
		deviceHeight: '',
		textId: '',
		editVal: '',
		txtIndex: '',
		photolIndex: '',
		modelIndex: '',
		backgroundPath: '',
		canvasImg: '',
		showData: [],
		textsData: [],
		photoList: [],
		modelList: [],
		logoData: [],
		erm: '../../image/bot.jpg',
		hidden: false
	},
	/*getphonesystem: function() {
		var that = this;
		wx.getSystemInfo({
			success: function(res) {
				console.log(res)
			}
		})
	},*/
	onLoad: function(options) {
		var that = this;
		that.setData({
			id: options.id,
			typeid: options.typeid,
			photolIndex: options.index,
			modelIndex: options.index,
		});
		wx.getSystemInfo({
			success: (res) => {
				that.setData({
					screenRatio: 375 / res.windowWidth,
					deviceWidth: res.windowWidth,
					deviceHeight: res.windowHeight
				});
			}
		});
		that.getShowFn();
		that.getImgFn();
		that.getModelFn();

	},
	/*模板详情*/
	getShowFn() {
		var that = this;
		that.setData({
			hidden: true
		})
		wx.request({
			url: app.globalData.BaseUrl + 'app/api/getTemplateList.json',
			data: {
				id: that.data.id
			},
			header: {
				'content-type': 'application/json',
				'Cookie': 'JSESSIONID=' + app.globalData.sessionId
			},
			success: function(res) {
				if(res.data.flag == 100101) {
					var showData = res.data.data;
					var backgroundPath = res.data.data[0].backgroundPath;
					var texts = JSON.parse(res.data.data[0].texts);
					var logoData = JSON.parse(res.data.data[0].logoJson);
					if(logoData !== null) {
						that.setData({
							logoData: logoData
						})
					} else {
						that.setData({
							logoData: []
						})
					}
					that.setData({
						showData: showData,
						textsData: texts,
						backgroundPath: backgroundPath
					});

				}
				var screenRatio = that.data.screenRatio;
				var textsData = that.data.textsData;
				var logoData = that.data.logoData;
				if(logoData.length !== 0) {
					logoData.forEach(function(item, i) {
						that.data.logoData[i].left = parseInt(item.left) / screenRatio + 'px';
						that.data.logoData[i].top = parseInt(item.top) / screenRatio + 'px';
						that.data.logoData[i].width = parseInt(item.width) / screenRatio + 'px';
						that.data.logoData[i].height = parseInt(item.height) / screenRatio + 'px';
						that.setData({
							logoData: that.data.logoData
						});
					})
				}
				textsData.forEach(function(item, i) {
					that.data.textsData[i].fontsize = parseInt(item.fontsize) / screenRatio + 'px';
					that.data.textsData[i].left = parseInt(item.left) / screenRatio + 'px';
					that.data.textsData[i].top = parseInt(item.top) / screenRatio + 'px';
					that.setData({
						textsData: that.data.textsData
					});
				});

			},
			fail: function() {
				app.porpMsg("☹ 服务器走丢了,请稍后再试", "none", 2000);
			},
		})
	},
	/*模板列表*/
	getModelFn() {
		var that = this;
		wx.request({
			url: app.globalData.BaseUrl + 'app/api/getTemplateList.json',
			data: {
				templateType: that.data.typeid
			},
			header: {
				'content-type': 'application/json',
				'Cookie': 'JSESSIONID=' + app.globalData.sessionId
			},
			success: function(res) {
				if(res.data.flag == 100101) {
					var modelList = res.data.data;
					that.setData({
						modelList: modelList
					})
				}
			},
			fail: function() {
				app.porpMsg("☹ 服务器走丢了,请稍后再试", "none", 2000);
			},
		})
	},
	/*图片列表*/
	getImgFn() {
		var that = this;
		wx.request({
			url: app.globalData.BaseUrl + 'app/api/getTemplateList.json',
			data: {
				templateType: that.data.typeid
			},
			header: {
				'content-type': 'application/json',
				'Cookie': 'JSESSIONID=' + app.globalData.sessionId
			},
			success: function(res) {
				if(res.data.flag == 100101) {
					var photoList = res.data.data;
					that.setData({
						photoList: photoList
					})
				}
			},
			fail: function() {
				app.porpMsg("☹ 服务器走丢了,请稍后再试", "none", 2000);
			},
		})
	},
	/*更换模板接口*/
	getChangeModelFn() {
		var that = this;
		wx.request({
			url: app.globalData.BaseUrl + 'app/api/getTemplateList.json',
			data: {
				id: that.data.modelid
			},
			header: {
				'content-type': 'application/json',
				'Cookie': 'JSESSIONID=' + app.globalData.sessionId
			},
			success: function(res) {
				if(res.data.flag == 100101) {
					var showData = res.data.data;
					var backgroundPath = res.data.data[0].backgroundPath;
					var texts = JSON.parse(res.data.data[0].texts);
					var logoData = JSON.parse(res.data.data[0].logoJson);
					if(logoData !== null) {
						that.setData({
							logoData: logoData
						})
					} else {
						that.setData({
							logoData: []
						})
					}
					that.setData({
						showData: showData,
						textsData: texts,
						backgroundPath: backgroundPath
					});
					//console.log(that.data.logoData)
				}
				//console.log(that.data.logoData)
				var screenRatio = that.data.screenRatio;
				var textsData = that.data.textsData;
				var logoData = that.data.logoData;

				if(logoData.length !== 0) {
					logoData.forEach(function(item, i) {
						that.data.logoData[i].left = parseInt(item.left) / screenRatio + 'px';
						that.data.logoData[i].top = parseInt(item.top) / screenRatio + 'px';
						that.data.logoData[i].width = parseInt(item.width) / screenRatio + 'px';
						that.data.logoData[i].height = parseInt(item.height) / screenRatio + 'px';
						that.setData({
							logoData: that.data.logoData
						});
					})
				}
				textsData.forEach(function(item, i) {
					that.data.textsData[i].fontsize = parseInt(item.fontsize) / screenRatio + 'px';
					that.data.textsData[i].left = parseInt(item.left) / screenRatio + 'px';
					that.data.textsData[i].top = parseInt(item.top) / screenRatio + 'px';
					that.setData({
						textsData: that.data.textsData
					});
				});
			},
			fail: function() {
				app.porpMsg("☹ 服务器走丢了,请稍后再试", "none", 2000);
			}
		})
	},
	closeModel() {
		var that = this;
		that.setData({
			offA: false
		})
	},
	openModel() {
		var that = this;
		that.setData({
			offA: true
		})
	},
	closePhoto() {
		var that = this;
		that.setData({
			offB: false
		})
	},
	openPhoto() {
		var that = this;
		that.setData({
			offB: true
		})
	},
	closeText(e) {
		var that = this;
		that.setData({
			offC: false
		});
	},
	openTxt() {
		var that = this;
		that.setData({
			offC: true
		})
	},
	closeEdit() {
		var that = this;
		that.setData({
			offD: false
		});
		var txtIndex = that.data.txtIndex;
		var editVal = that.data.editVal;
		that.data.textsData[txtIndex].text = editVal;
		that.setData({
			textsData: that.data.textsData
		});
	},
	openEdit() {
		var that = this;
		that.setData({
			offD: true
		})
	},
	getEditval: function(e) {
		var that = this;
		var val = e.detail.value;
		that.setData({
			editVal: val
		});
	},
	/*更换模板*/
	changeModelFn: function(e) {
		var that = this;
		var modelid = e.currentTarget.dataset.modelid;
		that.setData({
			modelIndex: e.currentTarget.dataset.index,
			modelid: modelid
		});
		that.getChangeModelFn()
	},
	/*更换图片*/
	changePhotoFn: function(e) {
		var that = this;
		var photolIndex = e.currentTarget.dataset.index;
		var imgVal = e.currentTarget.dataset.img;
		that.data.showData[0].backgroundPath = imgVal;
		that.setData({
			photolIndex: e.currentTarget.dataset.index,
			showData: that.data.showData
		});
	},
	/*更换文案*/
	changeTextFn: function(e) {
		var that = this;
		that.setData({
			offC: false,
			offD: true,
			editVal: e.currentTarget.dataset.text,
			txtIndex: e.currentTarget.dataset.index
		});
	},
	/*选择文字编辑*/
	changeTxt: function(e) {
		var that = this;
		//console.log(e.currentTarget.dataset.text)
		that.setData({
			offD: true,
			editVal: e.currentTarget.dataset.text
		});

	},
	closeBgFn() {
		var that = this;
		that.setData({
			offA: false,
			offB: false,
			offC: false,
			offD: false
		})
	},
	// 选择照片
	ChooseImgFn: function() {
		var that = this;
		wx.chooseImage({
			count: 1,
			sizeType: ['original'],
			sourceType: ['album', 'camera'],
			success: function(res) {
				that.data.showData[0].backgroundPath = res.tempFilePaths;
				that.setData({
					showData: that.data.showData,
				})

			}
		})
	},
	//logo替换图片
	ChooseLogoFn: function() {
		var that = this;
		wx.chooseImage({
			count: 1,
			sizeType: ['original'],
			sourceType: ['album', 'camera'],
			success: function(res) {
				that.data.logoData[0].path = res.tempFilePaths;
				that.setData({
					logoData: that.data.logoData,
				})
				//console.log(that.data.logoData)
			}
		})
	},
	//保存
	saveFn() {
		var that = this;
		wx.getSetting({
			success: (res) => {
				if(!res.authSetting['scope.userInfo']) {
					wx.authorize({
						scope: 'scope.userInfo',
						success() {
							wx.showLoading({
								title: '努力生成中',
								duration: 4000
							});
							that.downloadImg();

						},
						fail() {
							// 此处可以使用 wx.openSetting直接跳到设置权限页 或者像我这样偷懒处理
							wx.showModal({
								title: '警告',
								content: '未获取相册权限，请先打开权限。（右上角菜单-关于-右上角设置）',
								showCancel: false
							})
						}
					})
				} else {
					that.setData({
						flag: false
					});
					wx.showLoading({
						title: '努力生成中',
						duration: 4000
					})
					that.downloadImg()
				}
			}
		})
	},
	//绘图
	downloadImg() {
		setTimeout(function() {
			wx.hideLoading();
		}, 1000);
		var that = this;
		var context = wx.createCanvasContext("my_Canvas");
		/*获取背景图的真实宽高比*/
		wx.createSelectorQuery().select('#the-id').boundingClientRect(function(rect) {
			var posterWidth = rect.width;
			var posterHeight = rect.height;
			//背景图下有个二维码图片
			wx.createSelectorQuery().select('#ths-id').boundingClientRect(function(rect) {
				var qrcodeH = rect.height;
				that.setData({
					canvasW: posterWidth,
					canvasH: posterHeight + qrcodeH
				});
				var urlImg = that.data.showData[0].backgroundPath;
				var logojson = that.data.logoData;
				if(logojson.length !== 0) {
					var logoImg = logojson[0].path;
					var logoImgL = parseInt(logojson[0].left);
					var logoImgT = parseInt(logojson[0].top);
					var logoImgW = parseInt(logojson[0].width);
					var logoImgH = parseInt(logojson[0].height);
				} else {
					var logoImg = "";
					var logoImgL = 0
					var logoImgT = 0
					var logoImgW = 0
					var logoImgH = 0
				}
				if(!/^https/.test(urlImg)) {
					//console.log("本地上传图片")
					if(!/^https/.test(logoImg)) {
						var logoImg = JSON.stringify(logoImg);
						var logoImga = logoImg.substring(2, logoImg.length - 2);
						that.setData({
							logoImgfile: logoImga
						})
					} else {
						wx.downloadFile({
							url: logoImg,
							success: res => {
								that.setData({
									logoImgfile: res.tempFilePath
								})
							}
						});
					}
					setTimeout(function() {
						//console.log(that.data.logoImgfile)
						var logoImgs = that.data.logoImgfile;
						var urls = JSON.stringify(urlImg);
						var urlImgs = urls.substring(2, urls.length - 2);
						context.drawImage(urlImgs, 0, 0, posterWidth, posterHeight);
						if(logoImgW !== 0) {
							context.drawImage(logoImgs, logoImgL, logoImgT, logoImgW, logoImgH);
						}
						context.drawImage(that.data.erm, 0, posterHeight, that.data.canvasW, qrcodeH);
						context.drawImage(that.data.erm, 0, posterHeight, that.data.canvasW, qrcodeH);
						var list = that.data.textsData;
						list.forEach(function(val) {
							context.setFontSize(parseFloat(val.fontsize));
							context.setFillStyle(val.color);
							if(val.direction == 1) {
								Canvas.drawTextVertical(context, val.text, parseFloat(val.left) + 10, parseFloat(val.top) + parseFloat(val.fontsize), parseFloat(val.fontsize));
							} else {
								context.fillText(val.text, parseFloat(val.left), parseFloat(val.top) + parseFloat(val.fontsize));
							}
						});
						setTimeout(function() {
							context.draw(false, function() {
								//5.把当前画布指定区域的内容导出生成指定大小的图片
								wx.canvasToTempFilePath({
									canvasId: 'my_Canvas',
									success: function(fileTemp) {
										that.setData({
											shareImgPath: fileTemp.tempFilePath
										})
									}
								})
							})
						}, 80);
						return;
					}, 200)
				} else {
					//服务器图片
					if(!/^https/.test(logoImg)) {
						var logoImg = JSON.stringify(logoImg);
						var logoImga = logoImg.substring(2, logoImg.length - 2);
						that.setData({
							logoImgfile: logoImga
						})
					} else {
						wx.downloadFile({
							url: logoImg,
							success: res => {
								that.setData({
									logoImgfile: res.tempFilePath
								})
							}
						});
					}
					setTimeout(function() {
						wx.downloadFile({
							url: urlImg,
							success: res => {
								var logoImgs = that.data.logoImgfile;
								context.drawImage(res.tempFilePath, 0, 0, posterWidth, posterHeight);
								if(logoImgW !== 0) {
									context.drawImage(logoImgs, logoImgL, logoImgT, logoImgW, logoImgH);
								}
								context.drawImage(that.data.erm, 0, posterHeight, that.data.canvasW, qrcodeH);
								var list = that.data.textsData;
								console.log(list)
								list.forEach(function(val) {
									context.setFontSize(parseFloat(val.fontsize));
									context.setFillStyle(val.color);
									if(val.direction == 1) {
										Canvas.drawTextVertical(context, val.text, parseFloat(val.left) + 5, parseFloat(val.top) + parseFloat(val.fontsize), parseFloat(val.fontsize));
									} else {
										context.fillText(val.text, parseFloat(val.left), parseFloat(val.top) + parseFloat(val.fontsize));
										//Canvas.drawText(context,val.text, 35, 55, 200);
									}
								});
								//4.执行画画 才会在画布上画东西 参考文档
								setTimeout(function() {
									context.draw(false, function() {
										//5.把当前画布指定区域的内容导出生成指定大小的图片
										wx.canvasToTempFilePath({
											canvasId: 'my_Canvas',
											success: function(fileTemp) {
												that.setData({
													shareImgPath: fileTemp.tempFilePath
												})
											}
										})
									})
								}, 80);
							}
						})
					}, 300)
					return;
				}
			}).exec();
		}).exec();

	},
	//访问相册 存储生成好的图片
	saveShow() {
		var that = this;
		wx.saveImageToPhotosAlbum({
			filePath: that.data.shareImgPath,
			success: function() {
				wx.showToast({
					title: '图片保存成功'
				})
			}
		})
	}

})