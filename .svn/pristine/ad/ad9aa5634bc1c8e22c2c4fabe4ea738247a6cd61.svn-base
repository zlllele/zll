function isDate(sDate) {
	var iYear, iMonth, iDay, iIndex,iiIndex
        var sDate1=sDate;
	var	reg
	reg = new RegExp('[^0-9/]','')
	if (sDate.search(reg) >= 0)
		return false;
	
	iIndex = sDate.indexOf('/');
	iiIndex = sDate.indexOf('-');
        if (iiIndex != -1) iIndex=iiIndex;
        if ( iIndex == -1 )
		return false;
	else {
		iYear = parseFloat(sDate.substr(0, iIndex));
		if ( isNaN(iYear) || iYear < 1900 || iYear > 2099 )
			return false;
		else
			sDate = sDate.substring(iIndex + 1, sDate.length);
	}

	
	iIndex = sDate.indexOf('/');
        iiIndex = sDate.indexOf('-');
        if (iiIndex != -1) iIndex=iiIndex;

	if ( iIndex == -1 )
		return false;
	else {
		iMonth = parseFloat(sDate.substr(0, iIndex));
		if ( isNaN(iMonth) || iMonth < 1 || iMonth > 12 )
			return false;
		else
			sDate = sDate.substring(iIndex + 1, sDate.length);
	}

	
	iIndex = sDate.indexOf('/');
        iiIndex = sDate.indexOf('-');
        if (iiIndex != -1) iIndex=iiIndex;

	if ( iIndex >= 0 )

		return false;
	else {
		iDay = parseFloat(sDate);
		if ( isNaN(iDay) || iDay < 1 || iDay > 31 )
			return false;
	}
	

	
	switch(iMonth) {
		case 4:
		case 6:
		case 9:
		case 11:
			if ( iDay > 30 )
				return false;
			else
				break;
		case 2:
			if ( ( ( iYear % 4 == 0 && iYear % 100 != 0 ) || iYear % 400 == 0 ) && iDay > 29 )
				return false;
			else if ( (iYear % 4 != 0 || (iYear % 100 == 0 && iYear % 400 != 0)) && iDay > 28 )
				return false;
			else
				break;
		default:
	}
	return true;
}



function parseDate(sDate) {
	var iIndex, iYear, iMonth, iDay
	
	iIndex = sDate.indexOf('/');
	iYear = parseFloat(sDate.substr(0, iIndex));
	sDate = sDate.substring(iIndex + 1, sDate.length);
	
	iIndex = sDate.indexOf('/');
	iMonth = parseFloat(sDate.substr(0, iIndex));
	iDay = parseFloat(sDate.substring(iIndex + 1, sDate.length));
	
	return new Date(iYear, iMonth - 1, iDay);
}
