	$(function(){
		var liarr=$("#navlist .nli"),
			liarr_sub=liarr.children(".sub"),
			liarr_sub_li=liarr_sub.find("li");
		liarr.hover(function(){
			
			var li_length=$(this).find(liarr_sub_li).length,
				this_width=$(this).width();
			for(var a=0;a<=li_length;a++){
				var sub_width=$(this).find(liarr_sub_li).width();
					
				if(li_length>0&&li_length<3){
					sub_width=sub_width*a;
					$(liarr_sub).css({
								'left':sub_width/2,
								'marginLeft':-((sub_width/4)+(this_width/2))
								
							});
				};
				if(li_length>=3){
					sub_width=sub_width*3;
					$(liarr_sub).css({
								'left':0,
								'marginLeft':0
							});
				};
				
			}
			
		})
		
		
	})
