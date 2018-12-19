
String.prototype.ReplaceAll = stringReplaceAll; 
function  stringReplaceAll(AFindText,ARepText){  
	raRegExp = new RegExp(AFindText,"g");  
	return this.replace(raRegExp,ARepText);
}  

function checkForm(thisform,items,message)
{
	
	thisform = thisform;
	items = ","+items + ",";

	for(i=1;i<=thisform.length;i++)
	{
		tmpname = thisform.elements[i-1].name;
		tmpvalue = thisform.elements[i-1].value;
	    if(tmpvalue==null){
	        continue;
	    }
		while(tmpvalue.indexOf(" ") == 0)
			tmpvalue = tmpvalue.substring(1,tmpvalue.length);
	   
		if(tmpname!="" &&items.indexOf(","+tmpname+",")!=-1 && tmpvalue == ""){
			 alert(message);
			 return false;
			}

	}
	
	if(getValidStr(event.srcElement.disabled) == "false")
		event.srcElement.disabled = true;
	
	return true;
}

function isConfirm(message){
   if(!confirm(message)){
       return false;
   }
       return true;
}



function fieldcheck(elementobj,checkrule,objname){
	var elementvalue = Trim(getValidStr(elementobj.value));
	checkrule = Trim(getValidStr(checkrule));
	if(elementvalue=="")
		return;
		
	if(checkrule=="")
		return;
		
	var valid=false;
	eval("valid=/"+checkrule+"/.test(\""+elementvalue+"\");");

	if (!valid){
		alert("["+objname+"]"+decode("^8be5^5b57^6bb5^7684^8f93^5165^503c^4e0d^7b26^5408^6821^9a8c^89c4^5219^ff01"));
		
		elementobj.value = "";
	}
}



function fieldcheck2(elementobj,checkrule,objname){
	var elementvalue = Trim(getValidStr(elementobj.innerHTML));
	checkrule = Trim(getValidStr(checkrule));
	if(elementvalue=="")
		return;
		
	if(checkrule=="")
		return;
		
	var valid=false;
	eval("valid=/"+checkrule+"/.test(\""+elementvalue+"\");");

	if (!valid){
		alert("["+objname+"]"+decode("^8be5^5b57^6bb5^7684^8f93^5165^503c^4e0d^7b26^5408^6821^9a8c^89c4^5219^ff01"));
		
		elementobj.innerHTML = "";
	}
}


function checkInput(elementname,spanid){
	tmpvalue = document.all(elementname).value;

	while(tmpvalue.indexOf(" ") == 0)
		tmpvalue = tmpvalue.substring(1,tmpvalue.length);
	if(tmpvalue!=""){
		 document.all(spanid).innerHTML='';
	}
	else{
	 document.all(spanid).innerHTML="<IMG src='/vimgs/checkinput.gif' align=absMiddle>";
	 document.all(elementname).value = "";
	}
}

function checkInputLenth(elementname,min,max){
	tmpvalue = document.all(elementname).value;
	tmpvalue = Trim(tmpvalue);
	if(tmpvalue.length>=min && tmpvalue.length<=max){
		 return true;
	}
	else{
		
	 	document.all(elementname).value = "";
	 	msg="请输入"+min+"－"+max+"位字符";
	 	alert(msg);
	 	return false;
	}
}



function checkInt_KeyPress()
{
 if(!(window.event.keyCode>=48 && window.event.keyCode<=57))
  {
     window.event.keyCode=0;
  }
}


function checkFloat_KeyPress()
{
 if(!((window.event.keyCode>=48 && window.event.keyCode<=57) || window.event.keyCode==46))
  {
     window.event.keyCode=0;
  }
}


function checkPhone_KeyPress()
{
 if(!((window.event.keyCode>=48 && window.event.keyCode<=57) || window.event.keyCode==45))
  {
     window.event.keyCode=0;
  }
}


function checkABC_KeyPress()
{
 if(!(window.event.keyCode>=65 && window.event.keyCode<=90))
  {
     window.event.keyCode=0;
  }
}

function checkQuotes_KeyPress()
{
 if(window.event.keyCode==39)
  {
     window.event.keyCode=0;
  }
}

function checkEmail(elementname){
	tmpvalue = document.all(elementname).value;
	while(tmpvalue.indexOf(" ") == 0){
		tmpvalue = tmpvalue.substring(1,tmpvalue.length);
	}
	if (tmpvalue=="" || tmpvalue.indexOf("@") <1 || tmpvalue.indexOf(".") <1 || tmpvalue.length <5) {
	 document.all(elementname).value = "";
	}
}


function checkinput_char_num(elementname)
{
	valuechar = document.all(elementname).value.split("") ;
	if(valuechar.length==0){
	    return ;
	}
	notcharnum = false ;
	notchar = false ;
	notnum = false ;
	for(i=0 ; i<valuechar.length ; i++) {
		notchar = false ;
		notnum = false ;
		charnumber = parseInt(valuechar[i]) ; if(isNaN(charnumber)) notnum = true ;
		if(valuechar[i].toLowerCase()<'a' || valuechar[i].toLowerCase()>'z') notchar = true ;
		if(notnum && notchar) notcharnum = true ;
	}
	if(valuechar[0].toLowerCase()<'a' || valuechar[0].toLowerCase()>'z') notcharnum = true ;
	if(notcharnum) document.all(elementname).value = "" ;
}




function RTrim(str)
{
    var whitespace = new String(" \t\n\r");
    var s = new String(str);
    if (whitespace.indexOf(s.charAt(s.length-1)) != -1)
    {
        var i = s.length - 1;
        while (i >= 0 && whitespace.indexOf(s.charAt(i)) != -1)
        {
            i--;
        }
        s = s.substring(0, i+1);
    }
    return s;
}

function LTrim(str)
{
    var whitespace = new String(" \t\n\r");
    var s = new String(str);
    if (whitespace.indexOf(s.charAt(0)) != -1)
    {
        var j=0, i = s.length;
        while (j < i && whitespace.indexOf(s.charAt(j)) != -1)
        {
            j++;
        }
        s = s.substring(j, i);
    }
    return s;
}

function Trim(str)
{
    return RTrim(LTrim(str));
}

function getStringValue(value){
	if (typeof(value)=="string" || typeof(value)=="object")
		return "\""+getValidStr(value)+"\"";
	else if (typeof(value)=="date"){
		return "\""+(new Date(value))+"\"";
	}else if (getValidStr(value)=="")
		return "\"\"";
	else
		return value;
}

function getValidStr(str) {
	str+="";
	if (str=="undefined" || str=="null")
		return "";
	else
		return str;
}

function encode(strIn)
{
	var intLen=strIn.length;
	var strOut="";
	var strTemp;

	for(var i=0; i<intLen; i++)
	{
		strTemp=strIn.charCodeAt(i);
		if (strTemp>255)
		{
			tmp = strTemp.toString(16);
			for(var j=tmp.length; j<4; j++) tmp = "0"+tmp;
			strOut = strOut+"^"+tmp;
		}
		else
		{
			if (strTemp < 48 || (strTemp > 57 && strTemp < 65) || (strTemp > 90 && strTemp < 97) || strTemp > 122)
			{
				tmp = strTemp.toString(16);
				for(var j=tmp.length; j<2; j++) tmp = "0"+tmp;
				strOut = strOut+"|"+tmp;
			}
			else
			{
				strOut=strOut+strIn.charAt(i);
			}
		}
	}
	return (strOut);
}

function decode(strIn)
{
	var intLen = strIn.length;
	var strOut = "";
	var strTemp;

	for(var i=0; i<intLen; i++)
	{
		strTemp = strIn.charAt(i);
		switch (strTemp)
		{
			case "|":{
				strTemp = strIn.substring(i+1, i+3);
				strTemp = parseInt(strTemp, 16);
				strTemp = String.fromCharCode(strTemp);
				strOut = strOut+strTemp;
				i += 2;
				break;
			}
			case "^":{
				strTemp = strIn.substring(i+1, i+5);
				strTemp = parseInt(strTemp,16);
				strTemp = String.fromCharCode(strTemp);
				strOut = strOut+strTemp;
				i += 4;
				break;
			}
			default:{
				strOut = strOut+strTemp;
				break;
			}
		}

	}
	return (strOut);
}

function getEncodeStr(str) {
	return encode(getValidStr(str));
}

function getDecodeStr(str) {
	return ((str)?decode(getValidStr(str)):"");
}


//函数名：fucCheckNUM
//功能介绍：检查是否为数字
//参数说明：要检查的数字
//返回值：1为是数字，0为不是数字
function fucCheckNUM(NUM){

	 var i,j,strTemp;
	 strTemp="0123456789";
	 if ( NUM.length== 0)
	 	return 0

	 for (i=0;i<NUM.length;i++)
	 {

		 j=strTemp.indexOf(NUM.charAt(i)); 

		 if (j==-1)
		 {
		 	alert("请输入数字...");
			 //说明有字符不是数字
			 return 0;
			 
		 }
	 }
	 
	 //说明是数字
	 return 1;
}
function fucCheckNUM2(NUM){

	 var i,j,strTemp;
	 strTemp=".0123456789";
	 if ( NUM.length== 0)
	 	return 0

	 for (i=0;i<NUM.length;i++)
	 {

		 j=strTemp.indexOf(NUM.charAt(i)); 

		 if (j==-1)
		 {
		 	alert("请输入数字...");
			 //说明有字符不是数字
			 return 0;
			 
		 }
	 }
	 
	 //说明是数字
	 return 1;
}
