<%@page contentType="text/html;charset=UTF-8" %>
<%@ taglib uri="http://www.htjs.net" prefix="htjs"%>
<%
response.setHeader("Cache-Control", "no-store");
response.setHeader("Pragrma", "no-cache");
response.setDateHeader("Expires", 0);
response.setContentType("text/html;charset=UTF-8");
%>

<select multiple="multiple" id="userA" name="user" style="width:80%;height: 90%" ondblclick="addOption(this);">
	<htjs:iterator sid="selectFLOW_USER_GROUP_PERSON_NAMEBYID">
		<option value="<htjs:get property="RY_DM"/>"><htjs:get property="RY_MC"/></option>
	</htjs:iterator>			       		
</select>