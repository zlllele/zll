$(function() {
	var phoneRightPwd = false;
	//页面是否可用
	var isUsed = false;
	var account = "";
	$.ajax({
		url : "http://www.bwfapiao.com/login/user/forgetGetAccount.do",
		data : {},
		type : "POST",
		dataType : "JSONP",
		success : function(jsonObj) {
			if (jsonObj.code == 1) {
				account = jsonObj.data.USERID;
				isUsed = true;
			}else{
				isUsed = false;
				alert(jsonObj.msg);
			}
		}
	});
/*	
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
*/
	$('#phoneFirstPwd').blur(function() {
		var pwd = $('#phoneFirstPwd').val();
		if(pwd.length<6||pwd.length>16){
			$("#forget_1_error").text("请输入6-16位的密码");
			$("#forget_1_error").css("display", "block");
			return;
		}
		var flag = passwordLevel(pwd);
		if (flag < 2) {
			$("#forget_1_error").text("密码过简单，请输入数字、小写字母、大写字母、特殊字符混合密码");
			$("#forget_1_error").css("display", "block");
			return;
		}
		$("#forget_1_error").css("display", "none");
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
			phoneRightPwd = false;
			$("#forget_2_error").text("两次输入的密码不一致");
			$("#forget_2_error").css("display", "block");
			return;
		} 
		$("#forget_2_error").css("display", "none");
		phoneRightPwd = true;
	});
	// 点击下一步保存密码
	$('#next_btn').click(function() {
		if(!isUsed){
			alert("请返回上一页重新设置");
			return;
		}
		if(!phoneRightPwd){
			alert("密码设置有误");
			return;
		}
		var password = $('#phoneFirstPwd').val();
		$.ajax({
			url : "http://www.bwfapiao.com/login/user/updUserPwd.do",
			data : {
				"USERNAME" : account,
				"PASSWORD" : password
			},
			type : "POST",
			dataType : "JSONP",
			success : function(jsonObj) {
				if (jsonObj.code == 1) {
					//window.location.href="/server3/dzfp/forget/forget_gr_sucess.html";
                                          window.location.href="/forgetgrsucess/index.jhtml";
				}else{
					alert(jsonObj.msg);
				}
			}
		});
	});
})