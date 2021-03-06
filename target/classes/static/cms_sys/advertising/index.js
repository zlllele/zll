var friendLinkType;
var fileUrl_pre="";
$(document).ready(function() {
    index.onLoad();
});
var index = (function() {
	// 私有属性
	var rylb = "", curSeg, tbList, formSearch = "formSearch", gridObj, winParam = {};
	// 私有方法
	var initLayout = function() {
		// 初始化页面UI
		tbList = $("#tbList");
        
        var cols = [
            { title:'ID', name:'advertising_id' ,width:190, align:'left', hidden: false } ,
            { title:'名称', name:'name' ,width:80, align:'left', hidden: false } ,
            { title:'版位', name:'category' ,width:80, align:'left', hidden: false,renderer: function(val, item) {
            		if(val==0){
            			return "页头banner";
            		}else if(val==1){
            			return "通栏";
            		}
            } } ,
            { title:'类型', name:'adspace_id' ,width:80, align:'left', hidden: false ,renderer: function(val, item) {
        		if(val==0){
        			return "图片";
        		}else if(val==1){
        			return "文字";
        		}
        } } ,
            { title:'权重', name:'ad_weight' ,width:80, align:'left', hidden: false } ,
            { title:'点击', name:'click_count' ,width:80, align:'left', hidden: false } ,
            { title:'启用', name:'is_enabled' ,width:80, align:'left', hidden: false,renderer: function(val, item) {
            	if(val==0){
            		return "否";
            	}else if(val=="1"){
            		return "是";
            	}
            } } ,
        ];

        gridObj = tbList.mmGrid({
			height : jdglTools.getMmGridHeight(tbList),
			fullWidthRows : true,
			indexCol : false,
			checkCol : true,
			showBackboard : false,
			autoLoad : false,
			nowrap : true,
			cols : cols,
			plugins : [ $('#tbListPg').htjsPaginator({
				limitList : [ 10, 20, 30, 50 ],
				loadFunction : [ curSeg.onQuery ]
			}) ]
		});

    };
    //公有方法
    return {
        onLoad : function() {
			curSeg = index;
			initLayout();
			rylb = "";
			formSearch_ = formSearch + "_";
			baseTools.setIdByName([ formSearch ]);
			curSeg.onQuery();
			// 删除组件释放内存
			$(window).unload(function() {
			});
		},
		onToolbarClick : function(cmd) {
			switch (cmd) {
				case 1: // 添加操作
					curSeg.onAdd();
					break;
				case 2: // 修改操作
					curSeg.onUpdate();
					break;
				case 3: // 首页静态化
					curSeg.onStaticIndex();
					break;
				case -1: // 删除操作
					curSeg.onDelete();
					break;
				default:
					alert("未知的操作命令!");
			}
		},
        // 查询数据
		onQuery : function() {
			baseTools.xhrAjax({
				url:"/advertising/list.do",
	            params:{pageNo:'46',pageSize:'1'},
				callback : [ curSeg.pageFlowControl ]
			});
		},
		pageFlowControl : function(jsonObj, xhrArgs) {
			switch (parseInt(jsonObj.code)) {
				// 查询操作返回标志
				case 0:
					curSeg.fillGridByJson(jsonObj, xhrArgs);
					break;
				case -1:
					alert("请稍后重试");
					break;
				case -2:// 其它错误返回标志
					alert(jsonObj.msg);
					baseTools.hideMash();
					break;
				case -3:// cookie 失效请重新登录
					alert(jsonObj.msg);
					baseTools.gotoLogin();
					break;
				default:
			}
		},
		// 使用json格式的业务数据填充表格
		fillGridByJson : function(jsonObj, xhrArgs) {
			gridObj.load(jsonObj.data);
		},
		onStaticIndex : function() {
			baseTools.xhrAjax({
				url:"/advertising/doStaticIndex.do",
	            params:{},
				callback : [ curSeg.backStaticIndex ]
			});
		},
		backStaticIndex : function(jsonObj, xhrArgs) {
			switch (parseInt(jsonObj.code)) {
				// 查询操作返回标志
				case 0:
					alert("静态化成功！");
					break;
				case -1:
					alert("请稍后重试");
					break;
				case -2:// 其它错误返回标志
					alert(jsonObj.msg);
					baseTools.hideMash();
					break;
				case -3:// cookie 失效请重新登录
					alert(jsonObj.msg);
					baseTools.gotoLogin();
					break;
				default:
			}
		},
		//新增
        onAdd:function() {
            curSeg.onOpenAddWin();
        },
        //修改
        onUpdate:function() {
        	var ids = gridObj.selectedRows();
            if (ids.length == 0 || ids.length > 1) {
                alert("请选择一条记录!");
                return false;
            }
        	curSeg.onOpenUpdateWin(ids[0]);
        },
		onDelete:function(){
			//逐条删除
			var ids = gridObj.selectedRows();
            if (ids.length == 0 || ids.length > 1) {
                alert("请选择一条记录!");
                return false;
            }
            if (!confirm("确认要删除这条广告吗?")) {
                return;
            }
            baseTools.xhrAjax({
				url:"/advertising/delete.do",
	            params:{advertising_id:ids[0].advertising_id,adspace_id:ids[0].adspace_id,ad_img_url:ids[0].ad_img_url},
				callback : [ curSeg.deleteLogFinish ]
			});
		},
		deleteLogFinish:function(jsonObj, xhrArgs){
			//删除后的操作
			switch (parseInt(jsonObj.code)) {
				case 0:
					alert("删除成功");
					curSeg.onQuery();
					break;
				case -1:
					alert("请稍后重试");
					break;
				case -3:// cookie 失效请重新登录
					alert(jsonObj.msg);
					baseTools.gotoLogin();
					break;
				default:
			}
		},
		onOpenAddWin : function() {
			winParam = {
				id : 'win_module',
				title : '添加',
				height : '300px',
				width : '600px',
				url : "/cms_sys/advertising/advertisingAdd.html",
				other : { }
			};
			baseTools.showWinExt(winParam);
		},
		onOpenUpdateWin : function(data) {
			winParam = {	
				id : 'win_module',
				title : '修改',
				height : '300px',
				width : '600px',
				url : "/cms_sys/advertising/advertisingUpdate.html",
				other : {
					advertising:data
				}
			};
			baseTools.showWinExt(winParam);
		}		
    };
})();