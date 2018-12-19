//个人登录
function grdlsubmit(){  
            //document.getElementById('myform').submit()  
            //下面为用jquery方法提交，不过需要引入js文件  
         // var aa=$("#signin-username").val();
       //  var aaa=$("#signin-password").val();
         alert("Welcome "+aa+aaa);           
		$('#grloginform').ajaxSubmit({
						url:"http://www.bwfapiao.com/login/user/userLogin.do",
						type : 'post',
						async : false,
						dataType : "jsonp",
						cache : false,
						success:function(jsonObj){
                                                       console.log(jsonObj);
				                    if(jsonObj.code==1){                            
                                 window.location.href="http://www.bwfapiao.com/server3/dzfp/zcyhgl/yhzx.html";
						 }else{
					alert("用户名或密码错误，请重新输入");}
				},
						error : function(jsonData) {
							alert("登录请求异常");
						}
					});
                       return false;

        }  
 //企业登录
  function qydlsubmit(){  
            //document.getElementById('myform').submit()  
            //下面为用jquery方法提交，不过需要引入js文件  
         // var aa=$("#signin-username").val();
       //  var aaa=$("#signin-password").val();
       //  alert("Welcome "+aa+aaa);           
		$('#qyloginform').ajaxSubmit({
						url:"http://www.bwfapiao.com/login/user/userLogin.do",
						type : 'post',
						async : false,
						dataType : "jsonp",
						cache : false,
						success:function(jsonObj){
                                                       console.log(jsonObj);
				                    if(jsonObj.code==1){                            
                                 window.location.href="http://www.bwfapiao.com/server3/dzfp/zcyhgl/yhzx.html";
						 }else{
					alert("用户名或密码错误，请重新输入");}
				},
						error : function(jsonData) {
							alert("登录请求异常");
						}
					});
                       return false;

        }  


 
        //页面刷新之后就会执行弹出框，则证明表单已经提交  
       // alert("页面已经刷新证明表单提交成功");  
          
       function buttonsubmit(){  
            //document.getElementById('myform').submit()  
            //下面为用jquery方法提交，不过需要引入js文件  
            //$('#myform').submit();  

		$('#myform').ajaxSubmit({
						url:"http://www.bwfapiao.com/login/user/userLogin.do",
						type : 'post',
						async : false,
						dataType : "jsonp",
						cache : false,
						success : function(jsonData) {
					 alert("登录成功");                                 
                       window.location.href="http://www.bwfapiao.com/server3/dzfp/zcyhgl/yhzx.html";
						},
						error : function(jsonData) {
							alert("登录请求异常");
						}
					});
                       return false;

        }  
 