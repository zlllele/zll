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
            { title:'ID', name:'friend_link_type_id' ,width:190, align:'left', hidden: false } ,
            { title:'站点名', name:'site_name' ,width:80, align:'left', hidden: true } ,
            { title:'类别名', name:'name' ,width:80, align:'left', hidden: false } ,
            { title:'排序', name:'priority' ,width:80, align:'left', hidden: false } ,
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
				case -1: // 删除操作
					curSeg.onDelete();
					break;
				default:
					alert("未知的操作命令!");
			}
		},
        // 查询数据
		onQuery : function() {
			var site_name=$("input[name='site_name']").val();
			baseTools.xhrAjax({
				url:"/friendLinkType/list.do",
	            params:{site_name:site_name,pageNo:'46',pageSize:'1'},
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
            if (!confirm("确认要删除这条友情链接类别吗?")) {
                return;
            }
            baseTools.xhrAjax({
				url:"/friendLinkType/delete.do",
	            params:{friend_link_type_id:ids[0].friend_link_type_id},
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
			var url = 
			winParam = {
				id : 'win_module',
				title : '添加',
				height : '100px',
				width : '400px',
				url : "/cms_sys/friendLinkType/friendLinkTypeAdd.html",
				other : {}
			};
			baseTools.showWinExt(winParam);
		},
		onOpenUpdateWin : function(data) {
			var url = 
				winParam = {
					id : 'win_module',
					title : '修改',
					height : '100px',
					width : '400px',
					url : "/cms_sys/friendLinkType/friendLinkTypeUpdate.html",
					other : {
						friend_link_type_id:data.friend_link_type_id,
						name:data.name,
						site_name:data.site_name,
						priority:data.priority
					}
			};
			baseTools.showWinExt(winParam);
		},
		// 使用json格式的业务数据填充表格
		fillGridByJson : function(jsonObj, xhrArgs) {
			gridObj.load(jsonObj.data);
		}
    };
})();