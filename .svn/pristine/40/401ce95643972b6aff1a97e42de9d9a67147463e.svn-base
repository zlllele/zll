<%@ taglib uri="http://www.htjs.net" prefix="htjs"%>
<%@page contentType="text/html;charset=UTF-8"%>
<jsp:useBean id="bean" class="net.htjs.platform.web.BaseBean" />
<%@page import="net.htjs.util.CommonUtil" %>
<%@page import="java.math.BigDecimal"%>
<%@page import="java.util.List"%>
<%@page import="java.util.Map"%>
<%@page import="java.util.HashMap"%>
<%@page import="net.sf.json.JSONObject"%>
<%@page import="net.sf.json.JSONArray"%>
<%
	Map map = new HashMap();
	map.put("ACCOUNTID",String.valueOf(request.getSession().getAttribute("ACCOUNTID")));
	String root = request.getParameter("GW_DM");
	if(root == null) {
	   map.put("SJ_GW_DM","1202010000000001");
	} else {
	    map.put("SJ_GW_DM",root);
	}
// 	map.put("ISROOT","1");

	JSONArray ja = new JSONArray();
	List gwList = bean.getList("selectPT_QX_GW",map);
	for(int i=0; i<gwList.size(); i++) {
		JSONObject jo = new JSONObject();
		Map gw = (Map)gwList.get(i);
		jo.put("GW_DM", (String)gw.get("GW_DM"));
		jo.put("name", CommonUtil.convert((String)gw.get("GW_MC")));
		jo.put("isParent", (String)gw.get("ISPARENT"));

		JSONObject font = new JSONObject();
		if(((BigDecimal)gw.get("ISDELETE")).intValue() == 0) {
			font.put("color", "#000000");
		}else{
            font.put("color", "#cccccc");//禁用 颜色变灰
		}
		jo.put("font",font);		

		ja.add(jo);
	}

	response.reset();
	response.setContentType("text/xml;charset=UTF-8");
	out.println(ja.toString());
	out.flush();
%>
