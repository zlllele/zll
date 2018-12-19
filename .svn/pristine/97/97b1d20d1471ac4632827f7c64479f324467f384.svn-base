var fileUrl_pre="";
$(document).ready(function() {
	friendLinkUpdate.onLoad();
});
var friendLinkUpdate = (function() {
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
				curSeg.onUpdate();
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
			curSeg = friendLinkUpdate;
			initLayout();
			baseTools.setIdByName([ formSave ]);
			curSeg.showFriendLinkType();
			curSeg.showFriendLink();
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
			$("select[name='update_type_id']").append(seleteOption);
		},
		showFriendLink:function(){
			var data=winParam.other.friend_link;
			$("input[name='update_friend_link_id']").val(data.friend_link_id);
			$("input[name='update_name']").val(data.name);
			$("input[name='update_domain']").val(data.domain);
			$("select[name='update_type_id']").val(data.type_id);
			$("input[name='update_email']").val(data.email);
			$("input[name='update_fileUrl_old']").val(data.logo_path);
			var logo_path_complete=data.logo_path_complete;
			if(logo_path_complete!=null&&logo_path_complete!=""){
				$("img[name='update_preImg']").attr("src",data.logo_path_complete);
			}
			$("textarea[name='update_description']").val(data.description);
			$("input[name='update_priority']").val(data.priority);
			$("input[name='update_views']").val(data.views);
			var is_display=data.is_display;
			if(is_display==0){
				$("input[flag='update_is_display0']").attr("checked","checked");
			}else{
				$("input[flag='update_is_display1']").attr("checked","checked");
			}
		},
		// 保存数据
		onUpdate : function() {
			if (!Validator.validate(baseTools.byId(formSave)))
				return;
			baseTools.xhrAjax({
				url : '/friendLink/update.do',
				forms : [ formSave ],
				params : {
					friend_link_id : $("input[name='update_friend_link_id']").val(),
					name : $("input[name='update_name']").val(),
					domain : $("input[name='update_domain']").val(),
					type_id : $("select[name='update_type_id']").val(),
					email : $("input[name='update_email']").val(),
					fileUrl : $("input[name='update_fileUrl']").val(),
					fileUrl_old : $("input[name='update_fileUrl_old']").val(),
					description : $("textarea[name='update_description']").val(),
					priority : $("input[name='update_priority']").val(),
					views : $("input[name='update_views']").val(),
					is_display : $("input[name='update_is_display']:checked").val()
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
			$("#uploadfileUrl_bak").val($("input[name='update_fileUrl_bak']").val());
			
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
                	$("img[name='update_preImg']").attr("src",result.fileUrl);
        			$("input[name='update_fileUrl']").val(result.saveUrl);
        			$("input[name='update_fileUrl_bak']").val(result.saveUrl);
                },
                error : function() {
                    alert("请稍后重试！");
                }
            });
		},
		onDeleteFile:function(){
			var fileUrl=$("input[name='update_fileUrl']").val();
			var fileUrl_old=$("input[name='update_fileUrl_old']").val();
			if(fileUrl!=fileUrl_old){
				baseTools.xhrAjax({
					url : "/friendLink/deleteFile.do",
					params : {fileUrl:fileUrl},
					callback : [ curSeg.voidBack ]
				});
			}
		},
		voidBack:function(jsonObj, xhrArgs){
			curSeg.onCloseWin();
		}
	};
})();
