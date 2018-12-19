<%@page import="net.htjs.oa.web.flow.UserGroup"%>
<%@page contentType="text/html;charset=UTF-8"%>

<%
	UserGroup ug = new UserGroup();
	String rtMsg = ug.handleChoose(request);
%>
<script type="text/javascript">
	eval("result=<%=rtMsg%>");
	alert(result.msg);	
	if(result.result){
	    parent.parent.location.reload();
	}
</script>