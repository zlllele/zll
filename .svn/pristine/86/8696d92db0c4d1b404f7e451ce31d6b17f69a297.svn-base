// 跨域访问JS对象解决方法
if (document.domain.indexOf("htjs.net") > -1) {
	// document.domain = "htjs.net";
} else {
	// 其它情况，不改变document.domain
}

// 解决IE下无location.origin问题
if (!document.location.origin) {
	document.location.origin = document.location.protocol + "//" + document.location.hostname + (document.location.port ? ':' + document.location.port : '');
}
