<%@page contentType="text/html;charset=UTF-8" %>
<%@page import="java.util.List" %>
<%@page import="java.util.HashMap" %>
<%@page import="java.util.Map" %>
<%@page import="net.sf.json.JSONObject"%>
<%@page import="net.sf.json.JSONArray"%>
<jsp:useBean id="bean" class="net.htjs.platform.web.BaseBean" />
<%
	response.setContentType("text/html;charset=UTF-8");
	JSONArray ja = new JSONArray();

	JSONObject jo = new JSONObject();
	
	jo.put("id", "0");
	jo.put("pId", "-1");
	jo.put("name", "自定义组");
	jo.put("open", "true");
	ja.add(jo);
	String czry_dm = (String)session.getAttribute("CZRY_DM");
	Map m = new HashMap();
	m.put("LOG_CZRY_DM", czry_dm);
	List groupList = bean.getList("selectFLOW_USER_GROUP_ALL",m);
	
	if(groupList != null) {
		for(int i=0;i < groupList.size(); i++) {
			Map map = (Map)groupList.get(i);
			JSONObject temp = new JSONObject();			
			temp.put("id", map.get("ID"));
			temp.put("name", map.get("GROUP_NAME"));
			temp.put("pId", "0");
			ja.add(temp);
		}
	}
	System.out.println(ja.toJSONString());
	out.print(ja.toJSONString());
%>