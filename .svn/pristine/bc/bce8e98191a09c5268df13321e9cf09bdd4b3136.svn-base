function printTable(obj) {	
			var printText = "";
            //var pwin = window.open('about:blank','','fullscreen=1');
            printText = printText +("<link href=\"/inc/platform/css/print.css\" rel=\"stylesheet\"/>");
            printText = printText +("<link href=\"/inc/platform/css/style.css\" rel=\"stylesheet\"/>");
            printText = printText +("<script src=\"/inc/platform/js/pubjs.js\"></script>");
            printText = printText +("<style  type='text/css' media=print>");
            printText = printText +("\n.Noprint {");
            printText = printText +("\ndisplay: none;");
            printText = printText +("\n}");
            printText = printText +("\n.PageNext {");
            printText = printText +("\npage-break-after: always;");
            printText = printText +("\n}");
            printText = printText +("\n</style>");
            printText = printText +("\n<script>");
            printText = printText +("\nfunction initTable(){");
            printText = printText +("\nvar objs = document.getElementsByTagName('table');");
            printText = printText +("\nfor(i=0;i<objs.length;i++){");

            printText = printText +("\nif(objs[i].cellSpacing=='1'){");
            printText = printText +("\nobjs[i].cellSpacing = '0';");
            printText = printText +("\nobjs[i].border = '1';");
            printText = printText +("\n}}}");

            printText = printText +("\n</script>");

            printText = printText +("\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=gb2312\">");

            printText = printText +("\n<body>");
            printText = printText +("\n<center class='Noprint'>");
            printText = printText +("\n<OBJECT id=WebBrowser classid=CLSID:8856F961-340A-11D0-A96B-00C04FD705A2 height=0 width=0>");
            printText = printText +("\n</OBJECT>");
            printText = printText +("\n<input type=button value=打印 onclick=document.all.WebBrowser.ExecWB(6,1)>");
            printText = printText +("\n<input type=button value=直接打印 onclick=document.all.WebBrowser.ExecWB(6,6)>");
            printText = printText +("\n<input type=button value=页面设置 onclick=document.all.WebBrowser.ExecWB(8,1)>");
            printText = printText +("\n<input type=button value=打印预览 onclick=document.all.WebBrowser.ExecWB(7,1)>");
            printText = printText +("\n<input type=button value=关闭 onClick='window.opener=0;window.close();'>");
            printText = printText +("\n</center>");
            printText = printText +("\n<TABLE class=datatable id="+obj.id+" cellSpacing=0 cellPadding=0 width=100% align=center border=0 frame=box bordercolor='#000000'>");
            printText = printText +(obj.innerHTML.replace(/href=/ig,"").replace(/<script.*?>.*?<\/script>/ig,""));
            printText = printText +("\n</table>")
            //printText = printText +("\n<" + "script>" + "\nwindow.print();\nwindow.opener = null;\nsetTimeout('window.close();', 3000);<" + " / script > ")
            printText = printText +("\n</body>")
            printText = printText +("\n<script>")
            printText = printText +("\ninitTable();")
            printText = printText +("\n</script>")
            document.getElementById("input_print").value=printText;
            document.getElementById("form_print").action="/inc/platform/jsp/print.jsp";
            document.getElementById("form_print").submit();
        }