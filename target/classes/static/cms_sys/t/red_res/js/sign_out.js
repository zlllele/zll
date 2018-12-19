
function myFunction(val)
{
    alert("你好，我是一个警告框！");
                  var flag=val;
			if(flag=="2"){
                                $("#emailReg").show();
				$("#phoneReg").show();
                                $(".button_moshi").hide();
                                $(".xfzms").hide();
			}else{
                                $("#phoneReg").show();
				$(".xfzms").show();
                                $("emailReg").hide();
                                $(".sjms").hide();
			}
}

