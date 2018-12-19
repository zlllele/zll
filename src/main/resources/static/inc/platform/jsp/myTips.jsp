<%@ taglib uri="http://www.htjs.net" prefix="htjs"%>
<%@page contentType="text/html;charset=GBK" %>
<%@page import="net.htjs.platform.web.bean.Todo" %>
<%@page import="java.util.List" %>
<%@page import="java.util.Map" %>
<jsp:useBean id="base" class="net.htjs.platform.web.BaseBean"></jsp:useBean>
<%
	response.setHeader("Pragma","No-cache"); 
	response.setHeader("Cache-Control","no-cache"); 
	response.setDateHeader("Expires", 0);  
	
	Todo todo = Todo.getInstance();
	todo.setIsNew("1");
	System.out.println("+++++++++++++++++++++++++");
	List list = todo.getTodoCount(request);
	int k =0;
	for(int i=0;list!=null&&i<list.size();i++){
		Map map = (Map)list.get(i);
		if(map!=null){
			String count = String.valueOf(map.get("COUNT"));
			String icon = String.valueOf(map.get("ICON"));
			String mkxkid = String.valueOf(map.get("MKXKID"));
			String mkxkmc = String.valueOf(map.get("MKXKMC"));
			System.out.println(map);
			if(icon!=null&&!icon.equals("")&&!icon.equals("null")&&!"0".equals(count)){
				k++;
			}else{
				continue;
			}
			//短消息
			if("844".equals(mkxkid)){
				out.println("<span id='to_span_"+mkxkid+"' msgcount='"+count+"' class='todo_span_top' onmouseover='this.className=\"todo_span_top_on\";' onmouseout='this.className=\"todo_span_top\"' style='cursor:hand' onclick='showUserPane(this.msgcount)' title='短信息"+count+"条'>");
				out.print("<img src='images/main/qqon.gif' id='todo_img' align='top' height='16'>");
				out.print("<span style='height:14px;padding-top:2px;padding-left:2px;'></span>");
				out.println("</span>");
			}{
				out.println("<span class='todo_span' id='to_span_"+mkxkid+"' onmouseover='this.className=\"todo_span_on\";' onmouseout='this.className=\"todo_span\"' style='cursor:hand'  title='"+mkxkmc+"("+count+")' onclick='top.FRM_LEFT.Choose(\""+mkxkid+"\",\""+mkxkmc+"\")'>");
				out.print("<img src='"+icon+"' align='top' height='16'>");
				out.print("<span style='height:16px;padding-top:2px;padding-left:2px;'>"+mkxkmc+"：("+count+")</span>");
				out.println("</span>");
			}
		}
	}
%>