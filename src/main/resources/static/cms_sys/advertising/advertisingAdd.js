//使用窗口组件加载时注释下面的代码
$(document).ready(function() {
	advertisingAdd.onLoad();
});
var advertisingAdd = (function() {
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
			debugger;
			curSeg = advertisingAdd;
			initLayout();
			baseTools.setIdByName([ formSave ]);
			// 删除组件释放内存
			$(window).unload(function() {});
		},
		changeAdspace_id:function(flag){
			if(flag=="0"){
				$("label[name='content_pic']").show();
				$("label[name='content_text']").hide();
			}else{
				$("label[name='content_pic']").hide();
				$("label[name='content_text']").show();
			}
		},
		// 保存数据
		onSave : function() {
			debugger;
			var adspace_id=$("input[name='add_adspace_id']:checked").val();
			if(adspace_id=="0"){
				//图片，把文字的验证去掉
				$("input[name='add_ad_info_text'],input[name='add_ad_url_text'],input[name='add_ad_color'],input[name='add_ad_font']").removeAttr("validatorrules");
			}else{
				//文字，把图片的验证去掉
				$("input[name='add_fileUrl'],input[name='add_ad_img_width'],input[name='add_ad_img_height'],input[name='add_ad_url_pic'],input[name='add_ad_info_pic']").removeAttr("validatorrules");
			}
			baseTools.setIdByName([ formSave ]);
			if (!Validator.validate(baseTools.byId(formSave))){
				if(adspace_id=="0"){
					$("input[name='add_ad_info_text'],input[name='add_ad_url_text'],input[name='add_ad_color'],input[name='add_ad_font']").attr("validatorrules","Require");
				}else{
					$("input[name='add_fileUrl'],input[name='add_ad_img_width'],input[name='add_ad_img_height'],input[name='add_ad_url_pic'],input[name='add_ad_info_pic']").attr("validatorrules","Require");
				}
				baseTools.setIdByName([ formSave ]);
				return false;
			}
			var params={
					name : $("input[name='add_name']").val(),
					category : $("select[name='add_category']").val(),
					adspace_id : adspace_id,
					ad_weight : $("input[name='add_ad_weight']").val(),
					ad_blank : $("input[name='add_ad_blank']:checked").val(),
					click_count : $("input[name='add_click_count']").val(),
					is_enabled : $("input[name='add_is_enabled']:checked").val()
				};
			if(adspace_id=="0"){
				params["fileUrl"]=$("input[name='add_fileUrl']").val();
				params["ad_img_width"]=$("input[name='add_ad_img_width']").val();
				params["ad_img_height"]= $("input[name='add_ad_img_height']").val();
				params["ad_url"]=$("input[name='add_ad_url_pic']").val();
				params["ad_info"]=$("input[name='add_ad_info_pic']").val();
			}else{
				params["ad_info"]=$("input[name='add_ad_info_text']").val();
				params["ad_url"]=$("input[name='add_ad_url_text']").val();
				params["ad_color"]=$("input[name='add_ad_color']").val();
				params["ad_font"]=$("input[name='add_ad_font']").val();
				
			}
			baseTools.xhrAjax({
				url : '/advertising/add.do',
				forms : [ formSave ],
				params : params,
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
                	$("input[name='fileName']").val(result.saveUrl);
        			$("input[name='add_fileUrl']").val(result.saveUrl);
        			$("input[name='add_fileUrl_bak']").val(result.saveUrl);
                },
                error : function() {
                    alert("请稍后重试！");
                }
            });
		},
		onDeleteFile:function(){
			var fileUrl=$("input[name='fileName']").val();
			if(fileUrl!=null&&fileUrl!=""){
				baseTools.xhrAjax({
					url : "/friendLink/deleteFile.do",
					params : {fileUrl:fileUrl},
					callback : [ curSeg.voidBack ]
				});
			}
			curSeg.onCloseWin();
		},
		voidBack:function(jsonObj, xhrArgs){
			curSeg.onCloseWin();
		}
	};
})();
