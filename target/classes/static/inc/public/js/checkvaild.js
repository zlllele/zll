
/**
* 
* 去除多余空格函数
* trim:去除两边空格 lTrim:去除左空格 rTrim: 去除右空格
* 用法：
*     var str = "  hello ";
*     str = str.trim();
*/
String.prototype.trim = function()
{
    return this.replace(/(^[\s]*)|([\s]*$)/g, "");
}
String.prototype.lTrim = function()
{
    return this.replace(/(^[\s]*)/g, "");
}
String.prototype.rTrim = function()
{
    return this.replace(/([\s]*$)/g, "");
}
/********************************** chinese ***************************************/
/**
*校验字符串是否为中文
*返回值：
*如果为空，定义校验通过，           返回true
*如果字串为中文，校验通过，         返回true
*如果字串为非中文，             返回false    参考提示信息：必须为中文！
*/
function checkIsChinese(str)
{
    //如果值为空，通过校验
    if (str == "")
        return true;
    var pattern = /^([\u4E00-\u9FA5]|[\uFE30-\uFFA0])*$/gi;
    if (pattern.test(str))
        return true;
    else
        return false;
}//~~~

/**
jstrim(o) 去除字符串o头的空格、回车字符
*/
function jstrim(ss)
{
	for(ii=0;ii<ss.length;ii++)
	{
		if(ss.charCodeAt(ii) == 13)
		{
			ii++;
		}
		else if((ss.charAt(ii) != " "))
		{
			return ss.slice(ii);
		}
	}
	return null;
}

/**
checknull(o,str) 检验o.value是否为空，如果空则输出警告信息str。
参数：o为文本框名，str为文本框中文名。
*/

function checknull(o,str)                                                                                   
{      
	//alert(str+"="+o.value);
	var ss=jstrim(o.value.trim());
    if( (ss == "")|| (ss == null) )                                                                                        
    {                                                                                                          
    	alert("请输入"+str+"!");                                                                                            
		o.focus();                                                                                     
    	return false;                                                                                          
    }                                                                                                          
	else                                                                                                   
		return true;                                                                                   
}


/**
获得文本的实际长度，汉字长度为2
*/
function getlength(str1)
{
	var len=0;
	var str=str1;
	//alert(str);
	for(x=0;x<str.length;x++)
	{
		
		if(str.charCodeAt(x)>255)
		{
			len+=2;
			//alert(len);
		}
		else
			len++;
	}
	return len;
}

/**
checklength(o,str,type,len) 检验o.value.length与len比较，是否符合type，如果不符合，输出警告信息。
参数：o为文本框名，str为文本框中文名，type为“<",">","="中的一种，len为长度标准。
例子：checklength(form.passwd,"用户口令"，">",8) 意思是passwd的长度应该大于等于8，检验如果小于8，则警告"用户口令应大于8".
*/

function checklength(o,str,type,len)
{
	truelen=getlength(o.value);
	if(type =="<")
	{
		if(truelen > len )
		{
			alert(str+"长度最多为 "+len+"!(如果有汉字，每个汉字长度为2)");
			o.focus(); 
			return false;
		}
		else 
			return true;
	}
	if(type == "=")
	{
		if(truelen != len)
		{
			alert(str+"长度应该等于 "+len+"!(如果有汉字，每个汉字长度为2)");
			o.focus(); 
			return false;
		}
		else
			return true;
	}
	if(type == ">" )
	{
		if(truelen < len )
		{
			alert(str+"长度至少为 "+len+"!(如果有汉字，每个汉字长度为2)");
			o.focus(); 
			return false;
		}
		else 
			return true;
	}
}
////////////////////o.value中只能有数字的长度校验
function checkNumlength(o,str,type,len)
{
	truelen=getlength(o.value);
	if(type =="<")
	{
		if(truelen > len )
		{
			alert(str+"长度最多为 "+len+"!");
			o.focus(); 
			return false;
		}
		else 
			return true;
	}
	if(type == "=")
	{
		if(truelen != len)
		{
			alert(str+"长度应该等于 "+len+"!");
			o.focus(); 
			return false;
		}
		else
			return true;
	}
	if(type == ">" )
	{
		if(truelen < len )
		{
			alert(str+"长度至少为 "+len+"!");
			o.focus(); 
			return false;
		}
		else 
			return true;
	}
}

/**
checknum（o,str) 检验o.value是否由数字组成
*/
function checknum(o,str)
{
	//alert(o.value);

   if(o.value!="")
   for(ii=0;ii<o.value.length;ii++)
   {
      if(!((o.value.charCodeAt(ii)>=48&&o.value.charCodeAt(ii)<=57)))
      {
		  	alert(str+"只能输入数字!");
	  		o.focus();
			return false;
	  }
   }
   return true;
}

/**
checkfloat（o,str) 检验o.value是否为浮点数组成
*/
function checkfloat(o,str)
{
	//alert(o.value);

   if(o.value!="")
   for(ii=0;ii<o.value.length;ii++)
   {
      if(!((o.value.charCodeAt(ii)>=48&&o.value.charCodeAt(ii)<=57)||o.value.charCodeAt(ii)=="."))
      {
		  	alert(str+"只能输入数字和小数点!");
	  		o.focus();
			return false;
	  }
   }
   return true;
}

/**
checknumletter(o,str)检验o.value是否由数字或字母组成。
*/
function checknumletter(o,str)
{
	//alert(str+"的数字字母混合检查");
	if(o.value!="")
   	for(ii=0;ii<o.value.length;ii++)
	{
   		if(!((o.value.charCodeAt(ii)>=48&&o.value.charCodeAt(ii)<=57)
			||(o.value.charCodeAt(ii)>=65&&o.value.charCodeAt(ii)<=90)
			||(o.value.charCodeAt(ii)>=97&&o.value.charCodeAt(ii)<=122)))
      	{
	  		alert(str+"只能由字母和数字组成!");
	  		o.focus();
	  		return false;
	  	}
   	}
	return true;
}

/**
checkphone(o) 检验电话号码是否符合规范
*/
function checkphone(o)
{
	//alert("检验电话");
   if(o.value!="")
   for(ii=0;ii<o.value.length;ii++)
   {	
   		
      if(!((o.value.charCodeAt(ii)>=48&&o.value.charCodeAt(ii)<=57)
			||(o.value.charCodeAt(ii)==45)))
      {
		  	alert("电话号码只能由数字和-组成!");
	  		o.focus();
			return false;
	  }
   }
   return true;
}
/**
Today2String()  将当天转化为yyyy-mm-dd格式的字符串。
*/
function Today2String()
{
	var today = new Date();
	year = (today.getYear())+"";
	month = (today.getMonth()+1);
	if(month<10)
		month="0"+month;
	day =(today.getDate());
	if(day<10)
		day="0"+day;
	return year+"-"+month+"-"+day;
}
/**
String2Date(str)  将格式为yyyy-mm-dd格式的字符串转换成日期型。
*/
function String2Date(str)
{
	
	var Datename= new Date();
	year=parseInt(str.substring(0,4),10);
	month=parseInt(str.substring(5,7),10)-1;
	day=parseInt(str.substring(8,10),10);
	
	Datename.setYear(year);
	Datename.setMonth(month);
	Datename.setDate(day);
	Datename.setHours(0);
	Datename.setMinutes(0);
	Datename.setSeconds(0);
	return Datename;
}

/**
String2Num(str)  将格式为yyyy-mm-dd格式的字符串转换成数字yyyymmdd。
*/
function String2Num(strDate)
{
	
	var date= strDate.split("-");
	str=date[0]+date[1]+date[2];
	num=parseInt(str,10);
	return num;
}

/**
判断是否是回车
*/
function isEnterKey(evt)
{
	if (!evt)
	{
		evt=window.event;
	}
	else if (!evt.keyCode)
	{
		evt.keyCode=evt.which;
	}
	return (evt.keyCode==13) 	 
}
//判断回车后焦点定在str元素上，fld是this指针，evt=event
function processOnEnter(fld,evt,str)
{
	if (isEnterKey(evt)) 
	{	
		var str1 = "document.form1."+str+".focus()";
		eval(str1);
	}
	return true;
}
//判断回车后焦点定在str元素上，fld是this指针，evt=event，fct是引用的校验函数
function processCheckEnter(fld,evt,str,fct)
{
	if (isEnterKey(evt)) 
	{		
		var str2 = fct+"()";
		eval(str2);
		
		if(form1.cgbz.value=="1")
		{
			var str1 = "document.form1."+str+".focus()";
			eval(str1);
			form1.cgbz.value=="0";
		}
		else
		{
			fld.focus();
		}
	}
	return true;
}
//判断回车后焦点定在str元素上，fld是this指针，evt=event，fct是引用的校验函数，para是fct的参数
function processCheckParaEnter(fld,evt,str,fct,para)
{
	if (isEnterKey(evt)) 
	{		
		var str2 = fct+"("+para+")";
		eval(str2);
		
		if(form1.cgbz.value=="1")
		{
			var str1 = "document.form1."+str+".focus()";
			eval(str1);
			form1.cgbz.value=="0";
		}
		else
		{
			fld.focus();
		}
	}
	return true;
}

function YhsbhText()
{
	if ( !(((window.event.keyCode >= 48) && (window.event.keyCode <= 57)) 
		||((window.event.keyCode >= 65) && (window.event.keyCode <= 90)) 
		||((window.event.keyCode >= 97) && (window.event.keyCode <= 122)) 
		|| (window.event.keyCode == 13)))
	{
		alert("只能输入数字和字母!");
		window.event.keyCode = 0 ;
	}
}
function checkYhsbh(o)	// 判断form1.yhsbh是否为合法形式
{	o.value = o.value.trim();
	o.value = o.value.toUpperCase();
	var yhsbh = o.value ;
	var len = yhsbh.length;	
	if( len == 0 ) 
	{
		alert("请输入用户识别号!");
		o.focus();
		return false;
	}
	else if ( len <9 || len >20 ) 
	{
		alert("用户识别号长度应大于等于9位小于等于20位!");
		o.focus();
		return false;
	}
	if( !checknumletter(o,"用户识别号") )
		return false;	
	if( yhsbh.substring(0,1)=="Z")
	{
		alert("用户识别号的首字母不能为Z");
		return false; 
	}
	return true;
}

/**
日期输入格式
*/
function DateFormat()
{
	if ( !(((window.event.keyCode >= 48) && (window.event.keyCode <= 57)) 
	|| (window.event.keyCode == 13)||(window.event.keyCode == 45)))
	{
		window.event.keyCode = 0 ;
	}
}

/**
检查日期输入是否符合规则 yyyy-mm-dd
*/
/*-- 返回某年某月的天数-- */
function Date_getDay(aiYear,aiMonth){
 var loDay = [0,31,28,31,30,31,30,31,31,30,31,30,31];
 if ((aiYear%4==0&&aiYear%100!=0)||(aiYear%400==0)) loDay[2] = 29;
 return loDay[aiMonth];
}

function Date_istrue(asDate)
{
	 var lsDate  = asDate + "";
	 var loDate  = lsDate.split("-");
	 if(asDate.length==0)  
	 {
		 alert("输入日期不能为空!");
		 return false;
	 }
	 if (loDate.length!=3)	 
	 {
		 alert("日期输入不符合yyyy-mm-dd的格式！例如2000-01-06");
		 return false;
	 }

	 var liYear  = parseInt(loDate[0],10);
	 var liMonth = parseInt(loDate[1],10);
	 var liDay   = parseInt(loDate[2],10);
	 if ((loDate[0].length!=4)||(loDate[1].length!=2)||(loDate[2].length!=2))
	 {
		 alert("日期输入不符合yyyy-mm-dd的格式！例如2000-01-06");
		 return false;
	 }
	 if (isNaN(liYear)||isNaN(liMonth)||isNaN(liDay)) 
	 {
		 alert("日期输入不符合yyyy-mm-dd的格式！例如2000-01-06");
		 return false;
	 }
	 if ((liYear<1900)||(liYear>3000))
	 {
		alert("年份应该大于等于1900年小于等于3000年!");
		return false;
	 }
	 if ((liMonth>12)||(liMonth<=0))
	 {
		 alert("月份应该是1～12的数!");
		 return false;
	 }
	 
	 if (Date_getDay(liYear,liMonth)<liDay||liDay==0) 
	 {
		 alert("输入的天数不符合实际情况!")
		 return false;
	 }
	 return !isNaN(Date.UTC(liYear,liMonth,liDay));
}
/**
限制只能输入回车和数字
*/
function NumberText()
{
	if ( !(((window.event.keyCode >= 48) && (window.event.keyCode <= 57)) 
	|| (window.event.keyCode == 13)))
	{
		alert("只能输入数字!");
		window.event.keyCode = 0 ;
	}
}

/**
校验税控收款机的机器编码和税控专用IC卡卡号是否符合编码规则
*/
function checkbm(str,lx)
{
	var cc = new Array(12);
	var verify = 0;	
	var ss ="";
	if ( lx == "0" ){ ss = "税控卡号"; }
	if ( lx == "1" ){ ss = "用户卡号"; }
	if ( lx == "2" ){ ss = "税务管理卡号"; }
	if ( lx == "3" ){ ss = "机器编号"; }
	if ( lx == "8" ){ ss = "传输盘号"; }
	if ( lx == "9" ){ ss = "税控盘号"; }
	if ( ( lx != "3" ) && ( lx != str.value.charAt(2) ) ){
		alert( ss+" "+str.value+" 不符合"+ss+"编码规则！" );
		str.focus();
		return false;
	}

	for ( ii=0; ii<12; ii++ ){
		cc[ii] = parseInt(str.value.charAt(ii),10);
	}
	for ( ii=0; ii<11; ii++){
		verify = verify + cc[ii]*((1<<(11-ii))%11);
	}
	verify = (11 - (verify%11))%10;
	if ( verify != cc[11] ){
		alert( ss+" "+str.value+" 不符合"+ss+"编码规则！" );
		str.focus();
		return false;
	}
	
	return true;
}