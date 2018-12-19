function util()
{
}

//最大化打开窗口
function openwin_max(url)
{
  var scrWidth = screen.availWidth;
  var scrHeight = screen.availHeight;
  window.moveTo(-4, -4);
  window.resizeTo(scrWidth + 9, scrHeight + 9);
}

//框架页面布局高度自动计算
util.areaDiv_resize = function()
{
  var h = document.body.clientHeight;
  var args = ['SecurityAreaDiv', 'SearchTitle', 'SearchAreaDiv', 'ListTitle', 'PaginationAreaDiv'];
  var obj = pt.byId('ListAreaDiv');
  var hs = 0;
  for (var xx = 0; xx < args.length; xx++) 
  {
    var obj1 = pt.byId(args[xx]);
    if (obj1 != null) 
    {
      //if (obj1.style.display == '') 
      //{
        //alert(obj1.id+"===="+obj1.clientHeight);
        hs = hs + obj1.clientHeight;
      //}
    }
  }
  try 
  {
    //alert(h);
  	//alert(pt.isFF);
    if(pt.isFF)
    {
      if (obj != null) obj.style.height = h - hs - 210;
    }
    else
    {
      if (obj != null) obj.style.height = h - hs - 10;
    }
    //alert(obj.style.height);
    //pt.byId('gridbox').style.height = obj.style.height;
  } 
  catch (e) 
  {
  }
  History.refresh();
}

/*隔行换色
 参数：_changeColor("表格名称","奇数行背?","偶数行背?","鼠标经过背景","点击后背?");
 =======================================================*/
function _changeColor(obj, a, b, c, d)
{
  if (!document.getElementById(obj)) 
  { return; }
  var t = document.getElementById(obj).getElementsByTagName("tr");
  for (var i = 0; i < t.length; i++) 
  {
    t[i].style.backgroundColor = (t[i].sectionRowIndex % 2 == 0) ? a : b;
    t[i].onclick = function()
    {
      if (this.x != "1") 
      {
        this.x = "1";
        this.style.backgroundColor = d;
      }
      else 
      {
        this.x = "0";
        this.style.backgroundColor = (this.sectionRowIndex % 2 == 0) ? a : b;
      }
    }
    t[i].onmouseover = function()
    {
      if (this.x != "1") this.style.backgroundColor = c;
    }
    t[i].onmouseout = function()
    {
      if (this.x != "1") this.style.backgroundColor = (this.sectionRowIndex % 2 == 0) ? a : b;
    }
  }
}

function changeColor()
{
  _changeColor("table_list", "#ffffff", "#efefef", "#FAF0D8", "#D8E8FA");
}

util.showHideTip = function(id,img1,img2)
{
  var obj = event.srcElement;
  var disabledZone = pt.byId(id);
  if (disabledZone) 
  {
    if(disabledZone.style.display == 'none')
    {
      disabledZone.style.display = '';
      if(img2)
      {
        obj.src=img2;
      }
    }
    else
    {
      disabledZone.style.display = 'none';
      if(img1)
      {
        obj.src=img1;
      }
    }
    util.areaDiv_resize();
  }
}

util.getText = function(data, key, v)
{
  var obj = data.header.children[key].children;
  for (i = 0; i < obj.length; i++) 
  {
    if (obj[i].value == v) 
    { return obj[i].text; }
  }
}

util.isGridSelected = function(o)
{
  var id = grid.getSelectedId();
  if (id == null) 
  {
    //alert("请选择一条记录");
    var data ={"msg":{"state":"90021","type":"msg","msg":"请选择一条记录！","mx":"请选择一条记录！"}};    
    pt.showMessage(data,o);   
    util.hideMark(); 
    return false;
  }
  return true;
}

util.isGridSelected1 = function(o)
{
  var id = grid1.getSelectedId();
  if (id == null) 
  {
    //alert("请选择一条记录");
    var data ={"msg":{"state":"90021","type":"msg","msg":"请选择一条记录！","mx":"请选择一条记录！"}};    
    pt.showMessage(data,o);   
    util.hideMark(); 
    return false;
  }
  return true;
}

util.getGridRowId = function(grid)
{
  return grid.getSelectedId();
}
util.confirm = function(o)
{
	return window.confirm("确认要删除记录吗？");
}
util.refresh = function(data, o)
{
	History.refresh();
}

util.windowInitialize = function(formid)
{
  var data = pt.get("data");
  var o = pt.get("o");
  pt.bindData(data, o);
	if(formid)
	{
		Validator.validate(pt.byId(formid), 3);
	}
}

util.buildPagination = function(data, o)
{
  if(data.pagination)
  {
		var str = "<table width='100%' height='10'><tr><td align='left'>";
		str = str+"第<font color='red'>"+((parseInt(data.pagination.pageIndex) - 1) * parseInt(data.pagination.pageSize))+"</font>-<font color='red'>"+(((parseInt(data.pagination.pageIndex) - 1) * parseInt(data.pagination.pageSize)) + parseInt(data.pagination.currentPageSize))+"</font>条&nbsp;";
		if(data.pagination.totalRecords>0)
		{
			str = str+"共<font color='red'>"+data.pagination.totalRecords+"</font>条记录&nbsp;";
		}
	  if(data.pagination.totalPages>0)
		{
			str = str+"共<font color='red'>"+data.pagination.totalPages+"</font>页&nbsp;";
		}
	  
	  str = str+"当前页<font color='red'>"+data.pagination.currentPageSize+"</font>条记录&nbsp;";
	  str = str+"当前第<font color='red'>"+data.pagination.pageIndex+"</font>页&nbsp;";
	  str = str+"每页显示<input id='pageSize' type='text' class='Pagination_pageSize' onKeyDown=\"javascript:var keycode=event.keyCode;if(keycode==13){pt.submit({visitId:'"+data.pagination.visitId+"',param:{page:pt.byId('page').value,pageSize:this.value,totalRecords:"+data.pagination.totalRecords+"}});}else{if(keycode==8 || (keycode &gt; 47 && keycode &lt; 58) || (keycode &gt; 95 && keycode &lt; 106)){return true;}else{return false;}}\" value="+data.pagination.pageSize+">条记录&nbsp;";
		
		str = str+"</td><td align='right'>";
		
		if(data.pagination.pageIndex>1)
	  {
	    str = str+"<a href=\"javascript:pt.submit({visitId:'"+data.pagination.visitId+"',param:{page:1,pageSize:pt.byId('pageSize').value,totalRecords:"+data.pagination.totalRecords+"}});\">首页</a>&nbsp;";
	  }
	  
		if(data.pagination.isPreviousPageAvailable)
	  {
	    str = str+"<a href=\"javascript:pt.submit({visitId:'"+data.pagination.visitId+"',param:{page:parseInt(pt.byId('page').value)-1,pageSize:pt.byId('pageSize').value,totalRecords:"+data.pagination.totalRecords+"}});\">上一页</a>&nbsp;";
	  }
		
		if(data.pagination.isNextPageAvailable)
	  {
	    str = str+"<a href=\"javascript:pt.submit({visitId:'"+data.pagination.visitId+"',param:{page:parseInt(pt.byId('page').value)+1,pageSize:pt.byId('pageSize').value,totalRecords:"+data.pagination.totalRecords+"}});\">下一页</a>&nbsp;";
	  }
		
		//if (data.pagination.isNextPageAvailable || data.pagination.isNextPageAvailable) 
		//{
		str = str + "第<input id='page' type='text' class='Pagination_page' onKeyDown=\"javascript:var keycode=event.keyCode;if(keycode==13){pt.submit({visitId:'" + data.pagination.visitId + "',param:{page:this.value,pageSize:pt.byId('pageSize').value,totalRecords:" + data.pagination.totalRecords + "}});}else{if(keycode==8 || (keycode &gt; 47 && keycode &lt; 58) || (keycode &gt; 95 && keycode &lt; 106)){return true;}else{return false;}}\" value=" + data.pagination.pageIndex + ">页&nbsp;";
		//}
		
		if(data.pagination.totalPages>0 && data.pagination.pageIndex<data.pagination.totalPages)
	  {
	    str = str+"<a href=\"javascript:pt.submit({visitId:'"+data.pagination.visitId+"',param:{page:"+data.pagination.totalPages+",pageSize:pt.byId('pageSize').value,totalRecords:"+data.pagination.totalRecords+"}});\">未页</a>&nbsp;";
	  }
		
		str = str+"<a href=\"javascript:pt.submit({visitId:'"+data.pagination.visitId+"',param:{page:pt.byId('page').value,pageSize:pt.byId('pageSize').value,totalRecords:"+data.pagination.totalRecords+"}});\">刷新&nbsp;</a>";
	
		str = str+"</td></tr></table>";
		//alert(str);
	  if(o.prop && o.prop.pageid)
	  {
	    pt.byId(o.prop.pageid).innerHTML = str;
	  }
	  else
	  {
	    pt.byId("PaginationAreaDiv").innerHTML = str;
	  }
  }
}

util.redirect = function(data, o)
{
	if(o.prop && o.prop.newTab)
	{
	   parent.openTabInRightFrame(o.prop.url,o.prop.tabText,o.prop.tabId);
	}
	else
	{
		self.location.href=pt.get("contextPath")+o.prop.url;
	}
}

/**
 * 创建窗口工具栏上的按钮
 * @param n:按钮id;
 * @param t:按钮标题头内容;
 * @param c:按钮单击事件方法
 */
util.crebtn = function(n, t, c)
{
  var P = window.parent, D = P.loadinndlg();
  P.crebtn(n, t, c);
}

util.showMark = function(message)
{
  var divObj;
  if(!document.getElementById("LoadingMessage"))
  {
    divObj = document.createElement("DIV");
    divObj.id = "LoadingMessage";
    divObj.style.display = "none";
    divObj.style.position = "absolute";
    divObj.style.border = "0 solid black";
    divObj.style.color = "red";
    divObj.style.backgroundColor = "white";
    divObj.style.width = "180px";
    divObj.style.heigth = "65px";
    divObj.style.fontFamily = "Arial, Helvetica, sans-serif";
    divObj.style.fontWeight = "bold";
    divObj.style.fontSize = "11px";
    var ash = "<iframe id='hideBackground21' frameborder='0' height='62' width='180' scroll='no'></iframe>";
    ash = ash + "<div style='position:absolute;top:0;left:0;width:100%;height:100%;border:#ccc 1px solid;'><table border='0' width='100%' height='100%'><tr><td align='center'><img src='"+pt.get('contextPath')+"/commons/main/images/loadingData.gif'></td></tr><tr><td align='center'>&nbsp;<font color='red'>"+message+"</font></td></tr></table></div>";
    divObj.innerHTML = ash;
    //div.style.top = document.body.scrollTop + "px";
    //div.style.left = (document.body.offsetWidth - 100 - (document.all?20:0)) + "px";
    divObj.style.zIndex = "999999990";
    document.body.appendChild(divObj);
  }
  else
  {
    divObj = document.getElementById("LoadingMessage");
  }
  divObj.style.left = (document.body.offsetWidth-180)/2;
  divObj.style.top = (document.body.offsetHeight-65)/2 - 100;
  divObj.style.display = "";
}

util.hideMark = function()
{
  var divObj = document.getElementById("LoadingMessage");
  if (divObj != null)
    divObj.style.display = "none";
}

function QueryString()
{
  var name, value, i;
  var str = location.href;
  var num = str.indexOf("?")
  str = str.substr(num + 1);
  var arrtmp = str.split("&");
  for (i = 0; i < arrtmp.length; i++) 
  {
    num = arrtmp[i].indexOf("=");
    if (num > 0) 
    {
      name = arrtmp[i].substring(0, num);
      value = arrtmp[i].substr(num + 1);
      this[name] = value;
    }
  }
}


document.oncontextmenu = function()
{
  return true;//屏蔽掉的右键菜单
}
