var fileUrl_pre="";
$(document).ready(function() {
	advertisingUpdate.onLoad();
});
var advertisingUpdate = (function() {
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
			curSeg = advertisingUpdate;
			initLayout();
			baseTools.setIdByName([ formSave ]);
			curSeg.showAdvertising();
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
		showAdvertising:function(){
			var data=winParam.other.advertising;
			$("input[name='update_advertising_id']").val(data.advertising_id);
			$("input[name='update_name']").val(data.name);
			if(data.category==true){
				$("select[name='update_category']").val("1");
			}else{
				$("select[name='update_category']").val("0");
			}
			$("input[name='update_ad_weight']").val(data.ad_weight);
			var adspace_id=data.adspace_id;
			if(adspace_id=="0"){
				$("input[flag='update_adspace_id0']").attr("checked","checked");
				$("input[name='update_fileName']").val(data.ad_img_url);
				$("input[name='update_fileName_old']").val(data.ad_img_url);
				$("input[name='update_ad_img_width']").val(data.ad_img_width);
				$("input[name='update_ad_img_height']").val(data.ad_img_height);
				$("input[name='update_ad_url_pic']").val(data.ad_url);
				$("input[name='update_ad_info_pic']").val(data.ad_info);
				$("label[name='content_pic']").show();
				$("label[name='content_text']").hide();
			}else{
				$("input[flag='update_adspace_id1']").attr("checked","checked");
				$("input[name='update_ad_info_text']").val(data.ad_info);
				$("input[name='update_ad_url_text']").val(data.ad_url);
				$("input[name='update_ad_color']").val(data.ad_color);
				$("input[name='update_ad_font']").val(data.ad_font);
				$("label[name='content_pic']").hide();
				$("label[name='content_text']").show();
			}
			var ad_blank=data.ad_blank;
			if(ad_blank=="0"){
				$("input[flag='update_ad_blank0']").attr("checked","checked");
			}else{
				$("input[flag='update_ad_blank1']").attr("checked","checked");
			}
			$("input[name='update_click_count']").val(data.click_count);
			var is_enabled=data.is_enabled;
			if(is_enabled=="0"){
				$("input[flag='update_is_enabled0']").attr("checked","checked");
			}else{
				$("input[flag='update_is_enabled1']").attr("checked","checked");
			}
		},
		// 保存数据
		onUpdate : function() {
			var adspace_id=$("input[name='update_adspace_id']:checked").val();
			if(adspace_id=="0"){
				//图片，把文字的验证去掉
				$("input[name='update_ad_info_text'],input[name='update_ad_url_text'],input[name='update_ad_color'],input[name='update_ad_font']").removeAttr("validatorrules");
			}else{
				//文字，把图片的验证去掉
				$("input[name='update_fileUrl'],input[name='update_ad_img_width'],input[name='update_ad_img_height'],input[name='update_ad_url_pic'],input[name='update_ad_info_pic']").removeAttr("validatorrules");
			}
			baseTools.setIdByName([ formSave ]);
			if (!Validator.validate(baseTools.byId(formSave))){
				if(adspace_id=="0"){
					$("input[name='update_ad_info_text'],input[name='update_ad_url_text'],input[name='update_ad_color'],input[name='update_ad_font']").attr("validatorrules","Require");
				}else{
					$("input[name='update_fileUrl'],input[name='update_ad_img_width'],input[name='update_ad_img_height'],input[name='update_ad_url_pic'],input[name='update_ad_info_pic']").attr("validatorrules","Require");
				}
				baseTools.setIdByName([ formSave ]);
				return false;
			}
			var params={
					advertising_id : $("input[name='update_advertising_id']").val(),
					name : $("input[name='update_name']").val(),
					category : $("select[name='update_category']").val(),
					adspace_id : adspace_id,
					ad_weight : $("input[name='update_ad_weight']").val(),
					ad_blank : $("input[name='update_ad_blank']:checked").val(),
					click_count : $("input[name='update_click_count']").val(),
					is_enabled : $("input[name='update_is_enabled']:checked").val()
				};
			if(adspace_id=="0"){
				params["fileUrl"]=$("input[name='update_fileName']").val();
				params["fileUrl_old"]=$("input[name='update_fileUrl_old']").val();
				params["ad_img_width"]=$("input[name='update_ad_img_width']").val();
				params["ad_img_height"]= $("input[name='update_ad_img_height']").val();
				params["ad_url"]=$("input[name='update_ad_url_pic']").val();
				params["ad_info"]=$("input[name='update_ad_info_pic']").val();
			}else{
				params["ad_info"]=$("input[name='update_ad_info_text']").val();
				params["ad_url"]=$("input[name='update_ad_url_text']").val();
				params["ad_color"]=$("input[name='update_ad_color']").val();
				params["ad_font"]=$("input[name='update_ad_font']").val();
			}
			baseTools.xhrAjax({
				url : '/advertising/update.do',
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
                	$("input[name='update_fileName']").val(result.saveUrl);
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
			curSeg.onCloseWin();
		},
		voidBack:function(jsonObj, xhrArgs){
			curSeg.onCloseWin();
		}
	};
})();
