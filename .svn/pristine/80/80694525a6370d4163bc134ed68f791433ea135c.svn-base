/**
检查日期输入是否符合规则 yyyy-mm-dd
*/

function DateText()
{
	if ( !(((window.event.keyCode >= 48) && (window.event.keyCode <= 57)) 
		|| (window.event.keyCode == 13) || (window.event.keyCode == 45) || (window.event.keyCode == 27)))
	{
		alert("只能输入数字和'-'!");
		window.event.keyCode = 0 ;
	}
}

/*-- 返回某年某月的天数-- */
function Date_getDay(aiYear,aiMonth){
 var loDay = [0,31,28,31,30,31,30,31,31,30,31,30,31];
 if ((aiYear%4==0&&aiYear%100!=0)||(aiYear%400==0)) loDay[2] = 29;
 return loDay[aiMonth];
}

function isDateFormat(asDate)
{
	 var lsDate  = asDate + "";
	 var loDate  = lsDate.split("-");
	 if (loDate.length!=3) 
	 {
		 alert("日期输入不符合yyyy-mm-dd的格式！例如2000-01-06");
		 return false;
	 }
	 var liYear  = parseInt(loDate[0],10);
	 var liMonth = parseInt(loDate[1],10);
	 var liDay   = parseInt(loDate[2],10);
	 if ((loDate[0].length>4)||(loDate[1].length!=2)||(loDate[2].length!=2))
	 {
		 alert("日期输入不符合yyyy-mm-dd的格式！例如2000-01-06");
		 return false;
	 }
	 if (isNaN(liYear)||isNaN(liMonth)||isNaN(liDay)) 
	 {
		 alert("日期输入不符合yyyy-mm-dd的格式！例如2000-01-06");
		 return false;
	 }
	 if ((liYear<1900)||(liYear>3000))
	 {
		alert("年份应该大于等于1900小于等于3000!");
		return false;
	 }
	 if ((liMonth>12)||(liMonth<=0))
	 {
		 alert("月份应该是1～12的数!");
		 return false;
	 }
	 if (liDay==0)
	 {
		 alert("输入的天数不符合实际情况!");
		 return false;
	 }

	 if (Date_getDay(liYear,liMonth)<liDay) 
	 {
		 alert("输入的天数不符合实际情况!")
		 return false;
	 }
	 return !isNaN(Date.UTC(liYear,liMonth,liDay));
}
