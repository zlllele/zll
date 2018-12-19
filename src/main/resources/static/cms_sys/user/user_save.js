//使用窗口组件加载时注释下面的代码
$(document).ready(function() {
	addList.onLoad();
});

/**
 * <ol>
 * <li>date:13-11-24</li>
 * <li>editor:李强</li>
 * <li>创建文档</li>
 * <li>新增、修改参数</li>
 * <li>功能：角色添加、修改</li>
 * </ol>
 */
var addList = (function() {
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
			curSeg = addList;
			initLayout();
			baseTools.setIdByName([ formSave ]);

			Validator.validate(baseTools.byId(formSave), 3);
			// 删除组件释放内存
			$(window).unload(function() {});
			$("INPUT[name='LRRQ']").val(winParam.other.DQRQ);
		},
		// 保存数据
		onSave : function() {
			if (!Validator.validate(baseTools.byId(formSave)))
				return;
			baseTools.xhrAjax({
				url : '/user/o_save.do',
				forms : [ formSave ],
				params : {
					userName : $("INPUT[name='USER_NAME']").val(),
				},
				callback : [ curSeg.pageFlowControl ]
			});
		},
		// 关闭窗口
		onCloseWin : function() {
			// 调用父窗口方法
			winObj.opener.userList.onQuery();
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