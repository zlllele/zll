<%@page contentType="text/html;charset=UTF-8" %>
<%@page import="net.htjs.util.CommonUtil;"%>
<jsp:useBean id="bean" class="net.htjs.platform.web.BaseBean" />
<%=CommonUtil.toDmJsStr("dm_zzjg",bean.getList("selectPT_DM_ZZJG",request),"ZZJG_DM","ZZJG_MC","","ZZJG_MC_PYT")%>