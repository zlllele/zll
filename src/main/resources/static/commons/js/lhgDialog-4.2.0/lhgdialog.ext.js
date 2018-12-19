/**
 * <ol>
 * date:13-6-13 editor:yanghongjian
 * <li>创建文档
 * <li>
 * <li>窗口扩展组件
 * <li>
 * </ol>
 */
var baseTools = baseTools || {};
baseTools.maskObj = null;

baseTools.showMask = function(msg) {
	msg = msg ? msg : "数据加载中...";
	var maskObj = null;
	var api = null;
	try {
		api = frameElement.api;
	} catch (e) {
		api = null;
	}
	var rand = (Math.round(Math.random() * 10));
	if (api) {
		maskObj = api.opener.$.dialog({
			id : "yhjMaskDlg_parent_" + rand,
			icon : 'loading.gif',
			content : msg,
			title : false,
			cancel : false,
			fixed : true,
			lock : true,
			resize : false,
			parent : api
		});
	} else {
		maskObj = $.dialog({
			id : "yhjMaskDlg_" + rand,
			icon : 'loading.gif',
			content : msg,
			title : false,
			cancel : false,
			fixed : true,
			lock : true,
			resize : false
		});
	}

	baseTools.maskObj = maskObj;
	return maskObj;
};

baseTools.hideMash = function(maskObj) {
	if (maskObj) {
		if (!maskObj.closed)
			maskObj.close();
	} else {
		if (baseTools.maskObj) {
			if (!baseTools.maskObj.closed)
				baseTools.maskObj.close();
		}
	}
	baseTools.maskObj = null;
};

/**
 * 创建并显示窗口(扩展窗口lhgdialog组件)
 * 
 * @param winParam
 *            {id:'',title:'',width:,height:,url:'',content:'',callFn:'',parent:dlgObj,other:{}} 其中width,heigth可为空
 */
baseTools.showWinExt = function(winParam) {
	var width = winParam.width ? parseInt(winParam.width, 10) : 650;
	var height = winParam.height ? parseInt(winParam.height, 10) : 400;
	var fixed = winParam.fixed == undefined ? true : winParam.fixed;
	var min = winParam.min == undefined ? false : winParam.min;
	var max = winParam.max == undefined ? false : winParam.max;
	var lock = winParam.lock == undefined ? true : winParam.lock;
	var resize = winParam.resize == undefined ? false : winParam.resize;
	var dlgParam = {
		id : winParam.id,
		title : winParam.title,
		zIndex : winParam.zIndex,
		width : width,
		height : height,
		fixed : fixed,
		min : min,
		max : max,
		lock : lock,
		resize : resize,
		data : winParam
	};

	if (winParam.content) {
		dlgParam.content = winParam.content;
	} else {
		if (winParam.url.indexOf("?") == -1) {
			winParam.url += "?";
		}

		// 传递单点登录参数
		var username = baseTools.getUrlQueryString("username");
		var sign = baseTools.getUrlQueryString("sign");
		if (username && sign) {
			winParam.url += "&username=" + username;
			winParam.url += "&sign=" + sign;
		}
		// 传递action请求参数
		var actionUrl = baseTools.getUrlQueryString("actionUrl");
		if (actionUrl) {
			winParam.url += "&actionUrl=" + actionUrl;
		}

		// 此处通过document.location.origin获得页面完整地址
		dlgParam.content = "url:" + document.location.origin + baseTools.getWebRoot() + winParam.url;
	}

	if (frameElement && !winParam.parent) {// 如果是打开窗口并且没有定义parent的时候
		winParam.parent = frameElement.api;
	}

	var dialogObj = null;
	if (winParam.parent) {
		dlgParam.parent = winParam.parent;
		dialogObj = dlgParam.parent.opener.$.dialog(dlgParam);
	} else {
		dialogObj = $.dialog(dlgParam);
	}
	return dialogObj;
};
