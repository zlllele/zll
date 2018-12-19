$(document).ready(function() {
	jsqxList.onLoad();
});
/**
 * <ol>
 * <li>date:17-09-28</li>
 * <li>editor:王鹏奇</li>
 * <li>创建文档</li>
 * <li>新增、修改参数</li>
 * <li>功能：角色管理</li>
 * </ol>
 */
var jsqxList = (function() {
	// 私有属性
	var rylb = "", curSeg, tbList, formSearch = "formSearch", gridObj, winParam = {};
	// 私有方法
	var initLayout = function() {
		// 初始化页面UI
		tbList = $("#tbList");
		var cols = [ {
			title : 'ID',
			name : 'type_id',
			width : 120,
			hidden : false,
			align : 'center'
		}, {
			title : '名称',
			name : 'type_name',
			width : 120,
			align : 'center'
		},{
			title : '图片宽度',
			name : 'img_width',
			width : 100,
			align : 'center'
		},  {
			title : '图片高度',
			name : 'img_height',
			width : 80,
			align : 'center'
		}, {
			title : '有图片',
			name : 'has_image',
			width : 120,
			align : 'center',
        	renderer : function(val, item) {
        		if(val==0){
        			return '否';
        		}else{
        			return '是';
        		}	
        	}
		}, {
			title : '禁用',
			name : 'is_disabled',
			width : 120,
			align : 'center',
        	renderer : function(val, item) {
        		if(val==0){
        			return '否';
        		}else{
        			return '是';
        		}
        	}
		}, {
			title : '操作',
			name : 'is_disable',
			width : 140,
			align : 'center',
			renderer : function(val, item) {
        		return '<a href="javascript:jsqxList.onEdit()">编辑 </a>  <a href="javascript:jsqxList.onDelete()">删除 </a>';
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
			curSeg = jsqxList;
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
//				forms : [formSearch],
				params : {
//					ZZJG_ID : jdglTools.getUserDataByKey("ZZJG_DM")  
//					CZRY_MC: $("#formSearch_CZRY_MC").val(),
//					SKSBBH: $("#formSearch_SKSBBH").val()
					
				},
				url : "/contenttype/list",
				callback : [ curSeg.pageFlowControl ]
			});
		},
		// 根据当前登录人员代码查询人员类别信息
		onQueryRylb : function() {
			baseTools.xhrAjax({
				url : "/server/platform/qxgl/qxcx/selectQxglRylb.do",	
				forms : [ formSearch ],			
				params : {
					CZRY_DM : jdglTools.getUserDataByKey("CZRY_DM")
				},
				callback : [ curSeg.pageFlowControl1 ]
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
//			if (!(rylb == '3' || ids[0].LRR_DM == jdglTools.getUserDataByKey("CZRY_DM"))) {
//				alert("没有权限进行该操作!");
//				return;
//			}
			curSeg.onOpenSaveWin("修改", ids[0].type_id);
		},
		// 授权
		onAuth : function() {
			curSeg.onOpenSaveWin2("修改", "");
		},
		// 删除记录
		onDelete : function() {
			var ids = gridObj.selectedRows();
			if (ids.length == 0 || ids.length > 1) {
				alert("请选择一条记录!");
				return false;
			}
			/*if (!(rylb == '3' || ids[0].LRR_DM == jdglTools.getUserDataByKey("CZRY_DM"))) {
				alert("没有权限进行该操作!");
				return;
			}*/
			if (!confirm("确认要删除『" + ids[0].type_name + " 内容类型』吗?")) {
				return;
			}
			baseTools.xhrAjax({
				url : "/contenttype/"+ids[0].type_id,
				params : {
//					CZRY_DM : ids[0].CZRY_DM,
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
		onOpenSaveWin : function(msg,type_id) {
			var myDate = new Date();
			var str = myDate.toLocaleDateString()+ myDate.toLocaleTimeString();
			msg = msg == "添加" ? "添加" : "修改";
			winParam = {
				id : 'win_module',
				title : msg,
				height : '300px',
				width : '580px',
				url : "/cms_sys/content/contenttype_save.html",		
				other : {
////					LRR_DM : jdglTools.getUserDataByKey("CZRY_DM"),
////					LRR_MC : jdglTools.getUserDataByKey("CZRY_MC"),
////					ZZJG_MC : jdglTools.getUserDataByKey("ACCOUNTNAME"),
////					DQRQ : str,
					msg : msg,
					type_id : type_id
//					ZZJG_DM: $("#" + formSearch_ + "ZZJG_DM").val(),
//					CZRY_DM: czrydm,
//					CZRY_MC: czrymc,
//					SKSBBH: sksbbh,
//					KPR: kpr,
//					SKR: skr,
//					FHR: fhr
				}
			};
			baseTools.showWinExt(winParam);
		},
		onOpenSaveWin2 : function(msg, id) {
			var myDate = new Date();
			var str = myDate.toLocaleDateString()+ myDate.toLocaleTimeString();
			msg = msg == "添加" ? "添加" : "修改";
			winParam = {
				id : 'win_module',
				title : msg,
				height : '220px',
				width : '400px',
				url : "/server3/qyxxgl/qyxxshow/qyxxgl/qykpxx_save.html",
				other : {
//					LRR_DM : jdglTools.getUserDataByKey("CZRY_DM"),
//					LRR_MC : jdglTools.getUserDataByKey("CZRY_MC"),
//					ZZJG_MC : jdglTools.getUserDataByKey("ACCOUNTNAME"),
//					DQRQ : str,
					msg : msg,
					id : id,
					QYSH: $("#" + formSearch_ + "QYSH").val(),
					ZZJG_MC: $("#" + formSearch_ + "ZZJG_MC").val(),
					ZZJG_DM: $("#" + formSearch_ + "ZZJG_DM").val(),
					XSF_DZ: $("#" + formSearch_ + "XSF_DZ").val(),
					XSF_DH: $("#" + formSearch_ + "XSF_DH").val(),
					XSF_YHZH: $("#" + formSearch_ + "XSF_YHZH").val()
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
		},
		// 查询人员编号信息
		pageFlowControl1 : function(jsonObj, xhrArgs) {
			switch (parseInt(jsonObj.code)) {
			// 查询操作返回标志
			case 0:
				curSeg.fillGridByJson1(jsonObj, xhrArgs);
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