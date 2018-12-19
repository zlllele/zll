<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="java.util.*"%>
<%@page import="java.text.*"%>
<script type="text/javascript" src="/inc/platform/js/dateUtil.js"></script>
<% 
    //初始化时间
    java.text.SimpleDateFormat sdf2  = new  java.text.SimpleDateFormat("yyyy-MM-dd");
	java.text.SimpleDateFormat sdf  = new  java.text.SimpleDateFormat("yyyy-MM");          
	java.util.Date  date=new java.util.Date();   
	String ed=request.getParameter("EDATE")==null?sdf2.format(date):request.getParameter("EDATE");
	String sd=request.getParameter("SDATE")==null?sdf.format(date)+"-01":request.getParameter("SDATE");
	String parameter="SDATE="+sd+"&EDATE="+ed;
	//日期处理
	Date now = new Date();
	Format format = new SimpleDateFormat("yyyy-MM-dd");
	int intYear =0;
	int intMonth = 0;
	String strrequest="";
	Date SDATE= new Date();
	Date EDATE= new Date();
	if(request.getParameter("intYear")==null)
		intYear= now.getYear()+1900;
	else
		intYear = Integer.parseInt(request.getParameter("intYear").toString());
	
	if(request.getParameter("intMonth")!=null){
		intMonth = Integer.parseInt(request.getParameter("intMonth").toString());
	}
	else if(request.getAttribute("intMonth")!=null){
		intMonth = Integer.parseInt(request.getAttribute("intMonth").toString());}
	else{
		intMonth = now.getMonth();
		intMonth = intMonth+1;
	}	
		
	if(request.getParameter("SDATE")==null||request.getParameter("SDATE").equals("")){
		SDATE= new Date(intYear-1900,intMonth-1,1);
	}else{
		SDATE = java.sql.Date.valueOf(request.getParameter("SDATE").toString());
	}
	if(request.getParameter("EDATE")==null||request.getParameter("EDATE").equals("")){
		EDATE= new Date(intYear-1900,intMonth-1,1);
		Calendar cal=new GregorianCalendar();
		cal.setTime(EDATE);
		cal.add(cal.MONTH,1);
		cal.add(cal.DAY_OF_YEAR,-1);
		EDATE = new Date(cal.get(cal.YEAR)-1900,cal.get(cal.MONTH),cal.get(cal.DAY_OF_MONTH));
	}

%>
		<input type="hidden" name="intYear" value="<%=intYear%>">
		<input type="hidden" name="intMonth" value="<%=intMonth%>">
		<input type="hidden" name="SDATE" value="<%=sd%>">
		<input type="hidden" name="EDATE" value="<%=ed%>">
		<script type="text/javascript">
			function subForm(year,month){
				var d = new Date();
				if(month<13){
					d.setYear(year);
					d.setDate(1);
					d.setMonth(month-1);
					$F("SDATE").value=d.getStrDate();
					d.add("month",1);
					d.add("day",-1);
					$F("EDATE").value=d.getStrDate();
				}else if(month==13){
					d.setYear(year);
					d.setDate(1);
					d.setMonth(0);
					$F("SDATE").value=d.getStrDate();
					d.setMonth(5);
					d.setDate(30);
					$F("EDATE").value=d.getStrDate();
				}else if(month==14){
					d.setYear(year);
					d.setDate(1);
					d.setMonth(6);
					$F("SDATE").value=d.getStrDate();
					d.setMonth(11);
					d.setDate(31);
					$F("EDATE").value=d.getStrDate();
				}else if(month==15){
					d.setYear(year);
					d.setDate(1);
					d.setMonth(0);
					$F("SDATE").value=d.getStrDate();
					d.setMonth(11);
					d.setDate(31);
					$F("EDATE").value=d.getStrDate();
				}
				$F("intYear").value=year;
				$F("intMonth").value=month;
				form1.submit();
			}
		</script>
		  <style type="text/css">
			A:link { 
			text-decoration: none; 
			color: #000000; 
			} 
			A:visited { 
			text-decoration: none; 
			color: #000000; 
			} 
			A:active { 
			text-decoration: none; 
			color: #000000;  
			} 
			A:hover { 
			text-decoration: underline; 
			color: #000000; 
			} 
			</style>
		<table border="0" align="center" cellpadding="0" frame=box cellspacing="0" class="normalTable" style="width:100%">
		  <tr height="20">
		      <td class="normalTd bar" width="16%"><b><%=intYear%>年<%
				if(intMonth ==13){
					out.println("上半年");
				}
				else if(intMonth ==14){
					out.println("下半年");
				}
				else if(intMonth ==15){
					out.println("全年");
				}
				else{
					int a= intMonth;
					out.println(intMonth +"月");
				}
				%></b>
				</td>
				<td class="normalTd bar" width="6%" ><a href="javascript:subForm(<%=intYear-1%>,12,'','');" title="按年份向前查看">&lt&lt</a></td>
				<td class="normalTd bar" width="6%" ><a href="javascript:subForm(<%=intYear%>,1,'','');">[<%if(intMonth==1){%><font color="#ff0000"><B>1</B></font><%}else{%><B>1</B><%}%>]</a></td>
				<td class="normalTd bar" width="6%" ><a href="javascript:subForm(<%=intYear%>,2,'','');">[<%if(intMonth==2){%><font color="#ff0000"><B>2</B></font><%}else{%><B>2</B><%}%>]</a></td>
				<td class="normalTd bar" width="6%" ><a href="javascript:subForm(<%=intYear%>,3,'','');">[<%if(intMonth==3){%><font color="#ff0000"><B>3</B></font><%}else{%><B>3</B><%}%>]</a></td>
				<td class="normalTd bar" width="6%" ><a href="javascript:subForm(<%=intYear%>,4,'','');">[<%if(intMonth==4){%><font color="#ff0000"><B>4</B></font><%}else{%><B>4</B><%}%>]</a></td>
				<td class="normalTd bar" width="6%" ><a href="javascript:subForm(<%=intYear%>,5,'','');">[<%if(intMonth==5){%><font color="#ff0000"><B>5</B></font><%}else{%><B>5</B><%}%>]</a></td>
				<td class="normalTd bar" width="6%" ><a href="javascript:subForm(<%=intYear%>,6,'','');">[<%if(intMonth==6){%><font color="#ff0000"><B>6</B></font><%}else{%><B>6</B><%}%>]</a></td>
				<td class="normalTd bar" width="6%" ><a href="javascript:subForm(<%=intYear%>,7,'','');">[<%if(intMonth==7){%><font color="#ff0000"><B>7</B></font><%}else{%><B>7</B><%}%>]</a></td>
				<td class="normalTd bar" width="6%" ><a href="javascript:subForm(<%=intYear%>,8,'','');">[<%if(intMonth==8){%><font color="#ff0000"><B>8</B></font><%}else{%><B>8</B><%}%>]</a></td>
				<td class="normalTd bar" width="6%" ><a href="javascript:subForm(<%=intYear%>,9,'','');">[<%if(intMonth==9){%><font color="#ff0000"><B>9</B></font><%}else{%><B>9</B><%}%>]</a></td>
				<td class="normalTd bar" width="6%" ><a href="javascript:subForm(<%=intYear%>,10,'','');">[<%if(intMonth==10){%><font color="#ff0000"><B>10</B></font><%}else{%><B>10</B><%}%>]</a></td>
				<td class="normalTd bar" width="6%" ><a href="javascript:subForm(<%=intYear%>,11,'','');">[<%if(intMonth==11){%><font color="#ff0000"><B>11</B></font><%}else{%><B>11</B><%}%>]</a></td>
				<td class="normalTd bar" width="6%" ><a href="javascript:subForm(<%=intYear%>,12,'','');">[<%if(intMonth==12){%><font color="#ff0000"><B>12</B></font><%}else{%><B>12</B><%}%>]</a></td>
				<td class="normalTd bar" width="6%"  nowrap><a href="javascript:subForm(<%=intYear%>,13,'-01-01','-06-30');">[<%if(intMonth==13){%><font color="#ff0000"><B>上半年</B></font><%}else{%><B>上半年</B><%}%>]</a></td>
				<td class="normalTd bar" width="6%"  nowrap><a href="javascript:subForm(<%=intYear%>,14,'-07-01','-12-31');">[<%if(intMonth==14){%><font color="#ff0000"><B>下半年</B></font><%}else{%><B>下半年</B><%}%>]</a></td>
				<td class="normalTd bar" width="6%"  nowrap><a href="javascript:subForm(<%=intYear%>,15,'-01-01','-12-31');">[<%if(intMonth==15){%><font color="#ff0000"><B>全年</B></font><%}else{%><B>全年</B><%}%>]</a></td>
				<td class="normalTd bar" width="6%" ><a href="javascript:subForm(<%=intYear+1%>,1,'','');" title="按年份向后查看">&gt&gt</a></td>
			</tr>
		</table>