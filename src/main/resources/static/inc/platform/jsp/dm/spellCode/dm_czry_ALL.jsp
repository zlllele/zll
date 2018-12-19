<%@page contentType="text/html;charset=GBK" %>
<%@page import="net.htjs.util.CommonUtil;"%>
<jsp:useBean id="bean" class="net.htjs.platform.web.BaseBean" />
<%-- 增加公司人员的拼音头代码（包括离职人员） DM_CZRY.XML --%>
<%=CommonUtil.toDmJsStr("dm_czry_all",bean.getList("selectDM_CZRY_JCB",request),"CZRY_DM","CZRY_MC")%>