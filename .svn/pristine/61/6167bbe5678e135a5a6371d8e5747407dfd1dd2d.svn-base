$(function() {
	//为true时可关联
	var isUnion = false;
	var isPhone = false;
	var isEmail = false;
	
	// 标记电话号码是否为空
	var phoneIsNull = true;
	// 标记邮箱地址是否为空
	var emailIsNull = true;
	//关联手机模块
	var unionPhone = "";
	//关联邮箱模块
	var unionEmail = "";
	//由name获取url中的参数
	function GetQueryString(name){
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r!=null)return decodeURI(r[2]); return null;
	}
	var unionType = GetQueryString("unionType");
	var mark = GetQueryString("mark");
	var nickName = GetQueryString("nickName");
	if(unionType!=null&&mark!=null){
		unionPhone = "#" + unionType + "_phone";
		unionEmail = "#" + unionType + "_email";
		$('#qq_phone_span').text(nickName);
		$('#qq_email_span').text(nickName);
		$('#wx_phone_span').text(nickName);
		$('#wx_email_span').text(nickName);
		isUnion = true;
	}else{
		isUnion = false;
	}
	//设置默认显示块
	$(unionPhone).css("display", "block");
	$(unionEmail).css("display", "none");
	
	// 手机号输入框失去焦点时检查输入文本的格式有效性
	$(unionPhone + "_txt").blur(function() {
		var phone = $(unionPhone + "_txt").val();
		var flag = !!phone.match(/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/);
		if (flag == false) {
			$(unionPhone + "_error").text("请输入正确的手机号码");
			$(unionPhone + "_error").css("display", "block");
			phoneIsNull = true;
		}else{
			$(unionPhone + "_error").text("");
			$(unionPhone + "_error").css("display", "none");
			phoneIsNull = false;
		}
	});
	// 邮箱地址输入框失去焦点时检查输入文本的格式有效性
	$(unionEmail + "_txt").blur(function() {
		var email = $(unionEmail + "_txt").val();
		var flag = !!email.match(/^[a-zA-Z0-9._%+-]+@(?!.*\.\..*)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
		if (flag == false) {
			$(unionEmail + "_error").text("请输入正确的邮箱地址");
			$(unionEmail + "_error").css("display", "block");
			emailIsNull = true;
		} else {
			$(unionEmail + "_error").html("");
			$(unionEmail + "_error").css("display", "none");
			emailIsNull = false;
		}
	});
	
	// 点击获取短信验证码
	$(unionPhone + "_btn").click(function() {
		if (phoneIsNull) {
			alert("请输入正确的手机号码");
			return;
		}
		$.ajax({
			url : "http://www.bwfapiao.com/login/user/checkGetNum.do",
			data : {
				"PHONE" : $(unionPhone + "_txt").val(),
				"TYPE" : "4"
			},
			type : "POST",
			dataType : "JSON",
			success : function(jsonObj) {
				alert(jsonObj.msg);
			}
		});
	});

	// 点击获取邮件验证码
	$(unionEmail + "_btn").click(function() {
		if (emailIsNull) {
			alert("请输入正确的邮箱");
			return;
		}
		$.ajax({
			url : "http://www.bwfapiao.com/login/user/checkGetNum.do",
			data : {
				"EMAIL" : $(unionEmail + "_txt").val(),
				"TYPE" : "4"
			},
			type : "POST",
			dataType : "JSON",
			success : function(jsonObj) {
				alert(jsonObj.msg);
			}
		});
	});

	// 手机号验证码框失去焦点时检查输入是否正确
	$(unionPhone + "_code").blur(function() {
		$.ajax({
			url : "http://www.bwfapiao.com/login/user/checkSMSCode.do",
			data : {
				"PHONE" : $(unionPhone + "_txt").val(),
				"SMSCODE" : $(unionPhone + "_code").val()
			},
			type : "POST",
			dataType : "JSON",
			success : function(jsonObj) {
				if (jsonObj.code == 1) {
					$(unionPhone + "_code_error").text("");
					$(unionPhone + "_code_error").css("display", "none");
					isPhone = true;
				}else{
					$(unionPhone + "_code_error").text("验证码有误");
					$(unionPhone + "_code_error").css("display", "block");
					isPhone = false;
				}
			}
		});
	});
	// 邮箱验证码框失去焦点时检查输入是否正确
	$(unionEmail + "_code").blur(function() {
		$.ajax({
			url : "http://www.bwfapiao.com/login/user/checkSMSCode.do",
			data : {
				"EMAIL" : $(unionEmail + "_txt").val(),
				"SMSCODE" : $(unionEmail + "_code").val()
			},
			type : "POST",
			dataType : "JSON",
			success : function(jsonObj) {
				if (jsonObj.code == 1) {
					$(unionEmail + "_code_error").html("");
					$(unionEmail + "_code_error").css("display", "none");
					isEmail = true;
				}else{
					$(unionEmail + "_code_error").html("验证码有误");
					$(unionEmail + "_code_error").css("display", "block");
					isEmail = false;
				}
			}
		});
	});
	//提交手机关联信息
	$(unionPhone + "_union").click(function() {
		if(!isUnion){
			alert("关联信息有误，请重新用第三方账号登陆");
			return;
		}
		if(!isPhone){
			alert("输入的手机验证码有误");
			return;
		}
		// 提交用户关联的用户名，关联信息
		$.ajax({
			url : "http://www.bwfapiao.com/login/user/unionUser.do",
			data : {
				"PHONE" : $(unionPhone + "_txt").val(),
				"TYPE" : "phone",
				"unionType" : unionType,
				"mark" : mark
			},
			type : "POST",
			dataType : "JSON",
			success : function(jsonObj) {
				if (jsonObj.code == 1) {
					window.location.href="/server3/dzfp/zcyhgl/yhzx.html";
				} else {
					alert(jsonObj.msg);
				}
			}
		});
	});
	// 提交邮箱验证信息
	$(unionEmail + "_union").click(function() {
		if(!isUnion){
			alert("关联信息有误，请重新用第三方账号登陆");
			return;
		}
		if(!isEmail){
			alert("输入的邮箱验证码有误");
			return;
		}
		// 提交用户关联的用户名，关联信息
		$.ajax({
			url : "http://www.bwfapiao.com/login/user/unionUser.do",
			data : {
				"EMAIL" : $(unionEmail + "_txt").val(),
				"TYPE" : "email",
				"unionType" : unionType,
				"mark" : mark
			},
			type : "POST",
			dataType : "JSON",
			success : function(jsonObj) {
				if (jsonObj.code == 1) {
					window.location.href="/server3/dzfp/zcyhgl/yhzx.html";
				} else {
					alert(jsonObj.msg);
				}
			}
		});
	});
	
	
	$('#glPhone').click(function() {
		$(unionPhone).css("display", "block");
		$(unionEmail).css("display", "none");
	});
	$('#glEmail').click(function() {
		$(unionPhone).css("display", "none");
		$(unionEmail).css("display", "block");
	});
});