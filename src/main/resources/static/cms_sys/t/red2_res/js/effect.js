$(function(){

//	切换省份
		var area_sel=$(".area_sel"),
			provinces=$(".m_province_list");
		area_sel.hover(function(e){
			$(this).addClass("hover");
			provinces.show();
			e.preventDefault();
		},function(e){
			$(this).removeClass("hover");
			provinces.hide();
			e.preventDefault();
		});
		provinces.find("li a").click(function(){
			provinces.find("li a").removeClass("active");
			$(this).addClass("active");
			area_sel.removeClass("hover");
			area_sel.find("span").text($(this).text());
			provinces.hide();
		});
	$(".m_floor4_r").slide({titCell:".m_login_hd li", mainCell:".m_login_bd ",});
	//	首页banner
		$(".fullSlide").slide({ titCell:".hd ul", mainCell:".bd ul", effect:"leftLoop", vis:"auto", autoPlay:true, autoPage:true, trigger:"click" });
//	首页案例
		$(".swf_slider").slide({ titCell:".hd ul", mainCell:".bd", effect:"leftLoop",  autoPlay:true, autoPage:true, trigger:"click",mouseOverStop:true});
//	解决方案切换效果
	$(".scroll_box").slide({mainCell:".scroll_box_bd ul",effect:"leftLoop",autoPlay:false,scroll:1,vis:6,trigger:"click"});
	});