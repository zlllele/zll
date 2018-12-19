<%@page contentType="text/html;charset=UTF-8" %>
<%@page import="java.util.List" %>
<%
response.setHeader("Cache-Control", "no-store");
response.setHeader("Pragrma", "no-cache");
response.setDateHeader("Expires", 0);

String isAll = request.getParameter("isAll");
String url = "";
if(isAll==null || isAll.equals("")) {
	url="/inc/platform/jsp/dm_zzjg_zTree.jsp";
}else if(isAll.equals("1")) {
	url="/inc/platform/jsp/dm_zzjg_all.jsp";
}else {
	url="/inc/platform/jsp/dm_zzjg_zTree.jsp";
}

%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<link rel="stylesheet" type="text/css" href="/inc/platform/css/style.css"/>
	<link rel="stylesheet" type="text/css" href="/inc/platform/css/zTreeStyle.css"/>
	<script type="text/javascript" src="/inc/platform/js/pubjs.js"></script>
	<script type="text/javascript" src="/inc/platform/js/jQuery/jquery-1.7.2.min.js"></script>
	<script type="text/javascript" src="/inc/platform/js/jQuery/jquery.ztree.core-3.2.min.js"></script>
	<script type="text/javascript">

	    function querygroups(dm,mc){
			if(parent.$FV("isMulti")=="1"){
	 			parent.frames[1].location.href="memberManagerC.jsp?pageSize=1000&ZZJG_DM="+dm;
			}else{
	 			parent.frames[1].location.href="memberManagerS.jsp?ZZJG_DM="+dm;
			}
 		}

	 	$(function() {		
			var setting = {
				async: {
					enable: true, //true 表示 开启 异步加载模式   false 表示 关闭 异步加载模式
					url:"<%=url%>",
					autoParam:["ZZJG_DM"]										
				},
				data: {
			       simpleData: {
				     enable: true,
				     idKey: "ZZJG_DM"
			      }
		       },callback: {		
					onClick: zTreeOnClick
				}
			};
			$.fn.zTree.init($("#ztree"), setting);
			
		});
	
		function zTreeOnClick(event, treeId, treeNode) {
			querygroups(treeNode.ZZJG_DM, treeNode.ZZJG_MC);
		}
		 
	</script>
</head>

<body>
 <div>
   <ul id="ztree" class="ztree"></ul>
 </div>
 
<div id="temp1"></div>
<script type="text/javascript">
	//alert("width: " + document.getElementById("testDtree").style.width + "\nheight: " + document.getElementById("testDtree").style.height);
	//alert(window.parent.document.getElementById("treeFrame").innerHTML);
</script>
</body>
</html>
