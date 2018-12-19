<%@ taglib uri="http://www.htjs.net" prefix="htjs"%>
<%@page contentType="text/html;charset=GBK"%>
<jsp:useBean id="oaMsg" class="net.htjs.oa.web.fzgj.OaMessage"/>
<%
	String op=request.getParameter("op");
	String rtnMsg = "{success:false,msg:'²ÎÊı´íÎó'}";
	rtnMsg = oaMsg.sendMsg(request);
%>
<script>
	eval("result=<%=rtnMsg%>");
	if(!result.result){
		alert(result.msg);
	}
</script>