<%@ taglib uri="http://www.htjs.net" prefix="htjs"%>
<%@page contentType="text/html;charset=GBK"%>
<%@page import="java.util.*" %>
<jsp:useBean id="oaMsg" class="net.htjs.oa.web.fzgj.OaMessage"/>
<%
	
	oaMsg.parserRequest(request);
	oaMsg.setAttribute("TO_CZRY_DM",request.getParameter("CZRY_DM"));
	oaMsg.setAttribute("FROM_CZRY_DM",session.getAttribute("CZRY_DM"));
	List list = oaMsg.getList("selectOA_MESSAGE_HISTORY",oaMsg.getAttributes());
	request.setAttribute("data",list);
%>
<body bgcolor="transparent">
	<div class="div_title">��Ϣ��¼</div>
	<div style="width:100%;height:245px;overflow:auto;">
		<htjs:iterator data_key="data" isPage="true">
			<div style="text-align:left;padding-bottom:5px;">
				<span style="font-size:11px;color:blue;"><htjs:get property="FROM_CZRY_MC"/><htjs:get property="SENDTIME"/></span>
				<span style="font-size:12px;">
				&nbsp;&nbsp;<htjs:get property="CONTENT"/>
				</span>
			</div>
		</htjs:iterator>
		<hr>
		������Ϣ����Ӹ������ߡ�������Ϣ�в�ѯ��
	</div>
</body>

