/**
 * Created by wangzz on 2016/6/15.
 * layer工具类
 *
 */
;
/**
 * 引入css的基础上配置skin参数
 */
layer.config({
    skin: 'layer-ext-moon',
    extend: 'skin/moon/style.css'
});

/**
 * 弹窗全局常量
 */
var Popup;
if (!Popup) {
    Popup = {};
}

/**
 * 普通提示信息框
 */
Popup.info = function (content) {
    /*layer.open({
     title: '提示',
     type: 1,
     // area: ['600px', '360px'],
     shadeClose: true, //点击遮罩关闭
     content: '\<\div style="padding:20px;">' + content + '\<\/div>'
     });*/
    layer.alert(content, {
        icon: 0,
        shadeClose: true, //点击遮罩关闭
        skin: 'layer-ext-moon'
    })
};
Popup.success = function (content) {
    layer.alert(content, {
        icon: 1,
        shadeClose: true, //点击遮罩关闭
        skin: 'layer-ext-moon'
    })
};
Popup.error = function (content) {
    layer.alert(content, {
        icon: 2,
        shadeClose: true, //点击遮罩关闭
        skin: 'layer-ext-moon'
    })
};

Popup.warn = function (content) {
    layer.alert(content, {
        icon: 0,
        shadeClose: true, //点击遮罩关闭
        skin: 'layer-ext-moon'
    })
};


/**
 * 基本消息弹窗
 * @param content 需要弹出的文字
 * @param iconType 图标类型 默认蓝色i
 * 注：0：蓝色i; 1.绿色√; 2.红色×; 3.蓝色？; 4.黑色小锁; 5.红色失望脸 :( ; 6.黄色笑脸 :) ; 7.云下载图标; 8.黄色！;
 * @param timeout 默认3秒自动关闭 3000ms单位毫秒
 */
Popup.baseMsg = function (content, iconType, timeout) {
    if (!iconType) {
        iconType = 0;
    }
    if (!timeout) {
        timeout = 3000;
    }
    layer.msg(content, {icon: iconType, time: timeout});
}
/**
 * 简单消息弹窗
 * @param content 需要弹出的文字
 * @param iconType 图标类型 默认蓝色i
 * 注：0：蓝色i; 1.绿色√; 2.红色×; 3.蓝色？; 4.黑色小锁; 5.红色失望脸 :( ; 6.黄色笑脸 :) ; 7.云下载图标; 8.黄色！;
 */
Popup.simpleMsg = function (content, iconType) {
    Popup.baseMsg(content, iconType, null);
}
/**
 * 消息弹窗
 * @param content 需要弹出的文字
 */
Popup.msg = function (content) {
    Popup.baseMsg(content, null, null);
}


/**
 * 基本tips提示框
 * @param param 提示框吸附元素的id或者class（如：#id, .class）
 * @param msg 提示信息
 * @param position (上下左右) 提示框位置 默认为右
 * @param color 默认为蓝色 #01abcf
 */
Popup.baseTips = function (param, msg, position, color) {
    if (!position) {
        position = '右';
    }
    if (!color) {
        color = '#01abcf';
    }
    //解析位置
    switch (position) {
        case '上':
            position = 1;
            break;
        case '右':
            position = 2;
            break;
        case '下':
            position = 3;
            break;
        case '左':
            position = 4;
            break;
        default:
            position = 2;
            break;
    }
    //tips层
    layer.tips(msg, param, {
        tips: [position, color]
    });
};

/**
 * 简单tips提示框
 * @param param 提示框吸附元素的id或者class（如：#id, .class）
 * @param msg 提示信息
 * @param position (上下左右) 提示框位置 默认为右
 */
Popup.simpleTips = function (param, msg, position) {
    Popup.baseTips(param, msg, position, null);
};

/**
 * tips提示框
 * @param param 提示框吸附元素的id或者class（如：#id, .class）
 * @param msg 提示信息
 */
Popup.tips = function (param, msg) {
    Popup.simpleTips(param, msg, null);
};

/**
 * 显示加载层
 */
Popup.loading = function () {
    layer.load(2);
};

/**
 * 关闭加载层
 */
Popup.closeLoading = function () {
    layer.closeAll('loading');
};
/**
 * 关闭tips层
 */
Popup.closeTips = function () {
    layer.closeAll('tips');
};