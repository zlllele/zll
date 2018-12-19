<%@page contentType="text/html;charset=UTF-8" %>
<%@page import="java.util.List" %>
<jsp:useBean id="base" class="net.htjs.platform.web.BaseBean"/>
<html>
<head>
<link rel="stylesheet" type="text/css" href="/inc/platform/css/style.css">
<style>
	table,body{font-size:12px;background-color:#EBE9EE; margin:0px; padding:0px;}
</style>
<script type="text/javascript" src="/inc/platform/js/pubjs.js"></script>
<script type="text/javascript">
	function setVal(dm,mc){
		dm = dm.substring(0,dm.length-1)
		mc = mc.substring(0,mc.length-1)
		parent.setVal(dm,mc);
	}
	function init(){
		var objs = document.getElementsByName("dtreebox");
		var dms = parent.getSelectValue();
		if(dms!=""){
			dms=dms+",";
		for(i=0;i<objs.length;i++){
			if(dms.indexOf(objs[i].value)!=-1){
				objs[i].checked=true;
			}
		}
		}		
	}
</script>
</head>
<body>
<div ondblclick="setVal($FV('dm'),$FV('mc'))">
<span style='text-align:center;width:100%'>
	<input type="button" class="bt1" name="b1" value="确定" onclick="setVal($FV('dm'),$FV('mc'))">
	<input type="button" class="bt1" name="b1" value="取消" onclick="setVal(',',',')">
</span>
<%
	List list;
	list = base.getList("selectPT_DM_ZZJG",request);		
	out.println(net.htjs.util.CommonUtil.toDTreeJsStr("dm_zzjg_tree",list,"ZZJG_DM","SJ_ZZJG_DM","ZZJG_MC","true"));	
%>
<span style='text-align:center;width:100%'>
	<input type="button" class="" name="b1" value="确定" onclick="setVal($FV('dm'),$FV('mc'))">
	<input type="button" class="" name="b1" value="取消" onclick="setVal(',',',')">
</span>
</div>
<input type="hidden" name="dm">
<input type="hidden" name="mc">
</body>
</html>
