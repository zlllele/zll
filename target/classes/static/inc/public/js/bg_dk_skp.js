str_skpxh="˰�����ͺ�";
str_skph="˰���̱��";
str_azsj="��װʱ��";
str_qysj="����ʱ��";
str_yxsj="��Чʱ��";


//1. ������
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
		alert("˰���̺ų���Ӧ�õ���12!");
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
//2. У��������Ч��
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
			alert("˰���̺ų���Ӧ�õ���12!");
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
				alert(str_skph+"�����к��֣�");
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
			alert("����ʱ�䲻��С�ڽ��죡");
			form1.qysj.focus();
			return false;
		}
/*		if(qysjdate>yxsjdate)
		{
			alert("����ʱ�䲻�ܴ�����Чʱ�䣡");
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
			alert("����Ҫѡ��һ�Ʊ���ͣ�");
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
				alert("�����˰�������ظ������飡");
				return false;
			}
		}
	
	form1.submit();
	return true;
}
