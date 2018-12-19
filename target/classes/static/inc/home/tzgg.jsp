<%@ taglib uri="http://www.htjs.net" prefix="htjs"%>
<%@page language="java" contentType="text/html; charset=GBK"%>
<link href="inc/platform/css/home.css" rel="stylesheet" type="text/css" />
<table width="96%" border="0" align="center" cellpadding="0"
	cellspacing="0" class="txt_lheight">
	<htjs:iterator sid="selectGGXX_ZB">
		<tr>
			<td height="30" class="list_borderb">
				<span class="txt_black122">
					[<htjs:get property="FBRQ" convert="datetime" />]
				</span> 
				<a href="javascript:viewTzgg('<htjs:get property="XXID"/>')">
					<div class="nowrap fix" title="<htjs:get property="TITLE" />" style="cursor:hand"><htjs:get property="TITLE" /></div>
				</a>
			</td>
		</tr>
	</htjs:iterator>
</table>
