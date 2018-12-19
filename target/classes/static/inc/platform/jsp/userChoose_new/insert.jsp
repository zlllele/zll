<%@ taglib uri="http://www.htjs.net" prefix="htjs"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<%
	response.setHeader("Cache-Control", "no-store");
	response.setHeader("Pragrma", "no-cache");
	response.setDateHeader("Expires", 0);
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="/server/oa/public/css/style.css"/>

<script type="text/javascript">
	
	function checkform() {
		if(Validator.Validate(document.getElementById('form1'))) {
			document.getElementById('form1').submit();
		}
	}

</script>

<title>添加</title>
</head>
<body>
<div class="main">
	<form id="form1" action="handleInsert.jsp" method="post" target="bdSave">

		<table width="100%" border="0" align="center" cellpadding="0"  cellspacing="0" frame="box" class="entryTable">				
			
			<tr>
				<td nowrap align="right" class="normalTd label" width="10%">组名称</td>
				<td nowrap align="left" class="normalTd">
					<input id="GROUP_NAME" name="GROUP_NAME" type="text" class="box0" maxlength="16" dataType="Require" msg="请输入组名称"></td>
			</tr>						
			<tr>
				<td colspan="2" align="center" style="padding-top: 10px;">
					<input type="button" class="input_2em" value="确定" onclick="save();"/>&nbsp;
					<input type="button" class="input_2em" value="取消" onclick="window.close();"/>&nbsp;
				</td>
			</tr>
		</table>
	</form>

</div>

<script type="text/javascript">

	function save() {
		
		window.returnValue = document.getElementById('GROUP_NAME').value;
		window.close();
	}
</script>
</body>
</html>

