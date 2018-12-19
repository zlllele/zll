/**
 * <ol>
 * date:13-10-21 editor:yanghongjian
 * <li>创建文档<li>
 * <li>局端使用到的组件<li>
 * </ol>
 */
var jdglPlugins = {};
/**
 * 
 * 通用选择框组件
 * @param args {TAG_OBJ:'标签对象',LIST:[text:'',value:''],INDEX:x,VALUE:'',changeFn:xxFn,valueName:'代码字段',textName:'名称字段'}
 */
jdglPlugins.jdglSelect = function(args) {
    var obj = args.TAG_OBJ;
    obj.options.length = 0;
    var tName = args.textName || 'text';
    var vName = args.valueName || 'value';
    for (var i in args.LIST) {
        //兼容IE与firefox
        obj.options.add(new Option(args.LIST[i][tName], args.LIST[i][vName]));
    }
//    alert(args.VALUE);
    if (args.INDEX != undefined) {
        obj.selectedIndex = args.INDEX;
    }
    if (args.VALUE) {
        obj.value = args.VALUE;
    }
    obj.onchange = function() {
        if (args.changeFn)
            args.changeFn(this);
    };
};
/**
 * 产品登录类型代码
 */
jdglPlugins.CP_DLLX_LIST = [
    /*{text:"-请选择-",value:''},*/
    {text:"纳税人端",value:'0'},
    {text:"税局端",value:'1'},
    {text:"纳税人端、税局端",value:'2'}
];
/**
 * 局端管理产品登录类型组件
 * @param args {TAG_OBJ:'标签对象',INDEX:x,VALUE:'',changeFn:xxFn}
 */
jdglPlugins.jdglCpDllx = function(args) {
    if (args.LIST == undefined)
        args.LIST = this.CP_DLLX_LIST;
    var listTem = [
        {text:"-请选择-",value:''}
    ];
    for(var i in this.CP_DLLX_LIST){
        listTem.push({text:this.CP_DLLX_LIST[i].text,value:this.CP_DLLX_LIST[i].value});
    }
    args.LIST = listTem;
    this.jdglSelect(args);
};

/**
 * 
 * 通用下来菜单代码加载组件
 * @param args {tagObjs:['标签对象'],dmbNames:['dnb1'],INDEX[默认选中的索引],VALUE:[默认选中的值],APPEND : [是否追加请选择(Y:N)],loadFn:[xxFn]}
 */
jdglPlugins.loadDmb = function(args) {
	
    if(!args.tagObjs || !args.dmbNames){//对象和代码表名称缺少
    	return;
    }
    
    if(args.tagObjs.length != args.dmbNames.length){//对象长度与代码表名称长度不一致
    	return;
    }
	baseTools.xhrAjax({
		url : "/common/selectDmPlugin.do",
		params : {
			TABLENAME : args.dmbNames.join(",")
		},
		async : false,//同步加载，使用异步在修改时，可能会造成无法选中。
		callback : [ function(jsonObj, xhrArgs) {
			
			switch (parseInt(jsonObj.code)) {
				case 0:
					for (var i in args.tagObjs) {
						var data = jsonObj["data"+args.dmbNames[i].toUpperCase()];
						if(data){
							if(args.APPEND && args.APPEND[i] && args.APPEND[i] == 'Y'){
								data.unshift({DM:'',MC:'请选择  '});
							}
							if(args.loadFn[i]){//对应的代码表配置的有加载方法，调用配置的加载方法，否则配置默认的加载方法
								args.loadFn[i]({TAG_OBJ:baseTools.byId(args.tagObjs[i]),data:data});
							}else{								
								jdglPlugins.jdglSelect({TAG_OBJ:baseTools.byId(args.tagObjs[i]),LIST:data,INDEX:args.INDEX[i],VALUE:args.VALUE[i],changeFn:null,valueName : 'DM', textName : 'MC'});
							}
						}
					}
					
					break;
				case -3:
					alert(jsonObj.msg);
					baseTools.gotoLogin();
					break;
				default:
					alert(jsonObj.msg);
			}
		} ]
	});
};