<%@page import="net.htjs.oa.web.flow.UserGroup"%>

<%@page contentType="text/html;charset=GBK"%>

<%
	UserGroup ug = new UserGroup();
	String rtMsg = ug.handleAddCom(request);
%>
<script type="text/javascript">
	eval("result=<%=rtMsg%>");
	alert(result.msg);	
	if(result.result){
	    parent.location.reload();
	}
</script>