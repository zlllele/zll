str_skpxh="税控盘型号";
str_skph="税控盘编号";
str_azsj="安装时间";
str_qysj="启用时间";
str_yxsj="有效时间";


//1. 逐项检查
function skpxhCheck()
{
	if(!checknull(form1.skpxh,str_skpxh))
	{
		form1.cgbz.value="0";
		return false;
	}
	if(!checklength(form1.skpxh,str_skpxh,"<",30))
	{
		form1.cgbz.value="0";
		return false;
	}
	form1.cgbz.value="1";
	return true;
}
function skphCheck()
{
	if(!checknull(form1.skph,str_skph))
	{
		form1.cgbz.value="0";
		return false;
	}
	if(!checknum(form1.skph,str_skph))
	{
		form1.cgbz.value="0";
		return false;
	}
	if(eval("form1.skph.value.length")!=12)
	{
		form1.cgbz.value="0";
		alert("税控盘号长度应该等于12!");
		form1.skph.focus();
		return false;
	}
		
	if(!checkbm(form1.skph,9))
	{
		form1.skph.focus();
		return false;
	}

	form1.cgbz.value="1";
	return true;
}
function qysjCheck()
{
	if(!checknull(form1.qysj,str_qysj))
	{
		form1.cgbz.value="0";
		return false;
	}
	if(!Date_istrue(form1.qysj.value))
	{
		form1.cgbz.value="0";
		form1.qysj.focus();
		return false;
	}
	form1.cgbz.value="1";
	return true;
}


/*function yxsjCheck()
{
	if(!checknull(form1.yxsj,str_yxsj))
	{
		form1.cgbz.value="0";
		return false;
	}
	if(!Date_istrue(form1.yxsj.value))
	{
		form1.cgbz.value="0";
		form1.yxsj.focus();
		return false;
	}
	form1.cgbz.value="1";
	return true;
}
*/
//2. 校验数据有效性
function checkskpbg(fplxnum,yyskpnum,addnum,xgnum)
{
	num=0;
	
	selnum=0;
	var skph=new Array(yyskpnum+addnum+xgnum+1);
	yyskpnum=yyskpnum-xgnum;
	for(i=0;i<yyskpnum;i++)
	{
		skph[selnum]=form1("yyskph"+i).value;
		selnum++;
	}
	for(i=0;i<addnum;i++)
	{
		skph[selnum]=form1("addskph"+i).value;
		selnum++;
	}
	for(i=0;i<xgnum;i++)
	{
		skph[selnum]=form1("xgskph"+i).value;
		selnum++;
	}
	//alert(form1.skph,str_skph));
	if(form1.skph.value.length>0)
	{
		if(!checknull(form1.skpxh,str_skpxh))
		{
			return false;
		}
		if(!checknull(form1.qysj,str_qysj))
		{
			return false;
		}
/*		if(!checknull(form1.yxsj,str_yxsj))
		{
			return false;
		}
*/		
		if(!checklength(form1.skpxh,str_skpxh,"<",30))
		{
			return false;
		}
		if(!checklength(form1.skph,str_skph,"<",16))
		{
			return false;
		}
		if(eval("form1.skph.value.length")!=12)
		{
			form1.cgbz.value="0";
			alert("税控盘号长度应该等于12!");
			form1.skph.focus();
			return false;
		}
		
		if(!checknum(form1.skph,str_skph))
		{
			return false;
		}
	/*	for(i=0;i<form1.skph.value.length;i++)
		{
			if(form1.skph.value.charCodeAt(i)>255)
			{
				alert(str_skph+"不能有汉字！");
				form1.skph.focus();
				return false;
			}
		}*/
		if(!checkbm(form1.skph,9))
		{
			form1.skph.focus();
			return false;
		}
	
		if(!Date_istrue(form1.qysj.value))
		{
			form1.qysj.focus();
			return false;
		}
/*		if(!Date_istrue(form1.yxsj.value))
		{
			form1.yxsj.focus();
			return false;
		}
*/	
		qysjdate=String2Num(form1.qysj.value);
		//yxsjdate=String2Num(form1.yxsj.value);
		nowDate=String2Num(Today2String());
		
		if(nowDate>qysjdate)
		{
			alert("启用时间不能小于今天！");
			form1.qysj.focus();
			return false;
		}
/*		if(qysjdate>yxsjdate)
		{
			alert("启用时间不能大于有效时间！");
			form1.qysj.focus();
			return false;
		}
*/	
		num=0;
		for(i=0;i<fplxnum;i++)
		{
			if(eval("form1.fplxsel"+i+".checked"))
				num++;
		}
		if(num==0)
		{
			alert("至少要选择一项发票类型！");
			form1.fplxsel0.focus();
			return false;
		}
		
		skph[selnum]=form1.skph.value;
		selnum++;
	}
	for(i=0;i<selnum-1;i++)
		for(j=i+1;j<selnum;j++)
		{
			if(skph[i]==skph[j])
			{
				alert("变更的税控盘有重复，请检查！");
				return false;
			}
		}
	
	form1.submit();
	return true;
}
