$(document).ready(function() {
    staticPage.onLoad();
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
var staticPage = (function() {
	// 私有属性
	var rylb = "", curSeg, tbList, formSearch = "formSearch", gridObj, winParam = {};
	// 私有方法
	var initLayout = function() {
		// 初始化页面UI
		tbList = $("#tbList");
    };
    //公有方法
    return {
        onLoad : function() {
			curSeg = staticPage;
			initLayout();
			rylb = "";
			formSearch_ = formSearch + "_";
			baseTools.setIdByName([ formSearch ]);
			curSeg.initChannel();
			// 删除组件释放内存
			$(window).unload(function() {
			});
		},
		//初始化
		initChannel:function(){
			baseTools.xhrAjax({
				url:"/static/v_channel.do",
	            params:{},
				callback : [ curSeg.pageFlowControl ]
			});
			
		},
        //栏目页静态化
		channelStatic:function() {
			var channelId = $("#channelId").val();
			baseTools.xhrAjax({
				url:"/static/o_content.do",
	            params:{channelId:channelId},
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
			case 1: // 首页静态化
				curSeg.channelStatic();
				break;
			case 2:// 修改操作
				break;
			case 3: // 授权
				break;
			case -1: // 删除操作
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
				alert(jsonObj.msg);
				break;
			case 1:
				$(jsonObj.data).each(function(i,d){
					$('#channelId').append('<option value="' + d.channelId + '">' + d.name + '</option>');
				})
				break;
			case -1:// 保存出错返回标志
			case -2:// 其它错误返回标志
				alert(jsonObj.msg);
				baseTools.hideMash();
				break;
			case -3:// 登录信息失效 请重新登陆
				alert(jsonObj.msg);
				baseTools.gotoLogin();
				break;
			default:
			}
		}
    };
})();