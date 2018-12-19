<%@page contentType="text/html;charset=UTF-8" %>
<%@page import="java.util.List" %>
<jsp:useBean id="base" class="net.htjs.platform.web.BaseBean"/>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="/inc/platform/css/style.css">
	<style>
	table,body{font-size:12px;background-color:#EBE9EE; margin:0px; padding:0px;}
</style>
</head>
<body>
<%
	List list = base.getList("selectPT_QX_GW",request);	
	if(list !=null && list.size()>0){
	    out.println(net.htjs.util.CommonUtil.toDTreeJsStr("qx_gw_tree",list,"GW_DM","SJ_GW_DM","GW_MC"));
	}else{
		out.println("");
	}
%>
</body>
</html>