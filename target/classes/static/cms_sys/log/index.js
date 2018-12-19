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
            { title:'ID', name:'log_id' ,width:190, align:'left', hidden: false } ,
            { title:'用户', name:'user_name' ,width:80, align:'left', hidden: false } ,
            { title:'时间', name:'create_time' ,width:80, align:'left', hidden: false } ,
            { title:'IP', name:'ip' ,width:80, align:'left', hidden: false } ,
            { title:'标题', name:'title' ,width:80, align:'left', hidden: false }, 
            { title:'内容', name:'content' ,width:80, align:'left', hidden: false }
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
				case -1: // 删除操作
					curSeg.onDeleteLog();
					break;
				default:
					alert("未知的操作命令!");
			}
		},
        // 查询数据
		onQuery : function() {
			var user_name=$("input[name='user_name']").val();
			var title=$("input[name='title']").val();
			var ip=$("input[name='ip']").val();
			baseTools.xhrAjax({
				url:"/log/list.do",
	            params:{user_name:user_name,title:title,ip:ip,pageNo:'46',pageSize:'1'},
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
		onDeleteLog:function(){
			//逐条删除
			var ids = gridObj.selectedRows();
            if (ids.length == 0 || ids.length > 1) {
                alert("请选择一条记录!");
                return false;
            }
            if (!confirm("确认要删除这条日志吗?")) {
                return;
            }
            baseTools.xhrAjax({
				url:"/log/delete.do",
	            params:{log_id:ids[0].log_id},
				callback : [ curSeg.deleteLogFinish ]
			});
		},
		onDeleteBatchLog:function(){
			//批量删除
			var deleteType=$("select[name='deleteType']").val();
			if(deleteType==null||deleteType==""){
				alert("请选择批量删除的时间范围");
				return false;
			}
			var deleteText=$("select[name='deleteType']").find("option:selected").text();
			if (!confirm("确认要删除『" + deleteText + "』吗?")) {
                return;
            }
            baseTools.xhrAjax({
				url:"/log/deleteBatch.do",
	            params:{deleteType:deleteType},
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
        onDetails:function() {
        	//查看详情
            var ids = gridObj.selectedRows();
            if (ids.length == 0 || ids.length > 1) {
                alert("请选择一条记录!");
                return false;
            }
            curSeg.onOpenWin(ids[0]);
        },
		onOpenWin : function(log) {
			var url = 
			winParam = {
				id : 'win_module',
				title : '查看',
				height : '150px',
				width : '500px',
				url : "/cms_sys/log/log_details.html",
				other : {log : log }
			};
			baseTools.showWinExt(winParam);
		},
		// 使用json格式的业务数据填充表格
		fillGridByJson : function(jsonObj, xhrArgs) {
			gridObj.load(jsonObj.data);
		}
    };
})();