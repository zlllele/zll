/*
 创建人：shaliheng
 */
var array_tab = new Array();
//添加数组项
function array_AddItem(item)
{
  for (var i = 0; i < array_tab.length; i++) 
  {
    if (array_tab[i] == item)       
      return;
  }
  array_tab.push(item);
}

//删除数组项
function array_RemoveItem(item)
{
  var tmpArray = new Array();
  for (var i = 0; i < array_tab.length; i++) 
  {
    if (array_tab[i] != item) tmpArray.push(array_tab[i]);
  }
  array_tab = tmpArray;
  tmpArray = null;
}

//判断是否在数组中存在
function indexOfArray(value, arr)
{
  if (!(typeof(value) == "string" || typeof(value) == "number"))     
    return false;
  
  for (var i in arr) 
  {
    if (arr[i] == value)       
      return true;
  }
  return false;
}

//在框架右侧打开标签页
function getTabbarFrame()
{
	var obj = null;
	//在第一级对象中寻找
	for (var i = 0; i < window.frames.length; i++) 
	{
		if (!eval("window.frames[" + i + "].tabbar")) 
		{
			//寻找下一级对象
			for (var j = 0; j < eval("window.frames[" + i + "].frames.length"); j++) 
			{
				if (eval("window.frames[" + i + "].frames[" + j + "].tabbar")) 
				{
					obj = eval("window.frames[" + i + "].frames[" + j + "]");
          break;				
				}
			}
		}
		else 
		{
			obj = eval("window.frames[" + i + "]");
			break;
		}
	}
	return obj;
}

//在框架右侧打开标签页
/**
function openTabInRightFrame(url, label, tabid)
{
  //taxTools.showLoadingMessage();
  
  alert("url  && : "+url+"&&&label   : "+label+"&&&tabid   : "+tabid);
  var obj = getTabbarFrame().tabbar;
  alert(obj);
  alert("!tabid  ;  "+!tabid);
  if(!tabid)
  {
  	var id = obj.getActiveTab();
  	obj.setTabActive(id);
    obj.setContentHref(id, pt.get("contextPath")+url);
    obj.setLabel(id, label);
  }
  //得到打开标签的个数
  var countAll = obj.getTabCount();
  if (label.length > 4) 
  {
    label = label.substring(0, 4) + "...";
  }
  
  if (countAll > 10) 
  {
    if (indexOfArray(tabid, array_tab)) 
    {
      obj.setTabActive(tabid);
    }
    else 
    {
      alert('最多可打开10个窗口，请关闭其它窗口...');
    }
  }
  else 
  {
    if (indexOfArray(tabid, array_tab)) 
    {
      obj.setTabActive(tabid);
      //obj.setContentHref(tabid, url);
    }
    else 
    {
      obj.addTab(tabid, label, "100px", countAll-1, 0);
      obj.setTabActive(tabid);
	  pt.put("mkid",tabid);
      obj.setContentHref(tabid, pt.get("contextPath")+url);
    }
  }
  obj = null;
  array_AddItem(tabid);
  //setTimeout("taxTools.hideLoadingMessage();", 500);
}
*/

function openTabInRightFrame(url, label, tabid)
{
   var obj = getTabbarFrame().tabbar;
   var id = obj.getActiveTab();
   //tabid="WidTab";
  //得到打开标签的个数
  var countAll = obj.getTabCount();
  if (label.length > 4) 
  {
    label = label.substring(0, 4) + "...";
  }
 
  if(id=="mydesktop"){
    if(!indexOfArray(tabid, array_tab))	{
       	 array_AddItem(tabid);
	  }else{
	  	  var tabid=tabid+parseInt(Math.random()*100000000000+1);
	  	  array_AddItem(tabid);
	  }
	  obj.addTab(tabid, label, "100px", countAll-1, 0);
      obj.setTabActive(tabid);
	  pt.put("mkid",tabid);
      obj.setContentHref(tabid, pt.get("contextPath")+url);
  } 
   else 
    {
    	     obj.setTabActive(id);
		     obj.setContentHref(id, pt.get("contextPath")+url);
		     obj.setLabel(id, label);
    }

    obj = null;
//  alert("array_tab"+array_tab);
  //setTimeout("taxTools.hideLoadingMessage();", 500);
}

function openTabInRightFrame11(url, label, tabid, newTab) 
{
  pt.put("mkid",tabid);
 
  var obj = getTabbarFrame().tabbar;
  var countAll = obj.getTabCount();
  var count = obj.tabCount;
  if(newTab || countAll <= 1)
  {
    if(!createNewTabForRight()) return;
  }
  var id = obj.getActiveTab();
  if (id != "mydesktop") {
    obj.setTabActive(id);
    obj.setContentHref(id, pt.get("contextPath")+url);
    obj.setLabel(id, label);
  } else {
    id = obj.goToNextTab();
    obj.setTabActive(id);
    obj.setContentHref(id, pt.get("contextPath")+url);
    obj.setLabel(id, label);
  }
}


function createNewTabForRight()
{
  var obj = getTabbarFrame().tabbar;
  var countAll = obj.getTabCount();
 
   
  if(countAll>10)
  {
    alert('最多可打开10个窗口，请关闭其它窗口...');
    return false;
  }
  var count = getTabbarFrame().tabCount;
  var title="空白页";
  
  //第四个参数设定新窗口的位置
  obj.addTab(count,title,'100px',countAll-1,0);
  obj.setTabActive(count);
  getTabbarFrame().tabCount++;
  return true;
}

