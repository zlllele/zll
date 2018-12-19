<%@ page contentType="text/html; charset=utf-8"%>
<jsp:useBean id="jcFj" class="net.htjs.platform.web.bean.pt.PtBlob"/>
<%
	String rtnMsg = jcFj.addPtBlob(request);
%>
<script type="text/javascript">
    eval("result=<%=rtnMsg%>");
    if(result.success){
    	parent.parent.appendMsg("");
        parent.parent.appendList(result);
    }else{
        parent.parent.appendMsg(result.msg);
    }
    parent.location.reload();
</script>
