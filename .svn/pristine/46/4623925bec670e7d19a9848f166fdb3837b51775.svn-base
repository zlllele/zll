$(function() {
	//页面是否可用
	var isUsed = false;
	//验证码是否可用
	var isCode = false;
	var account = "";
	var email = "";
	$.ajax({
		url : "http://www.bwfapiao.com/login/user/forgetGetAccount.do",
		data : {},
		type : "POST",
		dataType : "JSONP",
		success : function(jsonObj) {
			if (jsonObj.code == 1) {
				account = jsonObj.data.USERID;
				email = jsonObj.data.EMAIL;
				$("#account_txt").text(email);
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
	
	// 点击发送邮件验证码
	$('#sendEmail').click(function() {
		if(email==""){
			alert("邮箱为空了，请选择其它方式找回密码");
			return;
		}
		$.ajax({
			url : "http://www.bwfapiao.com/login/user/checkGetNum.do",
			data : {
				"EMAIL" : email,
				"TYPE" : "3"
			},
			type : "POST",
			dataType : "JSONP",
			success : function(jsonObj) {
				if(jsonObj.code == 1){
					$("#sendEmail").css("display", "none");
					$("#email_div").css("display", "block");
				}
				alert(jsonObj.msg);
			}
		});
	});
	// 检查输入的验证码是否正确
/*	$("#email_txt").blur(function() {
		$.ajax({
			url : "http://www.bwfapiao.com/login/user/checkSMSCode.do",
			data : {
				"EMAIL" : email,
				"SMSCODE" : $("#email_txt").val()
			},
			type : "POST",
			dataType : "JSONP",
			success : function(jsonObj) {
				if (jsonObj.code == 1) {
					isCode = true;
				}else{
					isCode = false;
					alert("验证码输入有误");
				}
			}
		});
	});
*/
	// 点击下一步进行设置密码
	$('#nextTwo').click(function() {
		if(!isUsed){
			alert("请返回上一页重新设置");
			return;
		  }
           // 检查输入的验证码是否正确
   		$.ajax({
			url : "http://www.bwfapiao.com/login/user/checkSMSCode.do",
			data : {
				"EMAIL" : email,
				"SMSCODE" : $("#email_txt").val()
			},
			type : "POST",
			dataType : "JSONP",
			success : function(jsonObj) {
				if (jsonObj.code == 1) {
					isCode = true;
				}else{
					isCode = false;
					//alert("验证码输入有误");
				}
			}
		});

		if(!isCode){
			alert("验证码输入有误");
			return;
		}
		//window.location.href="/server3/dzfp/forget/forget_gr_set.html";
                window.location.href="/forgetgrset/index.jhtml";
	});
});