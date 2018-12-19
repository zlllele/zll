<%@ taglib uri="http://www.htjs.net" prefix="htjs"%>
<%@page contentType="text/html;charset=GBK"%>
<jsp:useBean id="oaMsg" class="net.htjs.oa.web.fzgj.OaMessage"/>
<%
	String rtnMsg = "{success:false,msg:'²ÎÊý´íÎó'}";
	rtnMsg = oaMsg.sendMsgFile(request);
%>
<script>
	eval("result=<%=rtnMsg%>");
	parent.unLockPanle("div_right_bottom");
	if(!result.result){
		alert(result.msg);
	}else{
		alert(result.msg);
		parent.loadContent("fileTransfer.jsp","div_right_bottom");
	}
</script>