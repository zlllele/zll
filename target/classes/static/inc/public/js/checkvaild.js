
/**
* 
* ȥ������ո���
* trim:ȥ�����߿ո� lTrim:ȥ����ո� rTrim: ȥ���ҿո�
* �÷���
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
*У���ַ����Ƿ�Ϊ����
*����ֵ��
*���Ϊ�գ�����У��ͨ����           ����true
*����ִ�Ϊ���ģ�У��ͨ����         ����true
*����ִ�Ϊ�����ģ�             ����false    �ο���ʾ��Ϣ������Ϊ���ģ�
*/
function checkIsChinese(str)
{
    //���ֵΪ�գ�ͨ��У��
    if (str == "")
        return true;
    var pattern = /^([\u4E00-\u9FA5]|[\uFE30-\uFFA0])*$/gi;
    if (pattern.test(str))
        return true;
    else
        return false;
}//~~~

/**
jstrim(o) ȥ���ַ���oͷ�Ŀո񡢻س��ַ�
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
checknull(o,str) ����o.value�Ƿ�Ϊ�գ�����������������Ϣstr��
������oΪ�ı�������strΪ�ı�����������
*/

function checknull(o,str)                                                                                   
{      
	//alert(str+"="+o.value);
	var ss=jstrim(o.value.trim());
    if( (ss == "")|| (ss == null) )                                                                                        
    {                                                                                                          
    	alert("������"+str+"!");                                                                                            
		o.focus();                                                                                     
    	return false;                                                                                          
    }                                                                                                          
	else                                                                                                   
		return true;                                                                                   
}


/**
����ı���ʵ�ʳ��ȣ����ֳ���Ϊ2
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
checklength(o,str,type,len) ����o.value.length��len�Ƚϣ��Ƿ����type����������ϣ����������Ϣ��
������oΪ�ı�������strΪ�ı�����������typeΪ��<",">","="�е�һ�֣�lenΪ���ȱ�׼��
���ӣ�checklength(form.passwd,"�û�����"��">",8) ��˼��passwd�ĳ���Ӧ�ô��ڵ���8���������С��8���򾯸�"�û�����Ӧ����8".
*/

function checklength(o,str,type,len)
{
	truelen=getlength(o.value);
	if(type =="<")
	{
		if(truelen > len )
		{
			alert(str+"�������Ϊ "+len+"!(����к��֣�ÿ�����ֳ���Ϊ2)");
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
			alert(str+"����Ӧ�õ��� "+len+"!(����к��֣�ÿ�����ֳ���Ϊ2)");
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
			alert(str+"��������Ϊ "+len+"!(����к��֣�ÿ�����ֳ���Ϊ2)");
			o.focus(); 
			return false;
		}
		else 
			return true;
	}
}
////////////////////o.value��ֻ�������ֵĳ���У��
function checkNumlength(o,str,type,len)
{
	truelen=getlength(o.value);
	if(type =="<")
	{
		if(truelen > len )
		{
			alert(str+"�������Ϊ "+len+"!");
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
			alert(str+"����Ӧ�õ��� "+len+"!");
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
			alert(str+"��������Ϊ "+len+"!");
			o.focus(); 
			return false;
		}
		else 
			return true;
	}
}

/**
checknum��o,str) ����o.value�Ƿ����������
*/
function checknum(o,str)
{
	//alert(o.value);

   if(o.value!="")
   for(ii=0;ii<o.value.length;ii++)
   {
      if(!((o.value.charCodeAt(ii)>=48&&o.value.charCodeAt(ii)<=57)))
      {
		  	alert(str+"ֻ����������!");
	  		o.focus();
			return false;
	  }
   }
   return true;
}

/**
checkfloat��o,str) ����o.value�Ƿ�Ϊ���������
*/
function checkfloat(o,str)
{
	//alert(o.value);

   if(o.value!="")
   for(ii=0;ii<o.value.length;ii++)
   {
      if(!((o.value.charCodeAt(ii)>=48&&o.value.charCodeAt(ii)<=57)||o.value.charCodeAt(ii)=="."))
      {
		  	alert(str+"ֻ���������ֺ�С����!");
	  		o.focus();
			return false;
	  }
   }
   return true;
}

/**
checknumletter(o,str)����o.value�Ƿ������ֻ���ĸ��ɡ�
*/
function checknumletter(o,str)
{
	//alert(str+"��������ĸ��ϼ��");
	if(o.value!="")
   	for(ii=0;ii<o.value.length;ii++)
	{
   		if(!((o.value.charCodeAt(ii)>=48&&o.value.charCodeAt(ii)<=57)
			||(o.value.charCodeAt(ii)>=65&&o.value.charCodeAt(ii)<=90)
			||(o.value.charCodeAt(ii)>=97&&o.value.charCodeAt(ii)<=122)))
      	{
	  		alert(str+"ֻ������ĸ���������!");
	  		o.focus();
	  		return false;
	  	}
   	}
	return true;
}

/**
checkphone(o) ����绰�����Ƿ���Ϲ淶
*/
function checkphone(o)
{
	//alert("����绰");
   if(o.value!="")
   for(ii=0;ii<o.value.length;ii++)
   {	
   		
      if(!((o.value.charCodeAt(ii)>=48&&o.value.charCodeAt(ii)<=57)
			||(o.value.charCodeAt(ii)==45)))
      {
		  	alert("�绰����ֻ�������ֺ�-���!");
	  		o.focus();
			return false;
	  }
   }
   return true;
}
/**
Today2String()  ������ת��Ϊyyyy-mm-dd��ʽ���ַ�����
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
String2Date(str)  ����ʽΪyyyy-mm-dd��ʽ���ַ���ת���������͡�
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
String2Num(str)  ����ʽΪyyyy-mm-dd��ʽ���ַ���ת��������yyyymmdd��
*/
function String2Num(strDate)
{
	
	var date= strDate.split("-");
	str=date[0]+date[1]+date[2];
	num=parseInt(str,10);
	return num;
}

/**
�ж��Ƿ��ǻس�
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
//�жϻس��󽹵㶨��strԪ���ϣ�fld��thisָ�룬evt=event
function processOnEnter(fld,evt,str)
{
	if (isEnterKey(evt)) 
	{	
		var str1 = "document.form1."+str+".focus()";
		eval(str1);
	}
	return true;
}
//�жϻس��󽹵㶨��strԪ���ϣ�fld��thisָ�룬evt=event��fct�����õ�У�麯��
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
//�жϻس��󽹵㶨��strԪ���ϣ�fld��thisָ�룬evt=event��fct�����õ�У�麯����para��fct�Ĳ���
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
		alert("ֻ���������ֺ���ĸ!");
		window.event.keyCode = 0 ;
	}
}
function checkYhsbh(o)	// �ж�form1.yhsbh�Ƿ�Ϊ�Ϸ���ʽ
{	o.value = o.value.trim();
	o.value = o.value.toUpperCase();
	var yhsbh = o.value ;
	var len = yhsbh.length;	
	if( len == 0 ) 
	{
		alert("�������û�ʶ���!");
		o.focus();
		return false;
	}
	else if ( len <9 || len >20 ) 
	{
		alert("�û�ʶ��ų���Ӧ���ڵ���9λС�ڵ���20λ!");
		o.focus();
		return false;
	}
	if( !checknumletter(o,"�û�ʶ���") )
		return false;	
	if( yhsbh.substring(0,1)=="Z")
	{
		alert("�û�ʶ��ŵ�����ĸ����ΪZ");
		return false; 
	}
	return true;
}

/**
���������ʽ
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
������������Ƿ���Ϲ��� yyyy-mm-dd
*/
/*-- ����ĳ��ĳ�µ�����-- */
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
		 alert("�������ڲ���Ϊ��!");
		 return false;
	 }
	 if (loDate.length!=3)	 
	 {
		 alert("�������벻����yyyy-mm-dd�ĸ�ʽ������2000-01-06");
		 return false;
	 }

	 var liYear  = parseInt(loDate[0],10);
	 var liMonth = parseInt(loDate[1],10);
	 var liDay   = parseInt(loDate[2],10);
	 if ((loDate[0].length!=4)||(loDate[1].length!=2)||(loDate[2].length!=2))
	 {
		 alert("�������벻����yyyy-mm-dd�ĸ�ʽ������2000-01-06");
		 return false;
	 }
	 if (isNaN(liYear)||isNaN(liMonth)||isNaN(liDay)) 
	 {
		 alert("�������벻����yyyy-mm-dd�ĸ�ʽ������2000-01-06");
		 return false;
	 }
	 if ((liYear<1900)||(liYear>3000))
	 {
		alert("���Ӧ�ô��ڵ���1900��С�ڵ���3000��!");
		return false;
	 }
	 if ((liMonth>12)||(liMonth<=0))
	 {
		 alert("�·�Ӧ����1��12����!");
		 return false;
	 }
	 
	 if (Date_getDay(liYear,liMonth)<liDay||liDay==0) 
	 {
		 alert("���������������ʵ�����!")
		 return false;
	 }
	 return !isNaN(Date.UTC(liYear,liMonth,liDay));
}
/**
����ֻ������س�������
*/
function NumberText()
{
	if ( !(((window.event.keyCode >= 48) && (window.event.keyCode <= 57)) 
	|| (window.event.keyCode == 13)))
	{
		alert("ֻ����������!");
		window.event.keyCode = 0 ;
	}
}

/**
У��˰���տ���Ļ��������˰��ר��IC�������Ƿ���ϱ������
*/
function checkbm(str,lx)
{
	var cc = new Array(12);
	var verify = 0;	
	var ss ="";
	if ( lx == "0" ){ ss = "˰�ؿ���"; }
	if ( lx == "1" ){ ss = "�û�����"; }
	if ( lx == "2" ){ ss = "˰�������"; }
	if ( lx == "3" ){ ss = "�������"; }
	if ( lx == "8" ){ ss = "�����̺�"; }
	if ( lx == "9" ){ ss = "˰���̺�"; }
	if ( ( lx != "3" ) && ( lx != str.value.charAt(2) ) ){
		alert( ss+" "+str.value+" ������"+ss+"�������" );
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
		alert( ss+" "+str.value+" ������"+ss+"�������" );
		str.focus();
		return false;
	}
	
	return true;
}