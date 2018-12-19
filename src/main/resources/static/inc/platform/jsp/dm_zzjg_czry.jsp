<%@ taglib uri="http://www.htjs.net" prefix="htjs"%>
<%@page contentType="text/html;charset=UTF-8"%>
<jsp:useBean id="bean" class="net.htjs.platform.web.BaseBean" />
<%@page import="net.htjs.util.CommonUtil" %>
<%@page import="java.math.BigDecimal"%>
<%@page import="java.util.List"%>
<%@page import="java.util.Map"%>
<%@page import="net.sf.json.JSONObject"%>
<%@page import="net.sf.json.JSONArray"%>
<%
    bean.parserRequest(request);//通过BaseBean中parserRequest解析取得session中数据权限、ACCOUNTID和#LOG_ZZJG_DM#等值
	Map map = bean.getAttributes();
	map.put("ISDELETE","0");
	JSONArray ja = new JSONArray();
	String root = request.getParameter("ZZJG_DM");
	if(root == null) {
	    map.put("ZZJG_DM",String.valueOf(bean.getAttribute("LOG_ZZJG_DM")));
	} else {
	    map.put("ZZJG_DM",null);
		map.put("SJ_ZZJG_DM",root);
	}
	List zzjgList = bean.getList("selectPT_DM_ZZJG_CZRY",map);
	for(int i=0; i<zzjgList.size(); i++) {
		JSONObject jo = new JSONObject();
		Map zzjg = (Map)zzjgList.get(i);
		jo.put("ZZJG_DM", (String)zzjg.get("ZZJG_DM"));
		jo.put("name", CommonUtil.convert((String)zzjg.get("ZZJG_MC")));
		jo.put("isParent", (String)zzjg.get("ISPARENT"));
		jo.put("RYBZ", zzjg.get("RYBZ"));//人员标志 1 是 0 不是
		jo.put("GWS", zzjg.get("GWSL"));//岗位数
		jo.put("JSS", zzjg.get("JSSL"));//角色数
/*
			if(((BigDecimal)sjzd.get("ISDATA")).intValue() == 1) {
				JSONObject font = new JSONObject();
				if ("N".equals(sjzd.get("YXBZ")) )	{
                   font.put("color", "gray");//禁用 颜色变灰
				}else{
                   font.put("color", "#cc3e00");
				}				
				jo.put("font",font);					
			}
*/
		ja.add(jo);
	}

	response.reset();
	response.setContentType("text/xml;charset=UTF-8");
	out.println(ja.toString());
	out.flush();
%>
