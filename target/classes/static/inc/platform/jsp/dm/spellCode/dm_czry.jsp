<%@page contentType="text/html;charset=UTF-8" %>
<%@page import="net.htjs.util.CommonUtil;"%>
<jsp:useBean id="bean" class="net.htjs.platform.web.BaseBean" />
<%-- ҵ���ѡ����Աʹ�� QX_USER.XML --%>
<%=CommonUtil.toDmJsStr("dm_czry",bean.getList("selectQX_USER_BYZZJG",request),"CZRY_DM","CZRY_MC","ZZJG_DM","CZRY_MC_PYT")%>