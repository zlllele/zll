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
	var curSeg, formSave = "formSave", formSave_, winObj, winParam, anum=2,cc=0,psnum=4,ctTemp="";
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
		$("#" + formSave_ + "channel_id").append('<option value ="'+winParam.other.upperchannel+'">'+winParam.other.upperchannelname+'</option>')
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
			url: "/contenttype/queryNames",
			async: false,
			type: "GET",
			callback:[function(jsonObj){
				if(jsonObj){
					var opts = '';
					if(jsonObj.data!=null&&jsonObj.data!=undefined&&jsonObj.data.typenames.length>0){
						var ctypes = jsonObj.data.typenames.split(",");
						for(var i=0;i<ctypes.length;i=i+3){
							opts = opts + '<option value ="'+ctypes[i]+'">'+ctypes[i+1]+'</option>';
							ctTemp = ctTemp+ctypes[i]+","+ctypes[i+2]+","
						}
						ctTemp = ctTemp.substring(0,ctTemp.length-1);
						ctTemp = ctTemp.split(",");
					}	
					opts = opts + '<option value ="" selected="selected">-请选择-</option>';
					$("#formSave_type_id").append(opts);
					}
			}]
		});
		
		var optselected = "";
		baseTools.xhrAjax({
			url: "/channel/"+winParam.other.upperchannel,
			type: "GET",
			callback:[function(jsonObj){
				if(jsonObj.data!=null&&jsonObj.data!=undefined){
					optselected = jsonObj.data.tpl_content;
					}
			}]
		});
		
		
		baseTools.xhrAjax({
			url: "/content/queryContentTemplates",
			type: "GET",
			callback:[function(jsonObj){
				if(jsonObj){
					var opts = '';
					if(jsonObj.data!=null&&jsonObj.data!=undefined&&jsonObj.data.length>0){
						var contentTemplates = jsonObj.data.split(",");
						for(var i=0;i<contentTemplates.length;i=i+1){
							if(contentTemplates[i]!=optselected){
								opts = opts + '<option value ="'+contentTemplates[i]+'">'+contentTemplates[i]+'</option>';
							}
							if(contentTemplates[i]==optselected){
								opts = opts + '<option selected="selected" value ="'+contentTemplates[i]+'">'+contentTemplates[i]+'</option>';
							}
						}	
					}	
					$("#formSave_tpl_content").append(opts);
					}
			}]
		});
		
		ue = UE.getEditor('container',{
			//编辑区宽和高
			initialFrameWidth:'620',
			initialFrameHeight:'320',
		    toolbars: [[
            'fullscreen', 'source', '|', 
            'undo', 'redo', '|',
            'bold', 'italic', 'underline', 'strikethrough', 'removeformat', '|', 
            'forecolor', 'backcolor', '|', 
            'insertorderedlist', 'insertunorderedlist', 'cleardoc', '|',
            'paragraph', 'fontfamily', 'fontsize', '|',
            'indent', '|',
            'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|',
            'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts','insertimage']]
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
				url : "/content/"+winParam.other.content_id,
				type : "GET",
				callback : [ curSeg.pageFlowControl ]
			});
		},
		link : function(check) {
			if(!check){
				$('#formSave_urlspan').html('');
			}else{
				$('#formSave_urlspan').html('</br> url:<input type="text" id="link" name="link" value="" validatorrules="Require" msg0="url不能为空" maxlength="255" style="width:250px"/>');
			}
			 
		},
		
		// 保存数据
		onSave : function() {
			if($("#formSave_title").val()==""){
				alert("请填写标题!");
				return;
			}
			if($("#link")!=null && $("#link")!=undefined){
				if($("#link").val()==""){
					alert("请填写url!");
					return;
				}
			}
//			if($("#formSave_release_date").val()==null||$("#formSave_release_date").val()==""||$("#formSave_release_date").val()==undefined){
//				alert("请填写发布日期!");
//				return;
//			}
			if($("#formSave_type_id").val()==""){
				alert("请选择内容类型!");
				return;
			}
			if($("#formSave_txt").val()==""){
				alert("请填写内容!");
				return;
			}
			
			
			ue = UE.getEditor('container');
			var zwHtml = ue.getContent();
			if(zwHtml.length==0){
				alert("请填写内容!");
				return false;
			}
			
			
			var allAttachments = "";
			var allpics = "";
			var allpicdes = "";
			$('input[type="file"]').each(function(){
				$(this).attr("disabled",true);
    		  });
			$('#attachment input[type="text"]').each(function(){
				allAttachments = allAttachments + $(this).val()+",";
    		  });
			allAttachments = allAttachments.substring(0,allAttachments.length-1);
			$("#formSave_aSring").val(allAttachments);
			$("#formSave_mPath").removeAttr("disabled");
			$("#formSave_mName").removeAttr("disabled");
			
			
			var contentTypeSel2 = $("#formSave_type_id").find("option:selected").val();
			var contentTypeHasPic2;
			for(var i=0;i<ctTemp.length;i=i+2){
				if(ctTemp[i]==contentTypeSel2){
					contentTypeHasPic2 = ctTemp[i+1];
					break;
				}  
			}	
				
		if(contentTypeHasPic2=="1"){
				$('#divpcs input[type="text"]').each(function(){
					allpics = allpics + $(this).val()+",";
	    		  });
				allpics = allpics.substring(0,allpics.length-1);
				$("#psSring").val(allpics);
				$('#divpcs textarea').each(function(){
					allpicdes = allpicdes + $(this).val()+"-?+@$_[]{}";
	    		  });
				allpicdes = allpicdes.substring(0,allpicdes.length-10);
				$("#psdesSring").val(allpicdes);
				$("#tPath").removeAttr("disabled");
				$("#tName").removeAttr("disabled");
			}
			var url = "/content";
			
			var params = {};
			if (!bAdd) {
//				params._method = "PUT";
				params.updateFlag = "true";
				params.content_id = winParam.other.content_id;
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
			delete jsonObj.data.channel_id;
			baseTools.bindFormData(formSave, jsonObj.data);
			Validator.validate(baseTools.byId(formSave), 3);
			if(jsonObj.data.link!=null&&jsonObj.data.link!=""&&jsonObj.data.link!=undefined){
				$("#formSave_weblink").attr("checked", "true");
				$('#formSave_urlspan').html('</br> url:<input type="text" id="link" name="link" value="" validatorrules="Require" msg0="url不能为空" maxlength="255" style="width:250px"/>');
				$("#link").val(jsonObj.data.link);
			}
			if(jsonObj.data.type_name!=null&&jsonObj.data.type_name!=""&&jsonObj.data.type_name!=undefined){
				$("#formSave_type_id").trigger("change", [jsonObj.data.type_name]);
			}
			if (jsonObj.data.is_recommend==1)
				$("#" + formSave_ + "is_recommend").attr("checked", "checked");
			if (jsonObj.data.status==0)
				$("#" + formSave_ + "status").attr("checked", "checked");
			if(jsonObj.data.attmentList!=null&&jsonObj.data.attmentList!=""&&jsonObj.data.attmentList!=undefined){
				for(var item in jsonObj.data.attmentList){
				    if(item==0){
				    	$("#formSave_aName1").val(jsonObj.data.attmentList[item]['file_name']);
				    	$("#formSave_aPath1").val(jsonObj.data.attmentList[item]['file_path']);
				    } 
				    if(item>0){
				    	curSeg.attachmentAdd();
				    	$("#aName"+(anum-1)).val(jsonObj.data.attmentList[item]['file_name']);
				    	$("#aPath"+(anum-1)).val(jsonObj.data.attmentList[item]['file_path']);
				    }
				}
			}
			if(jsonObj.data.media_path!=null&&jsonObj.data.media_path!=undefined&&jsonObj.data.media_path!=""&&
					jsonObj.data.media_type!=null&&jsonObj.data.media_type!=undefined&&jsonObj.data.media_type!=""){
				var mp = jsonObj.data.media_path;
				$("#formSave_mPath").val(mp);
				if(mp.indexOf("/")>=0){
					$("#formSave_mName").val(mp.substring(mp.lastIndexOf("/")+1));
				}
				if(mp.indexOf("\\")>=0){
					$("#formSave_mName").val(mp.substring(mp.lastIndexOf("\\")+1));
				}
				var mflag = true;
				$(document.getElementsByName("media_type")).each(function(){   
	 		    	if($(this).val().toLowerCase()==jsonObj.data.media_type){
	 		    		$(this).attr("checked",true);
	 		    		mflag = false;
	 		    	}
	 		      });
				if(mflag){
					$("input[name='media_type'][value='OTHERS']").attr("checked",true);
				}
			}
			if(jsonObj.data.image_path!=null&&jsonObj.data.image_path!=""&&jsonObj.data.image_path!=undefined){
				var ip = jsonObj.data.image_path;
				$("#tPath").val(ip);
				if(ip.indexOf("/")>=0){
					$("#tName").val(ip.substring(ip.lastIndexOf("/")+1));
				}
				if(ip.indexOf("\\")>=0){
					$("#tName").val(ip.substring(ip.lastIndexOf("\\")+1));
				}
			}
			if(jsonObj.data.picList!=null&&jsonObj.data.picList!=""&&jsonObj.data.picList!=undefined){
				var nm=1;
				for(var item in jsonObj.data.picList){
					if(item>2){
				    	curSeg.picsAdd();	
				    }
					var ips = jsonObj.data.picList[item]['img_path'];
					var ins = "";	
					if(ips.indexOf("/")>=0){
						ins = ips.substring(ips.lastIndexOf("/")+1);
					}
					if(ips.indexOf("\\")>=0){
						ins = ips.substring(ips.lastIndexOf("\\")+1);
					}
					$("#psName"+nm).val(ins);
			    	$("#psPath"+nm).val(ips);
			    	$("#psdescription"+nm).val(jsonObj.data.picList[item]['description']);
			    	nm=nm+1;
				}
			}
			
			 ue.ready(function() {
				var txt = jsonObj.data.txt;
				ue.setContent(txt);
			});
			
		},
		// 关闭窗口
		checkMedia : function(mname) {
			alert(cc+"  "+mname);
			cc+=1;
			
		},
		onCloseWin : function() {
			// 调用父窗口方法
			winObj.opener.zzjggl.onQuery();
//			winObj.opener.zzjggl.onQuery2();
//			winObj.opener.zzjggl.refreshTree();
			
			setTimeout(function() {
				winObj.close();
			},100)
		},
		ajaxFileUpload : function(id,name,path) {
            var uploadUrl = id=="formSave_mupload"? '/contentupload/uploadfile2.do': id=="tupload"? '/contentupload/uploadfile3.do': '/contentupload/uploadfile.do';
			var of = $("#"+id);
			//检查是否选择了图片
			if(of.val()=="") {
				alert("请选择附件");
				return;
			}
			//将file移动至上传表单
			$("#fileContent").empty();
			$("#fileContent").append(of);
			
			var idloc = id+"_loc";
			if(id=='formSave_upload'){
				$("#"+idloc).append('<input type="file" id="formSave_upload" name="upload" />')
			}
			if(id.substring(0,1)=='a'){
				$("#"+idloc).append('<input type="file" id="'+id+'" name="upload" />')
			}
			if(id.substring(0,2)=='ps'){
				$("#"+idloc).append('<input type="file" id="'+id+'" name="upload" style="width:175px;"/>')
			}
			if(id=='formSave_mupload'){
				$("#"+idloc).append('<input type="file" id="formSave_mupload" name="mupload" />')
			}
			if(id=='tupload'){
				$("#"+idloc).append('<input type="file" id="tupload" name="tupload" />')
			}
			
			$("#fileContent").append($('<input type="hidden" name="name"/>').val(name));
			$("#fileContent").append($('<input type="hidden" name="path"/>').val(path));
			$("#uploadTempForm").attr("action", uploadUrl);
			$("#uploadTempForm").submit();
				
		},
		attachmentAdd : function() {
			
			$("#attachment").append('<tr id="tr'+anum+'"><td><a href="javascript:yhgl_save.attachmentDel(\'tr'+anum+'\');">'+'删除'+'</a></td>'+
'<td> <input type="text" name="aName'+anum+'" id="aName'+anum+'" disabled="disabled" /></td><td><input type="text" name="aPath'+anum+'" id="aPath'+anum+'" disabled="disabled" /></td>'+
						'<td><span id="a'+anum+'_loc"><input  type="file" id="a'+anum +'" name="upload" /></span>'+
'<input type="button" value="上传" onclick="return yhgl_save.ajaxFileUpload(\'a'+anum+'\',\'aName'+anum+'\',\'aPath'+anum+'\');"/></td></tr>');
			anum+=1;
		},
		picsAdd : function() {
			$("#divpcs").append('<div id="divpcs'+psnum+'" style="float:left"><input type="hidden" name="psName'+psnum+'" id="psName'+psnum+'" disabled="disabled"/>'+
					'<input type="text" name="psPath'+psnum+'" id="psPath'+psnum+'" disabled="disabled"/>'+
					'<a href="javascript:yhgl_save.attachmentDel(\'divpcs'+ psnum +'\')" >删除</a></br>'+
					'<span id="psupload'+psnum+'_loc"><input  type="file" id="psupload'+psnum+'" name="upload" style="width:175px"/></span>'+
	'<input type="button" value="上传" onclick="return yhgl_save.ajaxFileUpload(\'psupload'+psnum+'\',\'psName'+psnum+'\',\'psPath'+psnum+'\');"/></br>'+
					'<textarea id="psdescription'+psnum+'" name="psdescription'+psnum+'" rows="3" style="width:205px" onfocus="yhgl_save.checkPicDes(this);"></textarea></div>');
			psnum+=1;
		},
		attachmentDel : function(aid) {
			$("#"+aid).remove();
		},
		deltName : function() {
			$("#tName").val("");
			$("#tPath").val("");
		},
		delmName : function() {
			$("#formSave_mName").val("");
			$("#formSave_mPath").val("");
			$(document.getElementsByName("media_type")).each(function(){   
	 		    	$(this).attr("checked",false);
	 		  });
		},
		checkPicDes : function(picDes) {
			if($(picDes).parent().children()[0].value==""||$(picDes).parent().children()[0].value==null||$(picDes).parent().children()[0].value==undefined){
				$(picDes).attr("readonly","readonly");
			}
		},
		
		TypepicAndPics : function(typevalue) {
		var contentTypeSel = $("#formSave_type_id").find("option:selected").val();
		var contentTypeHasPic;
		for(var i=0;i<ctTemp.length;i=i+2){
			if(ctTemp[i]==contentTypeSel){
				contentTypeHasPic = ctTemp[i+1];
				break;
			}  
		}	
			
	if(contentTypeHasPic=="1"){
		$("#trtype").remove();
		$("#trpcs").remove();		
		$("#trfile").before('<tr id="trtype"><td class="tdclass_view">类型图：</td><td class="tdclass_edit"  colspan="3">'+
	'<input type="text" name="tPath" id="tPath" disabled="disabled" style="width:240px"/><input type="hidden" name="tName" id="tName" disabled="disabled"/>'+
	'<span id="tupload_loc"><input type="file" id="tupload" name="tupload" /></span><input  type="button"  value="上传" onclick="return yhgl_save.ajaxFileUpload(\'tupload\',\'tName\',\'tPath\');"/> 上传文件100M以内  <input type="button" value="删除" onclick="yhgl_save.deltName();"/></td></tr>');
				$("#trcontent").after('<tr id="trpcs">'+
						'<td class="tdclass_view"  style="width:40px">图片集：</td>'+
						'<td class="tdclass_edit"  colspan="3">'+
							'<table id="pics">'+
							'<tr>'+
								'<td><input type="button" value="增加一张图片" onclick="yhgl_save.picsAdd();"/></td>'+
								'<td>注意：上传文件100M以内</td><input type="hidden" name="psSring" id="psSring" /><input type="hidden" name="psdesSring" id="psdesSring" />'+
							'</tr> </table>'+
							'<div id="divpcs">'+
								'<div id="divpcs1" style="float:left"><input type="hidden" name="psName1" id="psName1" disabled="disabled"/>'+
								'<input type="text" name="psPath1" id="psPath1" disabled="disabled"/>'+
								'<a href="javascript:yhgl_save.attachmentDel(\'divpcs1\')" >删除</a></br>'+
								'<span id="psupload1_loc"><input  type="file" id="psupload1" name="upload" style="width:175px"/></span>'+
								'<input  type="button"  value="上传" onclick="return yhgl_save.ajaxFileUpload(\'psupload1\',\'psName1\',\'psPath1\');"/></br>'+
								'<textarea id="psdescription1" name="psdescription1" rows="3" style="width:205px" onfocus="yhgl_save.checkPicDes(this);"></textarea>'+
							    '</div>'+
							    '<div id="divpcs2" style="float:left"><input type="hidden" name="psName2" id="psName2" disabled="disabled"/>'+
								'<input type="text" name="psPath2" id="psPath2" disabled="disabled"/>'+
								'<a href="javascript:yhgl_save.attachmentDel(\'divpcs2\')" >删除</a></br>'+
								'<span id="psupload2_loc"><input  type="file" id="psupload2" name="upload" style="width:175px"/></span>'+
								'<input  type="button"  value="上传" onclick="return yhgl_save.ajaxFileUpload(\'psupload2\',\'psName2\',\'psPath2\');"/></br>'+
								'<textarea id="psdescription2" name="psdescription2" rows="3" style="width:205px" onfocus="yhgl_save.checkPicDes(this);"></textarea>'+
							    '</div>'+
							    '<div id="divpcs3" style="float:left"><input type="hidden" name="psName3" id="psName3" disabled="disabled"/>'+
								'<input type="text" name="psPath3" id="psPath3" disabled="disabled"/>'+
								'<a href="javascript:yhgl_save.attachmentDel(\'divpcs3\')" >删除</a></br>'+
								'<span id="psupload3_loc"><input  type="file" id="psupload3" name="upload" style="width:175px"/></span>'+
								'<input  type="button"  value="上传" onclick="return yhgl_save.ajaxFileUpload(\'psupload3\',\'psName3\',\'psPath3\');"/></br>'+
								'<textarea id="psdescription3" name="psdescription3" rows="3" style="width:205px" onfocus="yhgl_save.checkPicDes(this);"></textarea>'+
							    '</div>'+
							'</div>'+
						'</td>'+
					'</tr>');
			}else{
				$("#trtype").remove();
				$("#trpcs").remove();
			}
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
			case -1:
				alert(jsonObj.msg);
				break;
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

Date.prototype.format = function(format) {
    var date = {
           "M+": this.getMonth() + 1,
           "d+": this.getDate(),
           "h+": this.getHours(),
           "m+": this.getMinutes(),
           "s+": this.getSeconds(),
           "q+": Math.floor((this.getMonth() + 3) / 3),
           "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
           format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
           if (new RegExp("(" + k + ")").test(format)) {
                  format = format.replace(RegExp.$1, RegExp.$1.length == 1
                         ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
           }
    }
    return format;
}