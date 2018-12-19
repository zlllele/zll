<%@ page contentType="text/html; charset=UTF-8"%>
<%
	response.setHeader("Pragma","No-cache"); 
	response.setHeader("Cache-Control","no-cache"); 
	response.setDateHeader("Expires", 0); 
 %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="/inc/platform/css/style.css"></link>
<script src="../../../../inc/platform/js/pubjs.js"></script>
<title>选择联系人</title>
</head>
<script type="text/javascript">

function dosubmit(){
    var tempData=document.getElementById('tempData').value;
    //var reJson=eval('('+json_+')') ;
    //alert(reJson.length);
    top.document.getElementById('returnValues1').value=tempData;
	//var groupID = document.getElementById('group2').value;
	//var userID = document.getElementById('user2').value;
	//var groupName = document.getElementById('groupName').value;
	//var userName = document.getElementById('userName').value;
	//var ii=groupID+"^"+userID+"^"+groupName+"^"+userName;

	//document.getElementById('returnValues').value=returnValues;
	//top.document.getElementById('returnValues1').value=ii;
}
function load(){
    document.getElementById("temp").value="";
    if($FV("isAll")==1){
		document.getElementById('tree').src="userTree.jsp?isAll=1";
	}else {
		document.getElementById('tree').src="userTree.jsp";
	}
	
	if($FV("isMulti")==1){
		document.getElementById('browser').src="memberManagerC.jsp";
	}else if($FV("isMulti")==0){
		document.getElementById('browser').src="memberManagerS.jsp";
	}
}
function getRootNodes(){
    window.frames["browser"].document.getElementById("userA").length=0;;
    var temp=document.getElementById('temp').value;
    var tempList=temp.split(':');
    for(var i=0;i<tempList.length;i=i+2){
       if(i%2==0){
          var curentOption =  new Option(tempList[i+1],tempList[i]);
          window.frames["browser"].document.getElementById("userA").options.add(curentOption);
       }
    }
}
</script>
<body style="overflow-x:hidden;overflow-y:hidden;" onload="load()">
<form action="">
<input type="hidden"  id="returnValues" name="returnValues">
<input type="hidden"  id="flag" value="one">
<input type="hidden"  id="isMulti" value="<%=request.getParameter("isMulti") %>">
<input type="hidden"  id="isAll" value="<%=request.getParameter("isAll") %>">

<input type="hidden"  id="tempData" value="">
<div style="display:none">
   <select multiple="multiple" size ="12" style="width:133px"  id="groupFlag">
   </select>
   </div>
<table width="100%" height="100%" cellpadding="0" cellspacing="1" style="border: 1px solid #99BBE8;">
<tr height="90%">
<td style="border-right: 1px solid #99BBE8;" width="200">
<iframe src="" name="tree" id="tree" width="100%" height="100%" scrolling="auto" border="0" frameborder="0"></iframe>
</td>
<td>
<iframe src="about:blank" name="browser" id="browser" align="right" width="96%" height="100%"  scrolling="auto" border="0" frameborder="0"></iframe>
</td>
</tr>
<tr height="10%">
	<td colspan="2" align="center">
		<input type="button" name="btnOk" class="bt1" value="确定" onclick="window.returnValue=$FV('tempData');self.close();">&nbsp;&nbsp;&nbsp;
		<input type="button" name="btnClose" class="bt1" value="关闭" onclick="self.close()">
	</td>
</tr>
</table>
<div>sfsdfsdfsf</div>
<div id="temp" style="display:none"></div>
</form>
</body>
</html>

