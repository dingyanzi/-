function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function required(val) { 		//不能为空
  return $.trim(val).length > 0 ? true : false;
};
function isInteger(number) { 	// 是否是整数
  return number != null && !!number.match(/^\d+$/);
};
function isPassword(password) { //是否是6-18位密码
  return password != null && !!password.match(/^[\w]{6,18}$/);
};
function isPhone(phone) { 		//验证手机哈
  var pattern = /^1[3456789]\d{9}$/;
  return pattern.test(phone);
};
function isCard(g) { 			//二代身份证
  var f = 0;
  var a = g;
  var e = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙",
    21: "辽宁",
    22: "吉林",
    23: "黑龙",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "香港",
    82: "澳门",
    91: "国外"
  };
  if (!/^\d{17}(\d|x)$/i.test(a)) {
    return false
  }
  a = a.replace(/x$/i, "a");
  if (e[parseInt(a.substr(0, 2))] == null) {
    return false
  }
  var c = a.substr(6, 4) + "-" + Number(a.substr(10, 2)) + "-" + Number(a.substr(12, 2));
  var h = new Date(c.replace(/-/g, "/"));
  if (c != (h.getFullYear() + "-" + (h.getMonth() + 1) + "-" + h.getDate())) {
    return false
  }
  for (var b = 17; b >= 0; b--) {
    f += (Math.pow(2, b) % 11) * parseInt(a.charAt(17 - b), 11)
  }
  if (f % 11 != 1) {
    return false
  }
  return true
};
function isMail(address) { 		// 验证邮箱地址
  var regexOfMail = new RegExp(/^[\da-z_\u4E00-\u9FA5]+[\da-z_\.-\u4E00-\u9FA5]*@[\da-z\u4E00-\u9FA5]+[\da-z\u4E00-\u9FA5_-]+(\.[\da-z\u4E00-\u9FA5_-]+)+$/i);
  return address.length != 0 && address.search(regexOfMail) != -1;
};
function isEqualPwd() {			//两次密码是否一致
  var pwd1 = $("input[type=password]").eq(0).val();
  var pwd2 = $("input[type=password]").eq(1).val();
  if (pwd1 == pwd2 && !$.trim(pwd1).length == 0) {
    return true;
  }
  return false
}
function isLen(val) {			//6-18位
  if (val.length < 6 || val.length > 22) { return false; }
  return true
}
function isCode(number) {			//是否是6位数字
  return number != null && !!number.match(/^\d+$/) && number.length == 6;
}
module.exports = {
  formatTime: formatTime,
  isCode: isCode,
  isLen: isLen,
  isMail: isMail,
  isCard: isCard,
  isPhone: isPhone,
  isPassword: isPassword,
  isInteger: isInteger,
  required: required
}
