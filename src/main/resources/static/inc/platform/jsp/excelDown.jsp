<%@ page contentType="text/html;charset=GBK"%>
<%@ page import="net.htjs.util.CommonUtil" %>
<%
	response.reset();
	String input_title =request.getParameter("input_title");
	String input_print =request.getParameter("input_print");
	System.out.println(input_title+"======================"+System.currentTimeMillis());
	response.setContentType("application/octet-stream;charset=UTF-8");
	response.setHeader("Content-disposition", "attachment; filename="+ CommonUtil.toUtf8String(input_title) + ".xls");
	out.println(input_print);
%>