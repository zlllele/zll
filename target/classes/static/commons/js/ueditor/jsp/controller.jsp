<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="com.baidu.ueditor.ActionEnter"
    pageEncoding="UTF-8"%>
<%@ page trimDirectiveWhitespaces="true" %>
<%

    request.setCharacterEncoding( "utf-8" );
	response.setHeader("Content-Type" , "text/html");
	//跨域时需要设置http头信息以返回参数给源地址 
	response.addHeader("Access-Control-Allow-Origin", "*"); 
	response.addHeader("Access-Control-Allow-Headers", "X-Requested-With,X_Requested_With");
	
	String rootPath = application.getRealPath( "/" );
	
	out.write( new ActionEnter( request, rootPath ).exec() );
	
%>
