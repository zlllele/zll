//加载所有组件
//var loadJsName = ["dwz.core","dwz.util.date","dwz.validate.method","dwz.regional.zh","dwz.barDrag","dwz.drag","dwz.tree","dwz.accordion","dwz.ui","dwz.theme","dwz.switchEnv","dwz.alertMsg","dwz.contextmenu","dwz.navTab","dwz.tab","dwz.resize","dwz.dialog","dwz.dialogDrag","dwz.cssTable","dwz.stable","dwz.taskBar","dwz.ajax","dwz.pagination","dwz.database","dwz.datepicker","dwz.effects","dwz.panel","dwz.checkbox","dwz.history","dwz.combox"];

//加载目前框架可用组件
var loadJsName = ["dwz.core","dwz.regional.zh","dwz.barDrag","dwz.drag","dwz.tree","dwz.accordion","dwz.ui","dwz.alertMsg","dwz.contextmenu","dwz.navTab","dwz.resize","dwz.dialog","dwz.dialogDrag","dwz.cssTable","dwz.stable","dwz.panel","dwz.checkbox"];
for(var i=0;i<loadJsName.length;i++){
	document.write('<script src="../commons/js/dwz/js/'+loadJsName[i]+'.js" type="text/javascript"></script>');
}



