//使用窗口组件加载时注释下面的代码
$(document).ready(function() {
	site_save.onLoad();
});

var site_save = (function() {
	var curSeg, formSave = "formSave", formSave_, winObj, winParam;
	var bAdd = true;
	var initLayout = function() {
		winObj = frameElement.api;
		winParam = winObj.data;
		if(winParam.other.msg != '添加'){
			bAdd = false;
		}
		if(winParam.other.leaf=="false"||(!winParam.other.leaf)){
			winObj.button({
				name : '保存',
				focus : true,
				callback : function() {
					curSeg.onSave();
					return false;
				}
			}, {
				name : '关闭'
			});
		}
		baseTools.checkFormLock([ formSave ]);
	};
	// 公有方法
	return {
		onLoad : function() {
			curSeg = site_save;
			initLayout();
			if (!bAdd) {// 修改的时候进行查询
				curSeg.onQuery();
			}else{
				Validator.validate(baseTools.byId(formSave), 3);
			}
			// 删除组件释放内存
			$(window).unload(function() {
			});
		},
		// 查询数据
		onQuery : function() {
			baseTools.xhrAjax({
				url : "/site/"+winParam.other.site_id,
				type : "GET",
//				params : {
//					type_id : winParam.other.type_id
//				},
				callback : [ curSeg.pageFlowControl ]
			});
		},
		// 保存数据
		onSave : function() {
			var url = "/site";
			var params = {};
			if (!bAdd) {
				params._method = "PUT";
			}
			baseTools.xhrAjax({
				url : url,
				forms : [ formSave ],
				params : {},
				callback : [ curSeg.pageFlowControl ]
			});
		},
		

		// 绑定数据
		onBindData : function(jsonObj, xhrArgs) {
			$("#siteId").val(jsonObj.data.siteId);
			$("#site_name").val(jsonObj.data.siteName);
			$("#short_name").val(jsonObj.data.shortName);
			$("#tpl_solution").val(jsonObj.data.tplSolution);
			$("#domain").val(jsonObj.data.domain);
			$("#tpl_path").val(jsonObj.data.tplPath);
			$("#static_path").val(jsonObj.data.staticPath);
			$("#static_dir").val(jsonObj.data.staticDir);
			$("#zzjgDm").val(jsonObj.data.zzjgDm);
			//$("#is_recycle_on").val(jsonObj.data.recydeOn);
			var recycle_on = jsonObj.data.recydeOn;
			var is_recycle_on = '1';
			if(!recycle_on){
				is_recycle_on = '0';
			}
			$(":radio[name='is_recycle_on'][value='" + is_recycle_on + "']").prop("checked", "checked");
			var root = jsonObj.data.root;
			var isRoot = '1';
			if(!root){
				isRoot = '0';
			}
			$(":radio[name='is_root'][value='" + isRoot + "']").prop("checked", "checked");
			$("#sys_tpl_solution").val(jsonObj.data.sysTplSolution);
			$("#old_sys_tpl_solution").val(jsonObj.data.sysTplSolution);
			Validator.validate(baseTools.byId(formSave), 3);
		},
		// 关闭窗口
		onCloseWin : function() {
			winObj.opener.siteList.onQuery();
			setTimeout(function() {
				winObj.close();
			},100)
		},
		/**
		 * 工具栏按钮操作
		 * 
		 * @param cmd
		 *            操作代码
		 */
		onToolbarClick : function(cmd) {
			switch (cmd) {
			case 1: // 添加类型
				curSeg.onSave();
				break;
			case 2: // 功能页面
				curSeg.onOpenSaveWin();
				break;
			case 3: // 打印页面
				break;
			case -1:
				curSeg.onCloseWin();
				break;
			default:
				alert("未知的操作命令!");
			}
		},
		/**
		 * 需要的时候可以覆盖该方法 在ajax调用中，在得到数据时调用该方法
		 */
		pageFlowControl : function(jsonObj, xhrArgs) {
			switch (parseInt(jsonObj.code)) {
			// 查询操作返回标志
			case 1:
				curSeg.onBindData(jsonObj, xhrArgs);
				break;
			// 添加、更新以及状态更新操作返回标志
			case 0:
				alert(jsonObj.msg);
				curSeg.onCloseWin();
				break;
			// 删除操作返回标志
			case 2:
				alert(jsonObj.msg);
				break;
			case -2:// 其它错误返回标志
				alert(jsonObj.msg);
				baseTools.hideMash();
				break;
			case 99:// 其它错误返回标志
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