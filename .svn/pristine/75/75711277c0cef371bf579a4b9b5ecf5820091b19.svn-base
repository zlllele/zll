<%@ taglib uri="http://www.htjs.net" prefix="htjs"%>
<%@page contentType="text/html;charset=GBK"%>
<%@page import="java.util.*" %>
<jsp:useBean id="oaMsg" class="net.htjs.oa.web.fzgj.OaMessage"/>
<%
	List list = oaMsg.getList("selectOA_MESSAGE_NEW",request);
	String messageIds ="'";
	if(list!=null){
		for(int i=0;i<list.size();i++){
			Map map = (Map)list.get(i);
			messageIds = messageIds+map.get("MESSAGEID")+"','";
			out.print(map.get("FROM_CZRY_MC"));
			out.print(" (");
			out.print(map.get("SENDTIME"));
			out.print("): ");
			out.print(map.get("CONTENT"));
			out.print("<br>");
		}
		messageIds = messageIds+"'";
		if(!"''".equals(messageIds)){
			oaMsg.updateReadFlat(messageIds);
		}
	}
%>
