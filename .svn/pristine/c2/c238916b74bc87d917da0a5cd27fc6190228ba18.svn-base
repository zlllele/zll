//使用窗口组件加载时注释下面的代码
$(document).ready(function() {
	friendLinkTypeAdd.onLoad();
});
var friendLinkTypeAdd = (function() {
	// 私有属性
	var curSeg, formSave = "formSave", winObj, winParam;
	
	var initLayout = function() {
		// 初始化页面UI
		winObj = frameElement.api;
		winParam = winObj.data;

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
	};

	// 公有方法
	return {
		onLoad : function() {
			curSeg = friendLinkTypeAdd;
			initLayout();
			baseTools.setIdByName([ formSave ]);
			// 删除组件释放内存
			$(window).unload(function() {});
		},
		// 保存数据
		onSave : function() {
			if (!Validator.validate(baseTools.byId(formSave)))
				return;
			baseTools.xhrAjax({
				url : '/friendLinkType/add.do',
				forms : [ formSave ],
				params : {
					site_id : $("SELECT[name='site_name']").val(),
					name : $("INPUT[name='typeName']").val(),
					priority : $("INPUT[name='updatePriority']").val(),
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