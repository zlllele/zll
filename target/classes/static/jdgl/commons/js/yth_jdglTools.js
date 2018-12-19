/**
 * <ol>
 * date:2013-10-21 editor:yanghongjian
 * <li>创建文档</li>
 * <li>局端管理全局工具类</li>
 * 
 * <li>一体化局端访问时调用</li>
 * </ol>
 */
var jdglTools = baseTools || {};

/**
 * 车购税系统使用到的全局参数 注意是根时不要指定contextPath的内容, 如果有目录部署在添加,比如/cgs 客户端请求时要设定client值，比如:http://localhost:7001
 */
jdglTools.cnf = {
	clientURL : 'http://sp.htjs.net',
	contextPath : ''
};
// jdglTools.cnf.clientURL = 'http://localhost:8007';

/**
 * 获取请求前缀兼容客户端和在线两种模式
 */
jdglTools.getClientOrServerUrl = function() {
	return jdglTools.cnf.clientURL != '' ? jdglTools.cnf.clientURL // 客户端请求
	: jdglTools.cnf.contextPath;// 支持二级目录部署
};

// ///////////////////////////////////////////////////

/**
 * 设置cookie
 * 
 * @param jsonObj
 */
jdglTools.setCookieJsonObjLogin = function(data) {
	if (!this.checkCookie())
		return false;

	this.setCookie("QX_USER", data);
	return true;
};

/**
 * 清空Cookie
 */
jdglTools.clearAllCookie = function() {
	this.delCookie("LOGIN_USER");
	this.delCookie("QX_USER");
	this.delCookie("USER_SEQ");
};

jdglTools.setCookie = function(key, val) {
	if (/[\]\}]$/.test(val)) {
		val = baseTools.stringify(val);
	}
	$.cookie(key, val, {
		expires : 1,
		path : "/"
	});
};
jdglTools.getCookie = function(key) {
	if (!this.checkCookie()) {
		this.gotoLogin();
		return "";
	}
	var val = $.cookie(key);
	if (val == null) {
		// alert("获取不到[" + key + "]的指定值,请重新登录!");
		// this.gotoLogin();
		return "";
	}
	return baseTools.parse(val);
};
jdglTools.delCookie = function(key) {
	$.cookie(key, null, {
		path : "/"
	});
};
jdglTools.getUserDataByKey = function(key) {
	return jdglTools.getCookie("QX_USER")[key];
};
baseTools.checkCookie = function() {
	var cookieEnabled = (navigator.cookieEnabled) ? true : false;
	if (!cookieEnabled) {
		alert('请开启浏览器COOKIE功能!');
		return false;
	}
	return true;
};

baseTools.gotoLogin = function() {
	top.window.location.href = this.getLogin();
};
// 获取发布域路径(兼容客户端路径)
baseTools.getWebRoot = function() {
	if (location.href.indexOf("http") != -1)
		return jdglTools.cnf.contextPath;

	var tem = [];
	var paths = location.href.split('/');
	for ( var i in paths) {
		if (paths[i] == 'web')
			break;
		tem.push(paths[i]);
	}
	tem.push("web");
	return tem.join('/');
};

baseTools.getLogin = function() {
	return this.getWebRoot() + "/manage/login.html";
};

// ///////////////////////////////////////////////////////////////////
jdglTools.getUserIdSeq = function() {
	return this.getCookie("USER_SEQ");
};
/**
 * 注意: cookie中的LOGIN是QX_USER表的数据 cookie中的LOGIN_USER是CGS_QYXX/GY_FPGL_KPJSZ表的数据
 */
jdglTools.getUserZh = function() {
	return this.getCookie("QX_USER").CZRY_DM;
};
jdglTools.getUserMc = function() {
	return this.getCookie("QX_USER").CZRY_MC;
};
jdglTools.getUserSwjgMc = function() {
	return this.getCookie("QX_USER").ZZJG_MC;
};
jdglTools.getUserSwjgDm = function() {
	return this.getCookie("QX_USER").ZZJG_DM;
};
/**
 * 获取当前登录用户类型 0局端用户，1 企业用户，2 企业主操作员，3 企业操作员
 */
jdglTools.getUserType = function() {
	return parseInt(this.getCookie("QX_USER").YHLX_DM);
};
// 获取当前登录用户的ID
jdglTools.getUserId = function() {
	var userId = '';
	try {
		// 0超级管理员 1产品管理员 2 税局用户 3 纳税人 4 开票员
		switch (this.getUserType()) {
		case 3:
		case 4:
			userId = this.getCookie("QX_USER").USER_ZH;
			break;
		default:
			userId = this.getCookie("QX_USER").USER_ID;
		}
	} catch (e) {
		console.log(e);
	}
	return userId;
};
// /////////////////////////////////////////////////////////////
/**
 * 计算表格在页面中的高度
 * 
 * @param tbList
 *            表格的jquery对象
 */
jdglTools.getMmGridHeight = function(tbList) {
	var tbHeight = 2;
	var tbListPg = tbList.next();
	if (tbListPg.size() != 0) {
		tbHeight = tbListPg.height() == 0 ? 24 : tbListPg.height();
	}
	var docHeight = document.documentElement.clientHeight;
	var jc = 0;
	if (baseTools.getCurBrowser().isIE8 || baseTools.getCurBrowser().isIE7) {
		jc = 29 - tbHeight;
		if (tbList.offset().top == -120) {// IE7下top值为-120
			jc = jc - 60;
		}
	}
	return docHeight - Math.abs(tbList.offset().top) - tbHeight - jc;
};

// ////////////////////////重载baseTools中的相关方法////////////////////////////////

/**
 * 重载baseTools中的方法,追加额外的查询
 * 
 * @param xhrArgs
 *            请求参数
 */
baseTools.xhrAjax = function(xhrArgs) {
	if (jdglTools.cnf.clientURL != '')
		// 客户端请求
		xhrArgs.url = jdglTools.cnf.clientURL + xhrArgs.url;
	else
		// 支持二级目录部署
		xhrArgs.url = jdglTools.cnf.contextPath + xhrArgs.url;
	// console.log(xhrArgs.url)
	// 添加附加参数
	var params = xhrArgs.params || {};
	var bCurUserId = true;
	var page = $('#tbListPg').data("page") ? $('#tbListPg').data("page") : 1;
	var pageSize = $('.limit select').val() ? $('.limit select').val() : 20;
	for ( var key in params) {
		if ("CUR_USERID" == key)
			bCurUserId = false;
		// if ("page" == key)
		// page = params.page;
		// if ("pageSize" == key)
		// pageSize = params.pageSize;
	}

	var start = pageSize * (page - 1) + 1;
	var end = pageSize * page;
	if (params.START == undefined)
		params.START = start;
	if (params.END == undefined)
		params.END = end;
	if (bCurUserId) // 附加cookie值
		params.CUR_USERID = jdglTools.getUserIdSeq();
	params.qxxkdm = baseTools.getUrlQueryString('qxxkdm');
	xhrArgs.params = params;
	xhrArgs.dataType = 'jsonp';//支持跨域调用
	return this.xhrAjaxJsonP(xhrArgs);
};

/**
 * 重载，增加对counvert标签的支持 解析JSON的数据格式，并把数据绑定到显示控件 strJson 基本格式为控件NAME:值
 * 
 * @param formName
 *            json格式的对象,注意显示控件的NAME要与JSON的键名要保持一致
 */
baseTools.bindFormData = function(formName, jsonObj) {
	try {
		// 排除不需要显示的列
		for ( var key in jsonObj) {
			var obj = this.byId(formName + "_" + key);
			// alert(key+'='+jsonObj[key]+'\n'+obj)
			if (obj) {
				var tagName = obj.tagName.toLowerCase();
				if (tagName == "div" || tagName == "span") {
					obj.innerHTML = jsonObj[key];
					var convert = $(obj).attr("convert");
					if (convert) {
						var ds = convert.split(";");
						var dm = jsonObj[key];
						for (var i = 0; i < ds.length; i++) {
							var d2 = ds[i].split(":");
							if (d2.length == 1) {
								obj.innerHTML = d2;
							} else if (dm == d2[0]) {
								obj.innerHTML = d2[1];
							}
						}
					}
					continue;
				}

				if (tagName == "input") {
					if (obj.type.toLowerCase() == "checkbox") {
						obj.checked = jsonObj[key] == obj.value;
						continue;
					}
					if (obj.type.toLowerCase() == "radio") {
						var radioObj = document.getElementsByName(obj.name);
						for (var i = 0; i < radioObj.length; i++) {
							if (radioObj[i].value == jsonObj[key]) {
								radioObj[i].checked = true;
								continue;
							}
						}
						continue;
					}
				}
				obj.value = jsonObj[key] != null ? this.repText(jsonObj[key]) : "";
			}
		}
	} catch (e) {
		alert("客户端绑定错误:\n" + "URL:\n\t" + this._curPage + "\nmessage:\n\t" + e.message);
	}
};

// ////////////////局端管理中使用到的方法///////////////////////
/**
 * 在iframe页面获取局端管理全局组件操作辅助对象
 */
jdglTools.getJdglPlugins = function() {
	return top.jdglPlugins;
};

/**
 * 获取全局的用户菜单数组
 * 
 * @returns
 */
jdglTools.getQxxkdmarray = function() {
	return top.main.getQxxkdmarray();
};
/**
 * 获取全局的用户菜单代码串
 * 
 * @returns
 */
jdglTools.getMyqxxkdms = function() {
	return top.main.getMyqxxkdms();
};
/**
 * 获取全局的用户菜单代码串
 * 
 * @returns
 */
jdglTools.getDmb = function(name, table) {
	if (!top.main) {
		return;
	}
	var data = top.main.getData(name);
	if (data == null) {
		baseTools.xhrAjax({
			url : '/server/common/getDmbList.do',
			params : {
				LBID : name,
				TNAME : table
			},
			async : false,
			callback : [ function(jsonObj, xhrArgs) {
				if (jsonObj.list != null && jsonObj.list.length > 0) {
					data = jsonObj.list;
					top.main.bindData(name, data);
				}
			} ]
		});
	}
	return data;
};
/**
 * 获取全局的用户菜单代码串
 * 
 * @returns
 */
jdglTools.addOptionToSelect = function(selectId, dmbName, tableName) {
	var data = jdglTools.getDmb(dmbName, tableName);
	var selectObj = $("#" + selectId);
	if (data != null && selectObj != null) {
		for (i in data) {
			$("<option value='" + data[i].BM + "'>" + data[i].MC + "</option>").appendTo(selectObj);

		}
	}
};
/**
 * 将代码表代码值转换为名称
 * 
 * @returns
 */
jdglTools.convertDmToMc = function(dmbName, tableName, dmValue) {
	var data = jdglTools.getDmb(dmbName, tableName);
	if (data) {
		return data[dmValue];
	} else {
		return dmValue;
	}

};
/**
 * 获取全局的用户菜单代码串
 * 
 * @returns
 */
jdglTools.getAccountCsb = function(key) {
	var data = jdglTools.getDmb("PT_ACCOUNT_CSB", "PT_ACCOUNT_CSB");
	// var selectObj = $("#"+selectId);
	if (data != null) {
		for (var i = 0; i < data.length; i++) {
			if (data[i].CSBH == key) {
				return data[i].CSZ;
			}
		}
	}
	return '';
};
/**
 * 动态加载不同风格的皮肤
 */
$(document).ready(function() {
	var _theme = jdglTools.getAccountCsb("001");// 获取平台主题参数
	if (_theme == "") {// 无法获取主题时，取默认主题包1
		_theme = "1";
	}
	// jquery 加载css时在IE8下无效
	// $('<link href="' + jdglTools.cnf.contextPath + '/commons/themes/'+_theme+'/main.css" rel="stylesheet" type="text/css"></link>').appendTo("head");
	// 通过原生js创建对象方式加载css
	var css_file = jdglTools.cnf.contextPath + '/commons/themes/' + _theme + '/main.css';
	var html_doc = document.getElementsByTagName('head')[0];
	var css = document.createElement('link');
	css.setAttribute('rel', 'stylesheet');
	css.setAttribute('type', 'text/css');
	css.setAttribute('href', css_file);
	html_doc.appendChild(css);

});

/**
 * 将数据绑定到客户浏览器，做本地缓存使用（重新登录时失效）
 * 
 */
jdglTools.bindData = function(name, data) {
	if (!top.main) {
		return;
	}
	top.main.bindData(name, data);
};
/**
 * 获取绑定的数据
 * 
 * @returns 已绑定的数据
 */
jdglTools.getBindData = function(name) {
	if (!top.main) {
		return;
	}
	return top.main.getData(name);
};