<%@ taglib uri="http://www.htjs.net" prefix="htjs"%>
<%@page contentType="text/html;charset=UTF-8"%>
     <htjs:iterator sid="selectJC_FJ">	
     	<div id='file_<htjs:get property="FJID"/>'>
     		<a style="margin-left:3px" href="<%=request.getContextPath()%>/inc/platform/jsp/fj/fileDown.jsp?FJID=<htjs:get property="FJID"/>"><htjs:get property="FJMC"/></a>
     	</div>	
	 </htjs:iterator> 

