$(function(){
	//导航菜单
	$("#navlist").slide({type:"menu",titCell:".nli", targetCell:".sub", effect:"slideDown", delayTime:0 ,triggerTime:0,returnDefault:false,titOnClassName:"cli"});
	//焦点图
	$(".focusBox").slide({ titCell:".num li", mainCell:".pic",effect:"fold", autoPlay:true,trigger:"click",
	startFun:function(i){
	jQuery(".focusBox .txt li").eq(i).animate({"bottom":0}).siblings().animate({"bottom":-36});
	}
	});
	//首页推荐新闻
	$(".con").slide({ mainCell:".tabcontent",titCell:".tab_menu dt", targetCell:".more a",trigger:"mouseover", effect:"fold",titOnClassName:"cli"});
	//首页人事信息——规章制度
	$(".rsxx_gzzd").slide({ mainCell:".tabcontent1",titCell:".tab_menu dt", targetCell:".more a",trigger:"mouseover", effect:"fold",titOnClassName:"cli"});
	//首页税收收入——税收法规
	$(".sssr_ssfg").slide({ mainCell:".tabcontent1",titCell:".tab_menu dt", targetCell:".more a",trigger:"mouseover", effect:"fold",titOnClassName:"cli"});
	//信息公开页--机构设置 tab
	$(".jgzs_box").slide({ mainCell:".jgsz_content",titCell:".tab_menu dt", targetCell:".more a",trigger:"mouseover", effect:"fold",titOnClassName:"cli"});
	//信息公开页--新闻列表tab
	$(".gzzd_shfg").slide({ mainCell:".gzzd_shfg_con",titCell:".tab_menu dt", targetCell:".more a",trigger:"mouseover", effect:"fold",titOnClassName:"cli"});
	//国税动态页--国税简报_工作通报
	$(".gsjb_gztb").slide({ mainCell:".gsjb_gztb_con",titCell:".tab_menu dt", targetCell:".more a",trigger:"mouseover", effect:"fold",titOnClassName:"cli"});
	
	
	//视频播报放上效果
	$(".vedio_list_page").find("a").mouseover(function(){
		$(this).find(".pos_bf").show();
		}).mouseout(function(){
			$(this).find(".pos_bf").hide();
			});
        //业务办公
        $(".yewu_bg a").click(function(){
           $("#ywbg").layerModel({
					title:"业务办公",
					locked :true,
					drag : false,
					blurClose : false,
					bgColor:'#000000',
					staySame:true
				});

        });
	//通讯录
	$(".txl_bg a").click(function(){
		if(user != null && user != ""){
			$("#txl_tc").layerModel({
					title:"通讯录",
					locked :true,
					drag : false,
					blurClose : false,
					bgColor:'#000000',
					staySame:true
				});
		}else{
			alert("请先登录！");
		}
	});		
	$(".bangong_bg a").click(function(){
			$(".zygn_box").layerModel({
							locked :true,
							drag : false,
							blurClose : false,
							bgColor:'#000000',
							staySame:true
							});
			});



 //修改密码
        $("#xgmm1").click(function(){
    		if(user != null && user != ""){
    			$("#xgmm2").layerModel({
    					title:"修改密码",
    					locked :true,
    					drag : false,
    					blurClose : false,
    					bgColor:'#000000',
    					staySame:true
    					
    				});
    		}
    	});
        $("#submit_close").click(function(){
        	alert("1")
        	$("#xgmm").layerModel({
        		timer:'5000'
        	});
        	$("#xgmm").close();
        	
        });

			
//我的短信
	$(".email_bg a").click(function(){
		if(user != null && user != ""){
			$(".wddx_box").layerModel({
					title:"我的短信",
					locked :true,
					drag : false,
					blurClose : false,
					bgColor:'#000000',
					staySame:true
				});
		}else{
			alert("请先登录！");
		}
	});


	$(".layerModel_closeBtn").click(function(){
		$(this).close();
		});
	
	$("#gjjs").click(function(){
		$("#gjjs_list").show();
		});
		
	$("#gjjs_list li").click(function(){
                        $("#fid").val(this.value);
			$("#gjjs").text($(this).text());
			$("#gjjs_list").hide();
                        
			});
//高级搜索

    var s = $('#s1')
    s.bind('click',function(e){e.stopPropagation();})
    .find('>a').bind('click',function(){
        s.find('>ul').show();
    });
    $(document).bind('click',function(){s.find('>ul').hide()})

// js 查验发票 //http://www.bwfapiao.com 该域名根据后台配置变化

$("#yzm").attr("src","http://www.bwfapiao.com/zcyhgl/yhzx/getCheckImage.do?d="+ new Date().getMilliseconds());

// 点击验证码改变
$('#yzm').click(function() {
	$("#yzm").attr("src","http://www.bwfapiao.com/zcyhgl/yhzx/getCheckImage.do?d="+ new Date().getMilliseconds());
});

$("#search").click(function() {
	var fpdm = $("#FPDM").val();
	var fphm = $("#FPHM").val();
	var yzm = $("#imgCode").val();
	if (fpdm == null || fpdm == "") {
		alert("发票代码不能为空");
		return;
	}
	if (fphm == null || fphm == "") {
		alert("发票号码不能为空");
		return;
	}
	if (yzm == null || yzm == "") {
		alert("验证码不能为空");
		return;
	}

	$.ajax({
		url : "http://www.bwfapiao.com/qyfpgl/checkFPM.do",
		data : {
			'LISTFPHM' : fphm,
			'LISTFPDM' : fpdm,
			'YZM' : yzm,
			'CZMK' : "indexcy"
		},
		type : "POST",
		dataType : "jsonp",
		success : function(jsonObj) {
			if (jsonObj.code == 0) {
				var data = jsonObj.data[0];
				if (data.XF_NSRMC == "") {
					alert("没有该发票");
					return;
				} else {
					alert("该发票为[" + data.XF_NSRMC + "]开具");
					return;
				}
			} else {
				alert(jsonObj.msg);
			}
		}
	});
});




	
	});