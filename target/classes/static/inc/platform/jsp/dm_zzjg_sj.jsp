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
	map.put("ACCOUNTID",String.valueOf(request.getSession().getAttribute("ACCOUNTID")));
	String root = request.getParameter("ZZJG_DM");
	if(root == null) {
		//财政一卡通项目中 段亚峰要求:信息中心的人要看到其上级机构下所有信息，而不仅仅是本人部门
	    map.put("ZZJG_DM",String.valueOf(request.getSession().getAttribute("SJ_ZZJG_DM")));
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
		ja.add(jo);
	}

	response.reset();
	response.setContentType("text/xml;charset=UTF-8");
	out.println(ja.toString());
	out.flush();
%>
