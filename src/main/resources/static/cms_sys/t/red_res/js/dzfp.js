$(function () {
    $(document).ready(function () {   
    	$.getUrlPageName();
    });
});

var total=0;
var cpage=1;
var pages=0;
var start=1;
var count=10;

var dzpt=(function(){
    return {
    	onload: function () {
    		dzpt.getGrinfo();//鑾峰彇涓汉淇℃伅
    	},
    	obj:{},
    	dzfpudata:{},
    	getHello:function(){ 
    		var _date = new Date(); 
    		var _time = _date.getHours(); 
    		var _text = ''; 
    		if(_time>=6&&_time<9) _text = '鏃╀笂濂�'; 
    		else if(_time>=9&&_time<11) _text = '涓婂崍濂�'; 
    		else if(_time>=11&&_time<13) _text = '涓崍濂�'; 
    		else if(_time>=13&&_time<17) _text = '涓嬪崍濂�'; 
    		else _text = '鏅氫笂濂�'; 
    		return _text; 
    	},
    	
    	getUdata:function(){
    		return dzpt.dzfpudata;
    	},

    //鑾峰彇棰樺ご銆侀灏句俊鎭�
    	getHeaderFooter:function(){
    		$.ajax({
    			url:"/login/param/getAll.do",
				data : {'LANMU': "鐢ㄦ埛涓績"},
				type : "POST",
				dataType : "JSON",
				success : dzpt.callheaderfooter
			});
    	},

    	callheaderfooter:function(jsonObj, xhrArgs){
    		if(jsonObj.code==1){
    			$('#header').html(jsonObj.data.header);
    			$('#footer').html(jsonObj.data.footer);
    			if(jsonObj.data.menu!=undefined && jsonObj.data.menu!=""){
    				var current_menu = jsonObj.data.menu;
    				try{
	    				var current_url = window.location.href;
	        			var current_index = current_url.indexOf("/server3/");
	        			current_url = current_url.substr(current_index);
	        			current_menu = current_menu.replace(current_url + "'",current_url + "' class='active'");
    				}catch(err){}
        			$('#menu').html(current_menu);
    			}
    			
    			
    			/*娣诲姞浼佷笟淇℃伅寮€濮�*/
    			/*$("#header_qync").html(jsonObj.data.NC);
    			$("#header_qynsrsbh").html(jsonObj.data.NSRSBH);*/
    			/*娣诲姞浼佷笟淇℃伅寮€缁撴潫*/
    			
    			//娣诲姞鐢ㄦ埛淇℃伅
    			if(jsonObj.data.ICON!=undefined && jsonObj.data.ICON!="")
    			$("#gr_img").html("<img src=\""+jsonObj.data.ICON+"\" width=\"100\" height=\"100\" alt=\"\"/>");
    			else $("#gr_img").html("<img src=\"../images/user1.png\" width=\"100\" height=\"100\" alt=\"\"/>");
    			var grxx_str="";
    				grxx_str += "<span class=\"f16_color_white\">"+dzpt.getHello()+"锛�</span>" +
    						"<span class=\"f16_color_white\">"+((jsonObj.data.NC!=null&&jsonObj.data.NC!="")?jsonObj.data.NC:jsonObj.data.DLMC)+"</span>" +
    						"<a href=\"/server3/dzfp/zcyhgl/yhxxgl.html\" class=\"inline-block pl20\">淇敼涓汉淇℃伅</a>" +
    						"<a href=\"javascript:void(0);\" onclick=\"dzpt.exitLogin()\" class=\"pl20\">閫€鍑�</a>";
    				grxx_str += "<p class=\"pt20\">";
    			if(jsonObj.data.PHONE!=undefined && jsonObj.data.PHONE!="")
    				grxx_str += "<span class=\"mr20\">缁戝畾鎵嬫満鍙凤細"+jsonObj.data.PHONE+"</span>";
    			if(jsonObj.data.EMAIL!=undefined && jsonObj.data.EMAIL!="")
    				grxx_str += "<span class=\"mr20\">缁戝畾閭:"+jsonObj.data.EMAIL+"</span>";
    			if(jsonObj.data.DLRQ!=undefined && jsonObj.data.DLRQ!="")
    				grxx_str += " | <span class=\"pl20\">涓婃鐧诲綍鏃堕棿锛�"+jsonObj.data.DLRQ+"</span>";
    				grxx_str += "</p>";
    			$("#gr_info").html(grxx_str);
    			$(".footer").attr("class","footer_ny");//璁剧疆椤佃剼鏍峰紡
    			dzpt.dzfpudata = jsonObj.data;//鐢ㄦ埛淇℃伅鏀惧叆缂撳瓨
    			if($.isFunction(dzpt.obj.onload))	dzpt.obj.onload();//璋冪敤
    		}
    	},

    	exitLogin:function(){
    		$.ajax({
    			url:"/login/user/exitLogin.do",
    			type : "POST",
				dataType : "JSON",
				success : function(jsonObj) {
					if (jsonObj.code == 1) {
						if(jsonObj.code==1){
	    		    		document.location.href="/";
	    		    	}
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					alert(XMLHttpRequest.status);
					alert(XMLHttpRequest.readyState);
					alert(textStatus);
				}
    		});
    	},
    	
    	getGrinfo:function(){
    		$.ajax({
    			url:"/zcyhgl/yhzx/selectBdxx.do",
				data : {CUR_USERID:"1"},
				type : "POST",
				dataType : "JSON",
				success : dzpt.callgrxx
			});
    	},

    	callgrxx:function(jsonObj, xhrArgs){
    		if(jsonObj.code=="-3" || jsonObj.data==undefined || jsonObj.data=="undefined"){
    			alert("璇风櫥褰�");
    			document.location.href="/index.html";
    			return;
    		}else{
        		dzpt.getHeaderFooter();//濉厖棰樺ご銆侀灏句俊鎭�
    		}
    	},
    	showPage:function(){
			if(total%count==0)
				pages = parseInt(total/count);
			else pages = parseInt(total/count) + 1 ;
			
			var pstr = "鍏�"+total+"鏉¤褰�<a href=\"javascript:void(0);\" onclick=\"dzpt.changePage(1)\">棣栭〉</a>" +
					"<a href=\"javascript:void(0);\" onclick=\"dzpt.changePage("+(cpage-1)+")\">&lt;&lt;</a>";
			if(pages>5){//鍒嗛〉寮€濮�
				var tpstr = "";
				for(var i=0;i<pages;i++){
					var temp ="<a href=\"javascript:void(0);\" onclick=\"dzpt.changePage("+ (i + 1) + ")\" ";
					if (cpage == (i + 1))
						temp += "class=\"currute\"";
					temp += ">" + (i + 1) + "</a>";
					if((i+1)<=3 && cpage<=3){//褰撳墠椤点€佸墠3椤垫甯�
						tpstr += temp
						if(cpage<3 && (i+1)==3) tpstr += "...";
					}else if(cpage>3 && ((i+1)==(cpage-1))){//褰撳墠椤佃秴杩囧墠涓夐〉
						tpstr += "..."+temp;
					}else if((cpage >= ((i + 1) - 1) && cpage <= ((i + 1) + 1))){
						tpstr += temp;
						if(cpage+1<pages && (i + 1)==(cpage+1)) {
							if((cpage+1+1)!=pages)
							tpstr += "...";
							tpstr += "<a href=\"javascript:void(0);\" onclick=\"dzpt.changePage("+ pages + ")\">"+pages+"</a>";
						}
					}
				}
				pstr += tpstr;
			}else{//灏忎簬绛変簬5椤� 鍏ㄥ垪鍑烘潵
				for(var i=0;i<pages;i++){
					pstr += "<a href=\"javascript:void(0);\" onclick=\"dzpt.changePage("+(i+1)+")\" ";
				if(cpage==(i+1))
					pstr += "class=\"currute\"";
					pstr += ">"+(i+1)+"</a>";
				}
			}
				pstr+="<a href=\"javascript:void(0);\" onclick=\"dzpt.changePage("+(cpage+1)+")\">&gt;&gt;</a>" +
					"<a href=\"javascript:void(0);\" onclick=\"dzpt.changePage("+(pages)+")\">鏈〉</a>" +
					"<input type=\"text\" id=\"pagejump\"><a href=\"javascript:void(0);\" onclick='dzpt.changePage($(\"#pagejump\").val())' class=\"tz_btn\">璺宠浆</a>";
			$("#pages").html(pstr);
    	},
    	changePage:function(p){
    		if(p<=0) cpage=1;
    		else if(p>pages) cpage=pages;
    		else cpage=p;
    		start = (cpage-1)*count+1;
    		if($.isFunction(dzpt.obj.selectPages)) dzpt.obj.selectPages(); //璋冪敤瀵硅薄鍒嗛〉
    	},
    	onFocusBlur:function(id,defaultstr){
			$("#"+id).focus(function(){
				if($.trim($(this).val())==defaultstr){
					$(this).val("");
					$(this).css("color","#000");
				}
			}).blur(function(){
				if($.trim($(this).val())==""){
					$(this).val(defaultstr);
					$(this).css("color","rgb(169,169,169)");
				}
			})
		}
    }})();

(function ($) {
	$.extend({     
	      getUrlStr: function (name) {          
	          function parseParams() {
	              var params = {},
	                  e,
	                  a = /\+/g,  // Regex for replacing addition symbol with a space
	                  r = /([^&=]+)=?([^&]*)/g,
	                  d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
	                  q = window.location.search.substring(1);
	              while (e = r.exec(q))
	                  params[d(e[1])] = d(e[2]);
	              return params;
	          }
	          if (!this.queryStringParams)
	              this.queryStringParams = parseParams();
	          return this.queryStringParams[name];
	      },
	      getUrlPageName: function(){
	    	  var pagename = window.location+"";
	    	  pagename = pagename.substring(pagename.lastIndexOf('/')+1);
//	    	  pagename = pagename.substring(0, pagename.lastIndexOf('.'));
	    	  return pagename;
	      }
	  });
	})(jQuery);