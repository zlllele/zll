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
todo.setIsNew("0");
List list = todo.getTodoCount(request);
int k =0;
out.print("msg=[");
System.out.println("========="+ list);
for(int i=0;list!=null&&i<list.size();i++){
	Map map = (Map)list.get(i);
	if(map!=null){
		String count = String.valueOf(map.get("COUNT"));
		String icon = String.valueOf(map.get("ICON"));
		String mkxkid = String.valueOf(map.get("MKXKID"));
		String mkxkmc = String.valueOf(map.get("MKXKMC"));
		if(!"0".equals(count)){
			k++;
		}else{
			continue;
		}
		if(k>1){
			out.println(",");
		}
		out.println("{");
		out.println("icon:'"+icon+"',");
		out.println("mkxkid:'"+mkxkid+"',");
		out.println("mkxkmc:'"+mkxkmc+"',");
		out.println("count:'"+count+"'");
		out.println("}");

	}
}
out.println("]");
%>