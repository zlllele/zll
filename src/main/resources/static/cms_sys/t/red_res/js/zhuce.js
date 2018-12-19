$(function() {
	
	dzpt.onFocusBlur("emailRePwd", $("#emailRePwd").val());
	dzpt.onFocusBlur("emailFirstPwd", $("#emailFirstPwd").val());
	dzpt.onFocusBlur("inputEmailCode", $("#inputEmailCode").val());
	dzpt.onFocusBlur("email", $("#email").val());
	dzpt.onFocusBlur("phoneRePwd", $("#phoneRePwd").val());
	dzpt.onFocusBlur("phoneFirstPwd", $("#phoneFirstPwd").val());
	dzpt.onFocusBlur("inputSmsCode", $("#inputSmsCode").val());
	dzpt.onFocusBlur("imgCode", $("#imgCode").val());
	dzpt.onFocusBlur("phone", $("#phone").val());
	
	
	// 标记电话号码是否为空
	var phoneIsNull = true;
	// 标记邮箱地址是否为空
	var emailIsNull = true;
	
	
	// 标记图形验证码是否为空
	var imgCodeIsNull = true;
	// 标记短信验证码是否为空
	var smsCodeIsNull = true;

	// 当前注册的方式标识
	var type = "phone";

	$("#phoneError").css("display","none");
	$("#emailError").css("display","none");
	$("#codeError").css("display","none");
	
	// 点击验证码改变
	$('#kaptchaImage').click(function() {
		$(this).attr('src', '/Kaptcha.jpg?' + Math.floor(Math.random() * 100));
	});

	// 手机号输入框失去焦点时检查输入文本的格式有效性
	$('#phone').blur(function() {
		var phone = $('#phone').val();
		var flag = !!phone.match(/^(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/);
		if (flag == false) {
			phoneIsNull = true;
			$("#phoneError").css("display","block");
			$("#phoneError").addClass("span_pos_error");
			return;
		} else {
			$.ajax({
				url : "/login/user/regCheck.do",
				data : {
					'PHONE' : phone
				},
				type : "POST",
				dataType : "JSON",
				success : function(jsonObj) {
					if (jsonObj.code == 1) {
						$("#phoneError").css("display","block");
						$("#phoneError").removeClass("span_pos_error");
						$("#phoneError").addClass("span_pos_sucess");
						phoneIsNull = false;
						return;
					} else {
						$("#phoneError").css("display","block");
						$("#phoneError").removeClass("span_pos_sucess");
						$("#phoneError").addClass("span_pos_error");
						alert(jsonObj.msg);
						phoneIsNull = true;
						return;
					}
				}
			});
		}
	});

	// 邮箱地址输入框失去焦点时检查输入文本的格式有效性
	$('#email').blur(function() {
		var email = $('#email').val();
		var flag = !!email.match(/^[a-zA-Z0-9._%+-]+@(?!.*\.\..*)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
		if (flag == false) {
			emailIsNull = true;
			$("#emailError").css("display","block");
			$("#emailError").addClass("span_pos_error");
			return;
		} else {
			$.ajax({
				url : "/login/user/regCheck.do",
				data : {
					'EMAIL' : email
				},
				type : "POST",
				dataType : "JSON",
				success : function(jsonObj) {
					if (jsonObj.code == 1) {
						$("#emailError").css("display","block");
						$("#emailError").removeClass("span_pos_error");
						$("#emailError").addClass("span_pos_sucess");
						emailIsNull = false;
						return;
					} else {
						$("#emailError").css("display","block");
						$("#emailError").removeClass("span_pos_sucess");
						$("#emailError").addClass("span_pos_error");
						alert(jsonObj.msg);
						emailIsNull = true;
						return;
					}
				}
			});
		}
	});

	$('#phone').focus(function() {
		$("#phoneError").css("display","none");
		$("#phoneError").removeClass("span_pos_sucess");
		$("#phoneError").removeClass("span_pos_error");
	});

	$('#email').focus(function() {
		$("#emailError").css("display","none");
		$("#emailError").removeClass("span_pos_sucess");
		$("#emailError").removeClass("span_pos_error");
	});

	$('#imgCode').focus(function() {
		$("#codeError").css("display","none");
		$("#codeError").removeClass("span_pos_sucess");
		$("#codeError").removeClass("span_pos_error");
	});

	// 图形验证码失去焦点时验证用户输入正确性
	$('#imgCode').blur(function() {
		var imgCode = $('#imgCode').val();
		$.ajax({
			url : "/login/user/checkRegCode.do",
			data : {
				'IMGCODE' : imgCode
			},
			type : "POST",
			dataType : "JSON",
			success : function(jsonObj) {
				if (jsonObj.code == 1) {
					$("#codeError").css("display","block");
					$("#codeError").removeClass("span_pos_error");
					$("#codeError").addClass("span_pos_sucess");
					imgCodeIsNull = false;
				} else {
					$("#codeError").css("display","block");
					$("#codeError").removeClass("span_pos_sucess");
					$("#codeError").addClass("span_pos_error");
					imgCodeIsNull = true;
				}
			}
		});
	});

	// 点击获取短信验证码
	$('#smsCode').click(function() {

		if (phoneIsNull) {
			alert("请输入没有注册过且格式正确的手机号码");
			return;
		}
		if (imgCodeIsNull) {
			alert("请输入正确的图形验证码");
			return;
		}
		var phone = $("#phone").val();
		if($("#smsCode").html()=="获取验证码"){
			$.ajax({
				url : "/login/user/checkGetNum.do",
				data : {
					"PHONE" : $("#phone").val(),
					"TYPE" : "1"
				},
				type : "POST",
				dataType : "JSON",
				success : function(jsonObj) {
					alert(jsonObj.msg);
				}
			});
			var count = 60;
			var countdown = setInterval(CountDown, 1000);
			function CountDown() {
				if (count == 0) {
					$("#smsCode").removeAttr("disabled");
					$("#smsCode").html("获取验证码");
					clearInterval(countdown);
				}else{
					$("#smsCode").attr("disabled", true);
					$("#smsCode").html(" " + count + " ");
					count--;
				}
			};
		}

	});

	// 点击获取邮件验证码
	$('#emailCode').click(function() {
		if(emailIsNull){
			alert("请先输入有效的邮箱地址");
			return;
		}
		if($("#emailCode").html()=="发送验证码"){
			$.ajax({
				url : "/login/user/checkGetNum.do",
				data : {
					"EMAIL" : $("#email").val(),
					"TYPE" : "1"
				},
				type : "POST",
				dataType : "JSON",
				success : function(jsonObj) {
					alert(jsonObj.msg);
				}
			});
			var count = 60;
			var countdown = setInterval(CountDown, 1000);
			function CountDown() {
				if (count == 0) {
					$("#emailCode").removeAttr("disabled");
					$("#emailCode").html("发送验证码");
					clearInterval(countdown);
				}else{
					$("#emailCode").attr("disabled", true);
					$("#emailCode").html(" " + count + " ");
					count--;
				}
			};
		}
	});

	$.ajax({
		url : "/login/param/getAll.do",
		data : {
			'LANMU' : "首页"
		},
		type : "POST",
		dataType : "JSON",
		success : function(jsonObj) {
			if (jsonObj.code == 1) {
				$('#header').html(jsonObj.data.header);
				$('#footer').html(jsonObj.data.footer);
			}
		}
	});

	// 手机注册下一步，进入第二环节输入密码
	$('#phoneToSecond').click(function() {
		if ($("#phoneAgree").attr("checked") == "checked") {
			if ($('#inputSmsCode').val() != null) {
				smsCodeIsNull = false;
			}
			if (smsCodeIsNull) {
				alert("短信验证码不能为空");
				return;
			} else {
				$.ajax({
					url : "/login/user/checkSMSCode.do",
					data : {
						"PHONE" : $("#phone").val(),
						"SMSCODE" : $("#inputSmsCode").val()
					},
					type : "POST",
					dataType : "JSON",
					success : function(jsonObj) {
						if (jsonObj.code == 1) {
							// 点击下一步，进入第二页
							$("#telFirst").css("display", "none");
							$("#phoneSecond").css("display", "block");
							$("#firstNum").removeClass("currurt");
							$("#secondNum").addClass("currurt");
							type = "phone";
						}else{
							alert(jsonObj.msg);
						}
					}
				});
			}
		} else {
			alert("请先阅读并同意用户协议");
			return;
		}
	});

	var emailCodeIsNull = true;

	// 邮箱注册下一步，进入第二环节输入密码
	$('#emailToSecond').click(function() {
		if(emailIsNull){
			alert("请输入有效的邮箱地址");
			return;
		}
		if ($("#emailAgree").attr("checked") == "checked") {
			if ($('#inputEmailCode').val() != null) {
				emailCodeIsNull = false;
			}
			if (emailCodeIsNull) {
				alert("注册验证码不能为空");
				return;
			} else {
				$.ajax({
					url : "/login/user/checkSMSCode.do",
					data : {
						"EMAIL" : $("#email").val(),
						"SMSCODE" : $("#inputEmailCode").val()
					},
					type : "POST",
					dataType : "JSON",
					success : function(jsonObj) {
						if (jsonObj.code == 1) {
							// 点击下一步，进入第二页
							$("#emailFirst").css("display", "none");
							$("#emailSecond").css("display", "block");
							$("#firstNum").removeClass("currurt");
							$("#secondNum").addClass("currurt");
							type = "email";
						}
					}
				});
			}
		} else {
			alert("请先阅读并同意用户协议");
			return;
		}
	});

	var phoneRightPwd = false;
	$('#phoneFirstPwd').blur(function() {
		var pwd = $('#phoneFirstPwd').val();
		if(pwd.length<6||pwd.length>16){
			alert("请输入6-16位的密码");
			return;
		}
		var flag = passwordLevel(pwd);
		if (flag < 2) {
			alert("密码过简单，请输入数字、小写字母、大写字母、特殊字符混合密码");
			return;
		}
		phoneRightPwd = true;
	});
	//验证密码等级
	function passwordLevel(password) {
		var Modes = 0;
		for (var i = 0; i < password.length; i++) {
			Modes |= CharMode(password.charCodeAt(i));
		}
		return bitTotal(Modes);
		//CharMode函数
		function CharMode(iN) {
		    if (iN >= 48 && iN <= 57)//数字
		      return 1;
		    if (iN >= 65 && iN <= 90) //大写字母
		      return 2;
		    if ((iN >= 97 && iN <= 122) || (iN >= 65 && iN <= 90))//大小写
		      return 4;
		    else
		      return 8; //特殊字符
		}
		  //bitTotal函数
		function bitTotal(num) {
		    modes = 0;
		    for (i = 0; i < 4; i++) {
		      if (num & 1) modes++;
		      num >>>= 1;
		    }
		    return modes;
		}
	}
	
	$('#phoneRePwd').blur(function() {
		var firstPwd = $('#phoneFirstPwd').val();
		var rePwd = $('#phoneRePwd').val();

		if (rePwd != firstPwd) {
			alert("两次输入的密码不一致");
		} else {
			phoneRightPwd = true;
		}
	});

	var emailRightPwd = false;
	$('#emailFirstPwd').blur(function() {
		var pwd = $('#emailFirstPwd').val();
		if(pwd.length<6||pwd.length>16){
			alert("请输入6-16位的密码");
			return;
		}
		var flag = passwordLevel(pwd);
		if (flag < 2) {
			alert("密码过简单，请输入数字、大小写字母、特殊字符混合密码");
			return;
		}
		emailRightPwd = true;
	});

	$('#emailRePwd').blur(function() {
		var firstPwd = $('#emailFirstPwd').val();
		var rePwd = $('#emailRePwd').val();

		if (rePwd != firstPwd) {
			alert("两次输入的密码不一致");
		} else {
			emailRightPwd = true;
		}
	});

	$('#phoneToThird').click(function() {
		if(!phoneRightPwd){
			alert("输入的密码有误");
			return;
		}
		// 提交用户注册的用户名，密码信息
		$.ajax({
			url : "/login/user/saveUser.do",
			data : {
				"PHONE" : $("#phone").val(),
				"TYPE" : type,
				"PASSWORD" : $('#phoneFirstPwd').val()
			},
			type : "POST",
			dataType : "JSON",
			success : function(jsonObj) {
				if (jsonObj.code == 1) {
					$("#telFirst").css("display", "none");
					$("#phoneSecond").css("display", "none");
					$("#telThird").css("display", "block");
					$("#emailFirst").css("display", "none");
					$("#emailSecond").css("display", "none");
					$("#emailThird").css("display", "none");
					$("#secondNum").removeClass("currurt");
					$("#thirdNum").addClass("currurt");
					$("#telSuccess").html("恭喜您！使用"+$("#phone").val()+"手机号注册成功！");
					return;
				} else {
					alert(jsonObj.msg);
				}
			}
		});
	});

	$('#emailToThird').click(function() {
		if(!emailRightPwd){
			alert("输入的密码有误");
			return;
		}
		// 提交用户注册的用户名，密码信息
		$.ajax({
			url : "/login/user/saveUser.do",
			data : {
				"EMAIL" : $("#email").val(),
				"TYPE" : type,
				"PASSWORD" : $('#emailFirstPwd').val()
			},
			type : "POST",
			dataType : "JSON",
			success : function(jsonObj) {
				if (jsonObj.code == 1) {
					$("#telFirst").css("display", "none");
					$("#telThird").css("display", "none");
					$("#emailFirst").css("display", "none");
					$("#phoneSecond").css("display", "none");
					$("#emailSecond").css("display", "none");
					$("#emailThird").css("display", "block");
					$("#secondNum").removeClass("currurt");
					$("#thirdNum").addClass("currurt");
					$("#emailSuccess").html("恭喜您！使用"+$("#email").val()+"邮箱号注册成功！");
					return;
				} else {
					alert(jsonObj.msg);
				}
			}
		});
	});

	$('#emailReg').click(function() {
		$("#telFirst").css("display", "none");
		$("#phoneSecond").css("display", "none");
		$("#telThird").css("display", "nont");
		$("#emailFirst").css("display", "block");
		$("#emailSecond").css("display", "none");
		$("#emailThird").css("display", "none");
		$("#firstNum").addClass("currurt");
		$("#secondNum").removeClass("currurt");
		$("#thirdNum").removeClass("currurt");
	});

	$('#phoneReg').click(function() {
		$("#telFirst").css("display", "block");
		$("#phoneSecond").css("display", "none");
		$("#telThird").css("display", "nont");
		$("#emailFirst").css("display", "none");
		$("#emailSecond").css("display", "none");
		$("#emailThird").css("display", "none");
		$("#firstNum").addClass("currurt");
		$("#secondNum").removeClass("currurt");
		$("#thirdNum").removeClass("currurt");
	});
	
	$('#xy_phone_btn').click(function() {
		$("#xy_div").css("display", "block");
	});
	
	$('#xy_email_btn').click(function() {
		$("#xy_div").css("display", "block");
	});
	
	$('#xy_close').click(function() {
		$("#xy_div").css("display", "none");
	});
	
});