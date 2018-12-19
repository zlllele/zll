<%@ taglib uri="http://www.htjs.net" prefix="htjs"%>
<%@page contentType="text/html;charset=GBK"%>
<jsp:useBean id="qxUserHomepage" class="net.htjs.platform.web.bean.qx.QxUserHomepage"></jsp:useBean>
<%
	int i = qxUserHomepage.addNew(request);
	if(i==1){
		out.print("设置成功，你将在下次登陆时自动加载该模块");
	}else if(i==0){
		out.print("设置失败，请与管理员联系");
	}else if(i==-1){
		out.print("设置失败，你已经设置过该项目了");
	}else if(i==2){
		out.print("设置失败，你的自启动项目设置过多，请先删除不用的自启动项");
	}
%>
