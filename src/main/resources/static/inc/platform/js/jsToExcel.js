       function exportTable(obj) {	
			var printText = "";
			
            printText = printText +(obj.outerHTML.replace(/href=/ig,"").replace(/border=0/ig,"border=1"));
			var re = /<td class=hidden[\d\D]*?<\/td>/ig;//去掉第一列
			printText = printText.replace(re,"");
            re = /<input class=box100([\d\D]*?)name=[\d\D]*?>/ig;//对文本框，只显示value=v1
			printText = printText.replace(re,"$1");
			printText = printText.replace(/value=/ig,"");
            document.getElementById("input_print").value=printText;
            document.getElementById("form_print").action="/inc/platform/jsp/excelDown.jsp";
            document.getElementById("form_print").submit();
        }