function first()
{
	form1.pagenu1.value = 1;
	form1.submit();
}

function last()
{
	form1.pagenu1.value = form1.pageCount.value;
	form1.submit();
}

function up()
{
    var page = parseInt(form1.pagenu1.value,10)-1;
	if ( page < 1 ) 
	{
	  form1.pagenu1.value = 1;
	  form1.Button_up.disabled = true;
	}
	else 
	{
	  form1.pagenu1.value = page;
	  form1.submit();
	}
 // form1.pagenu1.value=parseInt(form1.pagenu1.value)-1;
  
    
}

function down()
{
  //form1.pagenu1.value=parseInt(form1.pagenu1.value)+1;
  //form1.submit();
    var page = parseInt(form1.pagenu1.value,10)+1;
	if ( page > form1.pageCount.value ) 
	{
	  form1.pagenu1.value = form1.pageCount.value;
	  form1.Button_down.disabled = true;
	}
	else 
	{
	  form1.pagenu1.value = page;
	  //alert(form1.pagenu1.value)
	  form1.submit();
	 }
}
function check0()
{
  var count=0;
  var start,end,showPage,pageSize,rowCount;
  showPage=parseInt(form1.pagenu1.value,10);
  pageSize=parseInt(form1.listnu1.value,10);
  rowCount=parseInt(form1.rowCount.value,10);
   
  //若rowCount/pageSize的余数不为0且为最后一页
  if((rowCount%pageSize!=0)&&showPage==(parseInt(rowCount/pageSize,10)+1))
  {//得到最后一页的记录数，若rowCount/pageSize=5.5 则parseInt(rowCount/pageSize)=5
    count=rowCount-parseInt(rowCount/pageSize,10)*pageSize
  }
  else
  {
    count=pageSize;
  }
  start=(showPage-1)*pageSize+1;
  
  if(rowCount!=0)
  {
  	for(i=0;i<count;i++)
  	{
      	form1("checkbox"+(start+i)).checked=form1.sec.checked
  	}
  }
}

function check1()
{
	
  var count=0;
  var start,end,showPage,pageSize,rowCount;
  showPage=parseInt(form1.pagenu1.value,10);
  pageSize=parseInt(form1.listnu1.value,10);
  rowCount=parseInt(form1.rowCount.value,10);
   
  //若rowCount/pageSize的余数不为0且为最后一页
  if((rowCount%pageSize!=0)&&showPage==(parseInt(rowCount/pageSize,10)+1))
  {//得到最后一页的记录数，若rowCount/pageSize=5.5 则parseInt(rowCount/pageSize)=5
    count=rowCount-parseInt(rowCount/pageSize,10)*pageSize
  }
  else
  {
    count=pageSize;
  }
  start=(showPage-1)*pageSize+1;
  
  if(rowCount!=0)
  {
  	for(i=0;i<count;i++)
  	{
      	form1("checkbox"+(start+i)).checked=form1.sec.checked
		form1("markCheckbox"+(start+i)).value = 1;
  	}
  }
}


function gotopage()
{
  	if((form1.listnu1.value=="")||(form1.listnu1.value==null))//为空
 	{
	  	alert("请在调整每页显示的条数的框中输入数字！");
		form1.listnu1.focus();
 	}
 	else if(isNaN(form1.listnu1.value))//非数字
 	{
 		alert("请在调整每页显示的条数的框中输入整数值！");
  		form1.listnu1.value="";
  		form1.listnu1.focus();
 	}
	else if(isNaN(form1.goto.value)||(form1.goto.value=="")||(form1.goto.value==null))
	{
		alert("请输入数字！");
  		form1.goto.focus();
	}
 	else
 	{
  		var pagecount=parseInt(form1.pageCount.value,10)//总页数
  		if((!isNaN(form1.goto.value))&&(parseInt(form1.goto.value,10)>0)
      	    &&!(parseInt(form1.goto.value,10)>pagecount))//数字、正数、不超过总页数
  		{
			if(parseInt(form1.goto.value,10)==parseInt(form1.currentPage.value,10))
			{
				alert("请输入不同的值！");
				form1.goto.focus();
			}
			else
			{
    			form1.pagenu1.value=parseInt(form1.goto.value,10);
				form1.submit();
			}
  		}
  		else if(parseInt(form1.goto.value,10)<0)
  		{
  			alert("请输入大于0的整数！");
			form1.goto.value="";
			form1.goto.focus();
  		}
		else
		{
			form1.pagenu1.value = pagecount;
			form1.submit();
		}
	}
}

function listnumber()
{
  if((form1.listnu1.value=="")||(form1.listnu1.value==null) || isNaN(form1.listnu1.value))
 {
	  alert("请输入数字！");
	  form1.listnu1.focus();
 }
 else
 {
  if(!isNaN(form1.listnu1.value))
   { 
      var i=form1.rowCount.value;
	 
      if((i>=parseInt(form1.listnu1.value,10))&&(parseInt(form1.listnu1.value,10)>0))
      {
	    if(parseInt(form1.listnu1.value,10)!=form1.pageSize.value)
		{
          form1.pagenu1.value="1";
          form1.listnu1.value=parseInt(form1.listnu1.value,10);
          form1.submit();
		 }
		 else
		 {
		    alert("请输入不同的值!");
		 }
       }
      else if(parseInt(form1.listnu1.value,10)<=0)
	  { 
	    //alert("输入页数值应该是小于等于"+i+"且大于0的整数！")
		alert("请输入大于0的整数！")
		form1.listnu1.value="";
        form1.listnu1.focus();
	  }
	  
	  else
	  {
	  		form1.listnu1.value = i;//若输入的值超过了总记录值，按总记录值显示
			form1.goto.value = "1";
			form1.pagenu1.value = "1";
			form1.submit();
		
	  }
 }
 else 
{
  alert("请输入整数值！");
  form1.listnu1.value="";
  form1.listnu1.focus();
 }
 }
}
