tabTemplate = "<li><a href='#{href}' name='#{label}' title='#{title}'>#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>",
tabCounter = 0;
//bl=true是，表示不允许关闭
		function navigate(url, title, bl) {
			var tabs = $( "#tabs" ).tabs();
			var lis =  $( "#tabs>ul>li" );
			for(i=0;i<lis.length;i++){
				if(lis.eq(i).find(">a").attr("title")==title){
					$( "#tabs" ).tabs( "option", "active", i );
					return;
				}
			}
			id = "tabs-" + tabCounter;
			var lbl = (title.length>6?title.substring(0,6)+"..":title);
			li = $( tabTemplate.replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, lbl ).replace( /#\{title\}/g, title )  );
			if(bl==true){
				li.children("span").remove();
			}
			tabContentHtml = "<iframe src='"+url+"' width='100%' border='0' height='"+($(document).height()-30)+"'/>";
	
			tabs.find( ".ui-tabs-nav" ).append( li );
			tabs.append( "<div id='" + id + "'>" + tabContentHtml + "</div>" );
			var panelId = tabs.find( ".ui-tabs-active" ).attr( "aria-controls" );
			//$( "#" + panelId ).remove();
			tabs.tabs( "refresh" );
			if(lis.length>=_MAX_TAB_NUM){
				idx = -1;
				for(i=0;i<_MAX_TAB_NUM;i++){
					if(lis.eq(i).find("span").length!=0){
						idx = i;
						break;
					}
				}
				if(idx == -1){
					alert("已达到最大允许打开的窗口数量,请先关闭其他窗口！");
				}else{
					
					var panelId=lis.eq(idx).remove().attr( "aria-controls" );
					$( "#" + panelId ).remove();
					tabs.tabs( "refresh" );
					$( "#tabs" ).tabs( "option", "active", lis.length-1 );
				}
			}else{
				tabs.tabs( "refresh" );
				$( "#tabs" ).tabs( "option", "active", lis.length );
			}
			tabCounter++;
		}
		function closeAll(){
			var tabs = $( "#tabs" ).tabs();
			var lis =  $( "#tabs>ul>li" );
			for(var i=lis.length-1;i>=0;i--){
				var panelId=lis.eq(i).remove().attr( "aria-controls" );
				$( "#" + panelId ).remove();
				//$( "#tabs" ).tabs( "option", "active", i-1 );
			}
			tabs.tabs( "refresh" );
		}
		$(function() {
	
			var tabs = $( "#tabs" ).tabs();
	
			// actual addTab function: adds new tab using the input from the form above
	
			// close icon: removing the tab on click
			tabs.delegate( "span.ui-icon-close", "click", function() {
				var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
				$( "#" + panelId ).remove();
				tabs.tabs( "refresh" );
			});
			//scroll-left
			tabs.delegate( "a.a_left", "click", function() {
				var active = $( "#tabs" ).tabs( "option", "active" );
				if(active>0){
					active = $( "#tabs" ).tabs( "option", "active" ,active-1 );
				}
				tabs.tabs( "refresh" );
			});
			//scroll-right
			tabs.delegate( "a.a_right", "click", function() {
				var active = $( "#tabs" ).tabs( "option", "active" );
				if(active<$( "#tabs>ul>li" ).length-1){
					active = $( "#tabs" ).tabs( "option", "active" ,active+1 );
				}
				tabs.tabs( "refresh" );
			});
			//scroll-close
			tabs.delegate( "a.a_close", "click", function() {
				var _li = tabs.find( ".ui-tabs-active" );
				if(_li.children("span").length>0){
					var panelId=_li.attr( "aria-controls" );
					_li.remove();
					$( "#" + panelId ).remove();
					tabs.tabs( "refresh" );
				}
			});
			//scroll-close
			tabs.delegate( "a.a_refurbish", "click", function() {
				var _li = tabs.find( ".ui-tabs-active" );
				var panelId=_li.attr( "aria-controls" );
				var _ifrm=$( "#" + panelId).children();
				_ifrm.attr("src",_ifrm.attr("src"));
			});
			
	
			tabs.bind( "keyup", function( event ) {
				if ( event.altKey && event.keyCode === $.ui.keyCode.BACKSPACE ) {
					var panelId = tabs.find( ".ui-tabs-active" ).remove().attr( "aria-controls" );
					$( "#" + panelId ).remove();
					tabs.tabs( "refresh" );
				}
			});
		});