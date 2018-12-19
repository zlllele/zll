/* 扩充的日期函数*/
Date.prototype.add = function(str, number) {
  var date = this;
  switch (str) {
    case "year":
      date.setFullYear(date.getFullYear() + number*1);
      return date;   
    case "month":
	  var month=date.getMonth();
	  var year=date.getYear();
	  var newMonth=month*1 + number*1;
      date.setMonth(newMonth);
	  while((date.getYear()==year)&&(date.getMonth()>newMonth)){
	  	date.add("day",-1);
	  }
      return date;
    case "week":
      date.setDate(date.getDate() + number*7);
      return date;
    case "day":
      date.setDate(date.getDate() + number*1);
      return date; 
    default:
      return date;
  }
}
/**
 * @param {String} mode （month ，week） 
 */
Date.prototype.set2End = function(mode) {
  var date = this;
  switch (mode) {
    case "month":
	  var days=date.getDaysInMonth();
	  date.setDate(date.getDate()*1+days-1);
      return date;
    case "week":
      date.setDate(date.getDate()*1 + 6);
      return date;
    default:
      return date;
  }
}
/* 获取月的天数*/
Date.prototype.getDaysInMonth = function() {
  var date = this;
  var year=date.getFullYear();
  var month=date.getMonth();
  var lastDay=new Date();
  lastDay.setFullYear(year);
  lastDay.setMonth(month+1*1);
  lastDay.setDate(0);
  return lastDay.getDate();
}
/* 获取月的第一天所在的星期前面的空白天数*/
Date.prototype.getPreDays = function() {
  var date = this;
  var year=date.getFullYear();
  var month=date.getMonth();
  var firstDay=new Date();
  firstDay.setFullYear(year);
  firstDay.setMonth(month);
  firstDay.setDate(1);
  return firstDay.getDay()%7;
}
/* 获取月的最后一天所在的星期后面的空白天数*/
Date.prototype.getAftDays = function() {
  var date = this;
  var year=date.getFullYear();
  var month=date.getMonth();
  var nextFirstDay=new Date();
  nextFirstDay.setFullYear(year);
  nextFirstDay.setMonth(month+1*1);
  nextFirstDay.setDate(1);
  return (7-nextFirstDay.getDay())%7;
}
/* 获取yyyy-MM-dd格式的日期*/
Date.prototype.getStrDate = function() {
  var date = this;
  var year=date.getFullYear();
  var month=date.getMonth();
  var day=date.getDate();
  month+=1*1;
  if(month<10){
  	month="0"+month;
  }
  if(day<10){
  	day="0"+day;
  }
  return year+"-"+month+"-"+day;
}
/* 按yyyy-MM-dd格式设置日期 */
Date.prototype.SetStrDate = function(str) {
  var date = this;
  var year=str.substring(0,4);
  var month=str.substring(5,7);
  var day=str.substring(8,10);
  date.setDate(1);
  date.setYear(year);
  date.setMonth(month-1);
  date.setDate(day);
}
/*将月份加1（即正常情况下的月份） */
Date.prototype.getFullMonth = function() {
  var date = this;
  var month=date.getMonth();
  return (month+1*1)
}