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
    bean.parserRequest(request);//通过BaseBean中parserRequest解析取得session中ACCOUNTID、数据权限和#LOG_ZZJG_DM#等值
	Map map = bean.getAttributes();
	JSONArray ja = new JSONArray();
	List zzjgList;
	String root = request.getParameter("ZZJG_DM");
	if(root == null) {
	    map.put("CXTJ","asyn");//取数据权限判断时会使用此参数  '异步' 查询 即取 '=' 而不取 ' like '
        zzjgList = bean.getList("selectPT_DM_ZZJG_SJQX",map);
	} else {
	    map.put("ZZJG_DM",null);
		map.put("qxxkdm","");//不再取数据权限
		map.put("SJ_ZZJG_DM",root);
        zzjgList = bean.getList("selectPT_DM_ZZJG",map);
	}

	for(int i=0; i<zzjgList.size(); i++) {
		JSONObject jo = new JSONObject();
		Map zzjg = (Map)zzjgList.get(i);
		jo.put("ZZJG_DM", (String)zzjg.get("ZZJG_DM"));
		jo.put("name", CommonUtil.convert((String)zzjg.get("ZZJG_MC")));
		jo.put("isParent", (String)zzjg.get("ISPARENT"));

		JSONObject font = new JSONObject();
		if(((BigDecimal)zzjg.get("ISDELETE")).intValue() == 0) {
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
