<%@ taglib uri="http://www.htjs.net" prefix="htjs"%>
<%@page language="java" contentType="text/html; charset=GBK"%>
<table width="100%" border="0" cellspacing="0" cellpadding="0">

<htjs:iterator sid="selectOA_DBSY_XX_P">
		<tr>
              <td width="50" height="30" class="list_pic">&nbsp;</td>
              <td class="list_borderb"><htjs:get property="XXNR"/><span class="info_data">[<htjs:get property="TJSJ"/>]</span></td>
              <td width="120" class="list_borderb txt_black121" qxxkdm="<htjs:get property="MKXKID"/>"><htjs:get property="CLJG"/></td>
            </tr>
	</htjs:iterator>
    </table>
<form id="form_kp" name="form_kp" method="post" action="" target="saveframe_KP">
   <input type="hidden" id="OAID" name="OAID" value="">
   <input type="hidden" id="PZFS" name="PZFS" value="">
   <input type="hidden" id="CZRY_DM" name="CZRY_DM" value="<%=session.getAttribute("CZRY_DM") %>">
   <input type="hidden" id="ZZJG_DM" name="ZZJG_DM" value="<%=session.getAttribute("ZZJG_DM") %>">
</form>
<iframe name="saveframe_KP" src="about:blank" width="100%" height="0" noresize frameborder=0 framespacing=0 marginheight=0 marginwidth=0></iframe>    