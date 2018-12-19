<%@ page contentType="text/html; charset=utf-8"%>
<html>
<head>
	<title></title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<link href="/inc/platform/css/main.css" rel="stylesheet" type="text/css" />
	<link rel="stylesheet" type="text/css" href="/inc/platform/css/style.css">
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
    </script>
</head>
<body bgcolor="transparent">
	<form action="fileUploadResult.jsp" method="post" id="upForm" enctype="multipart/form-data" target="bdSave">
		<span class="col_left" style="font-size:12;"></span>
		<input type="file" name="fileupload" id="fileupload" size="30" style="margin:2px 0px 2px 0px " onkeydown="event.returnValue=false;" onpaste="return false"/>
		<input type="hidden" name="WJID" value="<%=request.getParameter("WJID")%>">
		<input type="hidden" name="YWBS" value="<%=request.getParameter("YWBS")%>">
		<input type="hidden" name="SJLY" value="<%=request.getParameter("SJLY")%>">
		<input type="button" name="upLoadPic" class="bt1" value="上传" style="cursor:hand" class="comm_btn"  onclick="doSubmit()" />
	</form>
	<iframe name="bdSave"  width=0 height=0 style="display:none" border=1 frameborder=1 framespacing=1 marginheight=1 marginwidth=1></iframe>
	
</body>

</html>
