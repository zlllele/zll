//使用窗口组件加载时注释下面的代码
$(document).ready(function() {
	friendLinkAdd.onLoad();
});
var friendLinkAdd = (function() {
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
				name : '关闭',
				callback : function() {
					curSeg.onDeleteFile();
					return false;
				}
			});
	};

	// 公有方法
	return {
		onLoad : function() {
			curSeg = friendLinkAdd;
			initLayout();
			baseTools.setIdByName([ formSave ]);
			curSeg.showFriendLinkType();
			// 删除组件释放内存
			$(window).unload(function() {});
		},
		showFriendLinkType:function(){
			var datas=winParam.other.friendLinkType;
			var seleteOption="";
			for(var i=0;i<datas.length;i++){
				var data=datas[i];
				var friend_link_type_id=data.friend_link_type_id;
				var name=data.name;
				seleteOption+="<option value=\""+friend_link_type_id+"\">"+name+"</option>";
			}
			$("select[name='add_type_id']").append(seleteOption);
		},
		// 保存数据
		onSave : function() {
			if (!Validator.validate(baseTools.byId(formSave)))
				return;
			baseTools.xhrAjax({
				url : '/friendLink/add.do',
				forms : [ formSave ],
				params : {
					name : $("input[name='add_name']").val(),
					domain : $("input[name='add_domain']").val(),
					type_id : $("select[name='add_type_id']").val(),
					email : $("input[name='add_email']").val(),
					fileUrl : $("input[name='add_fileUrl']").val(),
					description : $("textarea[name='add_description']").val(),
					priority : $("input[name='add_priority']").val(),
					views : $("input[name='add_views']").val(),
					is_display : $("input[name='add_is_display']:checked").val()
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
		},
		clickFile:function(){
			$("input[name='uploadFile1']").click();
		},
		upload:function(n){
			var of = $("input[name='uploadFile"+1+"']");
			//检查是否选择了图片
			if(of.val()=="") {
				alert("请先选择图片");
				return;
			}
			//将file移动至上传表单
			$("#fileContent").empty();
			$("#fileContent").append(of);
			//复制一个file放至原处
			$("span[name='ufc"+n+"']").append(of.clone().attr("value",""));
			//修改属性
			$("input[name='uploadFileText"+n+"']").attr("value","");
			of.attr("id","");
			of.attr("name","uploadFile");
			$("#uploadfileUrl_bak").val($("input[name='add_fileUrl_bak']").val());

			var url="/friendLink/uploadFriendLinkLOGO.do";
			var data = new FormData($('#uploadForm')[0]); 
			$.ajax({
            //几个参数需要注意一下
                type: "POST",
                dataType: "json",
                url: url ,
                data: data,
                processData : false,
                contentType : false,
                async:false,
                success: function (result) {
                	$("img[name='add_preImg']").attr("src",result.fileUrl);
        			$("input[name='add_fileUrl']").val(result.saveUrl);
        			$("input[name='add_fileUrl_bak']").val(result.saveUrl);
                },
                error : function() {
                    alert("请稍后重试！");
                }
            });
		},
		onDeleteFile:function(){
			var fileUrl=$("img[name='add_preImg']").attr("src");
			var saveUrl=$("input[name='add_fileUrl']").val();
			if(fileUrl!=null&&fileUrl!=""){
				baseTools.xhrAjax({
					url : "/friendLink/deleteFile.do",
					params : {fileUrl:saveUrl},
					callback : [ curSeg.voidBack ]
				});
			}
		},
		voidBack:function(jsonObj, xhrArgs){
			curSeg.onCloseWin();
		}
	};
})();
