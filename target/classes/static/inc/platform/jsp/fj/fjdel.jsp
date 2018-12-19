<%@ page contentType="text/html; charset=utf-8"%>
<jsp:useBean id="jcFj" class="net.htjs.platform.web.bean.pt.PtBlob"/>
<%
	String rtnMsg = jcFj.deleteJcFj(request);
	System.out.println(rtnMsg);
%>
<script type="text/javascript">
    eval("result=<%=rtnMsg%>");
    if(result.success){
    	parent.appendMsg("");
        parent.removeFj("<%=request.getParameter("ID")%>");
    }else{
        parent.appendMsg(result.msg);
    }
    //self.location="fileUploadFile.jsp";
</script>
