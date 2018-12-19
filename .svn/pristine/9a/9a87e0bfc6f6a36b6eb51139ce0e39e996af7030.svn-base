/**头部下拉城市**/
$(document).ready(function () {
    $('.nav_ul .pull-right').hover(function () {
        $('.nav_tab').slideDown(100);
    }, function () {
        $('.nav_tab').hide();
    });
});
/**正文banner滚动**/
$(function() {
	var bannerSlider = new Slider($('#banner_tabs'), {
		time: 3000,
		delay: 400,
		event: 'hover',
		auto: true,
		mode: 'fade',
		controller: $('#bannerCtrl'),
		activeControllerCls: 'active'
	});
	$('#banner_tabs .banner_anfl').click(function() {
		bannerSlider.prev()
	});
	$('#banner_tabs .banner_anfr').click(function() {
			bannerSlider.next()
		});
});
 /***电子发票查验tab切换***/
$(document).ready(function(){
	$('.electronics_list a').click(function(){
		if($(this).hasClass('air')){
			return;
		}
		$('.electronics_content input:not(input:hidden)').val('');
		$('.electronics_content div').remove();
	});
	
	var $tab_li = $('.electronics .electronics_list a');
	$tab_li.click(function(){
		$(this).addClass('air').siblings().removeClass('air');
			var index = $tab_li.index(this);
		$('.electronics_content ol').eq(index).show().siblings().hide();
	});	
});	


/***瑞宏服务***/
$(document).ready(function(){
	$(".rhfw_project a").mouseenter(function(){
		$(this).stop().animate({marginTop:"20px"});
	});
	
	$(".rhfw_project a").mouseleave(function(){
		$(this).stop().animate({marginTop:"25px"});
	});
});


/***解决方案***/
$(document).ready(function(){
	$(".jjfa_plate li a").hover(function(){
		$(this).find(".transparent").css({background:'#02aacf'});
		$(this).find(".content").stop().animate({top:'0'});
		$(this).find(".content div").stop().show();
	},function(){
		$(this).find(".transparent").css({background:'#161A1D'});
		$(this).find(".content").stop().animate({top:'30px'});
		$(this).find(".content div").stop().hide();
	}) 
});

/***行业动态tab切换***/
$(document).ready(function(){
	var $tab_li = $('.dtnr_text .title_nav a');
	$tab_li.click(function(){
		$(this).addClass('air').siblings().removeClass('air');
			var index = $tab_li.index(this);
		$('.dtnr_text .content_list').eq(index).show().siblings().hide();
	});	
});

/**开放平台banner滚动**/
$(document).ready(function () {
    if ($(".kfpt_banner") && $(".kfpt_banner").length > 0) {
        $(".kfpt_banner").hover(function () {
                $(this).find(".prev,.next").stop(true, true).fadeTo("show", 0.5)
            },
            function () {
                $(this).find(".prev,.next").fadeOut()
            });
        $(".kfpt_banner").slide({
            titCell: ".banner_sz ul",
            mainCell: ".banner_img ul",
            effect: "fold",
            autoPlay: true,
            autoPage: true,
            trigger: "click",
            startFun: function (i) {
                var curLi = jQuery(".kfpt_banner .banner_img li").eq(i);
                if (!!curLi.attr("_src")) {
                    curLi.css("background-image", curLi.attr("_src")).removeAttr("_src")
                }
            }
        });
    }
});

/**在线报销tab切换**/
$(document).ready(function () {
    $('.fpbx_fr .fpbx_tab a').click(function () {
        var _this = $(this);
        _this.attr("class", 'air');
        _this.siblings().attr('class', '');

        var _index = _this.index();
        var _tab_list = _this.parents('.fpbx_fr').find('.fpbx_tablist ').eq(_index);
        _tab_list.css('display', 'block');
        _tab_list.siblings('.fpbx_tablist').css('display', 'none');
    });
});
/**行业动态tab切换**/
//$(document).ready(function () {
//    $('.ywbd_tab .ywbd_nav a').click(function () {
//        var _this = $(this);
//        _this.attr("class", 'air');
//        _this.siblings().attr('class', '');
//
//        var _index = _this.index();
//        var _tab_list = _this.parents('.ywbd_tab').find('.ywbd_text ').eq(_index);
//        _tab_list.css('display', 'block');
//        _tab_list.siblings('.ywbd_text').css('display', 'none');
//    });
//});
/**时间插件**/
$(document).ready(function () {
    $(function () {
        if (!($("#txtBeginDate")[0])) {
            return;
        }
        $("#txtBeginDate").calendar({
            controlId: "divDate",                                 // 弹出的日期控件ID，默认: $(this).attr("id") + "Calendar"
            speed: 200,                                           // 三种预定速度之一的字符串("slow", "normal", or "fast")或表示动画时长的毫秒数值(如：1000),默认：200
            complement: true,                                     // 是否显示日期或年空白处的前后月的补充,默认：true
            readonly: true,                                       // 目标对象是否设为只读，默认：true
            upperLimit: new Date(),                               // 日期上限，默认：NaN(不限制)
            lowerLimit: new Date("2011/01/01"),                   // 日期下限，默认：NaN(不限制)
            callback: function () {                               // 点击选择日期后的回调函数
                alert("您选择的日期是：" + $("#txtBeginDate").val());
            }
        });
        $("#txtEndDate").calendar();
    });
});
/**select下拉**/
$(document).ready(function () {
    $(".ui-select").selectWidget({
        change: function (changes) {
            return changes;
        },
        effect: "slide",
        keyControl: true,
        speed: 200,
        scrollHeight: 250
    });
});

/**有问必答页面tab切换**/
$(document).ready(function () {
    $('.ywbd_text .intro ul li').click(function () {
        var _this = $(this);
        _this.attr("class", 'air');
        _this.siblings().attr('class', '');

        var _index = _this.index();
        var _tab_list = _this.parents('.ywbd_text').find('.List ').eq(_index);
        _tab_list.css('display', 'block');
        _tab_list.siblings('.List').css('display', 'none');
    });
});
/**个人中心_个人信息_红冲发票经过显示**/
$(document).ready(function () {
    $(".grxx .hpts").hover(function () {
        $(".grxx .hpts_tck").toggle();
    });
});


$(document).ready(function () {
    /**个人中心_账号设置头像下拉**/
    $(".ghtx").click(function () {
        $(".xgtx").slideDown("1000");
        $(".ghtx").css('background', 'url(images/zhsz_xt.png) no-repeat right')
    });
    $(".xgtx button").click(function () {
        $(".xgtx").slideUp("1000");
        $(".ghtx").css('background', 'url(images/zhsz_xl.png) no-repeat right')
    });

    /**个人中心_账号设置昵称修改弹出框**/
    $(".zhsz .ncxg").click(function () {
        $(".nc").fadeIn();
    });
    $(".nc .close").click(function () {
        $(".nc").fadeOut();
    });

    /**个人中心_账号设置手机号修改弹出框**/
    $(".zhsz .sjhxg").click(function () {
        $(".sjh").fadeIn();
    });
    $(".sjh .close").click(function () {
        $(".sjh").fadeOut();
    });

    /**个人中心_账号设置邮箱修改弹出框**/
    $(".zhsz .yxxg").click(function () {
        $(".yx").fadeIn();
    });
    $(".yx .close").click(function () {
        $(".yx").fadeOut();
    });

    /**个人中心_账号设置密码修改弹出框**/
    $(".zhsz .mmxg").click(function () {
        $(".mm").fadeIn();
    });
    $(".mm .close").click(function () {
        $(".mm").fadeOut();
    });
});
/**个人中心_我的发票tab切换**/
$(document).ready(function () {
    $('.wddzfp .wddzfp_nav li').click(function () {
        var _this = $(this);
        _this.attr("class", 'air');
        _this.siblings().attr('class', '');

        var _index = _this.index();
        var _tab_list = _this.parents('.wddzfp').find('.wddzfp_lb ').eq(_index);
        _tab_list.css('display', 'block');
        _tab_list.siblings('.wddzfp_lb').css('display', 'none');
    });
});
/**个人中心_我的发票点击转发**/
$(document).ready(function () {
    $(".wddzfp .zf ").click(function () {
        $(".wddzfp .zf .zftj").fadeIn();
    });
    $(".wddzfp ol").hover(function () {
        $(".wddzfp .zf .zftj").fadeOut();
    });
    /**个人中心_我的发票点击收藏**/
    $(".wddzfp .rqsc .sc").click(function () {
        $(".wddzfp .rqsc .sc").toggleClass("click");
    });
});
/**注册tab切换**/
$(document).ready(function () {
    $('.register_fr .register_nav a').click(function () {
        var _this = $(this);
        _this.attr("class", 'air');
        _this.siblings().attr('class', '');

        var _index = _this.index();
        var _tab_list = _this.parents('.register_fr ').find('.register_son').eq(_index);
        _tab_list.css('display', 'block');
        _tab_list.siblings('.register_son').css('display', 'none');
    });
});
/**首页二维码经过出现放大**/
$(document).ready(function () {
    $(".lxwm_text ul li").hover(function () {
        var self = $(this);  //self = 当前这个
        //console.log(self.html());
        var div = self.find('.ewmfd'); // div = self（这个的）find的ewmfd
        div.toggle();      //让他出现
        //$(".lxwm_text ul li div").slideDown();
    });
});
/**floatnav漂浮导航经过div出现**/ 
 $(document).ready(function(){
	$(".floatnav ol li").hover(function(){
		var floatnavolli = $(this);  //self = 当前这个
		//console.log(self.html());
		var floatnavtck = floatnavolli.find('.floatnavtck'); // div = self（这个的）find的ewmfd
		floatnavtck.toggle();      //让他出现
		//$(".lxwm_text ul li div").slideDown();
	}); 
});

 /**floatnav漂浮导航定位**/
 $(document).ready(function(){
 	$('.floatnav_Five a').click(function(){
 		$('html,body').animate({'scrollTop':0},500);
 	});
 });
  /**floatnav滚动五百米后变图片**/
 $(function(){   
     var winHeight = $(document).scrollTop(); 
     $(window).scroll(function() {
         var scrollY = $(document).scrollTop();// 获取垂直滚动的距离，即滚动了多少
         if ($(document).scrollTop() > 500){ //如果滚动距离大于550px则隐藏，否则删除隐藏类
             $('.floatnav ol li.floatnav_Five a').addClass('after');
         } 
         else {
             $('.floatnav ol li.floatnav_Five a').removeClass('after');
         } 
         if ($(document).scrollTop()  > 500){ //如果没滚动到顶部，删除显示类，否则添加显示类
             $('.floatnav ol li.floatnav_Five a').removeClass('before');
         } 
         else {
             $('.floatnav ol li.floatnav_Five a').addClass('before');
         }    
 	   });
 	}); 

/**floatnav漂浮导航定位**/
/**$(function(){
    var main_top  =  $("#main").offset().top; 
    $(window).scroll(function(){ 
       if($(window).scrollTop() > main_top){ 
          $(".floatnav").addClass("floatshow"); 
       }else{ 
          $(".floatnav").removeClass("floatshow"); 
         } 
    }) 
});**/

//<!--IE8placeholder颜色兼容-->
$(function () {
    $('input, textarea').placeholder({customClass: 'my-placeholder'});
});
