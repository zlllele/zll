<%@page contentType="text/html;charset=GBK" %>
<%@page import="net.htjs.util.CommonUtil;"%>
<jsp:useBean id="bean" class="net.htjs.platform.web.BaseBean" />
<%-- ���ӹ�˾��Ա��ƴ��ͷ���루������ְ��Ա�� DM_CZRY.XML --%>
<%=CommonUtil.toDmJsStr("dm_czry_all",bean.getList("selectDM_CZRY_JCB",request),"CZRY_DM","CZRY_MC")%>