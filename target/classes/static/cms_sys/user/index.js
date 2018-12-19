$(document).ready(function() {
    userList.onLoad();
});

/**
 * <ol>
 * <li>date:13-11-24</li> 
 *<li>editor:张伟涛</li> 
 * <li>创建文档</li>
 * <li>新增、修改参数</li>
 * <li>功能：帐套管理</li>
 * </ol>
 */
var userList = (function() {
	// 私有属性
	var rylb = "", curSeg, tbList, formSearch = "formSearch", gridObj, winParam = {};
	// 私有方法
	var initLayout = function() {
		// 初始化页面UI
		tbList = $("#tbList");
        
        var cols = [
            { title:'ID', name:'id' ,width:80, align:'left', hidden: true } ,
            { title:'帐套名称', name:'username' ,width:80, align:'left', hidden: false } 
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
			curSeg = userList;
			initLayout();
			rylb = "";
			formSearch_ = formSearch + "_";
			baseTools.setIdByName([ formSearch ]);
			curSeg.onQuery();
			// 删除组件释放内存
			$(window).unload(function() {
			});
		},
        // 查询数据
		onQuery : function() {
			baseTools.xhrAjax({
				url:"/user/list.do",
	            params:{userName:'谢时雨',pageNo:'46',pageSize:'1'},
				callback : [ curSeg.pageFlowControl ]
			});
		},
        //新增
        onAdd:function(id,key) {
            curSeg.onOpenSaveWin();
        },
        //修改
        onEdit:function() {
            var ids = gridObj.selectedRows();
            if (ids.length == 0 || ids.length > 1) {
                alert("请选择一条记录!");
                return false;
            }
            curSeg.onOpenUpdateWin(ids[0].id, ids[0].username);
        },
        
        //删除记录
        onDelete:function() {
            var ids = gridObj.selectedRows();
            if (ids.length == 0 || ids.length > 1) {
                alert("请选择一条记录!");
                return false;
            }
            if (!confirm("确认要删除『" + ids[0].username + "』吗?")) {
                return;
            }
            var url = "/user/o_delete.do?"+Math.random()
            baseTools.xhrAjax({
                url:url,
                params:{id:ids[0].id},
                callback:[curSeg.pageFlowControl]
            });

        },
        
        /**
		 * 工具栏按钮操作
		 * 
		 * @param cmd
		 *            操作代码
		 */
		onToolbarClick : function(cmd) {
			switch (cmd) {
			case 1: // 新增操作
				curSeg.onAdd();
				break;
			case 2:// 修改操作
				curSeg.onEdit();
				break;
			case 3: // 授权
				curSeg.onAuth();
				break;
			case -1: // 删除操作
				curSeg.onDelete();
				break;
			default:
				alert("未知的操作命令!");
			}
		},
		// 打开保存窗口
		onOpenSaveWin : function() {
			winParam = {
				id : 'win_module',
				title : '添加',
				height : '120px',
				width : '500px',
				url : "/cms_sys/user/user_save.html",
				other : {
					DQRQ : '2018-02-28',
					msg : '添加',
				}
			};
			baseTools.showWinExt(winParam);
		},
		// 打开修改窗口
		onOpenUpdateWin : function(id,username) {
			var url = 
			winParam = {
				id : 'win_module',
				title : '修改',
				height : '120px',
				width : '500px',
				url : "/cms_sys/user/user_update.html",
				other : {
					ID : id,
					USERNAME : username,
					DQRQ : '2018-02-28',
					msg : '修改',
				}
			};
			baseTools.showWinExt(winParam);
		},
		// 使用json格式的业务数据填充表格
		fillGridByJson : function(jsonObj, xhrArgs) {
			gridObj.load(jsonObj.data);
		},
		/**
		 * 需要的时候可以覆盖该方法 在ajax调用中，在得到数据时调用该方法
		 */
		pageFlowControl : function(jsonObj, xhrArgs) {
			switch (parseInt(jsonObj.code)) {
			// 查询操作返回标志
			case 0:
				curSeg.fillGridByJson(jsonObj, xhrArgs);
				break;
			// 添加、更新以及状态更新操作返回标志
			case 1:
				alert(jsonObj.msg);
				curSeg.onQuery();
				break;
			// 删除操作返回标志
			case 2:
				alert(jsonObj.msg);
				curSeg.onQuery();
				break;
			// 准备添加的记录已经存在
			case 3:
				break;
			// 在线帮助
			case 6:
				break;
			case -1:// 保存出错返回标志
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
		}
    };
})();