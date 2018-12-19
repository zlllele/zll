<%@page import="net.htjs.util.Properties"%>
<%@ taglib uri="http://www.htjs.net" prefix="htjs"%>
<%@page contentType="text/html;charset=GBK"%>
<%
	String isDel = request.getParameter("isDel");
	int i=0;
%>
  <htjs:iterator sid="selectPT_BLOB">	
     	<div id='file_<htjs:get property="ID"/>'>
     		<%if("1".equals(isDel)){ %>
     		    <span width="200px;"><a style="margin-left:3px" href="#" onclick="fileDown('<htjs:get property="ID"/>')"><htjs:get property="WJMC"/></a></span>
     			<a style="margin-left:3px" href="#" onclick="delFile('<htjs:get property="ID"/>')">&nbsp;&nbsp;删除</a>
     		<%}else if("2".equals(isDel)){ %>
     		     <span width="200px;"><htjs:get property="WJMC"/></span>
     		     <a style="margin-left:3px" href="#" onclick="delFile('<htjs:get property="ID"/>')">&nbsp;&nbsp;删除</a>
     		<%}else{ %>
     		     <span style="width:300px;font-color:blue;"><a style="margin-left:3px" href="#" onclick="fileDown('<htjs:get property="ID"/>')"><htjs:get property="WJMC"/></a></span>
     		<%} %>
     	</div>	
     	<%i++; %>
	 </htjs:iterator> 
	 <%
	 if(i==0){
	 out.print("<span id='sp_none'>没有相关附件</span>");	 
	 }
	 %>
	 <iframe name="delFileFrame"  width=0 height=0 style="display:none" border=1 frameborder=1 framespacing=1 marginheight=1 marginwidth=1></iframe>
	<script type="text/javascript">
	<!--
	function delFile(fjid){
		if(confirm("确定要删除该附件吗？"))
			delFileFrame.location="/inc/platform/jsp/fj/fjdel.jsp?ID="+fjid;
	}
	function fileDown(fjid){
		delFileFrame.location="/inc/platform/jsp/fj/fileDown.jsp?ID="+fjid;
	}
	function openFile(fjid,docTitle,docType){
		window.open("/cbb/WebOffice/docView.jsp?ID="+fjid+"&docTitle="+docTitle+"&docType="+docType)
	}
	function removeFj(fjid){
		var element =document.getElementById("file_"+fjid);
		if(element&&element.parentNode)//--防止为空
	  	{
			element.parentNode.removeChild(element);
	 	} 
	}
	//-->
	</script>  
