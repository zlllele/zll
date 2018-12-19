<%@ page contentType="text/html; charset=GBK"%>
<% 
   String isdel=request.getParameter("isDel")==null?"1":request.getParameter("isDel");
   String isUpload=request.getParameter("isUpload")==null?"1":request.getParameter("isUpload");
%>
<html>
<head>
	<title></title>
	<meta http-equiv="Content-Type" content="text/html; charset=GBK">
	<link href="/inc/platform/css/main.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript">
		function doSubmit(){
			var fileupload = document.getElementById("fileupload").value;
			if(""==fileupload){
				var msgArea = parent.document.getElementById("msgArea");
				msgArea.innerHTML = '<font color="red" style="margin-left:10px">请上传文件！</font>';
				return false;
			}
			document.getElementById("upForm").submit();
			
		}
		
		function setbgcolor(){
			if(!document.all) document.body.bgColor="";
		}
		function appendList(result){
			var fileArea = document.getElementById("fhCreateFileList");
			var element  = document.createElement("div");  
			element.id="file_"+result.fjid;
			element.innerHTML=element.innerHTML+"<input type=\"hidden\" id=\"f_"+result.fjid+"\" name=\"fileList\" value=\""+result.fjid+"\"><span width=200>"+
				result.fjmc+ "</span> <a style=\"margin-left:3px\" href=\"javascript:delFile('" + result.fjid + "')\">\u5220\u9664</a><input type='hidden' name='FJID' value='"+result.fjid+"'><input type='hidden' name='ATTACHNAME' value='"+result.fjmc+"'><input type='hidden' name='FILEDIR' value='"+result.fjdir+"'><input type='hidden' name='FILESIZE' value='"+result.fjdx+"'><input type='hidden' name='FILETYPE' value='"+result.fjlx+"'>";         
			fileArea.appendChild(element);
			//$F("sp_none").style.display="none";
		}
		function appendMsg(msg){
			var msgArea = document.getElementById("msgArea");
			if(msg!=""){
				msgArea.style.display="block";
				msgArea.innerHTML="<span style='color:red'>" + msg +"</span>";
			}else{
				msgArea.style.display="none";
				msgArea.innerHTML="";
			}
		}
		function fileDown(fjid){
			delFileFrame.location="/inc/platform/jsp/fj/fileDown.jsp?ID="+fjid;
		}
		function removeFj(fjid){
			var element = $F("file_"+fjid);
			if(element&&element.parentNode)//--防止为空
		  	{
				element.parentNode.removeChild(element);
		 	} 
		}
		
		function delFile(fjid){
			if(confirm("确定要删除该附件吗？"))
				delFileFrame.location="/inc/platform/jsp/fj/fjdel.jsp?ID="+fjid;
		}
    </script>
</head>
<body bgcolor="transparent">
<div style="width:100%;">
	<%if("1".equals(isUpload)){%>
	<div style="width:100%;height:30px;">
		<span>
			<iframe name="fileFrame" height="30px"
				allowtransparency="true" src="/inc/platform/jsp/fj/fileUploadFile.jsp?qxxkdm=<%=request.getParameter("qxxkdm") %>&WJID=<%=request.getParameter("WJID") %>&YWBS=<%=request.getParameter("YWBS") %>&SJLY=<%=request.getParameter("SJLY") %>"
				id="up_f" frameborder="0" marginheight="0" scrolspanng="no"
				width="100%">
			</iframe>
		</span>
	</div>
	<div id="msgArea"></div>
	<%} %>
	<div>
		<span>
			<span id="fhCreateFileList">
				<jsp:include page="/inc/platform/jsp/fj/fileList.jsp">
	 				<jsp:param name="isDel" value="<%=isdel %>" />
	 			</jsp:include>
			</span>
		</span>
	</div>
</div>
<iframe name="delFileFrame"  width=0 height=0 style="display:none" border=1 frameborder=1 framespacing=1 marginheight=1 marginwidth=1></iframe>
</body>

</html>