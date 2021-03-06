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
            { title:'ID', name:'content_id' ,width:190, align:'left', hidden: false } ,
            { title:'标题', name:'title' ,width:180, align:'left', hidden: false } ,
            { title:'类型', name:'type_name' ,width:80, align:'left', hidden: false } ,
            { title:'发布者', name:'user_name' ,width:80, align:'left', hidden: false } ,
            { title:'日点击量', name:'views_day' ,width:80, align:'left', hidden: false }, 
            { title:'周点击量', name:'views_week' ,width:80, align:'left', hidden: false }, 
            { title:'月点击量', name:'views_month' ,width:80, align:'left', hidden: false }, 
            { title:'总点击量', name:'views' ,width:80, align:'left', hidden: false }, 
            { title:'发布时间', name:'release_date' ,width:80, align:'left', hidden: false }, 
            { title:'状态', name:'status' ,width:60, align:'center', hidden: false,renderer: function(val, item) {
            	if(val==0){
            		return "草稿";
            	}else if(val=="1"){
            		return "审核中";
            	}else if(val=="2"){
            		return "审核通过";
            	}else if(val=="3"){
            		return "回收站";
            	}
            }}
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
				case 1: // 查看操作
					curSeg.onDetails();
					break;
				case 2: // 还原操作
					curSeg.onRestore();
					break;
				case -1: // 删除操作
					curSeg.onDeleteLog();
					break;
				default:
					alert("未知的操作命令!");
			}
		},
        // 查询数据
		onQuery : function() {
			var title=$("input[name='title']").val();
			var user_name=$("input[name='user_name']").val();
			var sequencing=$("select[name='sequencing']").val();
			baseTools.xhrAjax({
				url:"/contentRecycle/getList.do",
	            params:{title:title,user_name:user_name,sequencing:sequencing,pageNo:'46',pageSize:'1'},
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
		onDeleteLog:function(){
			var ids = gridObj.selectedRows();
            if (ids.length == 0 || ids.length > 1) {
                alert("请选择一条记录!");
                return false;
            }
            if (!confirm("确认要删除这条内容吗?")) {
                return;
            }
            baseTools.xhrAjax({
				url:"/contentRecycle/delete.do",
	            params:{content_id:ids[0].content_id,media_path:ids[0].media_path,image_path:ids[0].image_path},
				callback : [ curSeg.deleteLogFinish ]
			});
		},
		deleteLogFinish:function(jsonObj, xhrArgs){
			//删除后的操作
			switch (parseInt(jsonObj.code)) {
				case 0:
					alert("操作成功");
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
		onRestore:function(){
			var ids = gridObj.selectedRows();
            if (ids.length == 0 || ids.length > 1) {
                alert("请选择一条记录!");
                return false;
            }
            if (!confirm("确认要还原这条内容吗?")) {
                return;
            }
            baseTools.xhrAjax({
				url:"/contentRecycle/restore.do",
	            params:{content_id:ids[0].content_id},
				callback : [ curSeg.deleteLogFinish ]
			});
		}
    };
})();