<%@page import="net.sf.json.JSONObject"%>
<%@page import="net.sf.json.JSONArray"%>
<%@ taglib uri="http://www.htjs.net" prefix="htjs"%>
<%@page contentType="text/html;charset=UTF-8"%>
<jsp:useBean id="bean" class="net.htjs.platform.web.BaseBean" />
<%@page import="java.util.List" %>
<%@page import="java.util.Map" %>
<%@page import="java.util.HashMap" %>
<%
	String term = request.getParameter("term");
	
	String fieldId = request.getParameter("fieldId");
	String fieldMc = request.getParameter("fieldMc");
	String sid = request.getParameter("sid");

	Map m = new HashMap();
	m.put("ACCOUNTID",String.valueOf(request.getSession().getAttribute("ACCOUNTID")));
	m.put(fieldMc, term);
	m.put("START", "0");
	m.put("END", "20");
	List dataList = bean.getList(sid,m);
	JSONArray ja = new JSONArray();
	if(dataList != null) {
		for(int i=0; i<dataList.size(); i++) {			
			JSONObject jo = new JSONObject();
			Map zzjg = (Map)dataList.get(i);			
			if(fieldId != null) {				
				String id = (String)zzjg.get(fieldId);
				jo.put("id", id);
			}
			
			String name = (String)zzjg.get(fieldMc);
			jo.put("label", name);
			jo.put("name", name);
			ja.add(jo);
		}
	}

	response.reset();
	response.setContentType("text/xml;charset=UTF-8");
    out.print(ja.toString());
%>
