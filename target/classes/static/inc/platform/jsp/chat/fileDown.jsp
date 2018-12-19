<%@ taglib uri="http://www.htjs.net" prefix="htjs"%>
<%@page contentType="text/html;charset=GBK"%>
<jsp:useBean id="oaMsg" class="net.htjs.oa.web.fzgj.OaMessage"/>
<%
	String op=request.getParameter("op");
	String rtnMsg = "{success:false,msg:'²ÎÊý´íÎó'}";
	oaMsg.downloadFile(request.getParameter("id"),response);
%>
