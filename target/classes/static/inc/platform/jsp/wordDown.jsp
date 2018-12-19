<%@ page contentType="text/html;charset=GBK"%>
<%@ page import="net.htjs.util.CommonUtil"%>
<%
	response.reset();
	response.setContentType("application/octet-stream;charset=UTF-8");
	response.setHeader("Content-disposition", "attachment; filename="
			+ CommonUtil.toUtf8String(CommonUtil.toUtf8String(request
					.getParameter("input_title"))) + ".doc");
			out.println((request.getParameter("input_print")));
%>