(function($) {
	$.fn.extend({
		placeholder : function() {
			if ("placeholder" in document.createElement("input")) {
				return this ;// 如果原生支持placeholder属性，则返回对象本身
			} else {
				return this.each(function() {
					var _this = $(this);
					if(!_this.val()&&_this.attr("placeholder")){
						_this.addClass("placeholder");
						_this.val(_this.val()?_this.val():_this.attr("placeholder"));
						_this.focus(function() {
							if (_this.val() == _this.attr("placeholder")) {
								_this.val("");
								_this.removeClass("placeholder");
							}
						});
						_this.blur(function() {
							if (_this.val().length == 0) {
								_this.val(_this.attr("placeholder"));
								_this.addClass("placeholder");
							}
						});
					}
				});
			}
		}
	});
})(jQuery);
$(function(){
	$(".must[type=text]").each(function(){
		$(this).placeholder();
	});
});
