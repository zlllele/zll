<%@page contentType="text/html;charset=GBK"%>
<%@page import="net.htjs.util.StringHelper" %>
<%@page import="net.htjs.util.JSONUtil" %>
<%@page import="net.htjs.platform.web.BaseBean" %>
<%@page import="net.sf.json.JSONArray" %>
<%@page import="net.sf.json.JSONObject" %>
<%@page import="java.util.*" %>
<%@page import="java.io.PrintWriter" %>
<%@page import="java.net.URLEncoder" %>
<%
String action = StringHelper.null2String(request.getParameter("action"));
String type = StringHelper.null2String(request.getParameter("type"));
String reftype = StringHelper.null2String(request.getParameter("reftype"));
String qxxkdm = StringHelper.null2String(request.getParameter("qxxkdm"));
PrintWriter objPrintWriter;

for( Enumeration e = request.getParameterNames(); e.hasMoreElements(); ) {
    String pName = e.nextElement().toString();
}

if(action.equalsIgnoreCase("getChildren"))
{
	
    objPrintWriter = response.getWriter();
    String data = StringHelper.null2String(request.getParameter("data"));
    String _pid = StringHelper.trimToNull(JSONUtil.getValueByKey(JSONUtil.getJSONObjectByKey(data, "node"), "widgetId"));
    String objectId = StringHelper.trimToNull(JSONUtil.getValueByKey(JSONUtil.getJSONObjectByKey(data, "node"), "objectId"));
    JSONArray jsonArray = new JSONArray();
    long starttime = (new Date()).getTime();
	Map paraMap = new HashMap();
	
	List orgunitList = null;
	List stationList = null;
	List humresList = null;
	
	BaseBean baseBean = new BaseBean();
	
	if(objectId.startsWith("Orgunit_")){
		paraMap.put("SJ_ZZJG_DM",_pid);
		orgunitList = baseBean.getList("selectDM_ZZJG_FORTREE",paraMap);
		paraMap.put("ZZJG_DM",_pid);
		//stationList = baseBean.getList("selectQX_GW",paraMap);
		humresList = baseBean.getList("selectDM_CZRY_BYBMDM",paraMap);
	}
	if(objectId.startsWith("Station_")){
		paraMap.put("GW_DM",_pid);
		humresList = baseBean.getList("selectDM_CZRY_BYGW",paraMap);
	}
	int i =0;
	if(humresList!=null)
	{
		for(Iterator iterator = humresList.iterator();iterator.hasNext();){
			Map tmp = (Map)iterator.next();
			if("sysadmin".equals(tmp.get("CZRY_MC"))){
				break;
			}
			String czryDm=StringHelper.null2String(tmp.get("CZRY_DM"));
			boolean isOnline = BaseBean.isOnLine(czryDm);
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("title",	new StringBuffer("<img src='/images/main/"+(isOnline?"qqon":"qqoff")+".gif' border=0> ").append(StringHelper.null2String(tmp.get("CZRY_MC"))).append("1".equals(String.valueOf(tmp.get("SFJZ")))?"(¼æ)":"").toString());
			jsonObject.put("object",(new StringBuffer("javascript:openChat('")).append(StringHelper.null2String(tmp.get("CZRY_DM"))).append("')").toString());
			jsonObject.put("widgetId", czryDm);
			jsonObject.put("objectId", (new StringBuffer("Person_")).append( StringHelper.null2String(tmp.get("CZRY_DM"))).toString());
			jsonObject.put("isFolder", Boolean.valueOf(false));
			if(isOnline){
            	jsonArray.add(i++,jsonObject);
			}else{
				jsonArray.add(jsonObject);
			}
		}
	}
	if(stationList!=null)
	{  
		for(Iterator iterator = stationList.iterator();iterator.hasNext();){
			Map tmp = (Map)iterator.next();
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("title",	new StringBuffer("<img src='/images/vimgs/station.gif' border=0 width=16px height=16px> ").append(StringHelper.null2String(tmp.get("GW_MC"))).toString());
			jsonObject.put("object",(new StringBuffer("includemain.jsp?url=stationinfoview.jsp?reftype=")).append(reftype).append("&qxxkdm=").append(qxxkdm).append("&GW_DM=").append(StringHelper.null2String(tmp.get("GW_DM"))).append("&GW_MC=").append(URLEncoder.encode(StringHelper.null2String(tmp.get("GW_MC")),"GBK")).toString());
			jsonObject.put("widgetId", StringHelper.null2String(tmp.get("GW_DM")));
			jsonObject.put("objectId", (new StringBuffer("Station_")).append( StringHelper.null2String(tmp.get("GW_DM"))).toString());
			jsonObject.put("isFolder", Boolean.valueOf(true));
            jsonArray.add(jsonObject);
		}
	}
	
	if(orgunitList!=null)
	{
		for(Iterator iterator = orgunitList.iterator();iterator.hasNext();){
			Map tmp = (Map)iterator.next();
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("title",	new StringBuffer("<img src='/images/vimgs/orgunit.gif' border=0 width=16px height=16px> ").append(StringHelper.null2String(tmp.get("ZZJG_MC"))).toString());
			jsonObject.put("object",(new StringBuffer("includemain.jsp?url=orgunitview.jsp?reftype=")).append(reftype).append("&qxxkdm=").append(qxxkdm).append("&ZZJG_DM=").append(StringHelper.null2String(tmp.get("ZZJG_DM"))).append("&ZZJG_MC=").append(URLEncoder.encode(StringHelper.null2String(tmp.get("ZZJG_MC")),"GBK")).toString());
			jsonObject.put("widgetId", StringHelper.null2String(tmp.get("ZZJG_DM")));
			jsonObject.put("objectId", (new StringBuffer("Orgunit_")).append( StringHelper.null2String(tmp.get("ZZJG_DM"))).toString());
			jsonObject.put("isFolder", Boolean.valueOf(true));
            jsonArray.add(jsonObject);
		}
	}

    objPrintWriter.print(jsonArray.toString());
    return;
}
%>