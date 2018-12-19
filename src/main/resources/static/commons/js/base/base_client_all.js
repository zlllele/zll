var BaseTemplate=BaseTemplate||function(c){var b=function(d){d=d.replace("<!--","").replace("//-->","");return d.replace(/{\$(\s|\S)*?\$}/g,function(e){return e.replace(/("|\\)/g,"\\$1").replace("{$",'_s.push("').replace("$}",'");').replace(/{\%([\s\S]*?)\%}/g,'",$1,"')}).replace(/\r|\n/g,"")};var a=b(document.getElementById(c)?document.getElementById(c).innerHTML:c);return{render:function(d){var f=[],g=[],e;for(e in d){f.push(e);g.push(d[e])}return(new Function(f,"var _s=[];"+a+" return _s;")).apply(null,g).join("")}}};
;
$.browser={};$.browser.mozilla=/firefox/.test(navigator.userAgent.toLowerCase());$.browser.webkit=/webkit/.test(navigator.userAgent.toLowerCase());$.browser.opera=/opera/.test(navigator.userAgent.toLowerCase());$.browser.msie=/msie/.test(navigator.userAgent.toLowerCase());String.prototype.trim=function(){return this.replace(/(^\s*)|(\s*$)/g,"")};String.prototype.ltrim=function(){return this.replace(/(^\s*)/g,"")};String.prototype.rtrim=function(){return this.replace(/(\s*$)/g,"")};String.prototype.endsWith=function(a){return this.indexOf(a,this.length-a.length)!==-1};String.prototype.isMobile=function(){return(/^(?:13\d|15[89])-?\d{5}(\d{3}|\*{3})$/.test(this.trim()))};String.prototype.isTel=function(){return(/^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test(this.trim()))};String.prototype.isMobileTel=function(){return(this.isTel()||this.isMobile())};String.prototype.isEmail=function(){return(/^(\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)$/.test(this.trim()))};String.prototype.isNumber=function(){return(!isNaN(this.trim()))};String.prototype.isInt=function(){return(/^(-?[0-9]\d*)$/.test(this.trim()))};String.prototype.isFloat=function(){return(/^(-?([0-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0))$/.test(this.Trim()))};String.prototype.isPwd=function(){return(/^[\w+]{6,20}$/.test(this.Trim()))};String.prototype.isChineseFirstName=function(){return(/^[\u4e00-\u9fa5]{1,2}$/.test(this.trim()))};String.prototype.isChineseLastName=function(){return(/^[\u4e00-\u9fa5]{1,15}$/.test(this.trim()))};String.prototype.isEmpty=function(){return(this.trim()==""||this==null)};String.prototype.isDate=function(){return/^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))$/.test(this.trim())};String.prototype.isMoney=function(){return(/^(-?\d+)(\.\d+)?$/.test(this.trim()))};var baseTools=(function(){var j;var f=window.document.location.href;var k=window.document.location.pathname;var i=f.indexOf(k);var b=f.substring(0,i);var h=k.substring(0,k.substr(1).indexOf("/")+1);var a=b+h;var c="";try{c=parent.window.document.location.href}catch(d){}var g="";return{getDocumentDomain:function(){return document.domain},onInit:function(){j=baseTools;g=j.getCommonsJsPath()},loadJs:function(m,n){var e=false;var l=document.createElement("script");l.type="text/javascript";l.language="javascript";l.src=m;if(n){l.onload=l.onreadystatechange=function(){if(!e&&(!l.readyState||l.readyState=="loaded"||l.readyState=="complete")){e=true;l.onload=l.onreadystatechange=null;if(n){n.call(l)}}}}document.getElementsByTagName("head")[0].appendChild(l)},loadCss:function(e,m){var l=document.createElement("link");l.rel="stylesheet";l.type="text/css";l.media="screen";l.href=e;document.getElementsByTagName("head")[0].appendChild(l);if(m){m.call(l)}},byId:function(e){return document.getElementById(e)},getValByID:function(e){return $("#"+e).val()},setValToID:function(e,l){$("#"+e).val(l)},setIdByName:function(e){$.each(e,function(l,m){$("input,textarea,select",$("#"+m)).attr("id",function(){return m+"_"+this.name});$("div,span",$("#"+m)).attr("id",function(){return m+"_"+this.id});baseTools.checkFormLock([m])})},getWebRoot:function(){return a},getPrePath:function(){return b},getCurPage:function(){return f},getCurPagePath:function(){return k},getUrlQueryString:function(e){return this.getUrlQueryStringByUrl(this.getCurPage(),e)},getUrlQueryStringByUrl:function(m,p){var n=new RegExp("(&|\\?)"+p+"=([^&?]*)","ig");var l="";try{if(m.match(n)){l=((m.match(n))?(m.match(n)[0].substr(p.length+2)):"")}}catch(o){l=""}return l},getCommonsJsPath:function(){var e=[];$("head script").each(function(){var n=$(this).attr("src");if(n==undefined){return true}if(n.indexOf("base_tools")!=-1){var m=n.split("/");for(var l=0;l<m.length;l++){e.push(m[l]);if(m[l]=="commons"){break}}}});return e.join("/")},getRootJsPath:function(){var e=[];$("head script").each(function(){var n=$(this).attr("src");if(n.indexOf("base_tools")!=-1){if(n.indexOf("..")!=-1){var m=n.split("/");for(var l=0;l<m.length;l++){if(m[l]==".."){e.push(m[l])}}}}});return e.join("/")},showMask:function(e){},hideMash:function(e){},repHtml:function(e){return e},repText:function(e){return e},preparePostData:function(w,p){var y=[];if(w){for(var t=0;t<w.length;t++){var r=document.getElementById(w[t]);if(r){for(var q=0;q<r.elements.length;q++){var e=r.elements[q];var m=e.tagName.toLowerCase();if(m=="textarea"){e.value=this.repHtml(e.value)}else{if(m=="input"){if(e.type.toLowerCase()=="text"){e.value=this.repHtml(e.value)}if(e.type.toLowerCase()=="radio"){e.value=this.repHtml(e.value)}}}}}}var o="";for(var s=0;s<w.length;s++){o=$("#"+w[s]).serialize();if(o.length>0){y.push(o)}}}var n=false;if(p){var v=[];for(var u in p){var l=p[u]!=undefined?p[u].toString():"";if(u=="CUR_USERID"){n=true}v.push(encodeURIComponent(u)+"="+encodeURIComponent(l))}y.push(v.join("&"))}return y.join("&")},xhrAjaxJsonP:function(m){var r=null;var s=true;if(typeof m.bShow!="undefined"){s=m.bShow}if(s){r=this.showMask(m.msg)}var v=this.preparePostData(m.forms,m.params);var p=m.url;if(p&&p.indexOf("?")==-1){p=p+"?"+v}else{p=p+"&"+v}if(p&&p.indexOf("username")==-1&&p.indexOf("sign")==-1){var q=baseTools.getUrlQueryString("username");var n=baseTools.getUrlQueryString("sign");if(q&&n){v+="&username="+q;v+="&sign="+n}}var e=m.url;var l=baseTools.getUrlQueryString("actionUrl");if(l){e=baseTools.getUrlQueryString("actionUrl")+e}var o=true;if(m.async!=undefined){o=m.async}var u="jsonp";if(m.dataType!=undefined){u=m.dataType}var t="GET";if(m.type!=undefined){t=m.type}$.ajax({url:e,type:t,async:o,dataType:u,data:v,error:function(w,y,x){if(y=="timeout"){alert("连接服务器超时，请稍后再试！")}else{alert("操作提示\n操作失败原因:"+y+"\n"+x)}if(s){baseTools.hideMash(r)}},success:function(x,y){if(m.callback){for(var w=0;w<m.callback.length;w++){m.callback[w](x,m)}}if(s){baseTools.hideMash(r)}},complete:function(){}})},xhrAjax:function(q){var n=null;var m=true;if(typeof q.bShow!="undefined"){m=q.bShow}if(m){n=this.showMask(q.msg,Math.round(Math.random()*10))}var p="POST";if(q.type){p=q.type}var l="json";if(q.dataType){l=q.dataType}var o=true;if(q.async!=undefined){o=q.async}var e=this.preparePostData(q.forms,q.params);$.ajax({url:q.url,type:p,async:o,dataType:l,data:e,error:function(r,t,s){alert("操作提示\n操作失败原因:"+t+"\n"+s);if(m){baseTools.hideMash(n)}},success:function(s,t){if(q.callback){for(var r=0;r<q.callback.length;r++){q.callback[r](s,q)}}if(m){baseTools.hideMash(n)}},complete:function(){},timeout:10000})},bindFormData:function(p,s){try{for(var o in s){var r=this.byId(p+"_"+o);if(r){var n=r.tagName.toLowerCase();if(n=="div"||n=="span"){r.innerHTML=s[o];continue}if(n=="input"){if(r.type.toLowerCase()=="checkbox"){r.checked=s[o]==r.value;continue}if(r.type.toLowerCase()=="radio"){var m=document.getElementsByName(r.name);for(var l=0;l<m.length;l++){if(m[l].value==s[o]){m[l].checked=true;continue}}continue}}r.value=s[o]!=null?this.repText(s[o]):""}}}catch(q){alert("客户端绑定错误:\nURL:\n\t"+this._curPage+"\nmessage:\n\t"+q.message)}}}})();baseTools.onInit();baseTools.checkFormLock=function(a){$.each(a,function(b,c){$("#"+c+" input[type!='hidden'][require !='false']:not([readonly]),select,textarea").keypress(function(h){var g=h.keyCode?h.keyCode:h.which?h.which:h.charCode;if(g==13){var f=$("#"+c).find("input[type!='hidden'],select");var d=f.index(this);d==f.length-1?$("#"+c).click():f[d+1].focus();return false}})})};baseTools.checkLock=function(d){try{var h;d=d?d:(window.event?window.event:d);if(document.all){h=d.keyCode}else{h=d.which}var b=d.srcElement?d.srcElement:d.target;if(h==13){if(document.all){d.keyCode=9}else{var k=document.forms.length;for(var j=0;j<k;j++){var l=document.forms[j].elements;for(var f=0;f<l.length;f++){var c=(f==l.length-1)?0:f+1;if(b==l[f]){l[c].focus();break}}}d.preventDefault()}}}catch(g){}};baseTools.getCurData=function(){var b=new Date();var c=b.getFullYear();var d=b.getMonth()+1;var a=b.getDate();return c+"-"+(d<10?"0"+d:d)+"-"+(a<10?"0"+a:a)};baseTools.getCurMonthStartEnd=function(){var a=new Date();var b=a.getFullYear();var c=a.getMonth()+1;var e=this.getLastDay(b,c);var d=[];d.push(b+"-"+(c<10?"0"+c:c)+"-01");d.push(b+"-"+(c<10?"0"+c:c)+"-"+(e<10?"0"+e:e));return d};baseTools.getLastDay=function(b,d){var e=b;var a=d++;if(d>12){a-=12;e++}var c=new Date(e,a,1);return(new Date(c.getTime()-1000*60*60*24)).getDate()};baseTools.lpad=function(e,a,d){if(e.trim()==""){return""}var b="";for(var c=1;c<a-e.length+1;c++){b+=d}return b+e};baseTools.rpad=function(e,a,d){var b="";for(var c=1;c<a-e.length+1;c++){b+=d}return e+b};function isNumber(a){return(!isNaN(a.trim()))}function isDate(b){var a=/^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))$/;return(a.test(b))}baseTools.arrayContains=function(c,b){for(var a=0;a<c.length;a++){if(c[a]==b){return true}}return false};baseTools.stringify=function(a){var d=typeof a;if("object"==d){if((a!=null)&&(Array==a.constructor)){d="array"}else{if((a!=null)&&(RegExp==a.constructor)){d="regexp"}else{d="object"}}}var c=[];switch(d){case"undefined":case"unknown":return;break;case"function":case"boolean":case"regexp":return a.toString();break;case"number":return isFinite(a)?a.toString():"null";break;case"string":return'"'+a.replace(/(\\|\")/g,"\\$1").replace(/\n|\r|\t/g,function(){var g=arguments[0];return(g=="\n")?"\\n":(g=="\r")?"\\r":(g=="\t")?"\\t":""})+'"';break;case"object":if(a===null){return"null"}c.length=0;for(var f in a){var e=this.stringify(a[f]);if(e!==undefined){c.push(this.stringify(f)+":"+e)}}return"{"+c.join(",")+"}";break;case"array":c.length=0;for(var b=0;b<a.length;b++){var e=this.stringify(a[b]);if(e!==undefined){c.push(e)}}return"["+c.join(",")+"]";break}};baseTools.parse=function(strJson){return(/[\]\}]$/.test(strJson))?eval("("+strJson+")"):strJson};baseTools.expandTreeNode=function(c,b,e){if(e>0){e--;c.expandNode(b,true,false,false,false);if(b.children){for(var a=0;a<b.children.length;a++){var d=b.children[a];baseTools.expandTreeNode(c,d,e)}}}};baseTools.expandTree=function(d,e){if(e>0){var a=d.getNodes();for(var b=0;b<a.length;b++){var c=a[b];baseTools.expandTreeNode(d,c,e)}}};baseTools.kvGet=function(a,b){baseTools.xhrAjax({url:"/cm/kvGet.do",params:{k:a},callback:[function(d,c){switch(parseInt(d.code)){case 0:b(d.data);break;default:alert(d.msg)}}]})};baseTools.kvGetV=function(a,b){baseTools.xhrAjax({url:"/cm/kvGetV.do",params:{k:a},callback:[function(d,c){switch(parseInt(d.code)){case 0:b(d.data);break;default:alert(d.msg)}}]})};baseTools.kvGetChildren=function(a,b){baseTools.xhrAjax({url:"/cm/kvGetChildren.do",params:{k:a},callback:[function(d,c){switch(parseInt(d.code)){case 0:b(d.data);break;default:alert(d.msg)}}]})};baseTools.getCurBrowser=function(){var a=!!window.ActiveXObject;var e=a&&!!window.atob;var b=a&&document.addEventListener&&!window.atob;var c=a&&document.querySelector&&!document.addEventListener;var d=a&&window.XMLHttpRequest&&!document.querySelector;var f=a&&!window.XMLHttpRequest;return{isIE:a,isIE6:f,isIE7:d,isIE8:c,isIE9:b,isIE10:e}};baseTools.setCookie=function(a,b){if(/[\]\}]$/.test(b)){b=baseTools.stringify(b)}$.cookie(a,b,{expires:1,path:"/"})};baseTools.getCookie=function(a){var b=$.cookie(a);if(b==null){return""}return baseTools.parse(b)};baseTools.delCookie=function(a){$.cookie(a,null,{path:"/"})};baseTools.ssoLogin=function(){var a=window.location.search;if(a&&a.indexOf("username")!=-1&&a.indexOf("sign")!=-1){baseTools.xhrAjax({url:"/checkSsoLogin.do"+a,async:false,params:{CUR_USERID:""},callback:[function(c,b){switch(parseInt(c.code)){case 1:baseTools.setCookie("QX_USER",c.data);baseTools.setCookie("USER_SEQ",c.data.USERID);break;default:alert(c.msg)}}]})}else{}};$(document).ready(function(){if(baseTools.getCookie("QX_USER")){}else{baseTools.ssoLogin()}});$(document).keydown(function(b){var f;var a=(b.keyCode)||(b.which)||(b.charCode);if(a==8){var c=b.srcElement||b.target;if(c.tagName.toUpperCase()=="INPUT"||c.tagName.toUpperCase()=="TEXTAREA"){f=c.readOnly||c.disabled;if(c.type.toUpperCase()=="SUBMIT"||c.type.toUpperCase()=="RADIO"||c.type.toUpperCase()=="CHECKBOX"||c.type.toUpperCase()=="BUTTON"){f=true}}else{f=true}}else{f=false}if(f){b.preventDefault()}});
;
if(document.domain.indexOf("htjs.net")>-1){}else{}if(!document.location.origin){document.location.origin=document.location.protocol+"//"+document.location.hostname+(document.location.port?":"+document.location.port:"")};
;
var thresholdcolors=[["20%","darkred"],["10%","red"]];var uncheckedkeycodes=/(8)|(13)|(16)|(17)|(18)/;thresholdcolors.sort(function(d,c){return parseInt(d[0])-parseInt(c[0])});function setformfieldsize(c,b,a){var d=jQuery;c.each(function(g){var h=d(this);var f=h.attr("data-maxsize");if(!f){f=h.attr("maxlength")}h.data("maxsize",b||parseInt(f));var e=a||h.attr("data-output");h.data("$statusdiv",d("#"+e).length==1?d("#"+e):null);h.unbind("keypress.restrict").bind("keypress.restrict",function(i){setformfieldsize.restrict(h,i)});h.unbind("keyup.show").bind("keyup.show",function(i){setformfieldsize.showlimit(h)});setformfieldsize.showlimit(h)})}setformfieldsize.restrict=function(a,c){var b=c.charCode||c.keyCode;if(!uncheckedkeycodes.test(b)){if(a.val().length>=a.data("maxsize")){if(c.preventDefault){c.preventDefault()}return false}}};setformfieldsize.showlimit=function(b){if(b.val().length>b.data("maxsize")){var c=b.val().substring(0,b.data("maxsize"));b.val(c)}if(b.data("$statusdiv")){b.data("$statusdiv").css("color","").html(b.val().length);var d=(b.data("maxsize")-b.val().length)/b.data("maxsize")*100;for(var a=0;a<thresholdcolors.length;a++){if(d<=parseInt(thresholdcolors[a][0])){b.data("$statusdiv").css("color",thresholdcolors[a][1]);break}}}};jQuery(document).ready(function(b){var a=b("input[data-maxsize], input[maxlength], textarea[data-maxsize], textarea[maxlength]");setformfieldsize(a)});
;
//jQuery.cookie=function(b,j,m){if(typeof j!="undefined"){m=m||{};if(j===null){j="";m.expires=-1}var e="";if(m.expires&&(typeof m.expires=="number"||m.expires.toUTCString)){var f;if(typeof m.expires=="number"){f=new Date();f.setTime(f.getTime()+(m.expires*24*60*60*1000))}else{f=m.expires}e="; expires="+f.toUTCString()}var l=m.path?"; path="+m.path:"";var g=m.domain?"; domain="+m.domain:"";var a=m.secure?"; secure":"";document.cookie=[b,"=",encodeURIComponent(j),e,l,g,a].join("")}else{var d=null;if(document.cookie&&document.cookie!=""){var k=document.cookie.split(";");for(var h=0;h<k.length;h++){var c=jQuery.trim(k[h]);if(c.substring(0,b.length+1)==(b+"=")){d=decodeURIComponent(c.substring(b.length+1));break}}}return d}};
;

;