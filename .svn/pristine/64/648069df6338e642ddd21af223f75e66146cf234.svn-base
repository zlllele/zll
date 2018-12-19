<%@ taglib uri="http://www.htjs.net" prefix="htjs"%>
<%@page contentType="text/html;charset=UTF-8"%>
<%
String zzjgDm = session.getAttribute("ZZJG_DM").toString();
String param = "ZZJG_DM=" + zzjgDm;
%>
<html>
<head>
<link rel="stylesheet" type="text/css" href="../../../../inc/platform/css/style.css">
<link rel="stylesheet" type="text/css" href="../../../../inc/platform/css/SpellCode.css">
<script src="../../../../inc/platform/js/pubjs.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>用户选择</title>
</head>
<body>
	<table width="100%" border="0" align="center" cellpadding="0"  onKeyDown="enterToTab()" 
			cellspacing="0" frame="box" class="datatable">
<form id="form1" action="" method="get">
	<input type="hidden" name="ZZJG_DM" value="<htjs:get data_key="ZZJG_DM"/>">
		<tr>
			<td>姓名：<input type="text" name="CZRY_MC" size="13" value="<htjs:get data_key="CZRY_MC"/>">
			</td>
			<td>手机号码：<input type="text" name="DX_SJHM" size="13" value="<htjs:get data_key="DX_SJHM"/>">
			</td>
			<td><input type="submit" name="s1" value="查询" class="bt1"></input></td>
		</tr>
</form>
	</table>
<table width="100%" border="0" align="center" cellpadding="0"  onKeyDown="enterToTab()" 
		cellspacing="0" frame="box" class="datatable">
	 <tr class="trtitle">
		<td >选择</td>	
		<td >姓名</td>
		<td >手机</td>
		<td >部门</td>
	 </tr>	 
	 <%--xml qx/QX_GW.xml --%>
     <htjs:iterator  sid="selectDM_CZRY_DX_SJHM" param="ZZJG_DM=zz" isPage="true">		
	 <tr class = "trcolor">
	 	<td><input type="radio" name="userA" onclick="parent.$F('tempData').value='{id:\''+this.value+'\',text:\'<htjs:get property="CZRY_MC"/>\'}'" value="<htjs:get property="CZRY_DM"/>_<htjs:get property="ZZJG_DM"/>_<htjs:get property="DX_SJHM"/>_<htjs:get property="CZRY_MC"/>"></input></td>
	    <td align="left"><htjs:get property="CZRY_MC"/></td>
		<td align="left"><htjs:get property="DX_SJHM"/></td>
		<td align="left"><htjs:get property="ZZJG_DM" convert="table:PT_DM_ZZJG;dm:ZZJG_DM;mc:ZZJG_MC;"/></td>
	 </tr>
	 </htjs:iterator>   
	 <input type="hidden" name="IDS" idname="USERID">   
</table>
<iframe name=bdSave width=0 height=0 style="display:none" border=1 frameborder=1 framespacing=1 marginheight=1 marginwidth=1></iframe>
</body>
</html>
