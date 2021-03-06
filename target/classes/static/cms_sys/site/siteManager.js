//使用窗口组件加载时注释下面的代码
$(document).ready(function() {
	site_save.onLoad();
});

var site_save = (function() {
	var curSeg, formSave = "formSave", formSave_, winObj;
	// 公有方法
	return {
		onLoad : function() {
			curSeg = site_save;
			curSeg.onQuery();
			// 删除组件释放内存
			$(window).unload(function() {
			});
		},
		// 查询数据
		onQuery : function() {
			baseTools.xhrAjax({
				url : "/site/list/manager",
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
			params._method = "PUT";
			baseTools.xhrAjax({
				url : url,
				forms : [ formSave ],
				params : {},
				callback : [ curSeg.onLoad ]
			});
		},
		

		// 绑定数据
		onBindData : function(jsonObj, xhrArgs) {
			$("#siteId").val(jsonObj.data.siteId);
			$("#site_name").val(jsonObj.data.site_name);
			$("#short_name").val(jsonObj.data.short_name);
			$("#tpl_solution").val(jsonObj.data.tpl_solution);
			$("#domain").val(jsonObj.data.domain);
			$("#tpl_path").val(jsonObj.data.tpl_path);
			$("#static_path").val(jsonObj.data.static_path);
			$("#static_dir").val(jsonObj.data.static_dir);
			$("#zzjgDm").val(jsonObj.data.zzjgDm);
			//$("#is_recycle_on").val(jsonObj.data.is_recycle_on);
			$(":radio[name='is_recycle_on'][value='" + jsonObj.data.is_recycle_on + "']").prop("checked", "checked");
			$(":radio[name='is_root'][value='" + jsonObj.data.is_root + "']").prop("checked", "checked");
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
			case 0:
				curSeg.onBindData(jsonObj, xhrArgs);
				break;
			// 添加、更新以及状态更新操作返回标志
			case 1:
				alert(jsonObj.msg);
				curSeg.onQuery();
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