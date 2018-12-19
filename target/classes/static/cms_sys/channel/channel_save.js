//使用窗口组件加载时注释下面的代码
$(document).ready(function() {
	yhgl_save.onLoad();
});
/**
 * <ol>
 * <li>date:13-11-24</li>
 * <li>editor:李强</li>
 * <li>创建文档</li>
 * <li>新增、修改参数</li>
 * <li>功能：用户管理功能</li>
 * </ol>
 */
var yhgl_save = (function() {
	// 私有属性
	var curSeg, formSave = "formSave", formSave_, winObj, winParam;
	var isCzryDmEditAble = false;
	// 是否是添加
	var bAdd = true;
	// 私有方法
	var setVal = function(tagID, val) {
		baseTools.byId(formSave_ + tagID).value = val;
	};

	var initLayout = function() {
		// 初始化页面UI
		formSave_ = formSave + "_";
		baseTools.setIdByName([ formSave ]);
		winObj = frameElement.api;
		winParam = winObj.data;
		bAdd = winParam.other.msg == '添加';
		$("#" + formSave_ + "upperchannel").append('<option value ="xinwen">'+winParam.other.upperchannelname+'</option>')
		/*//填充栏目模板下拉列表框
		baseTools.xhrAjax({
			url : "/contenttype/"+winParam.other.type_id,
			type : "GET",
			callback : function(jsonObj, xhrArgs) {
				switch (parseInt(jsonObj.code)) {
				// 查询操作返回标志
				case 0:
					curSeg.onBindData(jsonObj, xhrArgs);
					break;
				// 添加、更新以及状态更新操作返回标志
				case 1:
					alert(jsonObj.msg);
					curSeg.onCloseWin();
					break;
				// 删除操作返回标志
				case 2:
					alert(jsonObj.msg);
					break;
				default:
				}
			}
		});
		
		//填充内容模板下拉列表框
		baseTools.xhrAjax({
			url : "/contenttype/"+winParam.other.type_id,
			type : "GET",
			callback : function(jsonObj, xhrArgs) {
				switch (parseInt(jsonObj.code)) {
				// 查询操作返回标志
				case 0:
					curSeg.onBindData(jsonObj, xhrArgs);
					break;
				// 添加、更新以及状态更新操作返回标志
				case 1:
					alert(jsonObj.msg);
					curSeg.onCloseWin();
					break;
				// 删除操作返回标志
				case 2:
					alert(jsonObj.msg);
					break;
				default:
				}
			}
		});*/
		
		baseTools.xhrAjax({
			url: "/content/queryContentTemplates",
			async: false,
			type: "GET",
			callback:[function(jsonObj){
				if(jsonObj){
					var opts = '';
					if(jsonObj.data!=null&&jsonObj.data!=undefined&&jsonObj.data.length>0){
						var contentTemplates = jsonObj.data.split(",");
						for(var i=0;i<contentTemplates.length;i=i+1){
							opts = opts + '<option value ="'+contentTemplates[i]+'">'+contentTemplates[i]+'</option>';
						}
					}	
					$("#formSave_tpl_content").append(opts);
					}
			}]
		});
		
		baseTools.xhrAjax({
			url: "/channel/queryChannelTemplates",
			async: false,
			type: "GET",
			callback:[function(jsonObj){
				if(jsonObj){
					var opts2 = '';
					if(jsonObj.data!=null&&jsonObj.data!=undefined&&jsonObj.data.length>0){
						var channelTemplates = jsonObj.data.split(",");
						for(var i=0;i<channelTemplates.length;i=i+1){
							opts2 = opts2 + '<option value ="'+channelTemplates[i]+'">'+channelTemplates[i]+'</option>';
						}
					}	
					$("#formSave_tpl_channel").append(opts2);
					}
			}]
		});
		
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
			curSeg = yhgl_save;
			initLayout();
			// 设置添加状态
			// baseTools.byId(formSave_ + "ZZJG_MC").focus();
//			if (winParam.other.CZRY_DM != '14100000000') {
//				baseTools.byId(formSave_ + "RYLB").disabled = "";
//			}
			if (!bAdd) {// 修改的时候进行查询
				curSeg.onQuery();
			} else {
				Validator.validate(baseTools.byId(formSave), 3);
			}

			// 删除组件释放内存
			$(window).unload(function() {
			});
		},
		// 查询数据
		onQuery : function() {
			baseTools.xhrAjax({
				url : "/channel/"+winParam.other.channel_id,
				type : "GET",
//				params : {
//					type_id : winParam.other.type_id
//				},
				callback : [ curSeg.pageFlowControl ]
			});
		},
		channelPathCheck : function() {
			baseTools.xhrAjax({
				url : "/channel/pathCheck/"+$("#formSave_channel_path").val(),
				type : "GET",
				callback : [ function(jsonObj, xhrArgs) {
					switch (parseInt(jsonObj.code)) {
					// 查询操作返回标志
					case 0:
						if(jsonObj.data!=""&&jsonObj.data!=null&&jsonObj.data!=undefined){
							alert("栏目目录重复,请重新填写!")
							return;
						}
						break;
					// 添加、更新以及状态更新操作返回标志
					case -1:
						alert(jsonObj.msg);
						curSeg.onCloseWin();
						break;
					default:
					}
				} ]
			});	
		},
		// 保存数据
		onSave : function() {
			var cflag = false;
			if (!Validator.validate(baseTools.byId(formSave))) {
				Validator.validate(baseTools.byId(formSave), 3);
				return;
			}
			var patrn = /^\d+$/;
			if (!$("#" + formSave_ + "priority").val().match(patrn)){
				alert("排列顺序不合法，请确认后重新输入！！！");
				return;
			}
			
			if (bAdd) {
			if($("#formSave_channel_path").val()!=""&&$("#formSave_channel_path").val()!=null&&$("#formSave_channel_path").val()!=undefined){
				$.ajax({
	                type: "GET",
	                dataType: "json",
	                url: "/channel/pathCheck/"+$("#formSave_channel_path").val(),
	                async:false,
	                success: function (jsonObj) {
	                	switch (parseInt(jsonObj.code)) {
						// 查询操作返回标志
						case 0:
							if(jsonObj.data!=""&&jsonObj.data!=null&&jsonObj.data!=undefined){
								alert("栏目目录重复,请重新填写!");
								cflag = true;
							}
							break;
						// 添加、更新以及状态更新操作返回标志
						case -1:
							alert(jsonObj.msg);
							curSeg.onCloseWin();
							break;
						default:
						}
	                },
	                error : function() {
	                    alert("请稍后重试！");
	                }
	            });
			 }
			}
			
			if(cflag){
				return;
			}
			
			var url = "/channel";
			
			var params = {parent_id : winParam.other.upperchannel};
			if (!bAdd) {
				params._method = "PUT";
				params.channel_id = winParam.other.channel_id;
			}
			baseTools.xhrAjax({
				url : url,
				forms : [ formSave ],
				params : params,
				callback : [ curSeg.pageFlowControl ]
			});
		},
		

		// 绑定数据
		onBindData : function(jsonObj, xhrArgs) {
			
//			$("#" + formSave_ + "CZRY_MC").attr("disabled", "true");
//			$("#" + formSave_ + "CZRY_DM").attr("disabled", "true");
			
			baseTools.bindFormData(formSave, jsonObj.data);
			if (jsonObj.data.is_blank==1)
				$("#" + formSave_ + "is_blank").attr("checked", "checked");
//			$("#" + formSave_ + "SKSBBH").val(winParam.other.SKSBBH);
//			$("#" + formSave_ + "KPR").val(winParam.other.KPR);
//			$("#" + formSave_ + "SKR").val(winParam.other.SKR);
//			$("#" + formSave_ + "FHR").val(winParam.other.FHR);
			if(winParam.other.leaf){
				$("#" + formSave_ + "channel_path").attr("readonly", "true");
				$("#" + formSave_ + "channel_name").attr("readonly", "true");
				$("#" + formSave_ + "content_path").attr("readonly", "true");
				$("#" + formSave_ + "title").attr("readonly", "true");
				$("#" + formSave_ + "keywords").attr("readonly", "true");
				$("#" + formSave_ + "description").attr("readonly", "true");
				$("#" + formSave_ + "priority").attr("readonly", "true");
				$("input[name='is_display']").attr("disabled", "disabled");
				$("#" + formSave_ + "is_blank").attr("onclick", "return false;");
				$("#" + formSave_ + "link").attr("readonly", "true");
			}
			Validator.validate(baseTools.byId(formSave), 3);
		},
		// 关闭窗口
		onCloseWin : function() {
			// 调用父窗口方法
//			winObj.opener.zzjggl.onQuery();
			winObj.opener.zzjggl.onQuery2();
			if(winParam.other.msg != '编辑'){
				winObj.opener.zzjggl.refreshTree();
			}
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
				curSeg.onCloseWin();
				break;
			// 删除操作返回标志
			case 2:
				alert(jsonObj.msg);
				break;
			case -1:// 其它错误返回标志
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