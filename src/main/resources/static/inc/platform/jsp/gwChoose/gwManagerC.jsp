<%@ taglib uri="http://www.htjs.net" prefix="htjs"%>
<%@page contentType="text/html;charset=UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<html>
<link rel="stylesheet" type="text/css" href="../../../../inc/platform/css/style.css">
<base href="<%=basePath%>">
  <style type="text/css">
<!--
.mm_btn{
	height:18px;
	border:1px solid #84b0c7;
	background:#f0f7fe;
	padding:0px 4px 0 4px;
	vertical-align:middle;
	cursor:pointer;
}
.mm-mselect{
	border:1px border #a3bae9 !important;
    cursor:pointer;
    font-size:12px;
    font-family: "宋体","Verdana", "Arial", "Helvetica", "sans-serif"
}
.btn_img_bg{
	height:22px;
	padding:0 8px 0 8px;
	border:1px solid #86A2C0;
	background-image:url(images/btnbg.gif);
	background-repeat:repeat-x;
	letter-spacing:2px;
	margin:2px;
	cursor:pointer;
	font-size:12px;
	width:80px
}
-->
</style>
<script type="text/javascript">
//添加联系人
function addOption(){

var dtree = parent.frames[0].d;
var se = document.getElementById('userA');
var se2 = document.getElementById('userB');
for(var i=0;i<se.options.length;i){
	if(se.options[i].selected){
	k = "yes";
	//添加右边列表
	   var curentOption =  new Option(se.options[i].text,se.options[i].value);
	   se2.options.add(curentOption);
	   //addGroup(se.options[i].value);
		//删除左边列表
		se.remove(i);
		continue;
		//break;
		}
		i++;
	}
	save2();
}
function addAllOption(){
var dtree = parent.frames[0].d;
var se = document.getElementById('userA');
var se2 = document.getElementById('userB');
var count=se.options.length;
for(var i=0;i<count;i++){
    var curentOption =  new Option(se.options[0].text,se.options[0].value);
    se2.options.add(curentOption);
	se.remove(0);
	}
save2();
}
function delAllOption(){
var se2 = document.getElementById('userB');

while(0<se2.options.length){
  se2.remove(0);
}
	
save2();
}
//删除已选联系人
function delOption(){
var se = document.getElementById('userA');
var se2 = document.getElementById('userB');
if(se2.options.length==0){
return;
save2();
}
for(var i=0;i<se2.options.length;i){
	if(se2.options[i].selected){
	//var s = se2.options[i].text;
	//var c = s.charAt(0);
	//if(c!="["){
	//添加右边列表
		//if(userInGroup(se2.options[i].value)=="yes"){
		//var curentOption =  new Option(se2.options[i].text,se2.options[i].value);
        //se.options.add(curentOption);
		//}
		//删除左边列表
		//delGroup(se2.options[i].value);
		//se2.remove(i);
		//continue;
		//break;
	//}else{
		se2.remove(i);
		continue;
		//break;
	//}
		}
		i++;
	}
save2();
}
function save2(){
	var tempData=parent.document.getElementById("tempData");
	var newData="[";
    var count=0;
    var se2 = document.getElementById('userB');
	var text;
	for(var i =0;i<se2.options.length;i++){
	text = se2.options[i].text;
	var c = text.charAt(0);
		if(c=="["){
			//newGroup = newGroup+se2.options[i].value+":";
			//newGroupName = newGroupName + text.substring(1,text.length-1)+":";
			newData+="{id:'"+se2.options[i].value+"',text:'"+text+"',prefix:'群组：'},";
		}else{
		    newData+="{id:'"+se2.options[i].value+"',text:'"+text+"',prefix:'联系人：'},";
			
		}
	}
	if(newData.charAt(newData.length-1)==","){
	    newData=newData.substring(0,newData.length-1);
	}
	newData+="]";
	tempData.value = newData;
}
//保存已选用户数据
function save(){
	var group = parent.document.getElementById("group2");
	var user = parent.document.getElementById("user2");
	var groupName = parent.document.getElementById("groupName");
	var userName = parent.document.getElementById("userName");
	var newGroup="";
	var newUser = "";
	var newGroupName = "";
	var newUserName = "";
	
    var se2 = document.getElementById('userB');
	var text;
	for(var i =0;i<se2.options.length;i++){ 
	text = se2.options[i].text;
	var c = text.charAt(0);
		if(c=="["){
			newGroup = newGroup+se2.options[i].value+":";
			newGroupName = newGroupName + text.substring(1,text.length-1)+":";
		}else{
			newUser = newUser+se2.options[i].value+":"
			newUserName = newUserName + text+":";
		}
	}
	if(newGroup.charAt(newGroup.length-1)==":"){
		newGroup = newGroup.substring(0,newGroup.length-1);
	}
	if(newUser.charAt(newUser.length-1)==":"){
		newUser = newUser.substring(0,newUser.length-1);
	}
	if(newUserName.charAt(newUserName.length-1)==":"){
		newUserName = newUserName.substring(0,newUserName.length-1);
	}
	if(newGroupName.charAt(newGroupName.length-1)==":"){
		newGroupName = newGroupName.substring(0,newGroupName.length-1);
	}
	groupName.value = newGroupName;
	userName.value = newUserName; 
	group.value = newGroup;
	user.value = newUser;
	//document.all.username.value = userName.value;
	//document.all.groupname.value = groupName.value;
}
//判断群组或用户是否已被选择
function isExist(str){
    var se2 = document.getElementById('userB');
	for(var i =0;i<se2.options.length;i++){
		if(str == se2.options[i].value){
			return "yes";
		}
	}
	return "no";
}
//初始列表
function load(){
	var tempData = parent.document.getElementById("tempData").value;
    var se2 = document.getElementById('userB');
    var data;
    if (tempData) {
	    data = eval('('+tempData+')');
		for(var i=0;i<data.length;i++){
		    var curentOption =  new Option(data[i].text,data[i].id);
		    se2.options.add(curentOption);
		}
		
		var se = document.getElementById('userA');
		for(var i =0 ;i<se.options.length;i){
			if(isExist(se.options[i].value)=="yes"){
			se.remove(i);
			continue;
			}
			i++;
		}
		save2();
	}
	
}
//判断用户和群组的对应关系
function userInGroup(userID){
	var dtree = parent.frames[0].d;
	var node = dtree.aNodes;
	var nodeSelected = node[dtree.selectedNode];
	var groupID = nodeSelected.id;
	var groupSe = parent.document.getElementById('groupFlag');
	var groupId = "";
	for(var i = 0;i<groupSe.options.length;i++){
		if(groupSe.options[i].text == userID){
		groupId = groupSe.options[i].value;
		break;
		}
	}
	if(groupID == groupId){
	return "yes";
	}
	return "no";
}
//保存用户和群组的对应关系
function addGroup(userID){
	var dtree = parent.frames[0].d;
	var node = dtree.aNodes;
	var nodeSelected = node[dtree.selectedNode];
	var gropuID = nodeSelected.id;
	var groupSe = parent.document.getElementById('groupFlag');
	var curentOption =  new Option(userID,gropuID);
	groupSe.options.add(curentOption);
	
}
//删除用户和群组的对应关系
function delGroup(userID){
	var groupSe = parent.document.getElementById('groupFlag');
	for(var i =0;i<groupSe.options.length;i++){
		if(groupSe.options[i].text == userID){
			groupSe.remove(i);
			return;
		}
	}
}
var fh_IsIE = navigator.appName.indexOf("Microsoft") >= 0;

//获取XMLHttpRequest对象
function getXMLHttpRequest() {
	var xmlHttp_ = null;
	if (fh_IsIE) {
		xmlHttp_ = new ActiveXObject("Microsoft.XMLHTTP");
	} else {
		xmlHttp_ = new XMLHttpRequest();
	}
	return xmlHttp_;
}
function fhEncode(value){
	var enCodeValue = "";
	enCodeValue = encodeURIComponent(value);
	
	return enCodeValue;
}
function checkPhone(event,obj,len){
	if(event.shiftKey){
		return false;
	}
	//设置输入的最大的位数
	obj.maxLength = len;
	if((event.keyCode>=48&&event.keyCode<=57)||event.keyCode==8||(event.keyCode>=37&&event.keyCode<=40)||(event.keyCode>=96&&event.keyCode<=105)||(event.ctrlKey&&event.keyCode==86)||event.keyCode==46){
		return true;
	}else{
		return false;
	}
}
//防止用ctrl+v粘贴;nullFlag:0允许为空否则１不允许
function numFilter(obj,nullFlag){
	var value = obj.value;
	if(nullFlag==0&&"无限制"==value){
		return false;
	}
	if(""!=value){
		var exp = /^[0-9]*$/;
		if(!exp.test(value)){
			fhMessageBox.alertInfo("请输入数字！");
			obj.value="";
			obj.focus();
		}	
	}
	
}
</script>
   <body onload="load();">
   <form action="">
   <%-- 
   <input type = "text" name="username"/>
   <input type = "text" name="groupname"/>
   --%>
   <table width="100%" height="285px" border="0" cellpadding="0" cellspacing="0" >
   <tr height="20px" id="suggestTR" style="display:none;font-size:12px;">
   	<td align="left" id="suggestTD" colspan="3">
   	</td>
   </tr>
   <form action="" method="get">
	   <tr style="" height="20px" style="font-size:12px;" id="serachTR">
	    <input type="hidden" name="ZZJG_DM">
	   	<td align="left" colspan="3">岗位名称：<input type="text" id="GW_MC" name="GW_MC" value="<htjs:get data_key="GW_MC"/>"  maxlength="8" style="width:120px"/>&nbsp;&nbsp;
	   	<input type="submit" value="查询" class="btn_img_bg"/> 
	   	</td>
	   </tr>
</from>
   <tr height="20px" style="font-size:12px;">
   	<td align="center" id="f1">待选岗位</td>
   	<td></td>
   	<td align="center" id="f2">已选岗位</td>
   </tr>
   <tr >
   <td align="center" >
       <select multiple="multiple" id="userA" name="user" style="width:180px;height:98%;" class="mm-mselect" ondblclick="addOption()">
       		<htjs:iterator sid="selectPT_QX_GW" param="ZZJG_DM=1">
       			<option value="<htjs:get property="ZZJG_DM"/>_<htjs:get property="GW_DM"/>_<htjs:get property="GW_MC"/>"><htjs:get property="GW_MC"/>/<htjs:get property="ZZJG_DM" convert="table:PT_DM_ZZJG;dm:ZZJG_DM;mc:ZZJG_MC"/></option>       		
       		</htjs:iterator>
       </select>
   </td>
   <td align="center">
   <input type="button" class="btn_img_bg" value="全添加&gt;&gt;" onclick="addAllOption()"/>
   <input type="button" class="btn_img_bg" value="添加&gt;" onclick="addOption()"/>
   <input type="button" class="btn_img_bg" value="删除&lt;" onclick="delOption()"/>
   <input type="button" class="btn_img_bg" value="全删除&lt;&lt;" onclick="delAllOption()"/>
   </td>
   <td align="center">
	<select multiple="multiple" style="width:180px;height:98%;" class="mm-mselect" id="userB" name="user2" ondblclick="delOption()">
	</select>
	</td>
   </tr>
   </table>
   <%-- 
   <div style="display:none">
   <select multiple="multiple" size ="12" style="width:133px"  id="groupFlag">
   </div>
   --%>
  </form>
     </body>
   </html>
