/**
 * IE下的JS加速
 */
/*@cc_on _d=document;eval('var document=_d')@*/
/*@cc_on eval((function(props) {var code = [];for (var i = 0,l = props.length;i<l;i++){var prop = props[i];window['_'+prop]=window[prop];code.push(prop+'=_'+prop);}return 'var '+code.join(',');})('document self top parent alert setInterval clearInterval setTimeout clearTimeout'.split(' ')))@*/

/**
 * <ol>
 * date:2013-10-30 editor:yanghongjian
 * <li>创建文档</li>
 * <li>按需使用编码加载局端管理JS组件</li>
 * </ol>
 */

var _curPage = window.document.location.href;
var _curPagePath = window.document.location.pathname;
var pos = _curPage.indexOf(_curPagePath);
var prePath = _curPage.substring(0, pos);
var postPath = _curPagePath.substring(0, _curPagePath.substr(1).indexOf('/') + 1);
//站点根路径
var webRoot = prePath + postPath;

var href = window.location.href;
var host = window.location.host;
var f1 = href.substring(href.indexOf(host));
var f2 = f1.substring(f1.indexOf("/"));
var root = f2.split("/");

//alert(root)

//获取commons路径
var INCLUDE_NAME = 'include_ui_jdgl';
var COMMONS_NAME = 'commons';
var commonsJsPath;
var includePath;
(function() {
    var path = [];
    var hds = document.getElementsByTagName("script");
    var src,ds;
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
    commonsJsPath = path.join('/');
})();

(function() {
    var includeDM = 'dm';
    var re = new RegExp("" + includeDM + "=([^&?]*)", "ig");
    var dm = '';
    try {
        dm = ((includePath.match(re)) ? (includePath.match(re)[0].substr(includeDM.length + 1)) : "");
    } catch(e) {
        dm = ''
    }
    //没有指定js代码时，只加载基础JS
    var path = [];
    if (dm.length == 0) {
        //为指定dm时返回基础类css/JS
        path.push(getCssJsPath(commonsJsPath + "/js/", 10));
    } else {
        re = /[^13579]{1,2}/;//表示不可以有1 3 5 7 9的1到2位的偶数
        if (!re.test(dm.length)) {
            alert('请正确使用CSS/JS编码!');
            return;
        }
        var tem;
        for (var i = 0; i < dm.length; ++i) {
//            tem = getCssJsPath(commonsJsPath + "/js/", dm[i] + dm[++i]);
            tem = getCssJsPath(commonsJsPath + "/js/", dm.charAt(i) + dm.charAt(++i));
            if (tem.length > 0)
                path.push(tem);
        }
    }
    if (path.length > 0)
        document.write(path.join(''));

})();
//根据JS编码获取对应的js组件路径
function getCssJsPath(basePath, dm) {
    var path = [];
//    var 
    switch (parseInt(dm, 10)) {
        case 60: //局端管理的css/JS
        	path.push('<script src="' + basePath + '../../commons/js/jdglTools.js" type="text/javascript"></script>');
//        	path.push('<script src="' + basePath + '../../commons/themes/default/main.css" type="text/javascript"></script>');
            path.push('<script src="' + basePath + '../../commons/js/jquery.jdglPlugins.js" type="text/javascript"></script>');
            break;
        default:
    }
    return path.join('');
}

