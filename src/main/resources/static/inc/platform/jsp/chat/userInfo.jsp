<%@ taglib uri="http://www.htjs.net" prefix="htjs"%>
<%@page import="net.htjs.util.Escape"%>
<%@page language="java" contentType="text/html; charset=GBK"%>
<htjs:view sid="selectOA_HR_YGXX_USRENAMEXX">
	<div class="div_title">
		个人信息
	</div>
	<div class="div_content"><b>姓名：</b><htjs:get property="CZRY_MC"/></div>
	<div class="div_content"><b>部门：</b><htjs:get property="ZZJG_DM" convert="CON_DM_ZZJG"/></div>
	<div class="div_content"><b>岗位：</b><htjs:get property="ZWMS"/></div>
	<div class="div_content"><b>电话：</b><htjs:get property="BGSDH"/></div>
	<div class="div_content"><b>手机：</b><htjs:get property="YDDH"/></div>
	<div class="div_content"><b>邮箱：</b><htjs:get property="E_MAIL"/></div>
</htjs:view>