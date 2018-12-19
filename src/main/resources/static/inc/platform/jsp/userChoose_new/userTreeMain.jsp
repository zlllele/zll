<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib uri="http://www.htjs.net" prefix="htjs"%>
<%
	response.setHeader("Pragma","No-cache"); 
	response.setHeader("Cache-Control","no-cache"); 
	response.setDateHeader("Expires", 0); 
 %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="/server/oa/public/css/style.css">
<script src="/inc/platform/js/pubjs.js"></script>

<script type="text/javascript" src="/inc/platform/js/jQuery/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="/inc/platform/js/jQuery/jquery.ztree.core-3.2.min.js"></script>
<script type="text/javascript" src="/inc/platform/js/layout/base-min.js"></script>

<script type="text/javascript" src="/inc/platform/js/layout/ligerLayout-min.js"></script>

<script type="text/javascript" src="/inc/platform/js/layout/ligerAccordion.js"></script>

<link type="text/css" rel="StyleSheet" href="/inc/platform/js/layout/ligerui-layout.css"/>

<link rel="stylesheet" type="text/css" href="/inc/platform/css/zTreeStyle.css">
<title>选择联系人</title>

<script type="text/javascript">

function delOption() {
	
	var yx = $('#yx');	
	var optionNode = yx.find("option:selected");
	
	var wx = $('#userA');	
	optionNode.each(function(index) {
		var opt = new Option(this.text, this.value);
		wx.get(0).add(opt);	
	});	
	optionNode.remove();
}

function delAllOption() {
	var yxNode = $('#yx');
	var optionNode = yxNode.find("option");	
	var wx = $('#userA');
	
	optionNode.each(function(index) {
		var opt = new Option(this.text, this.value);
		wx.get(0).add(opt);	
	});	
	optionNode.remove();
}

function addAllOption() {
	var yxNode = $('#yx');
	var wx = $('#userA');			
	var optionNode = wx.find("option");		
	
	optionNode.each(function(index) {
		var opt = new Option(this.text, this.value);
		yxNode.get(0).add(opt);	
	});
	optionNode.remove();
}

function addOption() {	
	var yxNode = $('#yx');	
	var wxNode = $('#userA');
	var optionNode = wxNode.find("option:selected");	
	optionNode.each(function(index) {
		var opt = new Option(this.text, this.value);
		yxNode.get(0).add(opt);	
	});
	optionNode.remove();
}

function zTreeOnClick(event, treeId, treeNode) {	
	var url = 'select.jsp?pageSize=65536&ZZJG_DM=' + treeNode.ZZJG_DM;
	$.post(url,function(data) {
		var dxtd = $('#dxtd');
		dxtd.html(data);
		
		//删除已选节点
		var wx = $('#userA');		
		var yxOptions = $('#yx').find('option');		
		yxOptions.each(function() {
			wx.find('option[value="' + this.value + '"]').remove();
		});
		
	});	
}

function zTreeOnClickGroup(event, treeId, treeNode) {	
	var url = 'group_select.jsp?pageSize=65535&GROUP_ID=' + treeNode.id;
	$.post(url,function(data) {
		var dxtd = $('#dxtd');
		dxtd.html(data);		
		//删除未选节点
		var wx = $('#userA');		
		var yxOptions = $('#yx').find('option');		
		yxOptions.each(function() {
			wx.find('option[value="' + this.value + '"]').remove();
		});		
	});	
}

function retVal() {
	var opts = $('#yx').find("option");	
	var mcs = '';
	var dms = '';
	opts.each(function(index) {
		if(!this.text && !this.value) {
			return;
		}
		mcs = mcs + this.text + ',';
		dms = dms + this.value + ',';
	});
	if (mcs.substring(mcs.length - 1, mcs.length) == ',') {		
		mcs = mcs.substring(0, mcs.length - 1);
	}
	
	if (dms.substring(dms.length - 1, dms.length) == ',') {
		dms = dms.substring(0, dms.length - 1);
	}
	
	p.document.getElementById(p._mc).value = mcs;
	p.document.getElementById(p._dm).value = dms;
	if(p._span) {			
		//p.document.getElementById(p._span).innerText = mcs;
		$("#"+p._span,p.document).html(mcs);
	}
	
	window.close();
}

function openZtreeLevel(event, treeId, treeNode) {
	if(treeNode.level >= 1 ) {
		return;
	}		
	if(treeNode.isParent == true || treeNode.isParent == 'true') {			
		var treeObj = this.getZTreeObj(treeId);
		treeObj.expandNode(treeNode, true, false, true);
	}					
}

$(function() {
	
	var layout = $("#layout1");
	layout.ligerLayout({allowTopResize:false, leftWidth: 230,topHeight:25, height: '98%',heightDiff:-5,space:2 });
	var _height = $(".l-layout-center").height();
	
	$("#accordion1").ligerAccordion({ height : _height - 30 });
	
	var _u;
	
	if(p._zzjgLevel) {
		
		if(p._zzjgLevel == 1) {
			_u = '/inc/platform/jsp/dm_zzjg_all.jsp';
		} else if(p._zzjgLevel == 2) {
			_u = '/inc/platform/jsp/dm_zzjg_sjqx.jsp?qxxkdm=<%=request.getParameter("qxxkdm")%>';
		} else if(p._zzjgLevel == 3) {
			_u = '/inc/platform/jsp/dm_zzjg_zTree.jsp';
		}
		
	} else {
		_u = '/inc/platform/jsp/dm_zzjg_all.jsp';
	}
	
	var setting = {
		async: {
			enable: true, //true 表示 开启 异步加载模式   false 表示 关闭 异步加载模式
			url: _u,
			autoParam:["ZZJG_DM"]										
		},
		data: {
	       simpleData: {
		     enable: true,
		     idKey: "ZZJG_DM"
	      }
       },callback: {		
			onClick: zTreeOnClick,
			onNodeCreated: openZtreeLevel
		}
	};
	$.fn.zTree.init($("#ztree"), setting);

	//异步加载可以一次性返回所有数据。
	var setting_group = {	
			async: {
				enable: true, //true 表示 开启 异步加载模式   false 表示 关闭 异步加载模式
				url:"userGroup.jsp"									
			},
			data: {
		       simpleData: {
			     enable: true
		      }
	       },callback: {		
				onClick: zTreeOnClickGroup,
				onNodeCreated: openZtreeLevel
			}
		};
	$.fn.zTree.init($("#zdy_group"), setting_group);
});

var p;
if(window.opener && window.opener._winMode == 'open') {
	p = window.opener;
} else {
	p = window.dialogArguments;
}

function initTree() {	
	
	var mcs = '';
	var dms = '';
	
	mcs = p.document.getElementById(p._mc).value;
	dms = p.document.getElementById(p._dm).value;		
	
	if(!mcs && !dms) {
		return;
	}
	var mcArr = mcs.split(',');	
	var dmArr = dms.split(',');
	var yxNode = $('#yx');	
	for(var i=0; i<mcArr.length; i++) {
		if(mcArr[i]) {		
			var opt = new Option(mcArr[i], dmArr[i]);
			yxNode.get(0).add(opt);			
		}
	}
	
}

function addToGroup() {
	var opts = $('#yx').find("option");	
	if(opts.length == 0) {
		alert('请选择人员');
		return;
	}
	var ret = window.showModalDialog('insert.jsp', '', 'dialogHeight=200px;dialogWidth=300px;toolbar=no;menubar=no;scrollbars=yes; resizable=yes;location=no; status=no');
	
	if(!ret) {
		alert('请输入名称');
		return;
	}
	
	var mcs = '';
	var dms = '';
	opts.each(function(index) {
		if(!this.text && !this.value) {
			return;
		}
		mcs = mcs + this.text + ',';
		dms = dms + this.value + ',';
	});
	
	document.getElementById("GROUP_NAME").value = ret;
	document.getElementById("MCS").value = mcs;
	document.getElementById("DMS").value = dms;
	
	document.getElementById("form2").submit();
}
</script>

<style type="text/css">
	A.orgAdd:link {
		PADDING-LEFT: 12px; BACKGROUND: url(org_select.png) no-repeat 0px 0px; COLOR: #207bd6
	}
</style>

</head>
<body onload="initTree();">

<div id="layout1" style="margin:0 auto;width:99%"> 

    <div position="left" title=" "> 
    
		<div id="accordion1" > 
		    <div title="人员选择" style="height: 90%">
				<div>
					<ul id="ztree" class="ztree"></ul>
				</div>
		   </div>
			<div title="自定义组">
				<div>
					<ul id="zdy_group" class="ztree"></ul>
				</div>
			</div> 		   
		</div>      
    </div>
    
    <div position="center" title=" " id="framecenter">
		<table width="100%" height="90%" border="0" cellpadding="0" cellspacing="0" >
			<tr height="30px" style="font-size:12px;">
				<td align="center" valign="middle" id="f1">待选用户</td>
				<td></td>
				<td align="center" valign="middle" id="f2">已选用户</td>
			 </tr>
			 <tr >
				<td align="center" width="45%" valign="top" height="90%"  id="dxtd">
				    <select multiple="multiple" id="userA" name="user" style="width:80%;height: 90%" ondblclick="addOption(this);">
						<htjs:iterator sid="selectDM_CZRY_DX_SJHM" param="ZZJG_DM=1">
							<option value="<htjs:get property="CZRY_DM"/>"><htjs:get property="CZRY_MC"/></option>
						</htjs:iterator>			       		
					</select>			       
				</td>
				<td align="center" width="150px" height="90%">
					<input type="button" class="input_2em" value="&gt;&gt;" onclick="addAllOption()"/>
					<input type="button" class="input_2em" value="&gt;" onclick="addOption()"/>
					<input type="button" class="input_2em" value="&lt;" onclick="delOption()"/>
					<input type="button" class="input_2em" value="&lt;&lt;" onclick="delAllOption()"/>
				</td>
				  
				<td align="center" width="45%" valign="top" height="90%">
					<select multiple="multiple" style="width:80%;height:85%;" id="yx" name="user2" ondblclick="delOption()">
					</select>
					
					<div style="padding-top: 10px;">
						<a href="#"  class="orgAdd" onclick="addToGroup();">添加到组</a>
					</div>
				</td>
			</tr>
			<tr>
				<td colspan="3" align="center" height="50px">
					<input type="button" class="input_2em" value="确定" onclick="retVal();"/>&nbsp;
					<input type="button" class="input_2em" value="取消" onclick="window.close();"/>&nbsp;					
				</td>
			</tr>
		</table>
    </div>
</div>

<form action="handleInsert.jsp" name="form2" id="form2" method="post" target="bdSave">
	<input type="hidden" id="GROUP_NAME" name="GROUP_NAME">
	<input type="hidden" id="MCS" name="MCS">
	<input type="hidden" id="DMS" name="DMS">
</form>
<iframe name=bdSave width=0 height=0 style="display: none" border=1 frameborder=1 framespacing=1 marginheight=1 marginwidth=1></iframe>
</body>
</html>

