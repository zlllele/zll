<%@ taglib uri="http://www.htjs.net" prefix="htjs"%>
<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="net.htjs.util.DmUtil" %>
<%
			out.println(DmUtil.convertDmToMc(
					request.getParameter("tableName"),
					request.getParameter("dmName"), 
					request.getParameter("mcName"), 
					request.getParameter("dmValue")));
%>