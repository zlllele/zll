$(document).ready(function() {
	siteList.onLoad();
});
var siteList = (function() {
	// 私有属性
	var rylb = "", curSeg, tbList, formSearch = "formSearch", gridObj, winParam = {};
	// 私有方法
	var initLayout = function() {
		// 初始化页面UI
		tbList = $("#tbList");
		var cols = [{
			title : 'ID',
			name : 'site_id',
			width : 80,
			hidden : false,
			align : 'center'
		},{
			title : '站点名称',
			name : 'site_name',
			width : 80,
			align : 'center'
		},{
			title : '站点简称',
			name : 'short_name',
			width : 100,
			align : 'center'
		},{
			title : '模板存放路径',
			name : 'tpl_path',
			width : 120,
			align : 'center'
		},{
			title : '静态资源存放路径',
			name : 'static_path',
			width : 120,
			align : 'center'
		},{
			title : '域名',
			name : 'domain',
			width : 80,
			align : 'center'
		},{
			title : '静态页存放目录',
			name : 'static_dir',
			width : 80,
			align : 'center'
		},{
			title : '启用模板目录名称',
			name : 'tpl_solution',
			width : 80,
			align : 'center'
		},{
			title : '操作',
			name : 'is_disable',
			width : 140,
			align : 'center',
			renderer : function(val, item) {
        		return '<a href="javascript:siteList.onEdit()">编辑 </a>  <a href="javascript:siteList.onDelete()">删除 </a>';
			}
		}];

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
	// 公有方法
	return {
		onLoad : function() {
			curSeg = siteList;
			initLayout();
			rylb = "";
			formSearch_ = formSearch + "_";
			baseTools.setIdByName([ formSearch ]);
			curSeg.onQuery();
			$(window).unload(function() {
			});
		},
		// 查询数据
		onQuery : function() {
			baseTools.xhrAjax({
				type: "GET",
				params : {
					
				},
				url : "/site/list",
				callback : [ curSeg.pageFlowControl ]
			});
		},
		// 新增
		onAdd : function() {
			curSeg.onOpenSaveWin("添加","");
		},
		// 修改
		onEdit : function() {
			var ids = gridObj.selectedRows();
			if (ids.length == 0 || ids.length > 1) {
				alert("请选择一条记录!");
				return false;
			}
			curSeg.onOpenSaveWin("修改", ids[0].site_id);
		},
		// 删除记录
		onDelete : function() {
			var ids = gridObj.selectedRows();
			if (ids.length == 0 || ids.length > 1) {
				alert("请选择一条记录!");
				return false;
			}
			if (!confirm("确认要删除『" + ids[0].site_name + " 站点』吗?")) {
				return;
			}
			baseTools.xhrAjax({
				url : "/site/"+ids[0].site_id,
				params : {
					_method : "DELETE"
				},
				callback : [ curSeg.pageFlowControl ]
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
		// 打开保存(新增、修改)窗口
		onOpenSaveWin : function(msg,site_id) {
			var myDate = new Date();
			var str = myDate.toLocaleDateString()+ myDate.toLocaleTimeString();
			msg = msg == "添加" ? "添加" : "修改";
			winParam = {
				id : 'win_module',
				title : msg,
				height : '300px',
				width : '680px',
				url : "/cms_sys/site/siteAdd.html",		
				other : {
					msg : msg,
					site_id : site_id
				}
			};
			baseTools.showWinExt(winParam);
		},
		// 打开授权窗口
		onOpenAuthWin : function(msg, xtjs_dm, lrr_dm, sj_xtjs_dm) {
			winParam = {
				id : 'win_module',
				title : msg,
				height : '400px',
				width : '750px',
				url : "/server3/platform/qxgl/jsgl/jsqx_auth.html",
				other : {
					LRR_DM : lrr_dm,
					LRR_MC : jdglTools.getUserDataByKey("CZRY_MC"),
					ZZJG_MC : jdglTools.getUserDataByKey("ACCOUNTNAME"),
					XTJS_DM : xtjs_dm,
					SJ_XTJS_DM : sj_xtjs_dm
				}
			};
			baseTools.showWinExt(winParam);
		},
		// 使用json格式的业务数据填充表格
		fillGridByJson : function(jsonObj, xhrArgs) {
			
			// 绑定数据
			gridObj.load(jsonObj.data);
		},
		// 查询人员类别
		fillGridByJson1 : function(jsonObj, xhrArgs) {
			rylb = jsonObj.data;
		},
		/**
		 * 需要的时候可以覆盖该方法 在ajax调用中，在得到数据时调用该方法
		 */
		pageFlowControl : function(jsonObj, xhrArgs) {
			curJsonObj = jsonObj;
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
				curSeg.fillGridByJson(jsonObj, xhrArgs);
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