/**
 * IE下的JS加速
 */
/*@cc_on _d=document;eval('var document=_d')@*/
/*@cc_on eval((function(props) {var code = [];for (var i = 0,l = props.length;i<l;i++){var prop = props[i];window['_'+prop]=window[prop];code.push(prop+'=_'+prop);}return 'var '+code.join(',');})('document self top parent alert setInterval clearInterval setTimeout clearTimeout'.split(' ')))@*/

/**
 * <ol>
 * date:2012-1-6 editor:yanghongjian
 * <li>创建文档</li>
 * <li>按需使用编码加载JS组件</li>
 * </ol>
 */
var documentDomain = "bwfapiao.com";
var mainDomain = "http://www.bwfapiao.com:9000";
document.domain = documentDomain;
var _curPage = window.document.location.href;
var _curPagePath = window.document.location.pathname;
var pos = _curPage.indexOf(_curPagePath);
var prePath = _curPage.substring(0, pos);
var postPath = _curPagePath.substring(0, _curPagePath.substr(1).indexOf('/') + 1);
// 站点根路径
var webRoot = prePath + postPath;

var href = window.location.href;
var host = window.location.host;
var f1 = href.substring(href.indexOf(host));
var f2 = f1.substring(f1.indexOf("/"));
var root = f2.split("/");

// alert(root)

// 获取commons路径
var INCLUDE_NAME = 'include_ui';
var COMMONS_NAME = 'commons';
var commonsJsPath;
var commonsJsUrl = "";
var includePath;
(function() {
	var path = [];
	var hds = document.getElementsByTagName("script");
	var src, ds;
	for (var i = 0; i < hds.length; i++) {
		if (hds[i].src.length > 0) {
			includePath = hds[i].getAttribute('src');
			if (includePath.indexOf(INCLUDE_NAME) != -1) {
				ds = includePath.split('/');
				for (var x = 0; x < ds.length; x++) {
					path.push(ds[x]);
					if (ds[x] == COMMONS_NAME) {
						break;
					}
				}
				break;
			}
		}
	}
	commonsJsPath = commonsJsUrl + path.join('/');
})();

(function() {
	var includeDM = 'dm';
	var re = new RegExp("" + includeDM + "=([^&?]*)", "ig");
	var dm = '';
	try {
		dm = ((includePath.match(re)) ? (includePath.match(re)[0].substr(includeDM.length + 1)) : "");
	} catch (e) {
		dm = ''
	}
	// 没有指定js代码时，只加载基础JS
	var path = [];
	if (dm.length == 0) {
		// 为指定dm时返回基础类css/JS
		path.push(getCssJsPath(commonsJsPath + "/js/", 10));
	} else {
		re = /[^13579]{1,2}/;// 表示不可以有1 3 5 7 9的1到2位的偶数
		if (!re.test(dm.length)) {
			alert('请正确使用CSS/JS编码!');
			return;
		}
		var tem;
		for (var i = 0; i < dm.length; ++i) {
			// tem = getCssJsPath(commonsJsPath + "/js/", dm[i] + dm[++i]);
			tem = getCssJsPath(commonsJsPath + "/js/", dm.charAt(i) + dm.charAt(++i));
			if (tem.length > 0)
				path.push(tem);
		}
	}
	if (path.length > 0)
		document.write(path.join(''));

})();
// 根据JS编码获取对应的js组件路径
function getCssJsPath(basePath, dm) {
	var path = [];
	switch (parseInt(dm, 10)) {
	case 10: // 基础类css/JS
		var dir = basePath;
    	var css_file = basePath + "../../commons/themes/default/main.css";
//    	if(typeof external.getCurrentDir != "undefined"){
//    		dir = "file:///" +external.getCurrentDir()+'resource/taxclient/commons/js/';
//    		dir = dir.replace(/\\/ig,"/");
//    		css_file = "file:///" +dir+'/resource/taxclient/commons/themes/default/main.css';
//    	}
    	var html_doc = document.getElementsByTagName('head')[0];
    	var css = document.createElement('link');
    	css.setAttribute('rel', 'stylesheet');
    	css.setAttribute('type', 'text/css');
    	css.setAttribute('href', css_file);
    	html_doc.appendChild(css);
//		path.push('<script src="' + basePath + 'base/cross_domain_htjs.js" type="text/javascript"></script>');
//		path.push('<link href="' + basePath + '../../commons/themes/default/main.css"  rel="stylesheet" type="text/css">');
		path.push('<script src="' + dir + 'base/jquery-1.7.1.min.js" type="text/javascript"></script>');
		path.push('<script src="' + dir + 'base/base_client_all.js" type="text/javascript"></script>');
		path.push('<script src="' + dir + 'base/jquery-placeholder.js" type="text/javascript"></script>');
		// path.push('<script src="' + basePath + 'base/jquery-1.9.1.min.js" type="text/javascript"></script>');
		// path.push('<script src="' + basePath + 'base/base_tools.min.js" type="text/javascript"></script>');
//		path.push('<script src="' + basePath + 'base/base_tools.js" type="text/javascript"></script>');
//		path.push('<script src="' + basePath + 'base/maxlength.js" type="text/javascript"></script>');
		// path.push('<script src="' + basePath + 'base/jquery.blockUI.js" type="text/javascript"></script>');
		path.push('<script src="' + dir + 'jquery.cookie.js" type="text/javascript"></script>');
		break;
	case 11: // JS模板引擎
//		path.push('<script src="' + basePath + 'base/base_template.js" type="text/javascript"></script>');
		break;
	case 12: // 二维码
		path.push('<script src="' + basePath + 'ewm/qrcode.min.js" type="text/javascript"></script>');
		path.push('<script src="' + basePath + 'ewm/jquery.qrcode.js" type="text/javascript"></script>');
		break;
	case 13: // UUID
		path.push('<script src="' + basePath + 'uuid/uuid.js" type="text/javascript"></script>');
		break;
	case 20: // 布局UI类css/JS
		// 分割条组件
		// splitter组件在jquery1.7下在致使火狐自动关闭
		path.push('<link href="' + basePath + 'splitter/splitter.css"  rel="stylesheet" type="text/css">');
		path.push('<script src="' + basePath + 'splitter/splitter-152.js" type="text/javascript"></script>');
		// path.push('<script src="' + basePath + 'splitter/splitter.js" type="text/javascript"></script>');
		// path.push('<script src="' + basePath + 'spit_line/jsplit.js" type="text/javascript"></script>');
		break;
	case 21: // 窗口类
		// 当需要模态弹出多个窗口时 不要再加载该组件
		path.push('<script src="' + basePath + 'lhgDialog-4.2.0/lhgdialog.min.js?skin=blue" type="text/javascript"></script>');
		path.push('<script src="' + basePath + 'lhgDialog-4.2.0/lhgdialog.ext.js" type="text/javascript"></script>');
		break;
	case 22: // zTree组件
		path.push('<link href="' + basePath + 'ztree/css/zTreeStyle/zTreeStyle.css"  rel="stylesheet" type="text/css">');
		path.push('<script src="' + basePath + 'ztree/jquery.ztree.all-3.5.min.js" type="text/javascript"></script>');
		path.push('<script src="' + basePath + 'ztree/jquery.ztree.exhide-3.5.min.js" type="text/javascript"></script>');
		break;
	case 23:// tab标签组件
		path.push('<link href="' + basePath + 'tab/tab.css"  rel="stylesheet" type="text/css">');
		path.push('<script src="' + basePath + 'tab/tab.js" type="text/javascript"></script>');
		break;
	case 24:// baseGrid组件
		// path.push('<link href="' + basePath + 'basegrid/basegrid.css" rel="stylesheet" type="text/css">');
		// path.push('<script src="' + basePath + 'basegrid/basegrid-1.0.0.js" type="text/javascript"></script>');
		path.push('<script src="' + basePath + 'basegrid/pagenav.cn.js" type="text/javascript"></script>');

		// path.push('<link href="' + basePath + 'mmGrid-master/mmGrid.css" rel="stylesheet" type="text/css">');
		// path.push('<script src="' + basePath + 'mmGrid-master/mmGrid.js" type="text/javascript"></script>');
		// path.push('<link href="' + basePath + 'mmGrid-master/mmPaginator.css" rel="stylesheet" type="text/css">');
		// path.push('<script src="' + basePath + 'mmGrid-master/mmPaginator.js" type="text/javascript"></script>');
		// path.push('<script src="' + basePath + 'mmGrid-master/plugins.js" type="text/javascript"></script>');

		path.push('<link href="' + basePath + 'mmGrid-master2/mmGrid.css"  rel="stylesheet" type="text/css">');
		path.push('<script src="' + basePath + 'mmGrid-master2/mmGrid.js" type="text/javascript"></script>');
		path.push('<link href="' + basePath + 'mmGrid-master2/mmPaginator.css"  rel="stylesheet" type="text/css">');
		path.push('<script src="' + basePath + 'mmGrid-master2/htjsPaginator.js" type="text/javascript"></script>');
		path.push('<link href="' + basePath + 'mmGrid-master2/htjsSummaryFooter.css"  rel="stylesheet" type="text/css">');
		path.push('<script src="' + basePath + 'mmGrid-master2/htjsSummaryFooter.js" type="text/javascript"></script>');
		path.push('<script src="' + basePath + 'mmGrid-master2/plugins.js" type="text/javascript"></script>');
		break;
	case 25:// 工具栏组件
		path.push('<link href="' + basePath + '../../commons/themes/toolbar.css"  rel="stylesheet" type="text/css">');
		break;
	case 26:// 日期组件
		path.push('<script src="' + basePath + 'datepicker/WdatePicker.js" type="text/javascript"></script>');
		break;
	case 27:// 校验组件
		path.push('<link href="' + basePath + 'validator3/validator.css"  rel="stylesheet" type="text/css">');
		path.push('<script src="' + basePath + 'validator3/validator.js" type="text/javascript"></script>');
		path.push('<script src="' + basePath + 'validator3/exvalidator.js" type="text/javascript"></script>');
		break;
	case 28:// 下拉组合框
		path.push('<link href="' + basePath + 'combo/basecombo.css"  rel="stylesheet" type="text/css">');
		path.push('<script src="' + basePath + 'combo/jquery.dropdown.js" type="text/javascript"></script>');
		path.push('<script src="' + basePath + 'combo/basecombo-1.0.0.js" type="text/javascript"></script>');
		path.push('<script src="' + basePath + 'combo/baseComboTree-1.0.0.js" type="text/javascript"></script>');
		break;
	case 29:// jquery.form.js 文件上传
		path.push('<script src="' + basePath + 'form/jquery.form.js" type="text/javascript"></script>');
		break;
	case 30:// jquery.dropdown.js下拉框
		path.push('<link href="' + basePath + 'dropdown/jquery.dropdown.css"  rel="stylesheet" type="text/css">');
		path.push('<script src="' + basePath + 'dropdown/jquery.dropdown.js" type="text/javascript"></script>');
		break;
	case 31:// ueditor 富文本编辑器
		path.push('<script src="' + basePath + 'ueditor/ueditor.config.js" type="text/javascript"></script>');
		path.push('<script src="' + basePath + 'ueditor/ueditor.all.js" type="text/javascript"></script>');
		break;
	case 32:// 新下拉组合框
		path.push('<link href="' + basePath + 'combo/basecombo.css"  rel="stylesheet" type="text/css">');
		path.push('<script src="' + basePath + 'combo/jquery.dropdown.js" type="text/javascript"></script>');
		path.push('<script src="' + basePath + 'combo/basecombo-1.0.1.js" type="text/javascript"></script>');
		break;			
	case 33:// jqueryui
		path.push('<link href="' + basePath + 'jquery-ui-1.11.1.custom/jquery-ui.min.css"  rel="stylesheet" type="text/css">');
		path.push('<script src="' + basePath + 'jquery-ui-1.11.1.custom/jquery-ui.min.js" type="text/javascript"></script>');
		break;			
	default:
		break;
	}
	return path.join('');
}
