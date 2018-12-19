       function exportWord(obj) {	
			var printText = "";
            printText = printText +(obj.outerHTML.replace(/href=/ig,"").replace(/border=0/ig,"border=1"));
            document.getElementById("input_print").value=printText;
            document.getElementById("form_print").action="/inc/platform/jsp/wordDown.jsp";
            document.getElementById("form_print").submit();
        }