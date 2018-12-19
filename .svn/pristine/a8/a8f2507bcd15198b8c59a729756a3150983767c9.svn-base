<%@ page contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://www.htjs.net" prefix="htjs"%>
<%@ page import="java.util.*,net.htjs.platform.web.BaseBean" %>
<%	
	List userList = BaseBean.getOnLineUser();
	Map map = new HashMap();
	for(int i=0;i<userList.size();i++){
		Map temp = (Map)userList.get(i);
		String zzjg_mc = String.valueOf(temp.get("ZZJG_MC"));

		String log_ip=temp.get("LOG_IP")==null?null:temp.get("LOG_IP").toString();
	    if(log_ip!=null&&log_ip.lastIndexOf(".")>-1){
	       log_ip=log_ip.substring(0,temp.get("LOG_IP").toString().lastIndexOf("."));
	    }

		if(map.containsKey(zzjg_mc)){
			map.put(zzjg_mc,map.get(zzjg_mc)+"<br>"+temp.get("CZRY_MC")+"("+(temp.get("LOG_MAC")!=null?temp.get("LOG_MAC"):"")+") ["+log_ip+".*]");
		}else{
			map.put(zzjg_mc,temp.get("CZRY_MC")+"("+(temp.get("LOG_MAC")!=null?temp.get("LOG_MAC"):"")+") ["+log_ip+".*]");
		}
	}
    //request.setAttribute("data",userList);
%>
<link rel="stylesheet" type="text/css" href="../css/style.css">

<span>当前在线总人数：<%=userList.size() %>   &nbsp;&nbsp;&nbsp;&nbsp; 最高在线人数：<%=BaseBean.getMaxUserNumber() %></span>
<table  width="100%" border="0" align="center" cellpadding="0"  onKeyDown="enterToTab()" 
		cellspacing="0"  class="datatable">
	<tr class="trtitle">
	  <td >部门</td>
	  <td >姓名</td>
	</tr>
	<%for (Iterator iterator=map.keySet().iterator();iterator.hasNext();){
		String key = String.valueOf(iterator.next());
	%>
      <tr height="20" class="trcolor"> 
		    <td align="left" width="25%"><%=key %></td>
		    <td align="left"><%=map.get(key) %></td>
	 </tr>
	 <%} %>
</table>
