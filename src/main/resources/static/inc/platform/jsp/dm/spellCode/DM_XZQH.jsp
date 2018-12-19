<%@page contentType="text/html;charset=GBK" %>
<%@page import="java.util.*"%>
<%@page import="net.htjs.util.CommonUtil"%>
<jsp:useBean id="bean" class="net.htjs.platform.web.BaseBean" />
<%
	Map map = new HashMap();
	map.put("XZQH_DM","41");
%>
<%=CommonUtil.toDmJsStr("dm_xzqh",bean.getList("selectOA_HR_DM_XZQH",map),"XZQH_DM","XZQH_MC","","XZQH_MC_PYT")%>