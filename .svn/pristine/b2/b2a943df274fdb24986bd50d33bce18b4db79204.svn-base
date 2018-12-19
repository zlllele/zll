<%@ taglib uri="http://www.htjs.net" prefix="htjs"%>
<%@page contentType="text/html;charset=UTF-8"%>
<jsp:useBean id="bean" class="net.htjs.platform.web.BaseBean" />
<%@page import="net.htjs.util.CommonUtil" %>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.Map"%>
<%@page import="java.util.HashMap"%>
<%@page import="net.sf.json.JSONObject"%>
<%@page import="net.sf.json.JSONArray"%>
<%//用于复杂多维数据权限方案中 组织机构树 的zTree方案选中——让已选中记录默认选中，并在JS中控制上下级选中关系
	String qx_values = request.getParameter("QX_VALUE");	
	String[] qx_arr = qx_values.split(",");
	//遍历查询出的权限，将zzjg_dm取出放入zzjg_dmList
	Map mapForKeySearch = new HashMap();
	List zzjg_dmList = new ArrayList();
		
	for(int k = 0; k < qx_arr.length; k++ ) {
		if(!"".equals(qx_arr[k])) {
			if(!"c_zzjg".equals(qx_arr[k]) && !"c_user".equals(qx_arr[k])) {
				zzjg_dmList.add(qx_arr[k]);//生成数组
				mapForKeySearch.put(qx_arr[k], qx_arr[k]);//mapForKeySearch是所有选中机构
			}
		}
	}
		
	Map z = new HashMap();
	z.put("ZZJG_DMS", zzjg_dmList.toArray());
	z.put("ACCOUNTID", String.valueOf(request.getSession().getAttribute("ACCOUNTID")));
	z.put("ISDELETE", "0");
	//取出所有组织机构的上级代码。
	List qxzzjgList = new ArrayList();
	if(zzjg_dmList.size() > 0) {			
		qxzzjgList = bean.getList("selectPT_DM_ZZJG_SJJG", z);
	}

	Map sjzzjgs = new HashMap();
	//将上级放入临时map  sjzzjgs中
	for(int i=0; i<qxzzjgList.size();i++) {
		Map t = (Map)qxzzjgList.get(i);			
		sjzzjgs.put((String)t.get("ZZJG_DM"), (String)t.get("ZZJG_MC"));//sjzzjgs是所有选中机构的上级及本级，优化策略：像QX_VALUE一样从作为参数requeset传过来，以避免重复执行
	}

    JSONArray ja = new JSONArray();
	bean.parserRequest(request);
	Map map = bean.getAttributes();
    String root = request.getParameter("ZZJG_DM");
	if(root == null) {
		map.put("CXTJ","asyn");
		List zzjgList = bean.getList("selectPT_DM_ZZJG_SJQX",map);//获取登录人在该模块下的最大组织机构数据权限

		for(int i=0; i<zzjgList.size(); i++) {
			Map zzjg = (Map)zzjgList.get(i);
			JSONObject jo = new JSONObject();
			String dm = (String)zzjg.get("ZZJG_DM");
			jo.put("ZZJG_DM", dm);
			jo.put("name", net.htjs.util.CommonUtil.convert((String)zzjg.get("ZZJG_MC")));
			jo.put("pId", "htjs000");
			jo.put("isParent", (String)zzjg.get("ISPARENT"));

			if(mapForKeySearch.containsKey(dm)) {//本节点选中
				jo.put("checked", "true");
			}			
			//如果有选中上级节点要展开但本级不展开
			if(sjzzjgs.containsKey(dm) && !mapForKeySearch.containsKey(dm) ) {//本节点上级展开，但本节点不必展开
				if("true".equals(jo.get("isParent"))) {
					jo.put("mustOpen", "true");//此属性将触发本文件立刻执行root!=null的程序以展开下级
				}
			}
			ja.add(jo);
		}
		//生成三个根节点
		JSONObject jo1 = new JSONObject();
		jo1.put("ZZJG_DM", "htjs000");
		jo1.put("name","查看某部门及下级");
		jo1.put("isParent","true");
		ja.add(jo1);
		
		JSONObject jo2 = new JSONObject();
		jo2.put("ZZJG_DM", "11");
		jo2.put("name","查看本部门");
		jo2.put("isParent","false");
		ja.add(jo2);
		
		JSONObject jo3 = new JSONObject();
		jo3.put("ZZJG_DM", "22");
		jo3.put("name","查看本人");
		jo3.put("isParent","false");
		ja.add(jo3);
		
		for(int k = 0; k < qx_arr.length; k++ ) {
			if(!"".equals(qx_arr[k])) {
				if("c_zzjg".equals(qx_arr[k])) {
					jo2.put("checked", "true");
				} else if("c_user".equals(qx_arr[k])) {
					jo3.put("checked", "true");
				} else {
					jo1.put("checked", "true");//若有值则选中
					//需要在前台判断打开
					jo1.put("mustOpen", "true");
				}
			}
		}	    
	} else {
		map.put("ZZJG_DM",null);
		map.put("qxxkdm","");//不再取数据权限
	    map.put("SJ_ZZJG_DM",root);
		List zzjgList = bean.getList("selectPT_DM_ZZJG",map);
		for(int i=0; i<zzjgList.size(); i++) {
			JSONObject jo = new JSONObject();
			Map zzjg = (Map)zzjgList.get(i);
			String dm = (String)zzjg.get("ZZJG_DM");
			jo.put("ZZJG_DM", dm);
			jo.put("name", CommonUtil.convert((String)zzjg.get("ZZJG_MC")));
			jo.put("isParent", (String)zzjg.get("ISPARENT"));
			
			if(mapForKeySearch.containsKey(dm)) {//本节点选中
				jo.put("checked", "true");
			}
			
			//如果有选中上级节点要展开但本级不展开
			if(sjzzjgs.containsKey(dm) && !mapForKeySearch.containsKey(dm) ) {//本节点上级展开，但本节点不必展开
				if("true".equals(jo.get("isParent"))) {
					jo.put("mustOpen", "true");
				}
			}
			
			ja.add(jo);
		}
		
	}
	response.reset();
	response.setContentType("text/xml;charset=UTF-8");
	out.println(ja.toString());
	out.flush();
%>
