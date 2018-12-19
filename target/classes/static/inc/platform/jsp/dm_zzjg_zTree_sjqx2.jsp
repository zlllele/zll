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
<%//用于简易一维数据权限方案中 组织机构树 的zTree方案选中——让已选中记录默认选中，并在JS中控制上下级选中关系
	String zzjg_str = request.getParameter("ZZJG_ARR");
	String[] zzjg_arr = zzjg_str.split(",");
	//遍历查询出的权限，将zzjg_dm取出放入zzjg_dmList
	Map mapForKeySearch = new HashMap();
	List zzjg_dmList = new ArrayList();	
	
	for(int i=0;i < zzjg_arr.length; i++) {
		if(!"".equals(zzjg_arr[i])) {
			zzjg_dmList.add(zzjg_arr[i]);
			mapForKeySearch.put(zzjg_arr[i], zzjg_arr[i]);//mapForKeySearch是所有选中机构
		}
	}		
	
	Map z = new HashMap();
	z.put("ZZJG_DMS", zzjg_dmList.toArray());
	z.put("ACCOUNTID", String.valueOf(request.getSession().getAttribute("ACCOUNTID")));
	z.put("ISDELETE", "0");
	//取出所有组织机构的上级。
	List qxzzjgList = new ArrayList();
	if(zzjg_dmList.size() > 0) {			
		qxzzjgList = bean.getList("selectPT_DM_ZZJG_SJJG", z);
	}

	Map sjzzjgs = new HashMap();
	//将上级放入临时map  sjzzjgs中
	for(int i=0; i<qxzzjgList.size();i++) {
		Map t = (Map)qxzzjgList.get(i);			
		sjzzjgs.put((String)t.get("ZZJG_DM"), (String)t.get("ZZJG_MC"));//sjzzjgs是所有选中机构的上级及本级，优化策略：像ZZJG_ARR一样从作为参数requeset传过来，以避免重复执行
	}
	
	JSONArray ja = new JSONArray();
    bean.parserRequest(request);
	Map map = bean.getAttributes();
	String root = request.getParameter("ZZJG_DM");
	if(root == null) {
	    map.put("CXTJ","asyn");
		List zzjgList = bean.getList("selectPT_DM_ZZJG_SJQX",map);

		for(int i=0; i<zzjgList.size(); i++) {
			Map zzjg = (Map)zzjgList.get(i);
			JSONObject jo = new JSONObject();
			String dm = (String)zzjg.get("ZZJG_DM");
			jo.put("ZZJG_DM", dm);
			jo.put("name", CommonUtil.convert((String)zzjg.get("ZZJG_MC")));
			jo.put("isParent", (String)zzjg.get("ISPARENT"));
			
			if(mapForKeySearch.containsKey(dm)) {//本节点选中
				jo.put("checked", "true");
			}
			//如果有选中上级节点要展开但本级不展开
			if(sjzzjgs.containsKey(dm) && !mapForKeySearch.containsKey(dm)) {//本节点上级展开，但本节点不必展开
				if("true".equals(jo.get("isParent"))) {
					jo.put("mustOpen", "true");//此属性将触发本文件立刻执行root!=null的程序以展开下级
				}
			}
			ja.add(jo);
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
