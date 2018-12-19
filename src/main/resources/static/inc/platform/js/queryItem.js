/*
 * 使用方法
 * 1、在引进该js之前需要引进pubjs.js
 * 2、可选择的列统一定义为queryItem;或通过代码维护--查询项目维护中增加，在页面引入
 * 			<jsp:include page="/inc/queryItem.jsp">
				<jsp:param name="QUERY_NAME" value="getKhxxByQuality"/>
			</jsp:include>
	value根据在查询项目中指定的查询名称而定。
 * 3、展示列表定义为 datatable
 * 4、通过标签展示，循环的后面加上 
 *	<htjs:gets data_key="collection">
 *		<td align="left"><htjs:get property="value"/></td>
 *	</htjs:gets>
 * 5、可以对sqlMap进行配置，
 * 	在select标签中增加 remapResults="true"
 *  在查询内容处增加
 *  select 
 *  	khid--必查条件
 *  	<dynamic>
		 	<isNotEmpty property="queryItem">
		 		<iterate property="queryItem" prepend="," conjunction=",">
		 			$queryItem[]$
		 		</iterate>
		 	</isNotEmpty>
	 	</dynamic>
 *  from c_khxx_zb
 */
function loadQueryItem(){
		queryItems=request.QueryStringS("queryItem");
		if(queryItems){
			queryItems=queryItems.split(",");
		}else{
			return ;
		}
		table = $F("datatable");
		if(!table){
			return;
		}
		tr = table.rows[0];
		objs = document.getElementsByName("queryItem");
		tmp=$F("itemStart")
		var start=1;
		if(tmp&&tmp.cellIndex){
			start=tmp.cellIndex+1;
		}
		var isConvert= false;
		for(i=0,len=queryItems.length;i<len;i++){
			for(j=0;j<objs.length;j++){
				if(objs[j].value==queryItems[i]){
					objs[j].checked=true;
					td= tr.insertCell(i+start);
					if(objs[j].convert){
						addConvert(i+start,objs[j].convert);
						isConvert=true;
					}
					td.innerText=getParent(objs[j],"SPAN").innerText;
					//queryItems[i]==null;
					break;
				}
			}
		}
	}
	
	
	function addConvert(index,convert){
		var table = $F("datatable");
		var rows = table.rows;
		for(k=0;k<rows.length;k++){
			var td = rows[k].cells[index];
			td.innerHTML= "<span convert='"+convert+"' class='convert'>"+td.innerHTML+"</span>";
		}
	}
	window.attachEvent("onload",loadQueryItem);
