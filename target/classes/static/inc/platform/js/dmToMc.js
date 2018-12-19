//depend on jquery
//var DMTOMC = '1.0';
//var isDmToMcIint = false;
function dmToMc() {
	// try{
	// AJAX;
	// //alert("dddd");
	// }catch(err){
	// if(isDmToMcIint==false){
	// include_js("/inc/platform/js/ajax.js");
	// isDmToMcIint=true;
	// }
	// setTimeout(dmToMc,10);
	// return;
	// }
	var objs = document.getElementsByTagName("SPAN");
	$(".convert").each(function(){
		if (this.convert != null) {
			if (this.convert.indexOf("table") == 0) {
				var convert = this.convert;
				var strs = new Array();
				strs = convert.split(";");
				if (strs.length > 3) {
					if (strs[3].indexOf("except:") != -1) {
						if (this.innerText == strs[3].replace("except:", "")) {
							this.innerText = strs.length == 5 ? strs[4] : "";
							return;
						}
					}
				}
				var post = "tableName=" + strs[0].substring(6);
				post += "&dmName=" + strs[1].substring(3);
				post += "&mcName=" + strs[2].substring(3);
				post += "&dmValue=" + this.innerText;
				var _this=$(this);
				// poolArray[poolArray.length]=tmp;
				// send_request_update("/inc/platform/jsp/convert.jsp?"+post,post,this);
				$.ajax({
					url : "/inc/platform/jsp/convert.jsp?" + post,
					success: function(data) {
						_this.html(data.trim());
					}
				});
			} else if (this.convert == "Date") {
				this.innerText = this.innerText.substr(0, 10);
			} else {
				var arry = new Array();
				arry = this.convert.split(";");
				for (j = 0; j < arry.length; j++) {
					if (arry[j].indexOf(this.innerText + ":") == 0) {
						this.innerText = arry[j].substring(arry[j]
								.indexOf(":") + 1);
					}
				}
			}

		}
	});
	//send_request_pool(10000);
}
window.attachEvent("onload", dmToMc);