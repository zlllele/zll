$(function(){
	var _userId= $.cookie("userid");
	var _jzmm = $.cookie("jzmm");
	$("#userId").val(_userId);
	if(_jzmm==1){
		$("#password").val($.cookie("password"));
		$("#jzmm").attr("checked","true");
		$("#password").focus();
	}else{
		$("#userId").focus();
	}
	$("#userId").keydown(function(event) {
	  if (event.keyCode == '13') {
	     event.preventDefault();
	     if($(this).val()){
	     	if($("#password").val()){
	     		login();
	     	}else{
	     		$("#password").focus();
	     	}
	     }
	   }
	});
	$("#password").keydown(function(event) {
	  if (event.keyCode == '13') {
	     event.preventDefault();
	     if($(this).val()){
	    	 login();
	     }
	   }
	});
});
function _successCallBack(){
	self.location="main.jsp";
}
function login()
{
	var _uid = $("#userId");
	if(_uid.val() === "")
	{
		alert("请输入“操作员”名称！");
		_uid.focus();
		return false;
	}
	var _upwd = $("#password");
	if(_upwd.val() === "")
	{
		alert("请输入操作员“密码”！");
		_upwd.focus();
		return false;
	}
	$.cookie("userid",_uid.val());
	if($("#jzmm").attr("checked")){
		$.cookie("jzmm","1");
		$.cookie("password",_upwd.val());
	}
//	$("#loginForm").attr("action","login.jsp");
	$("#loginForm").submit();
}