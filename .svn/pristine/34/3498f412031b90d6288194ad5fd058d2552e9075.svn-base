$(function() {
	//页面是否可用
	var isUsed = false;
	var account = "";
	var phone = "";
	var email = "";
	$.ajax({
		url : "http://www.bwfapiao.com/login/user/forgetGetAccount.do",
		data : {},
		type : "POST",
		dataType : "JSONP",
		success : function(jsonObj) {
			if (jsonObj.code == 1) {
				account = jsonObj.data.USERID;
				phone = jsonObj.data.PHONE;
				email = jsonObj.data.EMAIL;
				if(phone==null||phone=="未绑定"||phone==""){
					$('#select_phone').css("display", "none");
					$("#account_phone").text("您的手机未绑定，请选择其它方式找回密码");
				}else{
					$("#account_phone").text("如果您的手机"+phone+"还在正常使用，请选择此方式");
				}
				if(email==null||email=="未绑定"||email==""){
					$('#select_email').css("display", "none");
					$("#account_email").text("您的邮箱未绑定，请选择其它方式找回密码");
				}else{
					$("#account_email").text("如果您的邮箱"+email+"还在正常使用，请选择此方式");
				}
				$("#account_txt").text(account);
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
	
	// 点击用手机找回密码
	$('#select_phone').click(function() {
		if(!isUsed){
			alert("请返回上一页重新设置");
			return;
		}else{
			//window.location.href="http://www.bwfapiao.com/server3/dzfp/forget/forget_gr_phone.html";
                          window.location.href="/forgetgrphone/index.jhtml";
		}
	});
	// 点击用邮箱找回密码
	$('#select_email').click(function() {
		if(!isUsed){
			alert("请返回上一页重新设置");
			return;
		}else{
			//window.location.href="http://www.bwfapiao.com/server3/dzfp/forget/forget_gr_email.html";
                          window.location.href="/forgetgremail/index.jhtml";
		}
	});
});