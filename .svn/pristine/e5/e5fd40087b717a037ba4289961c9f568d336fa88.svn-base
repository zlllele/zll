// JavaScript Document
var http_request = false;
var ajaxobj = null;
var dorul = null;
var cstr = null;
var AJAX ="1.0"
var querying = 0;
var poolArray = new Array();
var AJAX_IS_INIT_QXXK=false;

function send_request_pool(t){
	if(poolArray.length>0){
		setTimeout(send_request_pool,t?t:2);
		if(querying!=0){
			return;
		}else{
			tmp = poolArray.shift();
			if(tmp.method=="send_request_update"){
				send_request_update(tmp.url,tmp.poststr,tmp.obj1);
			}
			if(tmp.method=="send_request"){
				send_request(tmp.url,tmp.poststr,tmp.obj1);
			}
		}
	}
}
function send_request_alert(url, poststr) {//初始化、指定处理函数、发送请求的函数
    http_request = false;
    //开始初始化XMLHttpRequest对象
    ininHttp_request();
    http_request.onreadystatechange = processRequest_alert;
    // 确定发送请求的方式和URL以及是否同步执行下段代码
    http_request.open("POST", url, true);
    http_request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    http_request.send(poststr);
}

function send_request(url,poststr,userFunction) {//初始化、指定处理函数、发送请求的函数
   //http_request = false;
   if(querying!=0){
		//alert(poststr);
		window.status=querying;
		var query={
			url:url,
			poststr:poststr,
			obj1:userFunction,
			method:'send_request'
		}
		poolArray.push(query);
	    send_request_pool();
		return;
	}
	querying++;
    //开始初始化XMLHttpRequest对象
    ininHttp_request();
    http_request.onreadystatechange = userFunction;
    // 确定发送请求的方式和URL以及是否同步执行下段代码
    http_request.open("POST", url, true);
    http_request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    http_request.send(poststr);
}

function send_request_confirm(url, poststr, cstr1, dourl1) {//初始化、指定处理函数、发送请求的函数
    http_request = false;
    //开始初始化XMLHttpRequest对象
    ininHttp_request();
    dourl = dourl1;
    cstr = cstr1;

    http_request.onreadystatechange = processRequest_confirm;
    // 确定发送请求的方式和URL以及是否同步执行下段代码
    http_request.open("POST", url, true);
    http_request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    http_request.send(poststr);
}

function send_request_update(url, poststr, obj1) {//初始化、指定处理函数、发送请求的函数
	if(querying!=0){
		//alert(poststr);
		window.status=querying;
		var query={
			url:url,
			poststr:poststr,
			obj1:obj1,
			method:'send_request_update'
		}
		poolArray.push(query);
	    send_request_pool();
		return;
	}
	querying++;
    ajaxobj = obj1;
    //开始初始化XMLHttpRequest对象
    ininHttp_request();
    http_request.onreadystatechange = processRequest_update;
    // 确定发送请求的方式和URL以及是否同步执行下段代码
    http_request.open("POST", url, true);
    http_request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    http_request.send(poststr);
}
function send_request_setValue(url, poststr, obj1) {//初始化、指定处理函数、发送请求的函数
    http_request = false;
    ajaxobj = obj1;
    //开始初始化XMLHttpRequest对象
    ininHttp_request();
    http_request.onreadystatechange = processRequest_setValue;
    http_request.open("POST", url, true);
    http_request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    http_request.send(poststr);
}
// 处理返回信息的函数
function processRequest_alert() {
    if (http_request.readyState == 4) { // 判断对象状态
        if (http_request.status == 200) { // 信息已经成功返回，开始处理信息
            alert(http_request.responseText);
        } else { //页面不正常
            alert("您所请求的页面有异常。");
        }
    }
}

// 处理返回信息的函数
function processRequest_confirm() {
    if (http_request.readyState == 4) { // 判断对象状态

        if (http_request.responseText.indexOf("true") > -1) {
            var tt = confirm(cstr);
            if (tt && dourl != null) {
                self.location = dourl;
            }
        }
    }
}
function processRequest_update() {
    if (http_request.readyState == 4) { // 判断对象状态
          if (http_request.status == 200) { // 信息已经成功返回，开始处理信息
        		ajaxobj.innerHTML = unescape(http_request.responseText);
				querying--;
				if(AJAX_IS_INIT_QXXK){
					 initQxxk(); 
				}
           } else { //页面不正常
               ajaxobj.innerHTML="您所请求的页面有异常。";
           }
    }
}
function processRequest_setValue() {
    if (http_request.readyState == 4) { // 判断对象状态
        //  if (http_request.status == 200) { // 信息已经成功返回，开始处理信息
        ajaxobj.value = unescape(http_request.responseText);
        //   } else { //页面不正常
        //       obj.innerHTML="您所请求的页面有异常。";
        //   }
    }
}


function ininHttp_request() {
    if (window.XMLHttpRequest) { //Mozilla 浏览器
        http_request = new XMLHttpRequest();
        if (http_request.overrideMimeType) {//设置MiME类别
            http_request.overrideMimeType('text/xml');
        }
    }
    else if (window.ActiveXObject) { // IE浏览器
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
            }
        }
    }
    if (!http_request) { // 异常，创建对象实例失败
        window.alert("不能创建XMLHttpRequest对象实例.");
        return false;
    }
}


function send_request_append(url, poststr, obj1) {//初始化、指定处理函数、发送请求的函数
	if(querying!=0){
		//alert(poststr);
		window.status=querying;
		var query={
			url:url,
			poststr:poststr,
			obj1:obj1,
			method:'send_request_update'
		}
		poolArray.push(query);
	    send_request_pool();
		return;
	}
	querying++;
    ajaxobj = obj1;
    //开始初始化XMLHttpRequest对象
    ininHttp_request();
    http_request.onreadystatechange = processRequest_append;
    // 确定发送请求的方式和URL以及是否同步执行下段代码
    http_request.open("POST", url, true);
    http_request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    http_request.send(poststr);
}

function processRequest_append() {
    if (http_request.readyState == 4) { // 判断对象状态
          if (http_request.status == 200) { // 信息已经成功返回，开始处理信息
        		ajaxobj.innerHTML =ajaxobj.innerHTML+unescape(http_request.responseText);
				querying--;
           } else { //页面不正常
               ajaxobj.innerHTML="您所请求的页面有异常。";
           }
    }
}