<%@ taglib uri="http://www.htjs.net" prefix="htjs"%>
<%@page contentType="text/html;charset=GBK"%>
<jsp:useBean id="qxUserHomepage" class="net.htjs.platform.web.bean.qx.QxUserHomepage"></jsp:useBean>
<%
	int i = qxUserHomepage.delete(request);
	if(i==1){
		out.print("取消成功");
	}else if(i==0){
		out.print("取消失败，请与管理员联系");
	}else if(i==-1){
		out.print("你没有设置过该项目");
	}else if(i==2){
		out.print("特定栏目，不允许删除");
	}
%>
