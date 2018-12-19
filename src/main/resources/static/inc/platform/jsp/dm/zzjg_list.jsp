<%@page contentType="text/html;charset=utf-8" %>
<%@page import="net.htjs.util.CommonUtil;"%>
<jsp:useBean id="bean" class="net.htjs.platform.web.BaseBean" />
<%=CommonUtil.toJSON("dm_zzjg",bean.getList("selectPT_DM_ZZJG",request))%>