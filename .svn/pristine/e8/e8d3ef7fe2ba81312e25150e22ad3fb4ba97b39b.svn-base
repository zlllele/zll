//depend on pubjs.js
//********************************************权限代码*********************************************************
/**
 */
$(function() {
	QX.initQX();
});
var QX = (function() {
	var curSeg = {};
	var showQxDiv = false;

	return {
		F : function(id) {
			return document.getElementById(id);
		},
		FV : function(id) {
			return document.getElementById(id).value();
		},
		initQX : function() {
			curSeg = QX;
			if (window.addEventListener)
				window.addEventListener("load", curSeg.initQxxk, false);
			else if (window.attachEvent)
				window.attachEvent("onload", curSeg.initQxxk);
		},
		loadTableBar : function(rows) {
			var tabbar = new dhtmlXTabBar("tabbarDiv", "top");
			tabbar.setMargin("0");
			tabbar.setOffset("100");
			tabbar.enableAutoReSize("true");
			tabbar.setImagePath("../js/dhtmlxtabbar/imgs/");
			var tabbarXmlStr = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><tabbar hrefmode=\"iframe\"><row>";
			for ( var i = 0; i < rows.length; i++) {
				tabbarXmlStr += "<tab id=\""
						+ rows[i].MKXKID
						+ "\" width=\"80px\" selected=\""
						+ (i == 0 ? "1" : "")
						+ "\" href=\"../../../"
						+ rows[i].MKXK_URL.replace('&', '&amp;')
						+ ((rows[i].MKXK_URL.indexOf("?") == -1) ? "?"
								: "&amp;")
						+ "qxxkdm="
						+ rows[i].MKXKID
						+ "&amp;"
						+ window.location.href
								.substr(window.location.href.indexOf("?") + 1)
								.replace(
										'qxxkdm='
												+ baseTools
														.getUrlQueryString('qxxkdm'),
										'').replace(/&/ig, '&amp;') + "\">"
						+ rows[i].MKXK_MC + "</tab>";
			}
			tabbarXmlStr += "</row></tabbar>";
			tabbar.loadXMLString(tabbarXmlStr);
		},
		// 初始化权限许可，包括权限校验
		initQxxk : function() {
			curSeg = QX;
			var qxxkdm = baseTools.getUrlQueryString("qxxkdm");
			if (qxxkdm == null || qxxkdm == undefined) {
				alert("非法访问，请登录");
				self.location.href = ("/index.jsp");
				return;
			}

			// 登录时加载菜单
			var qxxkarray = jdglTools.getQxxkdmarray();// .parseJSON(jdglTools.getCookie("qxxk"));//
														// 当前用户所有的权限许可--left.jsp中执行的
			var myqxxkdms = jdglTools.getMyqxxkdms();// 当前用户所有的权限许可ID
			var logqxxkdms;// =
			// mainFRM.FRM_LEFT.logqxxkdms;//当前用户需要记录查询日志的所有权限许可ID

			if (qxxkdm.indexOf("#") != -1) {
				qxxkdm = qxxkdm.substring(0, qxxkdm.indexOf("#"));
			}
			if (qxxkdm == null || qxxkdm == "" || qxxkdm == "null") {
				url = window.location.href;
				url = url.replace(mainFRM.location.href
						.replace("/main.htm", ""), "");
				for ( var i = 0; i < qxxkarray.length; i++) {
					if (qxxkarray[i].mkxk_url == url) {
						qxxkdm = qxxkarray[i].mkxkid;
						break;
					}
				}
			}
			if (myqxxkdms.indexOf("#" + qxxkdm + "#") == -1) // 判断是否是在浏览器地址直接输入带qxxkdm参数的URL登录无权限的模块，若是则强制退出
			{
				alert("非法访问，请登录");
				self.location.href = ("/index.jsp");
				return;
			}

			try {
				if (logqxxkdms.indexOf('_' + qxxkdm + '_') != -1) {// 在系统中进行了配置，需要进行查询的记录
					var jspname = window.location.href.substring(
							window.location.href.lastIndexOf("/") + 1,
							window.location.href.indexOf("?"));
					// send_request("/inc/platform/jsp/qxxkFwqk.jsp","mkxkid="+qxxkdm+"&CURURL="+jspname,dealQxxkFwqk);
					if (typeof jQuery != 'undefined') {
						$.ajax({
							url : "/inc/platform/jsp/qxxkFwqk.jsp?mkxkid="
									+ qxxkdm + "&CURURL=" + jspname
						});
					}
				}
			} catch (e) {
			}

			var tabRows = new Array();
			var hidInput = new Array();// 查看是否有hidden的qxxkdm之Input，没有则为其生成一个以传递参数-------begin
			for (i = 0; i < document.forms.length; i++) {
				if (document.forms[i].qxxkdm) {
					hidInput[i] = document.forms[i].qxxkdm;
					document.forms[i].qxxkdm.value = qxxkdm;
				} else {
					hidInput[i] = document.createElement("INPUT");
					hidInput[i].type = "hidden";
					hidInput[i].id = "qxxkdm";
					hidInput[i].name = "qxxkdm";
					hidInput[i].value = qxxkdm;
					document.forms[i].appendChild(hidInput[i]);
				}
			}

			if (hidInput.length == 0) {
				i = 0;
				hidInput[i] = document.createElement("INPUT");
				hidInput[i].type = "hidden";
				hidInput[i].id = "qxxkdm";
				hidInput[i].name = "qxxkdm";
				hidInput[i].value = qxxkdm;
				document.body.appendChild(hidInput[i]);
			}

			objs = document.getElementsByTagName("INPUT");
			for (i = 0; i < objs.length; i++) {
				if (objs[i].type.toUpperCase() == "BUTTON"
						|| objs[i].type.toUpperCase() == "SUBMIT") {
					if (!objs[i].qxxkdm) {
						objs[i].qxxkdm = qxxkdm;
					}
					if (objs[i].skip) {
						continue;
					}

					if (window.addEventListener)
						objs[i].addEventListener('onclick',
								QX.setQxxkCurrentDm, false);
					else if (window.attachEvent)
						objs[i].attachEvent('onclick', QX.setQxxkCurrentDm);
				}
			}// 查看是否有hidden的qxxkdm之Input，没有则为其生成一个以传递参数-------end

			objs = document.getElementsByTagName("A");
			for (i = 0; i < objs.length; i++) {
				if (objs[i].href) {
					str = objs[i].href.substr(objs[i].href.length - 1);
					if (str != ";" && str != ")") {
						if (objs[i].href.indexOf("?") == -1) {
							objs[i].href = objs[i].href + "?qxxkdm=" + qxxkdm;
						} else {
							objs[i].href = objs[i].href + "&qxxkdm=" + qxxkdm;
						}
					}
				}
			}

			var param = "";
			if (window.location.href.indexOf("?") != -1)
				param = window.location.href.substr(window.location.href
						.indexOf("?") + 1);
			if (param.indexOf("qxxkdm") != -1) {
				param = param.replace("qxxkdm="
						+ baseTools.getUrlQueryString("qxxkdm"), "");
				while (param.indexOf("&&") != -1) {
					param = param.replace(/&&/ig, "&");
				}
			}

			var str2 = "";

			for (i = 0; i < qxxkarray.length; i++) {
				// alert((qxxkarray[i].SJ_MKXKID == qxxkdm) + " qxxkdm"
				// +qxxkarray[i].MKXKID)
				if (qxxkarray[i].SJ_MKXKID == qxxkdm
						&& qxxkarray[i].XYBZ != 'N') {
					var ljmc = qxxkarray[i].MKXK_URL;
					if (ljmc.indexOf('?') != -1) {
						param += "&" + ljmc.substr(ljmc.indexOf('?'));
						ljmc = ljmc.substring(0, ljmc.indexOf("?") - 1);
					}
					if (qxxkarray[i].JDFL_DM == "041") {// 普通按钮
						obj = document.createElement("INPUT");
						obj.name = "bt" + qxxkarray[i].MKXKID;
						obj.type = "button";
						obj.className = "bt1";
						obj.qxxkdm = qxxkarray[i].MKXKID;
						obj.value = qxxkarray[i].MKXK_MC;
						url = "'" + ljmc + "?" + param + "&qxxkdm="
								+ qxxkarray[i].MKXKID + "'";
						obj.act = "QX.setQxxkCurrentDm();self.location=\""
								+ ljmc + "?" + param + "&qxxkdm="
								+ qxxkarray[i].MKXKID + "\"";
						obj.onclick = function() {
							eval(this.act);
						};

						if (document.getElementById("qx") != null) {
							//
							if (document.getElementById("qx").wz
									&& document.getElementById("qx").wz == 'f'
									&& document.getElementById("qx").firstChild) {
								document
										.getElementById("qx")
										.insertBefore(
												obj,
												document.getElementById("qx").firstChild);
							} else {
								document.getElementById("qx").appendChild(obj);
							}
						}
						showQxDiv = true;
						// str+="<input type='button' class='bt1'
						// qxxkdm='"+qxxkarray[i].qxxkdm+"' name='b"+qxxkdm+"'
						// value='"+qxxkarray[i].mkxk_mc+"' ";
						// str+="
						// onclick='QX.setQxxkCurrentDm();self.location=\""+ljmc+"?"+param+"&qxxkdm="+qxxkarray[i].mkxkid+"\"'>";
					} else if (qxxkarray[i].JDFL_DM == "042") {// JS按钮
						obj = document.createElement("INPUT");
						obj.name = "bt" + qxxkarray[i].MKXKID;
						obj.type = "button";
						obj.className = "bt1";
						obj.qxxkdm = qxxkarray[i].MKXKID;
						obj.value = qxxkarray[i].MKXK_MC;
						obj.act = "QX.setQxxkCurrentDm();" + ljmc + ";";
						obj.onclick = function(url) {
							eval(this.act);
						};
						if (document.getElementById("qx") != null) {
							//
							if (document.getElementById("qx").wz
									&& document.getElementById("qx").wz == 'f'
									&& document.getElementById("qx").firstChild) {
								document
										.getElementById("qx")
										.insertBefore(
												obj,
												document.getElementById("qx").firstChild);

							} else {
								document.getElementById("qx").appendChild(obj);
							}
						}
						showQxDiv = true;
						// str+="<input type='button' class='bt1'
						// name='b"+qxxkarray[i].qxxkdm+"'
						// value='"+qxxkarray[i].mkxk_mc+"'";
						// str+=" onclick='QX.setQxxkCurrentDm();"+ljmc+"'>";
					} else if (qxxkarray[i].JDFL_DM === "043") {
						str2 += "<a qxxkdm='" + qxxkarray[i].MKXKID
								+ "' style='cursor:hand'";
						str2 += " onclick=\"self.location='" + ljmc
								+ "?dtParams&qxxkdm=" + qxxkarray[i].MKXKID;
						if (idname != "" && values != "") {// 结合preAfter.js
							str2 += "&idname=" + idname + "&IDS=" + values;
						}
						str2 += "'\">" + qxxkarray[i].MKXK_MC + "</a> ";
					} else if (qxxkarray[i].JDFL_DM === "044") {
						str2 += "<a qxxkdm='" + qxxkarray[i].MKXKID
								+ "' style='cursor:hand'";
						var _ljmc = ljmc.replace(/'/ig, '"');
						if (_ljmc.indexOf("()") != -1) {
							_ljmc = _ljmc.replace("()", "(this)");
						} else {
							_ljmc = _ljmc.replace(")", ",this)");
						}
						str2 += " onclick='QX.setQxxkCurrentDm();" + _ljmc
								+ "'>" + qxxkarray[i].MKXK_MC + "</a> ";
					} else if (qxxkarray[i].JDFL_DM === "045") {// tab标签页
						tabRows.push(qxxkarray[i]);
					} else if (qxxkarray[i].JDFL_DM === "72") {// 大部门小项
						try {
							send_request_update(ljmc,
									QX.F('strrequest').innerText + "&qxxkdm="
											+ qxxkarray[i].MKXKID, QX
											.F('cTemp'));
						} catch (e) {
						}
					}
				}
			}
			// if(str!="")
			// document.getElementById("qx").innerHTML+=str;
			if (typeof jQuery == "undefined") {
				objs = document.getElementsByName("qxspan");
			} else {
				objs = $("span[name=qxspan]");
			}
			if (str2 != "") {
				for (i = 0; i < objs.length; i++) {
					tmp = str2;
					while (tmp.indexOf("dtParams") != -1) {
						tmp = tmp.replace("dtParams", objs[i].dtParams);
					}
					objs[i].innerHTML = tmp;
				}
			} else {
				if (objs.length > 0 && objs[0].children.length > 0) {
					for (i = 0; i < objs.length; i++) {
						for ( var j = 0; j < objs[i].children.length; j++) {
							objs[i].children[j].qxxkdm = baseTools
									.getUrlQueryString("qxxkdm");
						}
					}
				}
			}
			// 增加tab页
			if (tabRows.length > 0) {
				curSeg.loadTableBar(tabRows);
			}

			if (!showQxDiv && QX.F("qx") && QX.F("qx").innerHTML == ""
					&& QX.F("qx").tagName == 'DIV') {
				QX.F("qx").style.display = "none";
			}
		},
		// 获得当前模块的权限许可ID
		setQxxkCurrentDm : function() {
			var hidInput = document.getElementsByName("qxxkdm");
			if (window.event) {
				for ( var j = 0; j < hidInput.length; j++) {
					hidInput[j].value = window.event.srcElement.qxxkdm;
				}
			}
		},

		// 获得URL参数信息
		getParamStr : function(paramName) {
			obj = window.event.srcElement;
			var qxxkdm = obj.qxxkdm;
			var dtParams = "";
			if (obj.tagName == "INPUT") {
				if (QX.F("dtParams")) {
					dtParams = QX.FV("dtParams");
				} else {
					dtParams = window.location.href.substr(window.location.href
							.indexOf("?") + 1);
				}
			} else {
				obj = getParent(obj, "SPAN");
				dtParams = obj.dtParams;
			}
			if (dtParams.indexOf("qxxkdm") != -1) {
				dtParams = dtParams.replace("qxxkdm="
						+ baseTools.getUrlQueryString("qxxkdm"), "");
				dtParams += "&list=1";
			} else {
				dtParams = dtParams + "&qxxkdm=" + qxxkdm;
			}
			if (paramName != null && paramName != undefined && paramName != "") {
			}
			return dtParams;
		},

		// 没用到  显示帮助文件
		showHelp : function() {
			var url = window.location.href;
			var qxxkdm = "";
			var val = "qxxkdm";
			var re = new RegExp("" + val + "=([^&?]*)", "ig");
			obj = url.match(re);
			if (obj) {
				qxxkdm = obj.toString()
						.replace(new RegExp(val + "=", "ig"), "");
			}
			if (qxxkdm && qxxkdm != '') {
				var qxxkarray = top.FRM_LEFT.qxxk;
				for ( var i = 0; i < qxxkarray.length; i++) {
					if (qxxkarray[i].MKXKID == qxxkdm) {
						window.open("/help/main.jsp?mkxkid=" + qxxkdm, "help1",
								'width=800,height=600,');
					}
				}
			}
		}
	};
})();