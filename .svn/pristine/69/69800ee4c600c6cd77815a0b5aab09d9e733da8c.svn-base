function changeImage(imgid){
	var checkNumberImage = document.getElementById(imgid);
	var baseUrl = document.getElementById("url").value;
	checkNumberImage.src = baseUrl + "verify/imageCode?timestamp=" + new Date().getTime();
}


function changeImagecy(imgid){
	var checkNumberImage = document.getElementById(imgid);
	var baseUrl = document.getElementById("url").value;
	checkNumberImage.src = baseUrl + "verify/imageCodecy?timestamp=" + new Date().getTime();
}



function changeMember(imgid){
	var checkNumberImage = document.getElementById(imgid);
	var baseUrl = document.getElementById("url").value;
	checkNumberImage.src = baseUrl + "member/memberimage?timestamp=" + new Date().getTime();
}


function changeEnterprise(imgid){
	var checkNumberImage = document.getElementById(imgid);
	var baseUrl = document.getElementById("url").value;
	checkNumberImage.src = baseUrl + "enterprise/enterpriseimageCode?timestamp=" + new Date().getTime();
}

function medownload(){
	 var memberdownload = $("#memberdownload").val();
	window.location.href=memberdownload;
}

//-------------------------------------提问----------------------------------------------
//纳税人提问
function ntj(){

	var url = $("#url").val();
	var checkurl=url+"msg/leave";
	var question = $("#nquestion").val();
	var email = $("#nemail").val();
	var categories = $("#ncategories").val();
	var yzm = $("#nyzm").val();
	 $.ajax({
			type : "POST",
			dataType : "JSON",
			url : checkurl,
			data :{question:question,email:email,categories:categories,yzm:yzm},
			success : function(data) {
//				if(data.state=="1"){
//					
//					window.location.href=url+"index/index";
//				}
				alert(data.message);
				$("input[type=reset]").trigger("click");
			},
			timeout : 300000,
			error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("Error");
			}
		});
}

//电商平台提问
function dtj(){

	var url = $("#url").val();
	var checkurl=url+"msg/leave";
	var question = $("#dquestion").val();
	var email = $("#demail").val();
	var categories = $("#dcategories").val();
	var yzm = $("#dyzm").val();
	 $.ajax({
			type : "POST",
			dataType : "JSON",
			url : checkurl,
			data :{question:question,email:email,categories:categories,yzm:yzm},
			success : function(data) {
//				if(data.state=="1"){
//					
//					window.location.href=url+"index/index";
//				}
				alert(data.message);
				$("input[type=reset]").trigger("click");
			},
			timeout : 300000,
			error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("Error");
			}
		});
}

//消费者提问
function xtj(){

	var url = $("#url").val();
	var checkurl=url+"msg/leave";	
	var question = $("#xquestion").val();
	var email = $("#xemail").val();
	var categories = $("#xcategories").val();
	var yzm = $("#xyzm").val();
	 $.ajax({
			type : "POST",
			dataType : "JSON",
			url : checkurl,
			data :{question:question,email:email,categories:categories,yzm:yzm},
			success : function(data) {
//				if(data.state=="1"){
//					
//					window.location.href=url+"index/index";
//				}
				alert(data.message);
				$("input[type=reset]").trigger("click");
			},
			timeout : 300000,
			error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("Error");
			}
		});
}

//平台使用帮助提问
function ptj(){

	var url = $("#url").val();
	var checkurl=url+"msg/leave";
	var question = $("#pquestion").val();
	var email = $("#pemail").val();
	var categories = $("#pcategories").val();
	var yzm = $("#pyzm").val();
	 $.ajax({
			type : "POST",
			dataType : "JSON",
			url : checkurl,
			data :{question:question,email:email,categories:categories,yzm:yzm},
			success : function(data) {
//				if(data.state=="1"){
//					
//					window.location.href=url+"index/index";
//				}
				alert(data.message);
				$("input[type=reset]").trigger("click");
			},
			timeout : 300000,
			error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("Error");
			}
		});
}

//-------------------------------------邮箱格式检测----------------------------------------------

//纳税人邮箱检测
function ncheckemail() {
	
	var nemail = $("#nemail").val();
	if (nemail.length == 0) {
		return false;
	}else {
		var email = !!nemail
				.match(/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/);
		if (email) {
			// 邮箱ok
			return true;
		} else {
			// 邮箱格式不正确
			alert('邮箱格式不正确');
			
		}
	}
}

//电商平台邮箱检测
function dcheckemail() {
	
	var demail = $("#demail").val();
	if (demail.length == 0) {
		return false;
	}else {
		var email = !!demail
				.match(/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/);
		if (email) {
			// 邮箱ok
			return true;
		} else {
			// 邮箱格式不正确
			alert('邮箱格式不正确');
			
		}
	}
}

//消费者邮箱检测
function xcheckemail() {
	
	var xemail = $("#xemail").val();
	if (xemail.length == 0) {
		return false;
	}else {
		var email = !!xemail
				.match(/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/);
		if (email) {
			// 邮箱ok
			return true;
		} else {
			// 邮箱格式不正确
			alert('邮箱格式不正确');
			
		}
	}
}

//平台使用帮助邮箱检测
function pcheckemail() {
	
	var pemail = $("#pemail").val();
	if (pemail.length == 0) {
		return false;
	}else {
		var email = !!pemail
				.match(/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/);
		if (email) {
			// 邮箱ok
			return true;
		} else {
			// 邮箱格式不正确
			alert('邮箱格式不正确');
			
		}
	}
}