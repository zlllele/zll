<%@ page contentType="text/html; charset=GBK"%>
<html>
  <head>
  <link href="chat.css" type="text/css" rel="STYLESHEET"> 
<script type="text/javascript" src="/inc/platform/js/vjs/dojo.js"></script>
<script src="/inc/platform/js/pubjs.js"></script>
<link rel="stylesheet" type="text/css" href="/inc/platform/css/style.css">
<link rel="stylesheet" type="text/css" href="/inc/platform/css/SpellCode.css">
<script type="text/javascript">
  include_js("/inc/platform/jsp/dm/spellCode/dm_czry.jsp");
</script>
<script type="text/javascript" src="treecontrol.js"></script>
<script type="text/javascript">

</script>
  <style>
html,body {
	width: 100%; /* make the body expand to fill the visible window */
	height: 100%;
	overflow: hidden; /* erase window level scrollbars */
	padding: 0 0 0 0;
	margin: 0 0 0 0;
	FONT-SIZE: 9pt;
	MARGIN: 0px;
	FONT-FAMILY: Verdana;
	LIST-STYLE-TYPE: circle;
	scrollbar-base-color: #FFFFCC;
	scrollbar-face-color: #d6d3ce;
	SCROLLBAR-HIGHLIGHT-COLOR: #f5f9ff;
	SCROLLBAR-SHADOW-COLOR: #D6D3D6;
	SCROLLBAR-3DLIGHT-COLOR: #D6D3D6;
	SCROLLBAR-ARROW-COLOR: #797979;
	SCROLLBAR-TRACK-COLOR: #EFF3F7;
	SCROLLBAR-DARKSHADOW-COLOR: #ffffff;
	BACKGROUND-COLOR: #FFFFFF
}

.dojoSplitPane {
	margin: 5px;
}

#rightPane {
	margin: 0;
}

.dojoDialog {
	background: white;
	border: 1px solid #999;
	-moz-border-radius: 5px;
	padding: 4px;
	text-align: center;
}
</style>

  </head> 	
  <body >	
<div dojoType="TreeRPCController" RPCUrl="orgunitTree.jsp?qxxkdm=<%=request.getParameter("qxxkdm") %>" widgetId="treeController" DNDController="create"></div>
  
<div dojoType="TreeSelector"  eventNames="select:nodeSelected"  widgetId="treeSelector"></div>


<table class="treeTable" border="0" cellspacing="0" cellpadding="0"  height="100%" width="100%">
<tr style="padding:0px;margin:0px;border:1px solid red;height:22px;">
	<td style="padding:0px;margin:0px;background:url(/images/chat/chat_bg1.gif);text-align:right;">
		<div>
		<span style="height:100%;padding-right:30px;">
				<input type="text" name="CZRY_MC" class="spellCode" dm_filed="CZRY_DM" 
					source_code="dm_czry" onFinish="openChat($FV('CZRY_DM'))" style="font-size:10px;width:70px;height:18px;padding-bottom:2px;border:1px solid #3CCBF1">
				<input type="hidden" name="CZRY_DM" class="spellCode">
		</span>
		<span style="height:100%;padding-right:5px;pading-top:0px;" title="Ë¢ÐÂ">
			<img src="/images/main/refresh.png" height="13" style="cursor:hand;" onclick='window.location.reload();'>
		</span>
		<span style="height:100%;font-size:14;color:black;cursor:hand;padding-right:8px;" onclick="parent.showUserPane(0)">X</span>
		</div>
	</td>
</tr>
<tr valign=top>
<td style="border:1px black;" valign=top>
<%
	String objid="402881e70ad1d990010ad1e5ec930008";
	String reftype="orgunit";
	String isfolder="true";
	String objname="º½Ìì½ðËë";
	String qxxkdm = request.getParameter("qxxkdm");
%>			
<div dojoType="LayoutContainer"
	layoutChildPriority='top-bottom'
	style="overflow-y:auto;width: 100%; height: 100%;">
			<div dojoType="ContentPane" layoutAlign="top">
				 <div dojoType="Tree"  DNDMode="between" selector="treeSelector" widgetId="Tree"  controller="treeController"  toggler="explor" listeners="treeController"¡¡ style="width: 200px; height: 100%;overflow:auto">
						<div dojoType="TreeNode" widgetId="<%=objid%>" object="includemain.jsp?url=orgunitview.jsp?ZZJG_DM=<%=objid%>&ZZJG_MC=<%=objname %>&qxxkdm=<%=qxxkdm %>&reftype=<%=reftype %>" objectId="Orgunit_<%=objid%>"  title="<img src='/images/vimgs/root.gif' border=0 width=16px height=16px><%=objname%>" isFolder="<%=isfolder%>" state="unchecked">
						</div>
				</div>
			</div>
	</div>
</div>
<input type="hidden" name="NewTreeNodeButton" id="NewTreeNodeButton" onclick="NewTreeNode(this.value)">
<input type="hidden" name="EditTreeNodeButton" id="EditTreeNodeButton" onclick="EditTreeNode(this.value)">
<input type="hidden" name="DeleteTreeNodeButton" id="DeleteTreeNodeButton" onclick="DeleteTreeNode(this.value)">
<input type="hidden" name="DeletePeopleButton" id="DeletePeopleButton" onclick="DeletePeople(this.value)">
<input type="hidden" name="MoveTreeNodeButton" id="MoveTreeNodeButton" onclick="MoveTreeNodeButton(this.value)">
</td>
</tr>
</table>
  </body>
</html>
