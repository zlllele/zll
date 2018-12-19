<%@ taglib uri="http://www.htjs.net" prefix="htjs"%>
<%@page import="net.htjs.util.Escape"%>
<%@page language="java" contentType="text/html; charset=GBK"%>
<%@page import="net.htjs.util.Get16BM"%>
<%@page import="com.ip.IPSeeker"%>
<%@page import="net.htjs.platform.web.BaseBean"%>

<html>
	<head>
		<title>河南航天金穗在线客服</title>

		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="this is my page">

		<script type='text/javascript' src='/inc/platform/js/pubjs.js'></script>
		<script type='text/javascript' src='/inc/platform/js/ajax.js'></script>
		<script type='text/javascript' src='/inc/platform/js/scriptaculous/prototype.js'></script>
		<script type='text/javascript' src='/inc/platform/js/scriptaculous/scriptaculous.js'></script>
	<%
	String path = request.getContextPath();
	//session.invalidate();
	Cookie[] s = request.getCookies();
	String khsh="";
	String khmc="";
	String userid="";
	String czryDm = request.getParameter("CZRY_DM");
	String logCzryDm = (String)session.getAttribute("CZRY_DM");
	if(czryDm==null||czryDm.equals("")){
		%>
		<script>
		alert("请选择进行聊天的人员！");
		window.close();
		</script>
	<%			
	return;
	}
	if(logCzryDm==null||logCzryDm.equals("")){
		%>
		<script>
		alert("你尚未登录，不能使用在线聊天功能！");
		window.close();
		</script>
	<%			
	return;
	}
	boolean isOnLine = BaseBean.isOnLine(czryDm);
	/*
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	*/		
	String basePath = request.getScheme() + "://localhost:" + request.getServerPort()
			+ path + "/";	
	
	String toUserid = request.getParameter("toUserId");
	String toUserName ="";
	int c = 1;
%>	

		<script type="text/javascript" src="chat.js"></script>
		<link href="chat.css" type="text/css" rel="STYLESHEET"> 
	</head>
	<body onKeyUp="checkCtrl()" onkeyDown="checkInput()">
		<div  id="new_msg" style="display:none" onpropertychange="newMessageArrive(this.innerHTML)"></div>
		
		<input type="hidden" id="flag" value="true">
		<div style="border:1px solid #52D7F8;width:635px;background:#C5DDF2">
			<div id="" style="height:40px;border:1px solid #52D7F8;text-align:left;background:url(/images/chat/chat_bg1.gif)">
					<span style="font:11px;color:blue;padding-left:10px;">
					    <span style="height:100%;padding-top:5px;">
							<img src="/images/main/qq<%=isOnLine?"on":"off" %>.gif" style="margin-top:3px;">
						</span>
						<span style="height:100%;width:auto;padding-top:8px;padding-left:3px;padding-right:10px;">
							<htjs:get data_key="CZRY_DM" convert="CON_DM_CZRY"/>
							<htjs:get data_key="CZRY_DM" convert="CON_DM_CZRY_KZ_DX"/>
						</span>
						<span class="ico" onmouseover="this.className='ico_on'" onmouseout="this.className='ico'" onclick="loadContent('fileTransfer.jsp','div_right_bottom')">
							<img src="/images/chat/filetransfer.gif" title="文件">
						</span>
						<span class="ico" onmouseover="this.className='ico_on'" onmouseout="this.className='ico'" onclick="loadContent('messageHistory.jsp','div_right_bottom')">
							<img src="/images/chat/msghistory.gif" title="消息记录">
						</span>
						<%if(isOnLine){ %>
<!--							<span class="ico" onmouseover="this.className='ico_on'" onmouseout="this.className='ico'">-->
<!--								<img src="/images/chat/camera.gif" title="视频">-->
<!--							</span>-->
<!--							<span class="ico" onmouseover="this.className='ico_on'" onmouseout="this.className='ico'">-->
<!--								<img src="/images/chat/microphone.gif" title="语音">-->
<!--							</span>-->
						<%} %>
						
					</span>
			</div>
			<span style="width:450;text-align:center;">
				<div id="center1" style="width:100%;height:320">
					<textArea id="msgDisplay" style="width:100%;height:100%;padding-left:2px;" readonly></textArea>
				</div>
				<div style="padding-left:5px;width:100%;text-align:left;font-size:11px;height:15px;">
					手机短信<input type="checkbox" name="c1" onclick="$F('SJDX').value=this.checked?1:0">					
				</div>
				<div style="width:100%;height:105;text-align:left">
					<textarea id="msgToSend" style="width:100%;height:100%" onfocus="this.value=''"></textarea>
				</div>
				<div><input type="button" value="关闭(C)" accessKey="C" onclick="window.close()">
					<input accessKey="S" type="button" value="发送(S)" onclick="sendMsg()">
				</div>
			</span>
			<span style="margin-left:4px;width:177;border:1px solid #52D7F8;height:468;">
				<div style="width:100%;text-align:left;" id="div_right_top">
					<jsp:include page="userInfo.jsp">
						<jsp:param name="CZRY_DM" value="<%=czryDm %>"/>
					</jsp:include>
				</div>
				<div style="width:100%;text-align:center;" id="div_right_bottom">
					<div class="div_title"></div>
				</div>
			</span>
		</div>
		<form id="form1" action="sendMsg.jsp" target="bdSave">
			<input type="hidden" name="TO_CZRY_DM" value="<%=czryDm %>">
			<input type="hidden" name="FROM_CZRY_DM" value="<%=logCzryDm %>">
			<input type="hidden" name="CONTENT">
			<input type="hidden" name="SJHM" value="<htjs:get data_key="CZRY_DM" convert="CON_DM_CZRY_KZ_DX"/>">
			<input type="hidden" name="SJDX" value="<%=isOnLine?0:1 %>">
			<input type="submit" style="display:none">
		</form>
	</body>
</html>
<iframe name="bdSave" src="about:blank" width="100%" height="0" noresize frameborder=0 framespacing=0 marginheight=0 marginwidth=0></iframe>

