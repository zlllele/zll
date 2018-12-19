$(function() {
	//页面是否可用
	var isUsed = false;
	//验证码是否可用
	var isCode = false;
	var account = "";
	var phone = "";
	$.ajax({
		url : "http://www.bwfapiao.com/login/user/forgetGetAccount.do",
		data : {},
		type : "POST",
		dataType : "JSONP",
		success : function(jsonObj) {
			if (jsonObj.code == 1) {
				account = jsonObj.data.USERID;
				phone = jsonObj.data.PHONE;
				$("#account_txt").text(phone);
				$("#phone_txt").text(phone);
				isUsed = true;
			}else{
				isUsed = false;
				alert(jsonObj.msg);
			}
		}
	});
	
	$.ajax({
		url : "http://www.bwfapiao.com/login/param/getAll.do",
		data : {
			'LANMU' : "用户中心"
		},
		type : "POST",
		dataType : "JSONP",
		success : function(jsonObj) {
			if (jsonObj.code == 1) {
				$('#header').html(jsonObj.data.header);
				$('#footer').html(jsonObj.data.footer);
			}
		}
	});
	// 点击发送短信验证码
	$('#sendPhone').click(function() {
		if(phone==""){
			alert("手机号为空了，请选择其它方式找回密码");
			return;
		}
		$.ajax({
			url : "http://www.bwfapiao.com/login/user/checkGetNum.do",
			data : {
				"PHONE" : phone,
				"TYPE" : "3"
			},
			type : "POST",
			dataType : "JSONP",
			success : function(jsonObj) {
				if(jsonObj.code == 1){
					$("#sendPhone").css("display", "none");
					$("#code_txt").css("display", "block");
				}
				alert(jsonObj.msg);
			}
		});
	});
	 
	// 点击下一步进行设置密码
	$('#nextTwo').click(function() {
		if(!isUsed){
			alert("请返回上一页重新设置");
			return;
		}
		
		$.ajax({
			url : "http://www.bwfapiao.com/login/user/checkSMSCode.do",
			data : {
				"PHONE" : phone,
				"SMSCODE" : $("#code_txt").val()
			},
			type : "POST",
			dataType : "JSONP",
			success : function(jsonObj) {
				if (jsonObj.code == 1) {
					window.location.href="/forgetgrset/index.jhtml";
				}else{
					alert(jsonObj.msg);
				}
			}
		});
	});
});