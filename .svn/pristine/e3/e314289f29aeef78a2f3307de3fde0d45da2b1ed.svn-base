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
	map.put("ACCID",String.valueOf(request.getSession().getAttribute("ACCOUNTID")));
	map.put("GNQXFA", String.valueOf(request.getSession().getAttribute("GNQXFA")));
	map.put("PARAM", request.getParameter("PARAM")+"");
	/*
	String root = request.getParameter("MKXKID");
	if(root == null) {
	    map.put("MKXKID","0");
	} else {
	    map.put("MKXKID",root);
	}*/
    //本模块 虽然是异步加载模式，但数据是一次性加载全部 树，故异步加载 实际上没用，故不需要 isParent 属性
	JSONArray ja = new JSONArray();
	JSONObject jobj = new JSONObject();/*
	jobj.put("MKXKID", "0");
	jobj.put("SJ_MKXKID", "-1");
	jobj.put("name", "全部功能");
	jobj.put("isParent","true");
	ja.add(jobj);*/

	List sList = bean.getList("selectQX_GNMK_QXXK_TREE_SJQX",map);
	int j = sList.size();
	for(int i=0; i<j; i++) {
		JSONObject jo = new JSONObject();
		Map smap = (Map)sList.get(i);
		jo.put("MKXKID", String.valueOf(smap.get("MKXKID")));
		jo.put("SJ_MKXKID", String.valueOf(smap.get("SJ_MKXKID")));
		jo.put("name", CommonUtil.convert((String)smap.get("MKXK_MC")));
		jo.put("CNT",String.valueOf(j));//为了传递sList的记录数，若j>1则说明有需要配置数据权限的模块，否则没有退出
		//jo.put("JDFL_DM",smap.get("JDFL_DM"));
		//jo.put("XYBZ",smap.get("XYBZ"));
		ja.add(jo);
	}

	response.reset();
	response.setContentType("text/xml;charset=UTF-8");
	out.println(ja.toString());
	out.flush();
%>
