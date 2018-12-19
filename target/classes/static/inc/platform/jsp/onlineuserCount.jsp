<%@ page contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://www.htjs.net" prefix="htjs"%>
<%@ page import="java.util.*,net.htjs.platform.web.BaseBean" %>
<%	
	List userList = BaseBean.getOnLineUser();
%>
<span><a href="javascript:navigate('/inc/platform/jsp/onlineuser.jsp?qxxkdm=0','在线用户',false);"  style="color:#fff;text-decoration: none;">当前在线：<%=userList.size() %></a></span>
