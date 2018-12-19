function choosePerson(option) {
	window._mc = option.mc;
	window._dm = option.dm;
	if(!option.qxxkdm) {
		option.qxxkdm = '';
	}
	window._zzjgLevel = option.zzjgLevel; 
	if(option.span) {
		window._span = option.span;	
	}
	if(option.winMode == 'open') {
		window._winMode = 'open';		
		window.open('/inc/platform/jsp/userChoose_new/userTreeMain.jsp?qxxkdm=' + option.qxxkdm, '', 'height=500,width=800,top=100,left=100,toolbar=no,menubar=no,scrollbars=yes, resizable=yes,location=no, status=no');
	} else if(option.winMode = 'modalDialog') {		
		window._winMode == 'modalDialog';		
		window.showModalDialog('/inc/platform/jsp/userChoose_new/userTreeMain.jsp?qxxkdm=' + option.qxxkdm, window, 'dialogHeight=500px;dialogWidth=800px;toolbar=no;menubar=no;scrollbars=yes; resizable=yes;location=no; status=no');
	}
}