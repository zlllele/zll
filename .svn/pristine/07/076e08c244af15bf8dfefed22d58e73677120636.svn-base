<%@ taglib uri="http://www.htjs.net" prefix="htjs"%>
<%@page language="java" contentType="text/html; charset=UTF-8"%>
<%@page import="net.htjs.platform.web.BaseBean"%>
<%
String czryDm = request.getParameter("CZRY_DM");
String logCzryDm = (String)session.getAttribute("CZRY_DM");
if(czryDm==null||czryDm.equals("")){
return;
}
if(logCzryDm==null||logCzryDm.equals("")){
return;
}
boolean isOnLine = BaseBean.isOnLine(czryDm);
%>
<html>
<head>
<title>文件传输</title>
</head>
<body bgcolor="transparent">
	<div class="div_title">文件传输</div>
	<form action="fileUploadResult.jsp" method="post" target="bdSave" id="upForm" enctype="multipart/form-data">
		<span class="col_left" style="font-size:12;"></span>
		<input type="file" name="fileupload" id="fileupload" size="13" style="margin:2px 0px 2px 0px " onkeydown="event.returnValue=false;" onpaste="return false"/>
		<input type="button" name="upLoadPic" class="bt1" value="发送" style="cursor:hand" class="comm_btn"  onclick="doUpload()" />
		<input type="hidden" name="TO_CZRY_DM" value="<%=czryDm %>">
	</form>
	<div style="text-align:left;padding-left:3px;">
		<htjs:iterator sid="selectOA_MESSAGE_NEW" param="ISFILE=1">
			<div><htjs:get property="FILENAME"/> 
				<a href="#" onclick="fileDown('<htjs:get property="MESSAGEID"/>')">接收</a>
				<a href="#" onclick="refuse('<htjs:get property="MESSAGEID"/>')">拒收</a>
			</div>
		</htjs:iterator>
	</div>
</body>
</html>