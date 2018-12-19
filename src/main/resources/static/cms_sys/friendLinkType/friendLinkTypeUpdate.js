//使用窗口组件加载时注释下面的代码
$(document).ready(function() {
	debugger;
	friendLinkTypeUpdate.onLoad();
});
var friendLinkTypeUpdate = (function() {
	// 私有属性
	var curSeg, formUpdate = "formUpdate", winObj, winParam;
	
	var initLayout = function() {
		// 初始化页面UI
		winObj = frameElement.api;
		winParam = winObj.data;

		winObj.button({
			name : '保存',
			focus : true,
			callback : function() {
				curSeg.onUpdate();
				return false;
			}
			}, {
				name : '关闭'
			});
	};

	// 公有方法
	return {
		onLoad : function() {
			curSeg = friendLinkTypeUpdate;
			initLayout();
			baseTools.setIdByName([ formUpdate ]);
			// 删除组件释放内存
			$(window).unload(function() {});
			$("INPUT[name='update_site_name']").val(winParam.other.site_name);
			$("INPUT[name='update_friend_link_type_id']").val(winParam.other.friend_link_type_id);
			$("INPUT[name='update_typeName']").val(winParam.other.name);
			$("INPUT[name='update_priority']").val(winParam.other.priority);
		},
		// 保存数据
		onUpdate : function() {
			if (!Validator.validate(baseTools.byId(formUpdate)))
				return;
			baseTools.xhrAjax({
				url : '/friendLinkType/update.do',
				forms : [ formUpdate ],
				params : {
					friend_link_type_id : $("INPUT[name='update_friend_link_type_id']").val(),
					name : $("INPUT[name='update_typeName']").val(),
					priority : $("INPUT[name='update_priority']").val(),
				},
				callback : [ curSeg.pageFlowControl ]
			});
		},
		// 关闭窗口
		onCloseWin : function() {
			// 调用父窗口方法
			winObj.opener.index.onQuery();
			setTimeout(function() {
				winObj.close();
			},100)
			
		},
		pageFlowControl : function(jsonObj, xhrArgs) {
			switch (parseInt(jsonObj.code)) {
			// 查询操作返回标志
			case 0:
				curSeg.onCloseWin();
				break;
			// 添加、更新以及状态更新操作返回标志
			case 1:
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
			case -3:// cookie 失效请重新登录
				alert(jsonObj.msg);
				baseTools.gotoLogin();
				break;
			default:
			}
		}
	};
})();