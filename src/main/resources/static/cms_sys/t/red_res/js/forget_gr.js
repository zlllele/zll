$(function() {
	
	
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
	
	//账号是否可用
	var accountIsUsed = false;
	//图片验证码是否可用
	var codeIsUsed = false;
	// 账号输入框失去焦点时检查输入文本的格式有效性
	$('#account').blur(function() {
		var account = $('#account').val();
		if(account == ""){
			return ;
		}
		$.ajax({
			url : "http://www.bwfapiao.com/login/user/checkUser.do",
			data : {
				'PHONE' : account
			},
			type : "POST",
			dataType : "JSONP",
			success : function(jsonObj) {
				if (jsonObj.code == 1) {
					$("#forget_account_error").css("display", "none");
					accountIsUsed = true;
					return;
				} else {
					$("#forget_account_error").css("display", "block");
					accountIsUsed = false;
					return;
				}
			}
		});
	});
	
	// 图形验证码失去焦点时验证用户输入正确性
	$('#code').blur(function() {
		var imgCode = $('#code').val();
		$.ajax({
			url : "http://www.bwfapiao.com/login/user/checkRegCode.do",
			data : {
				'IMGCODE' : imgCode
			},
			type : "POST",
			dataType : "JSONP",
			success : function(jsonObj) {
				if (jsonObj.code == 1) {
					$("#forget_code_error").css("display", "none");
					codeIsUsed = true;
				} else {
					$("#forget_code_error").css("display", "block");
					codeIsUsed = false;
				}
			}
		});
	});
	
	// 点击下一步进入选择密码重置方式页面
	$('#nextOne').click(function() {
		if(!accountIsUsed){
			alert("用户名不存在");
			return;
		}
		if(!codeIsUsed){
			alert("验证码不正确");
			return;
		}
		$.ajax({
			url : "http://www.bwfapiao.com/login/user/forgetSetAccount.do",
			data : {
				'ACCOUNT' : $('#account').val()
			},
			type : "POST",
			dataType : "JSONP",
			success : function(jsonObj) {
				if (jsonObj.code == 1) {
					//window.location.href="http://www.bwfapiao.com/server3/dzfp/forget/forget_gr_select.html";
                                     window.location.href="/forgetgrselect/index.html";
				}
			}
		});
	});
	//第一页结束
	
});