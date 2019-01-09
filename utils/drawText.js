/**
 * @author zhangxinxu(.com)
 * @licence MIT
 * @description http://www.zhangxinxu.com/wordpress/?p=7362
 */
function drawTextVertical(context, text, x, y,sizes) {
    var arrText = text.split('');
    var arrWidth = arrText.map(function (letter) {
        return sizes;
    });

    var align = context.textAlign;
    var baseline = context.textBaseline;

    // if (align == 'left') {
    //     x = x + Math.max.apply(null, arrWidth) / 2;
    // } else if (align == 'right') {
    //     x = x - Math.max.apply(null, arrWidth) / 2;
    // }
    // if (baseline == 'bottom' || baseline == 'alphabetic' || baseline == 'ideographic') {
    //     y = y - arrWidth[0] / 2;
    // } else if (baseline == 'top' || baseline == 'hanging') {
    //     y = y + arrWidth[0] / 2;
    // }

    // context.textAlign = 'center';
    // context.textBaseline = 'middle';

    // 开始逐字绘制
    arrText.forEach(function (letter, index) {
        // 确定下一个字符的纵坐标位置
        var letterWidth = arrWidth[index];
        // 是否需要旋转判断
        var code = letter.charCodeAt(0);
        if (code <= 256) {
            context.translate(x, y);
            // 英文字符，旋转90°
            context.rotate(90 * Math.PI / 180);
            context.translate(-x, -y);
        } else if (index > 0 && text.charCodeAt(index - 1) < 256) {
            // y修正
            y = y + arrWidth[index - 1] / 2;
        }
        
      context.fillText(letter, x, y);
      // 旋转坐标系还原成初始态
      context.setTransform(1, 0, 0, 1, 0, 0);
      // 确定下一个字符的纵坐标位置
      var letterWidth = arrWidth[index];
      y = y + letterWidth;
       
    });
    // 水平垂直对齐方式还原
    context.textAlign = align;
    context.textBaseline = baseline;
}

/*function drawText(ctx, str, initHeight, titleHeight, canvasWidth) {
    var lineWidth = 0;
    var lastSubStrIndex = 0; //每次开始截取的字符串的索引
    for (let i = 0; i < str.length; i++) {
        lineWidth += ctx.measureText(str[i]).width;
        if (lineWidth > canvasWidth) {
            ctx.fillText(str.substring(lastSubStrIndex, i), 15, initHeight);//绘制截取部分
            initHeight += 30;//20为字体的高度
            lineWidth = 0;
            lastSubStrIndex = i;
            titleHeight += 30;
        }
        if (i == str.length - 1) {//绘制剩余部分
            ctx.fillText(str.substring(lastSubStrIndex, i + 1), 15, initHeight);
        }
    }
    // 标题border-bottom 线距顶部距离
    titleHeight = titleHeight + 10;
    return titleHeight
}*/

module.exports = {
    drawTextVertical: drawTextVertical
    //drawText:drawText
}