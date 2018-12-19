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
    String accid=(String)request.getParameter("ACCOUNTID");
	Map map = new HashMap();
	map.put("ACCOUNTID",accid);
	String root = request.getParameter("MKXKID");
	if(root == null) {
	    map.put("SJ_MKXKID","0");//若是模块资源 管理，则不显示根节点
	} else {
	    map.put("SJ_MKXKID",root);
	}
	JSONArray ja = new JSONArray();
	JSONObject jobj = new JSONObject();
// 	jobj.put("MKXKID", "0");
// 	jobj.put("SJ_MKXKID", "-1");
// 	jobj.put("name", "根节点");
// 	jobj.put("isParent","true");
// 	ja.add(jobj);

	String path = request.getContextPath();
	System.out.println("dddddddd"+path);
	List sList = bean.getList("selectQX_GNMK_QXXK_TREE",map);
	for(int i=0; i<sList.size(); i++) {
		JSONObject jo = new JSONObject();
		Map smap = (Map)sList.get(i);
		jo.put("MKXKID", String.valueOf(smap.get("MKXKID")));
		jo.put("SJ_MKXKID", String.valueOf(smap.get("SJ_MKXKID")));
		jo.put("name", CommonUtil.convert((String)smap.get("MKXK_MC")));
		String isparent=(String)smap.get("ISPARENT");
		String jdfldm=(String)smap.get("JDFL_DM");
		jo.put("isParent", isparent);
		jo.put("JDFL_DM",jdfldm);
		jo.put("XYBZ",smap.get("XYBZ"));
		if ("01".equals(jdfldm) || "02".equals(jdfldm) ){
            if ("true".equals(isparent)) {
                jo.put("iconOpen",path+"/images/dtree/folderopen.gif");
		        jo.put("iconClose",path+"/images/dtree/folder.gif");
			}else{
				jo.put("icon", path+"/images/dtree/folder.gif");
			}
		}else if("03".equals(jdfldm) || "031".equals(jdfldm) ){ //模块或自定义查询模块
            jo.put("icon", path+"/images/dtree/icon_mark6.gif");
		}else{//许可
			jo.put("icon", path+"/images/dtree/icon_s.gif");            
		}		
	    ja.add(jo);
	}

	response.reset();
	response.setContentType("text/xml;charset=UTF-8");
	out.println(ja.toString());
	out.flush();
%>
