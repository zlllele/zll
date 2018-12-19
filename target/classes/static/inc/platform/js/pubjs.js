var pubjs_verson = "1.1";
var imgDiv = document.createElement("IMG");
imgDiv.width = "402";
imgDiv.height = "225";
imgDiv.src = "/images/waiting_bg1.gif";
var _base_context="";

function disDiv() {

	var s = document.createElement("DIV");

	// 设置层的相关属性
	s.style.visibility = "";

	// 定义层的样式
	s.id = "waiting_div_bg";
	s.style.width = "401px";
	s.style.height = "224px";
	s.style.position = "absolute";
	s.style.left = (document.body.clientWidth - s.style.pixelWidth) / 2;
	s.style.top = (document.body.clientHeight - s.style.pixelWidth) / 2;
	// 生成iframe
	var L = document.createElement("IFRAME");
	L.name = "completionFrame";

	// 定义iframe的样式，宽高与s相同
	L.width = s.style.width;
	L.height = s.style.height;

	// 附加L到s
	s.appendChild(L);

	// 显示s
	document.body.appendChild(s);

	// 创建层

	var t = document.createElement("DIV");

	// 设置相关属性
	t.style.visibility = "";
	t.zIndex = 1;
	t.id = "waiting_div";
	// 定义样式表，长宽高和定位等
	t.style.position = "absolute";
	t.style.width = "401px";
	t.style.height = "224px";
	t.style.left = s.style.left;
	t.style.top = s.style.top;

	// 定义你要表现的内容
	t.appendChild(imgDiv);
	// t.innerHTML = "<img src=\"/images/waiting_bg1.gif\" width=\"402\"
	// height=\"225\">稍后。。。";

	// 显示

	document.body.appendChild(t);

}

// hide the div which were created by the upper function
function hideDIV() {
	if (document.getElementById('waiting_div') != undefined
			|| document.getElementById('waiting_div') != null) {
		document.body.removeChild(document.getElementById('waiting_div'))
	}
	if (document.getElementById('waiting_div_bg') != undefined
			|| document.getElementById('waiting_div_bg') != null) {
		document.body.removeChild(document.getElementById('waiting_div_bg'))
	}

}
function $F(id) {// 通过id获得对象
	return document.getElementById(id);
}

function $FV(id) {
	if (document.getElementById(id))
		return document.getElementById(id).value;
	return "";
}

function setVisiable(id, value) {
	var t = document.getElementById(id);
	// alert(t.style.visibility);
	if (t)
		t.style.visibility = value;

}
function setInnerHTML(id, value) {
	var t = document.getElementById(id);
	if (t != 'null') {
		t.innerHTML = value;
	}
}
function setValue(id, value) {
	if (id == undefined || value == undefined || value == 'null' || id == '')
		return;
	var t = document.getElementById(id);
	if (t != null) {
		if (t.tagName == "SELECT") {// 下拉菜单
			for (i = 0; i < t.options.length; i++) {
				if (t.options[i].value == value) {
					t.selectedIndex = i;
					break;
				}
			}
		} else if (t.tagName == "CHECKBOX") {//
			// TODO:
		} else if (t.tagName == "INPUT") {
			if (t.className.indexOf('spellCode') > -1) {// 拼音头
				if (value == "") {
					t.value = value;
					$F(t.dm_filed).value = "";
				} else {
					if (t.source_code) {

						try {
							var arry = eval(t.source_code.toLowerCase())
						} catch (e) {
							include_js(_base_context+"/inc/platform/jsp/dm/spellCode/"
									+ t.source_code + ".jsp");
							setTimeout(
									"setValue('" + id + "','" + value + "')",
									300);
							return;
						}

						for (i = 0; i < arry.length; i++) {
							if (arry[i][0] == value) {
								t.value = arry[i][1];
								$F(t.dm_filed).value = arry[i][0];
							}
						}
					}
					if (t.onFinish) {
						eval(t.onFinish);
					}
				}
			} else {
				t.value = value;
			}
		} else {
			t.innerHTML = value;
		}
	}
}
function setDisplay(id, value) {
	var t = document.getElementById(id);
	// alert(t.style.visibility);
	t.style.display = value;
}
var request = {
	QueryString : function(val) {
		var uri = window.location.href;
		var re = new RegExp("" + val + "=([^&?]*)", "ig");
		obj = uri.match(re)
		if (obj) {
			return obj[0].toString().replace(new RegExp(val + "=", "ig"), "");
		} else {
			return null;
		}
		// obj.toString().replace(new RegExp(val+"=","ig"),"")
	},
	QueryStringS : function(val) {
		var uri = window.location.href;
		var re = new RegExp("" + val + "=([^&?]*)", "ig");
		obj = uri.match(re)
		if (obj) {
			return obj.toString().replace(new RegExp(val + "=", "ig"), "");
		} else {
			return null;
		}
	}
}

function getParamValue(paramStr, paramName) {
	var re = new RegExp("" + paramName + "=([^&?]*)", "ig");
	obj = paramStr.match(re)
	if (obj) {
		return obj[0].toString().replace(new RegExp(paramName + "=", "ig"), "");
	} else {
		return null;
	}
}

function selectAll(obj_name) {
	var objs = document.getElementsByName(obj_name);
	if (objs) {
		for (i = 0; i < objs.length; i++) {
			if (!objs[i].disabled)
				objs[i].checked = !objs[i].checked;
		}
	}
}

// 如果选择了信息返回true 没有选择信息返回false
function select(obj_name) {
	if (obj_name == null || objs == "")
		obj_name = 'ID';
	var objs = document.getElementsByName(obj_name);
	if (objs) {
		for (i = 0; i < objs.length; i++) {
			if (!objs[i].disabled)
				if (objs[i].checked)
					return true;
		}
	}
	return false;
}

function setCheck(name,val){
	var objs = document.getElementsByName(name);
	if (objs) {
		for (i = 0; i < objs.length; i++) {
			if (objs[i].id==(name+val))
				objs[i].checked = true;
			else
				objs[i].checked = false;
		}
	}
	$F("QXFW").value=val;	
}

function trim(str) {
	return str.replace(/\n|\s|\r/g, "");
}
function createFloatDiv(divObj, name, obj) {
	if ($F(name)) {
		return;
	}
	var div = document.createElement("<DIV></DIV>");
	div.id = name;
	div.style.position = "absolute";
	div.style.width = divObj.style.width;
	div.style.height = divObj.style.height;
	div.style.left = f_GetX(obj || window.event.srcElement);
	div.style.top = f_GetY(obj || window.event.srcElement) + 20;
	document.appendChild(div);
	var L = document.createElement("IFRAME");
	L.name = "completionFrame";

	// 定义iframe的样式，宽高与s相同
	L.width = div.style.width;
	L.height = div.style.height;

	// 附加L到s
	div.appendChild(L);
	divObj.style.position = "absolute";
	divObj.style.zIndex = 1;
	divObj.style.left = div.style.left;
	divObj.style.top = div.style.top;
	divObj.style.display = "";
	div.style.display = "";
}
function f_GetX(e) {

	var l = e.offsetLeft;
	while (e = e.offsetParent) {
		l += e.offsetLeft;
	}
	;
	return l;
};
function f_GetY(e) {
	var t = e.offsetTop;
	while (e = e.offsetParent) {
		t += e.offsetTop;
	}
	;
	return t;
};
// 将指定的obj下面的超连接去掉
function killHref(obj, aText) {
	if (obj instanceof String) {
		obj = $F(obj);
	}
	var i = 0, len = 0;
	if (obj.children.length == 0) {
		obj.innerHTML = obj.innerText;
		return;
	}
	obj = obj.getElementsByTagName("A");
	for (i = 0, len = obj.length; i < len;) {
		if (aText == undefined || aText == obj[i].innerText.trim()) {
			obj[i].outerHTML = obj[i].innerText;
			len--;
		} else {
			i++;
		}
	}
}

function view(url, mode) {
	if (mode == null) {
		var obj = $F("IDS");
		var idname = "";
		var ids = "";
		if (url.indexOf("?") == -1) {
			url = url + "?qxxkdm=" + request.QueryString("qxxkdm");
		} else if (url.indexOf("qxxkdm=") == -1) {
			url = url + "&qxxkdm=" + request.QueryString("qxxkdm");
		}
		if (obj) {
			idname = obj.idname;
			ids = obj.value;
			if (idname != "" && ids != "") {
				if (url.indexOf("?") == -1) {
					url = url + "?";
				} else {
					url = url + "&";
				}
				url = url + "idname=" + idname + "&IDS=" + ids;
			}
		}

		/*
		 * 
		 * if(url.indexOf("?")>-1){ page = url.substr(0,url.indexOf("?")+1); c =
		 * url.substr(url.indexOf("?")+1,url.length).split("&");
		 * for(i=0,len=c.length;i<len;i++){
		 * c[i]=c[i].substr(0,c[i].indexOf("=")+1)+encodeURI(c[i].substr(c[i].indexOf("=")+1));
		 * page = page+c[i]+"&"; } }
		 */
		self.location = url;
	}
}

function repalceHref(obj, paraName, value) {
	var re = new RegExp("" + paraName + "=([^&?]*)", "ig");
	hrefs = obj.getElementsByTagName("A");
	for (i = 0, len = hrefs.length; i < len; i++) {
		hrefs[i].href = hrefs[i].href.replace(re, paraName + '=' + value);
	}
}

function getParent(obj, tagName) {
	tmp = obj;
	while (tmp.parentNode && tagName && tmp.tagName != tagName) {
		tmp = tmp.parentNode;
	}
	if (tmp == obj) {
		return null;
	} else {
		return tmp;
	}
}

function formatByJc(obj, dmIndex, formatIndex) {
	for (i = 1, len = obj.rows.length; i < len; i++) {
		oTr = obj.rows[i];
		if (oTr.cells[dmIndex].innerText.match(/\d/ig)) {
			toAppend = oTr.cells[dmIndex].innerText;
			toAppend = toAppend.substr(0, toAppend.length - 2);
			toAppend = toAppend.replace(/\d/ig, '&nbsp;');
			sRows = formatIndex.split(',');
			for (j = 0; j < sRows.length; j++) {
				oTr.cells[parseInt(sRows[j])].innerHTML = toAppend
						+ oTr.cells[parseInt(sRows[j])].innerHTML;
			}
		}
	}
}

// 点击回车时，转换为tab键；
function enterToTab() {
	if (window.event.keyCode == 13) {
		window.event.keyCode = 9;
	}
}
// 检验输入为数字或backespace或del时有效。
function keyNum() {
	var key = window.event.keyCode;
	// 0-9
	if ((key >= 48 && key <= 57) || (key >= 96 && key <= 105)) {
		return true;
	}
	// backspane
	if (key == 8) {
		return true;
	}
	// tab
	if (key == 9) {
		return true;
	}
	// enter ---> tab
	if (key == 13) {
		window.event.keyCode = '9';
		return true;
	}
	// del;
	if (key == 46) {
		return true;
	}
	return false;
}

function reloadUser(ssbm) {
	post = "qxxkdm=" + request.QueryString("qxxkdm");
	post += "&SSBM=" + ssbm;
	send_request_update(_base_context+"/server/fpgl/fpxxcx/userList.jsp", post,
			$F("userList"));
}

var dataListUrl = window.location.href.substr(0, window.location.href.indexOf("?")|| window.location.href.length);

// [Cookie] Sets value in a cookie
function setCookie(cookieName, cookieValue, expires, path, domain, secure) {
	return;
	if (!expires) {
		d = new Date();
		d.setDate(d.getDate() + 7);
		expires = d;
	}
	document.cookie = escape(dataListUrl + cookieName) + '='
			+ escape(cookieValue)
			+ (expires ? '; expires=' + expires.toGMTString() : '')
			+ (path ? '; path=' + path : '')
			+ (domain ? '; domain=' + domain : '') + (secure ? '; secure' : '');
};
function setCookie2(cookieName, cookieValue, expires, path, domain, secure) {
	if (!expires) {
		d = new Date();
		d.setDate(d.getDate() + 7);
		expires = d;
	}
	document.cookie = escape(dataListUrl + cookieName) + '='
			+ escape(cookieValue)
			+ (expires ? '; expires=' + expires.toGMTString() : "")
			+ (path ? '; path=' + path : '')
			+ (domain ? '; domain=' + domain : '') + (secure ? '; secure' : '');
};

function getCookie(cookieName) {
	return;
	cookieName = dataListUrl + cookieName;
	var cookieValue = '';
	var posName = document.cookie.indexOf(escape(cookieName) + '=');
	if (posName != -1) {
		var posValue = posName + (escape(cookieName) + '=').length;
		var endPos = document.cookie.indexOf(';', posValue);
		if (endPos != -1)
			cookieValue = unescape(document.cookie.substring(posValue, endPos));
		else
			cookieValue = unescape(document.cookie.substring(posValue));
	}
	return (cookieValue);
};
function getCookie2(cookieName) {
	cookieName = dataListUrl + cookieName;
	var cookieValue = '';
	var posName = document.cookie.indexOf(escape(cookieName) + '=');
	if (posName != -1) {
		var posValue = posName + (escape(cookieName) + '=').length;
		var endPos = document.cookie.indexOf(';', posValue);
		if (endPos != -1)
			cookieValue = unescape(document.cookie.substring(posValue, endPos));
		else
			cookieValue = unescape(document.cookie.substring(posValue));
	}
	return (cookieValue);
};

function include_css(css_file) {
	var css;
	var html_doc = document.getElementsByTagName('head')[0];
	css = document.createElement('link');
	css.setAttribute('rel', 'stylesheet');
	css.setAttribute('type', 'text/css');
	css.setAttribute('href', css_file);
	if (css_file.indexOf("?") != -1) {
		css.setAttribute('href', css_file + "&qxxkdm="
				+ request.QueryString("qxxkdm"));
	} else {
		css.setAttribute('href', css_file + "?qxxkdm="
				+ request.QueryString("qxxkdm"));
	}
	html_doc.appendChild(css);

	// alert state change
	css.onreadystatechange = function() {
		if (css.readyState == 'complete') {
			// alert('CSS onreadystatechange fired');
		}
	}
	css.onload = function() {
		// alert('CSS onload fired');
	}
	return false;
}

function include_js(file, target) {
	var js;
	if (target == undefined) {
		target = self;
	}
	var html_doc = target.document.getElementsByTagName('head')[0];
	js = target.document.createElement('script');
	js.setAttribute('type', 'text/javascript');
	if (file.indexOf("?") != -1) {
		js.setAttribute('src', file + "&qxxkdm="
				+ request.QueryString("qxxkdm"));
	} else {
		js.setAttribute('src', file + "?qxxkdm="
				+ request.QueryString("qxxkdm"));
	}
	html_doc.appendChild(js);

	js.onreadystatechange = function() {
		if (js.readyState == 'complete') {
			// alert('JS onreadystate fired');
		}
	}

	js.onload = function() {
		// alert('JS onload fired');
	}
	return false;
}

function showMDialog(url, param) {
	var obj = window.event.srcElement;
	var qxxkdm = request.QueryString("qxxkdm");
	if (obj.qxxkdm)
		qxxkdm = obj.qxxkdm;

	var dtParams = "";
	if (obj.tagName == "INPUT") {
		dtParams = encodeParam($F("dtParams") ? $FV("dtParams") : "");
	} else {
		obj = getParent(obj, "SPAN");
		dtParams = obj.dtParams;
	}
	if (dtParams == undefined) {
		dtParams = encodeParam($FV("dtParams"));
	}
	if (url.indexOf("?") == -1) {
		url = url + "?qxxkdm=" + qxxkdm + "&" + dtParams;
	} else {
		url = url + "&qxxkdm=" + qxxkdm + "&" + dtParams;
	}
	return window.showModalDialog(url, window, param
			|| 'dialogWidth:700px;dialogHeight:400px;');
}

function showMDialogRefresh(url, param) {
	var obj = window.event.srcElement;
	var qxxkdm = obj.qxxkdm;
	var dtParams = "";
	if (obj.tagName == "INPUT") {
		dtParams = encodeParam($F("dtParams") ? $FV("dtParams") : "");
	} else {
		obj = getParent(obj, "SPAN");
		dtParams = obj.dtParams;
	}
	if (dtParams == undefined) {
		dtParams = encodeParam($FV("dtParams"));
	}
	if (url.indexOf("?") == -1) {
		url = url + "?qxxkdm=" + qxxkdm + "&" + dtParams;
	} else {
		url = url + "&qxxkdm=" + qxxkdm + "&" + dtParams;
	}
	window.showModalDialog(url, window, param || 'dialogWidth:650px;');

	window.location.reload();
}

function encodeParam(param) {
	c = param.split("&");
	var page = "";
	for (i = 0, len = c.length; i < len; i++) {
		c[i] = c[i].substr(0, c[i].indexOf("=") + 1)
				+ escape(c[i].substr(c[i].indexOf("=") + 1));
		page = page + c[i] + "&";
	}
	return page;
}

function getCurrentTime() {
	var now = new Date();
	var hh = now.getHours();
	var mm = now.getMinutes();
	var ss = Math.floor((now.getTime() % 60000) / 1000);
	return hh + ":" + mm + ":" + ss
}

function formatTime(longTime) {
	tmp = parseFloat(longTime);
	s = tmp % 60;
	m = Math.floor(tmp / 60);
	h = Math.floor(m / 60);
	m = m % 60;
	return h + ":" + m + ":" + s;
}

//查看客户信息基本
function khxxView(qxxkdm, khbh) {
	var url='/server/CRM/public/jsp/khgl/tabbar.jsp?qxxkdm='+qxxkdm+'&KHBH='+khbh;
	var iTop = (window.screen.availHeight-600+100)/2;       //获得窗口的垂直位置;
	var iLeft = (window.screen.availWidth-900+100)/2;           //获得窗口的水平位置;
	var height = '700';
	var width = '800';
	var param = 'height=' + height +',width=' + width +'top='+iTop+',left='+iLeft+ ',toolbar=no,menubar=no,scrollbars=yes, resizable=yes,location=no, status=no';
	window.open(url, "", param);
}

function addValue(id, value, connect) {
	var tmp = $F(id);
	if (connect == undefined || connect == null) {
		connect = '';
	}
	if (tmp) {
		if ((connect + tmp.value + connect).indexOf(connect + value + connect) == -1) {
			if (tmp.value == '') {
				tmp.value = tmp.value + value;
			} else {
				tmp.value = tmp.value + connect + value;
			}
		}
	}
}

function viewList(url, param) {
	if (url != "") {
		if (param != "") {
			self.location = url + "?" + param;
		} else {
			self.location = url;
		}
	}
}
// 查询跟踪单、服务单、派工单、电话单信息视图 yang sheng tao
function gzdfwdpgdtelView(qxxkdm, djid) {
	var showx, showy;
	showx = (window.screen.width - 800) / 2;
	showy = (window.screen.height - 650) / 2;
	// window.open('/server/fwgl/common/gzd_fwd_pgd_tel.jsp?qxxkdm=' + qxxkdm +
	// '&DJIDG=' + djid,"单据详细信息",'height=620, width=800, top=' + showy +',
	// left=' + showx + ', toolbar=no, menubar=no, scrollbars=yes,
	// resizable=yes,location=no, status=no');

	window
			.open('/server/fwgl/common/gzd_fwd_pgd_tel.jsp?qxxkdm=' + qxxkdm
					+ '&DJID=' + djid, "单据详细信息",
					'toolbar=no, menubar=no, scrollbars=yes, resizable=yes,location=no, status=no');

}
// 查询跟踪单、回访单 信息视图 yang sheng tao
function gzdhfdView(qxxkdm, djid) {
	var showx, showy;
	showx = (window.screen.width - 800) / 2;
	showy = (window.screen.height - 650) / 2;
	// window.open('/server/fwgl/common/gzd_fwd_pgd_tel.jsp?qxxkdm=' + qxxkdm +
	// '&DJIDG=' + djid,"单据详细信息",'height=620, width=800, top=' + showy +',
	// left=' + showx + ', toolbar=no, menubar=no, scrollbars=yes,
	// resizable=yes,location=no, status=no');

	window
			.open('/server/fwgl/common/gzd_hfd.jsp?qxxkdm=' + qxxkdm + '&DJID='
					+ djid, "单据详细信息",
					'toolbar=no, menubar=no, scrollbars=yes, resizable=yes,location=no, status=no');

}
// 格式化行政区域代码
function getShotDm(str_dm) {
	var tmp = str_dm;
	while (tmp && tmp.substring(tmp.length - 2) == "00") {
		tmp = tmp.substring(0, tmp.length - 2);
	}
	return tmp;
}
// 显示新客户录入界面模态对话框
function xkhlr(qxxkdm, sjly_dm) {
	if (sjly_dm != null)
		var sjly = "&SJLY_DM=" + sjly_dm;
	var ret = window.showModalDialog(
			'/inc/platform/jsp/khlr/khxxlr.jsp?qxxkdm=' + qxxkdm + sjly,
			window, 'dialogWidth:700px;dialogHeight:300px;');
	return ret;
}
function openNew(url, title) {
	var showx, showy;
	showx = (window.screen.width - 800) / 2;
	showy = (window.screen.height - 650) / 2;

	window
			.open(
					url,
					title,
					'height=620, width=800, top='
							+ showy
							+ ', left='
							+ showx
							+ ', toolbar=no, menubar=no, scrollbars=yes, resizable=yes,location=no, status=no')

}

/* 数字转换为中文大写 */
function Transform(num) {
	if (isNaN(num)) {
		alert('请检查小写金额是否正确!');
		return;
	} else {
		// num1保存用来以后判断金额是否为负。
		num1 = num;
		// 保留两位有效数字并去除负数的负号（负号在len中也占一位）。
		num = Math.abs(Math.round(num * Math.pow(10, 2)) / Math.pow(10, 2));
	}
	var NumStr = String(num);
	var NumChar = '零壹贰叁肆伍陆柒捌玖';
	var UnitChar1 = ' 拾佰仟 拾佰仟 拾佰仟 拾佰仟';
	var UnitChar2 = ' 万亿兆';
	var Len;
	var LeftLen, LeftStr;
	var RightLen, RightStr;
	var BigStr = '';
	Len = NumStr.length;
	// 根据小数点分割字符串
	if (NumStr.indexOf('.') == -1)// 没有小数
	{
		LeftStr = NumStr;
		LeftLen = Len;
		RightStr = '';
		RightLen = 0;
	} else {
		LeftStr = (NumStr.split('.'))[0];
		LeftLen = LeftStr.length;
		RightStr = (NumStr.split('.'))[1];
		RightLen = RightStr.length;
	}
	// 转换整数部分
	for ( var i = 0; i < LeftLen; i++) {
		// 按位取小写数字
		var LeftTempNum = parseInt(LeftStr.substring(i, i + 1));
		// 转换成大写
		var LeftTempStr = NumChar.substring(LeftTempNum, LeftTempNum + 1);
		// 数字位为零且不是一位数
		if (LeftTempStr == '零' && LeftLen != 1) {
			// 下一位数字为零或者为万(个)位
			if (LeftStr.substring(i + 1, i + 2) == '0'
					|| (LeftLen - i) % 4 == 1) {
				LeftTempStr = '';
			}
		} else {
			// 加上读的单位，拾佰仟之类的
			LeftTempStr += UnitChar1.substring(LeftLen - i - 1, LeftLen - i)
					.replace(' ', '');
		}
		// 万位或个位
		if ((LeftLen - i) % 4 == 1) {
			LeftTempStr += UnitChar2.substring(parseInt((LeftLen - i) / 4),
					parseInt((LeftLen - i) / 4) + 1);
			if (i > 2) {
				if (LeftStr.substring(i - 3, i + 1) == '0000') {
					LeftTempStr = LeftTempStr.substring(0,
							LeftTempStr.length - 1);
				}
			}
		}
		BigStr += LeftTempStr.replace(' ', '');
	}
	// 处理小数部分
	if (RightLen == 0) {
		BigStr += '元整';
	} else {
		BigStr += '元';
		for ( var i = 0; i < RightLen; i++) {
			// 按位取小写数字
			var RightTempNum = parseInt(RightStr.substring(i, i + 1));
			// 转换成大写
			var RightTempStr = NumChar
					.substring(RightTempNum, RightTempNum + 1);
			if (i == 0) {
				RightTempStr += "角";
			}
			if (i == 1) {
				RightTempStr += "分";
			}
			BigStr += RightTempStr;
		}
	}
	return "人民币" + (parseFloat(num1) < 0 ? '负' : '') + BigStr;
}

/**
 * 动态加载js代码
 */
function getDmFormLeft(dmName) {
	var i = 0;
	if (eval("top.FRM_LEFT." + dmName) == undefined) {
		include_js(_base_context+"/inc/platform/js/dm/spellCode/" + dmName + ".jsp",
				top.FRM_LEFT);
		include_js(_base_context+"/inc/platform/js/dm/spellCode/" + dmName + ".jsp");
		return null;
	}
	return eval("top.FRM_LEFT." + dmName);
}
/**
 * 判断对象是否为空串 调用方法：对象.isEmpty();空串返回true,否则返回false
 */
String.prototype.isEmpty = function() {
	return /^\s*$/.test(this);
}

// 实现replaceAll的方法
String.prototype.replaceAll = function(s1, s2) {
	return this.replace(new RegExp(s1, "gm"), s2);
}

String.prototype.trim = function() {
	return this.replace(/(^[\s]*)|([\s]*$)/g, "");
}

// 查看授权文件信息
function viewSqwj(param) {
	window.showModalDialog('/server/sqwjgl/yccbsq/khdj/viewSqwj.jsp?qxxkdm='
			+ request.QueryString("qxxkdm") + '&' + param, window,
			'dialogWidth:700px;dialogHeight:400px;');
}

// 查看客户核实信息
function viewKhhs(param) {
	window.showModalDialog('/server/khgl/xxcj/khxxhs/khhscx_view.jsp?qxxkdm='
			+ request.QueryString("qxxkdm") + '&' + param, window,
			'dialogWidth:700px;dialogHeight:300px;');
}

function calculate() {
	var objs = document.getElementsByTagName("SPAN");
	for (i = 0; i < objs.length; i++) {
		if (objs[i].calculator) {
			try {
				str = round(eval(objs[i].calculator), 2).toString();

				if (str.indexOf('Infinity') != -1 || str.indexOf('NaN') != -1)
					objs[i].innerText = '0';
				else
					objs[i].innerText = str;
			} catch (e) {
				alert(e);
			}
		}

	}
}
function round(number, x) {
	return Math.round(number * Math.pow(10, x)) / Math.pow(10, x);
}
function checkHours(hour, message) {

	var patrn = /^\d+$/;
	if (!patrn.test(hour)) {
		alert(message + '应为0到23的数字');
		return false;
	}
	if (hour.length == 1) {
		return true;
		// return '0'+hour;
	}
	if (hour.length == 2) {
		if (hour.substr(0, 1) == 0) {
			return true;
			// return hour;
		} else {
			if (parseInt(hour) < 0 || parseInt(hour) > 23) {
				alert(message + '应为0到23的数字');
				return false;
			} else {
				return true;
				// return hour;
			}
		}
	}
}
function checkMinutes(minute, message) {
	var patrn = /^\d+$/;
	if (!patrn.test(minute)) {
		alert(message + '应为0到59的数字');
		return false;
	}
	if (minute.length == 1) {
		return true;
		// return '0'+minute;
	}
	if (minute.length == 2) {
		if (minute.substr(0, 1) == 0) {
			return true;
			// return minute;
		} else {
			if (parseInt(minute) < 0 || parseInt(minute) > 59) {
				alert(message + '应为0到59的数字');
				return false;
			} else {
				return true;
				// return minute;
			}
		}
	}

}

// 判断字符串是否是数字，是数字返回true，不是数字返回false。
function isNumber(str) {
	var m = /^\d+$/;
	if (!m.test(str)) {
		return false;
	}
	return true;
}

// 判断字符串是否是字母，是字母返回true，不是字母返回false。
function isString(str) {
	var m = /^[a-zA-Z]+$/;
	if (!m.test(str)) {
		return false;
	}
	return true;
}

// <!-- 纳税人识别号是否正确 -->
function checkId(str) {

	var reg = /^(([A-Za-z0-9]{15})|([A-Za-z0-9]{18})|([A-Za-z0-9]{20}))$/;
	if (arr = str.match(reg)) {
		return true;
	} else {
		alert("请输入正确的纳税人识别号格式，匹配长度为15、18或者20,由字母或者数字");
		return false;
	}
}

/**
 * 清除一个form文本框已输入的内容
 */
function clearAll(form) {
	if (form) {
		var objs = form.all;
		for (i = 0; i < objs.length; i++) {
			if (objs[i].tagName == 'INPUT' && objs[i].type == 'text') {
				setValue(objs[i].name, '');
			}
		}
	}
}

/* 求两个日期相差的天数 */
function DateDiff(sDate1, sDate2) { // sDate1和sDate2是2002-12-18格式
	var aDate, oDate1, oDate2, iDays
	aDate = sDate1.split("-")
	oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]) // 转换为12-18-2002格式
	aDate = sDate2.split("-")
	oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
	iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24) // 把相差的毫秒数转换为天数
	return iDays + 1
}

function showNoResult() {
	alert("未找到满足条件的数据！");
}
/* 列表框选择 */
function append(obj1, obj2) {
	var strvalue = $FV(obj1);
	if (strvalue == "") {
		return;
	}
	var strtext = $F(obj1).options[$F(obj1).selectedIndex].text;
	var obj = $F(obj1);
	var obj2 = $F(obj2);
	obj.options.remove($F(obj1).selectedIndex);
	var oOption = document.createElement("OPTION");
	obj2.options.add(oOption);
	oOption.innerText = strtext;
	oOption.value = strvalue;
}

/* 取出以逗号分隔的字符串中相同的项 */
function charunion(str) {
	var oldValue = new Array();
	var newValue = new Array();
	if (str == "" || str == "undefined" || str == undefined) {
		return;
	}

	oldValue = str.split(",");
	if (oldValue.length < 2) {
		return str;
	}
	for (t = 0; t < oldValue.length; t++) {
		if (!compare(oldValue[t], newValue)) {
			newValue.push(oldValue[t]);
		}
	}
	return newValue;
}

/*
 * 方法：比对字符串是否存在于数组 参数1：str 需要比对的字符串 参数2：arrayValue 比对的数组
 */
function compare(str, arrayValue) {
	// 数组为空
	if (arrayValue.length < 0) {
		return false;
	}
	// 判断str是否存在于数组
	for (i = 0; i < arrayValue.length; i++) {
		if (str == arrayValue[i]) {
			return true;
		}
	}
	return false;
}

/* 下拉列表框动态添加选项 */
function addOption(obj, mac) {
	var obj2 = document.getElementById(obj);
	var length = obj2.length;
	for ( var j = length - 1; j >= 0; j--) {
		obj2.options.remove(j);
	}
	for ( var i = 0; i < mac.length; i++) {
		var oOption = document.createElement("OPTION");
		obj2.options.add(oOption);
		oOption.innerText = mac[i];
		oOption.value = mac[i];
	}
}

function clearForm(formName) {
	var formObj = document.forms[formName];
	var formEl = formObj.elements;
	for ( var i = 0; i < formEl.length; i++) {
		var element = formEl[i];
		if (element.type == 'submit') {
			continue;
		}
		if (element.type == 'reset') {
			continue;
		}
		if (element.type == 'button') {
			continue;
		}
		if (element.type == 'hidden') {
			continue;
		}
		if (element.type == 'text') {
			element.value = '';
		}
		if (element.type == 'textarea') {
			element.value = '';
		}
		if (element.type == 'checkbox') {
			element.checked = false;
		}
		if (element.type == 'radio') {
			element.checked = false;
		}
		if (element.type == 'select-multiple') {
			element.selectedIndex = -1;
		}
		if (element.type == 'select-one') {
			element.selectedIndex = -1;
		}
	}
}

function setdataCheck(obj) { // alert(obj.name)
	var objs = document.getElementsByName(obj.name);
	for (i = 0; i < objs.length; i++) {
		if (objs[i] != obj) {
			if (objs[i].disabled == false) {
				objs[i].checked = false;
			}
		}
	}
}

/* 根据部门或者客户经理客户记录 */
var awidth = screen.availWidth / 6 * 4;
var aheight = screen.availHeight / 6 * 5;
var atop = (screen.availHeight - aheight) / 2;
var aleft = (screen.availWidth - awidth) / 2;
function viewKHS(qxxkdm, jbdm, gszgry_dm) {
	var newwin = window
			.open(
					_base_context+"/inc/platform/jsp/viewKHS.jsp?qxxkdm=" + qxxkdm + "&JBDM="
							+ jbdm + "&GSZGRY_DM=" + gszgry_dm,
					"maxwindow",
					"width=800,height=600,top="
							+ atop
							+ ",left="
							+ aleft
							+ ",toolbar=no,location=no,directories=no,menubar=no,scrollbars=yes,resizable=yes,status=yes");
}

/* 根据部门或者客户经理客户开票机数 */
function viewKPJS(qxxkdm, jbdm, gszgry_dm) {
	var newwin = window
			.open(
					_base_context+"/inc/platform/jsp/viewKPJS.jsp?qxxkdm=" + qxxkdm
							+ "&JBDM=" + jbdm + "&GSZGRY_DM=" + gszgry_dm,
					"maxwindow",
					"width=800,height=600,top="
							+ atop
							+ ",left="
							+ aleft
							+ ",toolbar=no,location=no,directories=no,menubar=no,scrollbars=yes,resizable=yes,status=yes");
}

function showUserTree(dmName, mcName, zzjgDm, isMulti, isAll) {
	var rtnMsg = showMDialog(_base_context+"/inc/platform/jsp/userChoose/userTreeMain.jsp?isMulti="
			+ isMulti + "&isAll=" + isAll);
	if (rtnMsg) {
		if (rtnMsg.charAt(0) == "{") {
			eval("temp=" + rtnMsg);
			$F(dmName).value = temp.id.split("_")[0];
			$F(zzjgDm).value = temp.id.split("_")[1];
			$F(mcName).innerHTML = temp.text;
		} else {
			array = eval(rtnMsg);
			var tmpDm = "";
			var tmpZzjgDm = "";
			var tmpMc = "";
			for (i = 0; i < array.length; i++) {
				tmpMc = tmpMc + array[i].text.split("/")[0] + ",";
				tmpDm = tmpDm + array[i].id.split("_")[1] + ",";
				tmpZzjgDm = tmpZzjgDm + array[i].id.split("_")[0] + ",";
			}
			if (tmpMc.charAt(tmpMc.length - 1) == ",") {
				tmpMc = tmpMc.substring(0, tmpMc.length - 1);
			}
			if (tmpDm.charAt(tmpDm.length - 1) == ",") {
				tmpDm = tmpDm.substring(0, tmpDm.length - 1);
			}
			if (tmpZzjgDm.charAt(tmpZzjgDm.length - 1) == ",") {
				tmpZzjgDm = tmpZzjgDm.substring(0, tmpZzjgDm.length - 1);
			}
			$F(dmName).value = tmpDm;
			$F(zzjgDm).value = tmpZzjgDm;
			$F(mcName).innerHTML = tmpMc;
		}
	} else {
		$F(dmName).value = "";
		$F(zzjgDm).value = "";
		$F(mcName).innerHTML = "";
	}
}
function showGwTree(dmName, mcName, zzjgDm, isMulti) {
	var rtnMsg = showMDialog(_base_context+"/inc/platform/jsp/gwChoose/gwTreeMain.jsp?isMulti="
			+ isMulti);
	if (rtnMsg) {
		if (rtnMsg.charAt(0) == "{") {
			eval("temp=" + rtnMsg);
			$F(dmName).value = temp.id.split("_")[0];
			if(zzjgDm){
				$F(zzjgDm).value = temp.id.split("_")[1];
			}
			if($F(mcName).nodeName=="INPUT"){
				$F(mcName).value = temp.text;
			}else{
				$F(mcName).innerHTML = temp.text;
			}
		} else {
			array = eval(rtnMsg);
			var tmpDm = "";
			var tmpZzjgDm = "";
			var tmpMc = "";
			for (i = 0; i < array.length; i++) {
				tmpMc = tmpMc + array[i].text.split("/")[0] + ",";
				tmpDm = tmpDm + array[i].id.split("_")[1] + ",";
				tmpZzjgDm = tmpZzjgDm + array[i].id.split("_")[0] + ",";
			}
			if (tmpMc.charAt(tmpMc.length - 1) == ",") {
				tmpMc = tmpMc.substring(0, tmpMc.length - 1);
			}
			if (tmpDm.charAt(tmpDm.length - 1) == ",") {
				tmpDm = tmpDm.substring(0, tmpDm.length - 1);
			}
			if (tmpZzjgDm.charAt(tmpZzjgDm.length - 1) == ",") {
				tmpZzjgDm = tmpZzjgDm.substring(0, tmpZzjgDm.length - 1);
			}
			$F(dmName).value = tmpDm;
			if(zzjgDm){
				$F(zzjgDm).value = tmpZzjgDm;
			}
			if($F(mcName).nodeName=="INPUT"){
				$F(mcName).value = tmpMc;
			}else{
				$F(mcName).innerHTML = tmpMc;
			}
		}
	} else {
		$F(dmName).value = "";
		if(zzjgDm){
			$F(zzjgDm).value = "";
		}
		if($F(mcName).nodeName=="INPUT"){
			$F(mcName).value = "";
		}else{
			$F(mcName).innerHTML = "";
		}
	}
}

/*
 * 日期函数(获取上一天或后一天)
 */
function getDateTime(currenttime, value) {
	var inputTime = currenttime;
	var inputTimeValue = new Date(inputTime.value.replace("-", "/"));
	inputTimeValue.setDate(inputTimeValue.getDate() + value);
	inputTime.value = (inputTimeValue.getYear()) + "-"
			+ (inputTimeValue.getMonth() + 1) + "-"
			+ (inputTimeValue.getDate());
}

// 得到前N天或后N天的日期
function Adddate(startdate, n) {
	var uom = new Date(new Date(startdate) - 0 + n * 86400000);
	uom = uom.getFullYear() + "-" + (uom.getMonth() + 1) + "-" + uom.getDate();
	return uom;
}
//实现Rep_tab的颜色间变
if(typeof jQuery != 'undefined'){
	$(document).ready(function(){
		$(".Rep_tab tr").each(function(index){
			if(index>0&&index%2==0&&!$(this).attr("class")){
				$(this).addClass("Tab2");
			}
			$(this).mouseover(function(){
				$(this).addClass("Tab_Focus");
			});
			$(this).mouseout(function(){
				$(this).removeClass("Tab_Focus");
			});
		});
		 //设置readonly的input样式
		$("input:text[readonly=readonly]").each(function(){
    		$(this).addClass("readonly");
    	});
    	//设置所有有title的input，增加tip提示
		$("input:[title]").each(function(){
    		$(this).poshytip({
				//className: 'tip-yellowsimple',
				showOn: 'focus',
				alignTo: 'target',
				alignX: 'inner-left',
				alignY: 'bottom',
				offsetX: 0,
				offsetY: 5
			});
    	});
		$("textarea:[title]").each(function(){
    		$(this).poshytip({
				//className: 'tip-yellowsimple',
				showOn: 'focus',
				alignTo: 'target',
				alignX: 'inner-left',
				alignY: 'bottom',
				offsetX: 0,
				offsetY: 5
			});
    	});
    	//设置所有 radio增加样式check_radio
    	$("input:radio").each(function(){
    		$(this).addClass("check_radio");
    	});
    	//设置所有 checkbox增加样式check_radio
    	$("input:checkbox").each(function(){
    		$(this).addClass("check_radio");
    	});
	});
}else{
	include_js(_base_context+"/inc/platform/js/jQuery/jquery-1.7.2.min.js");
}


//控制字体大小
function doZoom(size) {
    switch (size) {
        case 12:
            $(".info_text *").css({"font-size":"12px","line-height":"180%"});
            break;
        case 14:
            $(".info_text *").css({"font-size":"14px","line-height":"180%"});
            break;
        case 16:
            $(".info_text *").css({"font-size":"16px","line-height":"180%"});
            break;
    }
}

//控制字体颜色
function docolor(colorVal) {
    $(".info_text").css({"color":colorVal});
    $(".info_text *").css({"color":colorVal});
}

