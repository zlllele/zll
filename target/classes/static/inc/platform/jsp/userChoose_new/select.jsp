<%@page contentType="text/html;charset=UTF-8" %>
<%@ taglib uri="http://www.htjs.net" prefix="htjs"%>
<%
response.setHeader("Cache-Control", "no-store");
response.setHeader("Pragrma", "no-cache");
response.setDateHeader("Expires", 0);
%>

<select multiple="multiple" id="userA" name="user" style="width:80%;height: 90%" ondblclick="addOption(this);">
	<htjs:iterator sid="selectDM_CZRY_DX_SJHM" param="ZZJG_DM=1">
		<option value="<htjs:get property="CZRY_DM"/>"><htjs:get property="CZRY_MC"/></option>
	</htjs:iterator>			       		
</select>