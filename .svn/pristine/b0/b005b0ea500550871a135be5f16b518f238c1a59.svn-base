/**
 * 表格排序和统计函数
 * upd-user：zzg
 * date：2007-08-19 
 */

/**
 * 保留小数点后两位小数
 * @param {Object} number     处理的数字
 * @param {Object} x          保留的小数点后位数
 */
function round(number, x)
{
    return Math.round(number * Math.pow(10, x)) / Math.pow(10, x);
}

var bgbx_oldArg=null;
var bgbx_vertion=1.0;

/**
 * 通用表格排序函数，调用方式:
 * bgpx(obj,arg,bt,hj,xh)
 * 例子：在表头中添加 style="cursor: hand" onclick="bgpx(sjb,event.srcElement,2,1,0)"
 * 对于表头比较复杂的表格,在td中用户rIndex指明当前列的下标如<td rIndex='2'>人均</td>
 * @param {Object} obj   表格对象名称
 * @param {Object} arg   排序对象
 * @param {Object} bt    表头行数
 * @param {Object} hj    是否有合计 1 有；0 无。
 * @param {Object} xh    是否有序号,在第几列
 */
function bgpx(obj,arg,bt,hj,xh)
{
	if(bgbx_oldArg==null)
	{
		bgbx_oldArg=arg;
	}
	else if(bgbx_oldArg!=arg)
	{
		bgbx_oldArg.innerText = bgbx_oldArg.innerText.replace('↓','').replace('↑','');
		bgbx_oldArg=arg;
	}
	if((arg.tagName=="TD"||arg.tagName=="TH") && hj!=null)
	{
			var introw=arg.parentElement.sectionRowIndex;
			var intcell=parseInt(arg.rIndex||arg.cellIndex);
			var btnr=arg.innerText;
			var tablerows=obj.rows.length;
			var tablecell=obj.rows(bt).cells.length;
			var tablesj;
			var pxfs;
			var xhl;
			var cLimit;
			if(xh&&parseInt(xh)==intcell+1)
			{
				return ;
			}
			if (xh==null)
			{
				xhl=1;
			}	else {
				xhl=xh;
			}
			if (btnr.search('↑')==-1 && btnr.search('↓')==-1)	{
					arg.innerText=btnr + '↑';
					pxfs='s';  //升序
			}else if (btnr.search('↑')!=-1)	{
					btnr=btnr.replace('↑','');
					arg.innerText=btnr + '↓';
					pxfs='j'; //降序
			}else {
					btnr=btnr.replace('↓','');
					arg.innerText=btnr + '↑';
					pxfs='s'; //升序
			}
			for (var i=bt;i<tablerows-hj-1;i++)  {
					cLimit=-1;
					window.status='正在排序，已完成'+Math.round(i/parseInt(tablerows-hj-2)*100)+'%';
					//oldValue=parseFloat(obj.rows(i).cells(intcell).innerText)||0;
					oldValue=parseFloat(obj.rows(i).cells(intcell).innerText.replace(/%/ig,''))||obj.rows(i).cells(intcell).innerText.replace(/%/ig,'');
					for (var k=i+1;k<tablerows-hj;k++)
					{
							//cValue=parseFloat(obj.rows(k).cells(intcell).innerText)||0;
							cValue=parseFloat(obj.rows(k).cells(intcell).innerText.replace(/%/ig,''))||obj.rows(k).cells(intcell).innerText.replace(/%/ig,'');
							
							if (pxfs=='s') {
									if (oldValue > cValue){
											oldValue=cValue;
											cLimit=k;
											/*for (var j=xhl;j<tablecell;j++)
											{
												tablesj=obj.rows(k).cells(j).innerHTML;
												obj.rows(k).cells(j).innerHTML=obj.rows(i).cells(j).innerHTML;
												obj.rows(i).cells(j).innerHTML=tablesj;	
											}
											*/					
									}		
							}else{
									if (oldValue < cValue){
											oldValue=cValue;
											cLimit=k;
											/*
											for (var j=xhl;j<tablecell;j++)
											{
												tablesj=obj.rows(k).cells(j).innerHTML;
												obj.rows(k).cells(j).innerHTML=obj.rows(i).cells(j).innerHTML;
												obj.rows(i).cells(j).innerHTML=tablesj;						
											}
											*/					
									}						
							}
				  }
					if(i!=cLimit&&cLimit!=-1)
						for (var j=xhl;j<tablecell;j++)
						{
							tablesj=obj.rows(cLimit).cells(j).innerHTML;
							obj.rows(cLimit).cells(j).innerHTML=obj.rows(i).cells(j).innerHTML;
							obj.rows(i).cells(j).innerHTML=tablesj;						
						}
				}
			  window.status='完成';
		}
}

/**
 * 表格统计函数
 * @param {Object} obj   表格对象
 * @param {Object} bt    表头的行数
 * @param {Object} ks    从第几列开始统计
 */
function bghj(obj,bt,ks){
	var rowsum=obj.rows.length-2;
	var cellsum=obj.rows(bt).cells.length-1;
	var hj;
	var i;
	var j;
	//统计现有表格数据的合计数
	for (j=ks;j<=cellsum;j++)
	{
		if(obj.rows(rowsum+1).cells(j).innerText=="--"){
			continue;
		}
		hj=0;
		for (i=bt;i<=rowsum;i++)
		{
			//#######################zhouchaoyang 2007-12-16修改
			//if (parseFloat(obj.rows(i).cells(j).innerText)==0) //如果表格数据为0，则清除连接
			if (obj.rows(i).cells(j).innerText==""||parseFloat(obj.rows(i).cells(j).innerText)==0) //如果表格数据为0，则清除连接
			{
				obj.rows(i).cells(j).innerText=0;
			}
			hj+=parseFloat(obj.rows(i).cells(j).innerText);
		}
		if(obj.rows(rowsum+1).cells(j).children.length>0)
		{   //当该表格有超链接的时候，不去除链接
		    if(parseFloat(obj.rows(i).cells(j).innerText)==0)
		    {//判断表格数据不需要合计覆盖的时候
		      obj.rows(rowsum+1).cells(j).children[0].innerText=round(hj,2);
			  }			
		}else{
			 obj.rows(rowsum+1).cells(j).innerText=round(hj,2);
		}		
	}	
}

/**
 * 表格统计函数 行合计(隔行合计)
 * @param {Object} obj   表格对象
 * @param {Object} bt    表头的行数
 * @param {Object} ks    从第几列开始统计
 */
function bghj_hhj2(obj,bt,ks){
	var rowsum=obj.rows.length-2;
	var cellsum=obj.rows(bt).cells.length-2;
	var hj1;
	var hj2;
	var i;
	var j;
	//统计现有表格数据的合计数
	for (i=bt;i<=rowsum;i++)	
	{		
		hj1=0;
		hj2=0;
		for (j=ks;j<=cellsum;j++)
		{
			//#######################zhouchaoyang 2007-12-16修改
			//if (parseFloat(obj.rows(i).cells(j).innerText)==0) //如果表格数据为0，则清除连接
			if (obj.rows(i).cells(j).innerText==""||parseFloat(obj.rows(i).cells(j).innerText)==0) //如果表格数据为0，则清除连接
			{
				obj.rows(i).cells(j).innerText=0;
			}
			if((j-ks)%2==1){
				  hj2+=parseFloat(obj.rows(i).cells(j).innerText);
			}else{
				  hj1+=parseFloat(obj.rows(i).cells(j).innerText);
			}	
		}
		if(obj.rows(i).cells(cellsum).children.length>0)
		{   //当该表格有超链接的时候，不去除链接
		    if(parseFloat(obj.rows(i).cells(j).innerText)==0)
		    {//判断表格数据不需要合计覆盖的时候
		      //obj.rows(i).cells(cellsum+2).children[0].innerText=round(hj1/parseFloat(obj.rows(i).cells(1).innerText)*100,2);
		      obj.rows(i).cells(cellsum+1).children[0].innerText=round(hj2,2);
		      obj.rows(i).cells(cellsum).children[0].innerText=round(hj1,2);
		   	}			
		}else{
			  //obj.rows(i).cells(cellsum+2).innerText=round(hj1/parseFloat(obj.rows(i).cells(1).innerText)*100,2);
			  obj.rows(i).cells(cellsum+1).innerText=round(hj2,2);
			  obj.rows(i).cells(cellsum).innerText=round(hj1,2);
		}		
	}	
}
/**
 * 表格统计函数 行合计(隔行合计)
 * @param {Object} obj   表格对象
 * @param {Object} bt    表头的行数
 * @param {Object} ks    从第几列开始统计
 */
function bghj_hhj3(obj,bt,ks){
	var rowsum=obj.rows.length-1;
	var cellsum=obj.rows(bt).cells.length-2;
	var hj1;
	var hj2;
	var i;
	var j;
	//统计现有表格数据的合计数
	for (i=bt;i<=rowsum;i++)	
	{		
		hj1=0;
		hj2=0;
		for (j=ks;j<=cellsum;j++)
		{
			//#######################zhouchaoyang 2007-12-16修改
			//if (parseFloat(obj.rows(i).cells(j).innerText)==0) //如果表格数据为0，则清除连接
			if (obj.rows(i).cells(j).innerText==""||parseFloat(obj.rows(i).cells(j).innerText)==0) //如果表格数据为0，则清除连接
			{
				obj.rows(i).cells(j).innerText=0;
			}
			if((j-ks)%3==1){
				hj2+=parseFloat(obj.rows(i).cells(j).innerText);
			}else if((j-ks)%3==0){
				hj1+=parseFloat(obj.rows(i).cells(j).innerText);
			}else{
				obj.rows(i).cells(j).innerText= 
					round(parseFloat(obj.rows(i).cells(j-2).innerText)/parseFloat(obj.rows(i).cells(1).innerText)*100,2)+"%";
			}	
		}
		if(obj.rows(i).cells(cellsum).children.length>0)
		{   //当该表格有超链接的时候，不去除链接
		    if(parseFloat(obj.rows(i).cells(j).innerText)==0)
		    {//判断表格数据不需要合计覆盖的时候
		      //obj.rows(i).cells(cellsum+2).children[0].innerText=round(hj1/parseFloat(obj.rows(i).cells(1).innerText)*100,2);
		      obj.rows(i).cells(cellsum+1).children[0].innerText=round(hj2,2);
		      obj.rows(i).cells(cellsum).children[0].innerText=round(hj1,2);
			  }			
		}else{
			//obj.rows(i).cells(cellsum+2).innerText=round(hj1/parseFloat(obj.rows(i).cells(1).innerText)*100,2);
			obj.rows(i).cells(cellsum+1).innerText=round(hj2,2);
			obj.rows(i).cells(cellsum).innerText=round(hj1,2);
		}		
	}	
}

/**
 * 表格合计、比率统计 --可以指定从第几列开始计算
 * @param {Object} obj      表格对象
 * @param {Object} start    从第几列开始统计
 * @param {Object} bt       表头的行数
 * @param {Object} bl       比率显示列(从start列开始)
 * @param {Object} fm       分母列(从start列开始)
 * @param {Object} fz       分子列(从start列开始)
 * @param {Object} istj     是否统计(0是，1否)
 * @param {Object} isbl     是否计算比率(0是，1否)
 **/
function bgtj_xh(obj,start,bt,bl,fm,fz,istj,isbl)
{
	var rowsum=obj.rows.length-2;
	var cellsum=obj.rows(bt).cells.length-1;
	var hj;
	var i;
	var j;
	//统计现有表格数据的合计数
	if(istj==0)
	{
		for (j=start;j<=cellsum;j++)
		{
			if (j!=bl)
			{
			  hj=0;
				for (i=bt;i<=rowsum;i++)
				{
					if (parseFloat(obj.rows(i).cells(j).innerText)==0) //如果表格数据为0，则清除连接
					{
						obj.rows(i).cells(j).innerText=0;
					}
					hj+=parseFloat(obj.rows(i).cells(j).innerText);
				}
				if(obj.rows(rowsum+1).cells.length<=j){
					td= obj.rows(rowsum+1).insertCell(j);
					td.innerText = Math.round(hj*100)/100;
					td.style.textAlign="right";
				}
				obj.rows(rowsum+1).cells(j).innerText=Math.round(hj*100)/100;
			}
		}
	}
	//统计现有表格数据的比率
	if (isbl==0)
	{
		try{
		if (fm==null || fm=='') fm=bl-1;
		if (fz==null || fz=='') fz=bl-2;
	
		for (j=bt;j<=rowsum+1;j++)
		{
			if (parseInt(obj.rows(j).cells(fz).innerText)!=0 && parseInt(obj.rows(j).cells(fm).innerText)!=0)
			{
				var blz=parseInt(obj.rows(j).cells(fz).innerText)/parseInt(obj.rows(j).cells(fm).innerText)*10000;
				obj.rows(j).cells(bl).innerText=Math.round(blz)/100+"%";
			}else	{
				obj.rows(j).cells(bl).innerText='0%';
			}
		}
		}catch(e){	}
	}
}

/**
 * 计算表格中某两个表格的比例
 * @param {Object} fz   分子表格id
 * @param {Object} fm   分母表格id
 * @param {Object} bl   比例表格id
 */
function jsbl(fz,fm,bl)
{
     var nfz = document.getElementById(fz).innerText;
     var nfm = document.getElementById(fm).innerText;
     if((nfz==0) && (nfm==0))
     {
       document.getElementById(bl).innerText="0%";
     }else if(nfm==0 && (nfz!=0))     {
       document.getElementById(bl).innerText=(round(parseFloat(nfz/nfz),4)*100).toFixed(2)+"%";
     }else {
       document.getElementById(bl).innerText=(round(parseFloat(nfz/nfm),4)*100).toFixed(2)+"%";
     }
}
   
function getnum(num)
{
   var rnum=0;
   rnum=num*100;
   rnum=parseInt(rnum);
   rnum=parseFloat(rnum)/100;
   return rnum;
}
   
/**
 * 根据循环的表行，计算表格中两列的比例
 * bt 表头的行数，指for循环开始的数
 * fz 分子       计算比例的分子列
 * fm 分母       计算比例的分母列
 * bl 比例结果   计算比例之后需要赋值的列
 */
function hj(bt,fz,fm,bl){
	var total1,total2;
	for(var i=bt;i<=datatable.rows.length-1;i++){
		 if((parseInt(datatable.rows[i].cells[fz].innerText*100)==0) || (parseInt(datatable.rows[i].cells[fm].innerText*100)==0)){
	      datatable.rows[i].cells[bl].innerText="0%";
	   }else{
	      total1 = datatable.rows[i].cells[fz].innerText.replace(/,/ig,'');
	      total2 = datatable.rows[i].cells[fm].innerText.replace(/,/ig,'');
		    datatable.rows[i].cells[bl].innerText=getnum(total1*100/(parseFloat(total2)))+"%";
	   }
	}
}
