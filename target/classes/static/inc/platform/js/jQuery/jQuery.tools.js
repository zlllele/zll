(function($){
	$.fn.extend({

		getCheckRows:function(){
			 var ids = [];
             $("input:checked", this).each(function() {
                 if ($(this).attr("checked")) {
                   ids.push($(this).val());
                 }
            });
            return ids;
		}
	});
	
})(jQuery);
