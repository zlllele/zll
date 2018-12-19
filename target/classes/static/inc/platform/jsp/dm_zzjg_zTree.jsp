<%@ taglib uri="http://www.htjs.net" prefix="htjs"%>
<%@page contentType="text/html;charset=UTF-8"%>
<jsp:useBean id="bean" class="net.htjs.platform.web.BaseBean" />
<%@page import="net.htjs.util.CommonUtil" %>

<%@page import="java.util.List"%>
<%@page import="java.util.Map"%>
<%@page import="java.util.HashMap"%>
<%@page import="net.sf.json.JSONObject"%>
<%@page import="net.sf.json.JSONArray"%>
<%
	Map map = new HashMap();
    Map userMap = (Map) session.getAttribute("USERMAP");
	map.put("ACCOUNTID",String.valueOf(userMap.get("ACCOUNTID")));
	String root = request.getParameter("ZZJG_DM");
	if(root == null) {
	    map.put("ZZJG_DM",String.valueOf(userMap.get("ZZJG_DM")));
	} else {
	    map.put("SJ_ZZJG_DM",root);
	}
    
	JSONArray ja = new JSONArray();
	List zzjgList = bean.getList("selectPT_DM_ZZJG",map);
	for(int i=0; i<zzjgList.size(); i++) {
		JSONObject jo = new JSONObject();
		Map zzjg = (Map)zzjgList.get(i);
		jo.put("ZZJG_DM", (String)zzjg.get("ZZJG_DM"));
		jo.put("name", CommonUtil.convert((String)zzjg.get("ZZJG_MC")));
		jo.put("isParent", (String)zzjg.get("ISPARENT"));
/*
		String type_xzqh = (String)zzjg.get("TYPE_XZQH");
		String jb = (String)zzjg.get("JB");
		String xy_bz = (String)zzjg.get("XY_BZ");
		jo.put("TYPE_XZQH", type_xzqh);
		jo.put("JB",jb);
		jo.put("XY_BZ",xy_bz);
*/
		ja.add(jo);
	}

	response.reset();
	response.setContentType("text/xml;charset=UTF-8");
	out.println(ja.toString());
	out.flush();
%>
