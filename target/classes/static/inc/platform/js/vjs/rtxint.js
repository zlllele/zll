//*************************************************
//
//	Author: Yu Zhang
//	Created Date: 2004-03-08
//	Version: 1.0.0.2 (the same with RTXName.dll)
//
//*************************************************

var RTX_STATUS_UNKNOWN = -1;
var RTX_STATUS_OFFLINE = 0;
var RTX_STATUS_ONLINE = 1;
var RTX_STATUS_AWAY = 2;

var RTX_DOWNLOAD_TIMEOUT_TRYCOUNT = 300; // 30s = 300 * 100
var rtx_downloadTryCount = 0;

var rtx_oldWinOnload = null;
var rtx_isFirstLoad = false;
var rtx_oldWinScroll = null;
var rtx_isInWinScroll = false;

var rtx_needDownload = false;
var rtx_codebase = null;

if(rtx_codebase == null)
{
	RDL("cab");
}

var rtx_nameControlID = "RTXNameControlID";
var rtx_nameControlHTMLFormat = "<object classid='clsid:8F8086BE-0925-481D-B3C1-06BCB4121A5E' codebase='/rtx/RTXName.dll#version=2.0.2.3' id='" + rtx_nameControlID + "' onerror='rtx_nameControlOnError();' style='display:none;'></object>";
var rtx_namePrefix = "rtxname";
var rtx_nameIndex = 0;
var rtx_nameControl = null;
var rtx_isNameControlInited = false;
var rtx_isNameControlLoadError = false;
var rtx_idDictionary = null;
var rtx_stateDictionary = null;
var rtx_nickDictionary = null;
var rtx_showOfflineDictionary = null;
var rtx_groupidDictionary = null;
var rtx_pageGroupNicks = "";

var m_isLogout = false;
var rtx_updateAllStatusCallInfo = null;
var rtx_frameRandom = 0;

//wwjs 2004.7.21 =============================
var rtx_deployUrlDictionary = null;
var rtx_helpUrlDictionary = null;
var rtx_userRTXClientDictionary = null;
var rtx_getStatusUrlDictionary = null;

var rtx_deployUrlDictionarys = null;
var rtx_helpUrlDictionarys = null;
var rtx_userRTXClientDictionarys = null;
var rtx_getStatusUrlDictionarys = null;

var RTX_USERTX = 1;//??????RTXClient,??????? noRTX,???????RTX
var RTX_DEF_DEPLOYURL = "/quickdeploy"; //??????
var RTX_DEF_HELPURL = "/help/start.htm";//????
var RTX_DEF_GETSTATUSURL = "/getstatus.php";//


/////////////wwjs 2004.7.21
//??? / ???host
function rtx_getStatusHost(url)
{
  var pos = 0;
  var re = new RegExp("[^/]/[^/]")
  var host = "";
 // alert(url);
  pos = url.search(re);
 // alert(pos);
  if(pos > 0)
  {
	 host = url.substr(0, pos+1);
  }
//  alert(host);
  return host;
}

function rtx_addUrl(src, id)
{
    //alert(id);
    var hostUrl = "";
    if(document.location && document.location.host)
	{
		hostUrl = "http://" + document.location.host;
	}
	//alert(hostUrl);

	if(typeof(src.statusUrl) != "undefined")
	{
		//alert(src.statusUrl);
		rtx_getStatusUrlDictionary[id] = src.statusUrl;
		hostUrl = rtx_getStatusHost(src.statusUrl);		
	}
	else
	{
		rtx_getStatusUrlDictionary[id] = hostUrl + RTX_DEF_GETSTATUSURL;
	}
		
	if(typeof(src.deployUrl) != "undefined")
	{
		rtx_deployUrlDictionary[id] = src.deployUrl;
	}
	else
	{
		rtx_deployUrlDictionary[id] = hostUrl + RTX_DEF_DEPLOYURL;
	}
				
	if(typeof(src.helpUrl) != "undefined")
	{
		rtx_helpUrlDictionary[id] = src.helpUrl;
	}
	else
	{
		rtx_helpUrlDictionary[id] = hostUrl + RTX_DEF_HELPURL;
	}
	

		
	if(typeof(src.noRTX) != "undefined")
	{
		rtx_userRTXClientDictionary[id] = 0;//???????RTX?
	}
	else
	{
		rtx_userRTXClientDictionary[id] = 1;
	}

	//alert(id);
	//alert(rtx_helpUrlDictionary[id]);
	//alert(rtx_helpUrlDictionary[id]);
	//alert(rtx_userRTXClientDictionary[id]);

}
function rtx_addGroupUrl(src, id)
{
    var hostUrl = "";
    if(document.location && document.location.host)
	{
		hostUrl = document.location.host;
	}

	if(typeof(src.statusUrl) != "undefined")
	{
		rtx_getStatusUrlDictionarys[id] = src.statusUrl;
		hostUrl = rtx_getStatusHost(src.statusUrl);		
	}
	else
	{
		rtx_getStatusUrlDictionarys[id] = hostUrl + RTX_DEF_GETSTATUSURL;
	}
			
	if(typeof(src.deployUrl) != "undefined")
	{
		rtx_deployUrlDictionarys[id] = src.deployUrl;
		
	}
	else
	{
		rtx_deployUrlDictionarys[id] = hostUrl + RTX_DEF_DEPLOYURL;
	}
				
	if(typeof(src.helpUrl) != "undefined")
	{
		rtx_helpUrlDictionarys[id] = src.helpUrl;
	}
	else
	{
		rtx_helpUrlDictionarys[id] = hostUrl + RTX_DEF_HELPURL;
	}

	
		
		
	if(typeof(src.noRTX) != "undefined")
	{
		rtx_userRTXClientDictionarys[id] = 0;//???????RTX?
	}
	else
	{
		rtx_userRTXClientDictionarys[id] = 1;
	}
}

function rtx_setUrl(deployUrl, helpUrl, useRTX, statusUrl)
{
	//alert(deployUrl);
	//alert(helpUrl);
	//alert(useRTX);
	
	//rtx_nameControl.DeployUrl = deployUrl;
	//rtx_nameControl.HelpUrl = helpUrl;
	//rtx_nameControl.UseRTXClient = useRTX;
	//rtx_nameControl.GetStatusUrl = statusUrl;
}
function rtx_setUrlFromID(id)
{
//	alert(rtx_idDictionary[id]);
//	alert(id);
//	alert(rtx_nickDictionary[id]);
//	alert(rtx_userRTXClientDictionary[id]);

	rtx_setUrl(rtx_deployUrlDictionary[id], 
	rtx_helpUrlDictionary[id], 
	rtx_userRTXClientDictionary[id],
	rtx_getStatusUrlDictionary[id]);
}
function rtx_setUrlFromIDs(id)
{
	rtx_setUrl(rtx_deployUrlDictionarys[id], 
	rtx_helpUrlDictionarys[id], 
	rtx_userRTXClientDictionarys[id],
	rtx_getStatusUrlDictionarys[id]);
}
///////////////////////////////////////////////////////




function RAGP(nicks, isPageGroup)
{
	rtx_addGroupPresence(nicks, isPageGroup);
}

function rtx_addGroupPresence(nicks, isPageGroup)
{
    var src = event.srcElement;
	var id;
	
	rtx_register_winOnload();
	
	if(!rtx_groupidDictionary)
	{
		rtx_groupidDictionary = new Object();

		rtx_deployUrlDictionarys = new Object();
		rtx_helpUrlDictionarys = new Object();
		rtx_userRTXClientDictionarys = new Object();
		rtx_getStatusUrlDictionarys = new Object();
	
		

	}
	
	if(rtx_groupidDictionary && src && typeof(nicks) == "string")
	{
		id = rtx_namePrefix + (rtx_nameIndex++);
		src.id = id;
		src.isGroup = true;
		
		if(isPageGroup)
		{
			src.isPageGroup = true;
		}

		rtx_groupidDictionary[id] = nicks;
		rtx_addGroupUrl(src, id);

		src.onload = null;
	}
}

function rtx_updateGroupImages()
{
	var id;
	var obj;
	var img;
	
	for(id in rtx_groupidDictionary)
	{
		obj = document.images(id);
		
		if(obj && obj.isGroup)
		{
			obj.onmouseover = rtx_showUIMouse;
			obj.onmouseout = rtx_hideUI;

			img = "rtxgrp.gif";
			window.setTimeout("rtx_updateImage('" + id + "', '" + img + "');", 1);
		}
	}
}

function RAP(RTXNum)
{
	rtx_addPresence(RTXNum);
}

function rtx_addPresence(RTXNum)
{
	var nick=RTXNum;
    var src = event.srcElement;
	var id;
	
	rtx_register_winOnload();
	
	if(!rtx_idDictionary)
	{
		rtx_idDictionary = new Object();
		rtx_stateDictionary = new Object();
		rtx_nickDictionary = new Object();
		rtx_showOfflineDictionary = new Object();
		
		rtx_deployUrlDictionary = new Object();
		rtx_helpUrlDictionary = new Object();
		rtx_userRTXClientDictionary = new Object();
		rtx_getStatusUrlDictionary = new Object();
		
	}
	
	
	if(rtx_idDictionary && src)
	{
		id = rtx_namePrefix + (rtx_nameIndex++);
		
		src.id = id;
		
		rtx_idDictionary[id] = nick;
		
		rtx_stateDictionary[id] = RTX_STATUS_UNKNOWN;
		
		if(typeof(rtx_nickDictionary[nick]) == "undefined")
		{
			rtx_nickDictionary[nick] = new Array();
			rtx_pageGroupNicks += nick + '\0';
		}
		
		var idArray = rtx_nickDictionary[nick];
		
		if(typeof(idArray) == "object")
		{
			idArray[idArray.length] = id;
		}

		if(typeof(src.showOffline) != "undefined")
		{
			rtx_showOfflineDictionary[id] = true;
		}
		/////////////wwjs 2004.7.21
		rtx_addUrl(src, id);
		/////////////////////////////////////////
		
		
		
		src.onload = null;
        src.onmouseover = rtx_showUIMouse;
        src.onmouseout = rtx_hideUI;
	}
}

function rtx_showUIMouse()
{
    rtx_showUI(0);
}

function rtx_showUI(inputType)
{
	var obj =  event.srcElement;

	if(obj && rtx_nameControl)
	{
		var uiLocation = rtx_getUILocation(obj);
		
		//wwjs 2004.7.21
		var deployUrl = null;
		var helpUrl = null;
		var useRTX = null;

		if(obj.isGroup)
		{
			var nicks = null;
			
			if(obj.isPageGroup)
			{
				nicks = rtx_pageGroupNicks;
			}
			else if(rtx_groupidDictionary)
			{
				nicks = rtx_groupidDictionary[obj.id];
	
			}

			if(typeof(nicks) == "string" && nicks.length > 0)
			{
				//wwjs 2004.7.21
				rtx_setUrlFromIDs(obj.id);
				rtx_nameControl.ShowGroupUI(nicks, inputType, uiLocation.uiX, uiLocation.uiY);
			}
		}
		else
		{
			if(rtx_idDictionary)
			{
				var nick = rtx_idDictionary[obj.id];
				//wwjs 2004.7.21
				rtx_setUrlFromID(obj.id);
				rtx_nameControl.ShowOOUI(nick, inputType, uiLocation.uiX, uiLocation.uiY);
			}
		}
	}
}

function rtx_getUILocation(objSrc)
{
	var obj = objSrc;
	var uiLocation = new Object();
	var uiX = 0;
	var uiY = 0
	var objDX = 0;
	var fRtl = (document.dir == "rtl");
	var parentWindow = window;
	
	if(rtx_frameRandom == 0)
	{
		var dt = new Date();

		rtx_frameRandom = dt.getSeconds() * 1000 + dt.getMilliseconds();
	}

	rtx_frameRandom++;

	while(obj && obj.rtxframeRandom != rtx_frameRandom)
	{
		obj.rtxframeRandom = rtx_frameRandom;

		if(fRtl)
		{
			if(obj.scrollWidth >= obj.clientWidth + obj.scrollLeft)        
			{
				objDX = obj.scrollWidth - obj.clientWidth - obj.scrollLeft;
			}
			else
			{
				objDX = obj.clientWidth + obj.scrollLeft - obj.scrollWidth;
			}

			uiX += obj.offsetLeft + objDX;
		}
		else
		{
			uiX += obj.offsetLeft - obj.scrollLeft;
		}

		uiY += obj.offsetTop - obj.scrollTop;
		obj = obj.offsetParent;            

		if(!obj)
		{
			if(parentWindow.frameElement)
			{
				obj = parentWindow.frameElement;

				parentWindow = parentWindow.parent;
			}
		}
	}

	if(parentWindow)
	{
		uiX += parentWindow.screenLeft;
		uiY += parentWindow.screenTop;
	}

	uiLocation.uiX = uiX;
	uiLocation.uiY = uiY;

	if(fRtl)
	{
		uiLocation.uiX += objSrc.offsetWidth;
	}

	return uiLocation;
}

function rtx_hideUI()
{
	if(rtx_nameControl)
	{
		rtx_nameControl.HideOOUI();
		return false;
	}

	return true;
}

function rtx_register_winScroll()
{
	rtx_oldWinScroll = window.onscroll;
	window.onscroll = rtx_winScroll;
}

function rtx_winScroll()
{
	if(!rtx_isInWinScroll)
	{
		rtx_isInWinScroll = true;
		rtx_hideUI();
	}

	rtx_isInWinScroll = false;

	return typeof(rtx_oldWinScroll) == "function" ? rtx_oldWinScroll() : true;   
}

function RDL(codebase)
{
	rtx_download(codebase);
}

function rtx_download(codebase)
{
	if(typeof(codebase) == "string")
	{
		rtx_needDownload = true;
		rtx_codebase = codebase;
	}
}

function rtx_downloadNameControl()
{
	var strHTML = rtx_nameControlHTMLFormat.replace(/%CODEBASE%/g, rtx_codebase);

	document.body.insertAdjacentHTML("beforeEnd", strHTML);
	
	rtx_nameControlLoadTimer();
}

function rtx_createNameControl()
{
	if(rtx_needDownload)
	{
		rtx_downloadNameControl();
	}
	else
	{
		rtx_ensureNameControl();
	}
}

function rtx_nameControlOnload()
{
	rtx_ensureNameControl();
}

function rtx_nameControlLoadTimer()
{
	if(!rtx_isNameControlLoadError)
	{
		var obj = document.all(rtx_nameControlID);

		if(obj && typeof(obj.PresenceEnabled) != "undefined")
		{
			if(obj.PresenceEnabled)
			{
				rtx_nameControlOnload();
			}
		}
		else
		{
			if(rtx_downloadTryCount < RTX_DOWNLOAD_TIMEOUT_TRYCOUNT)
			{
				rtx_downloadTryCount++;
				window.setTimeout("rtx_nameControlLoadTimer();", 100);
			}
			else
			{
				rtx_ensureNameControl(); // Advanced try.
			}
		}
	}
	else
	{
		rtx_ensureNameControl(); // Advanced try.
	}
}

function rtx_nameControlOnError()
{
	rtx_isNameControlLoadError = true;
}

function rtx_ensureNameControl()
{
    if(!rtx_isNameControlInited)
    {
		if(rtx_browserInfo.ie5up && rtx_browserInfo.win32)
		{
//@cc_on
//@if(@_jscript_version >= 5)
//@			try
//@			{
//@				rtx_nameControl = new ActiveXObject("RTXName.NameCtrl");
//@			}
//@			catch(e)
//@			{
//@			};
//@else
//@end
		}
        
		rtx_isNameControlInited = true;

		if(rtx_nameControl)
		{
			if(rtx_nameControl.PresenceEnabled)
			{
				rtx_register_winScroll();
				
				if(rtx_nameControl.SupportGroup)
				{
					rtx_updateGroupImages();
				}
				
				rtx_nameControl.OnStatusChange = rtx_OnStatusChange;
				rtx_updateAllStatus(2);
			}
			else
			{
				rtx_nameControl = null;
			}
		}
	}
	
	return rtx_nameControl;
}

function rtx_OnStatusChange(nick, state, file, rtxNum)
{
//    window.status = nick + ":" + state + ":" + file + ":" + rtxNum;

    if(rtx_idDictionary)
    {
		if(state >= 0)
		{
			var idArray = rtx_getIDArrayFromNick(nick);
			var index;

			if(idArray)
			{
				for(index in idArray)
				{
					rtx_updateImageOfID(idArray[index], state, file);
				}
			}

			rtx_onlogin();
        }
        else
        {
			switch(state)
			{
			case -1:
				m_isLogout = true;
			
				window.setTimeout("rtx_allOffline();", 1000);
				break;
			case -2:
				rtx_onlogin();
				break;
			default:
				break;
			}
        }
    }
}

function rtx_winOnload()
{
	if(typeof(rtx_oldWinOnload) == "function")
	{
		rtx_oldWinOnload();
	}
	
	rtx_createNameControl();
}

function rtx_register_winOnload()
{
	if(!rtx_isFirstLoad)
	{
		rtx_isFirstLoad = true;
		
		rtx_oldWinOnload = window.onload;
		window.onload = rtx_winOnload;
	}
}

function rtx_getIDArrayFromNick(nick)
{
    var idArray = null;

    if(typeof(nick) == "string" && typeof(rtx_nickDictionary[nick]) == "object")
    {
        idArray = rtx_nickDictionary[nick];
    }

    return idArray;
}

function rtx_allOffline()
{
	var state = RTX_STATUS_OFFLINE;
	var nick;
	var idArray;
	var index;
	
	if(rtx_nickDictionary)
	{
		for(nick in rtx_nickDictionary)
		{
			idArray = rtx_getIDArrayFromNick(nick);

			if(idArray)
			{
				for(index in idArray)
				{
					rtx_updateImageOfID(idArray[index], state, "");
				}
			}
		}
	}

	m_retryCount = 0;
}

function rtx_isOnlineState(state)
{
	return state == RTX_STATUS_ONLINE || state == RTX_STATUS_AWAY;
}

function rtx_onlogin()
{
	if(m_isLogout)
	{
		m_isLogout = false;

		if(!rtx_updateAllStatusCallInfo)
		{
			window.setTimeout("rtx_updateAllStatus(5);",6000);
		}
	}
}

function rtx_updateAllStatus(retryCount)
{
	var updateCount;
	var state = 0;
	var stateImage;
	var nick;
	var id;
	var dict;
	var i;
	var idArray;
	var maxLoopCount = 10;
	
	if(!rtx_updateAllStatusCallInfo)
	{
		rtx_updateAllStatusCallInfo = new Object();
		
		updateCount = 0;
		
		dict = new Object();
		rtx_updateAllStatusCallInfo.dict = dict;

		i = 0;
		idArray = new Array();
		for(id in rtx_idDictionary)
		{
			idArray[i++] = id;
		}
		rtx_updateAllStatusCallInfo.idArray = idArray;

		rtx_updateAllStatusCallInfo.index = 0;
	}
	else
	{
		updateCount = rtx_updateAllStatusCallInfo.updateCount;
		dict = rtx_updateAllStatusCallInfo.dict;
		idArray = rtx_updateAllStatusCallInfo.idArray;
	}

	if(rtx_idDictionary && rtx_nameControl && dict && idArray)
	{
		var loopCount = idArray.length < (rtx_updateAllStatusCallInfo.index + maxLoopCount) ? idArray.length : (rtx_updateAllStatusCallInfo.index + maxLoopCount); 

		for(i = rtx_updateAllStatusCallInfo.index; i < loopCount; i++)
		{
			id = idArray[i];
			nick = rtx_idDictionary[id];

			if(dict[nick])
			{
				stateImage = dict[nick].stateImage;
				state = dict[nick].state;
			}
			else
			{
				rtx_setUrlFromID(id);
				stateImage = rtx_nameControl.GetStatusImage(nick, id);
				state = rtx_getStatusFromImage(stateImage);
				
				dict[nick] = new Object();
				dict[nick].stateImage = stateImage;
				dict[nick].state = state;

				if(rtx_isOnlineState(state))
				{
					updateCount++;
				}
			}
			
			if(rtx_updateImageOfID(id, state, stateImage))
			{
			}
		}
		
		if(!m_isLogout)
		{
			if(i < idArray.length)
			{
				rtx_updateAllStatusCallInfo.index = i;
				rtx_updateAllStatusCallInfo.updateCount = updateCount;
				window.setTimeout("rtx_updateAllStatus(" + retryCount + ");", 10);
			}
			else
			{
				rtx_updateAllStatusCallInfo = null;
				
				if(updateCount < 2)
				{
					retryCount--;
					
					if(retryCount > 0)
					{
						window.setTimeout("rtx_updateAllStatus(" + retryCount + ");", 6000);
					}
				}
			}
		}
		else
		{
			rtx_updateAllStatusCallInfo = null;
		}
	}
}

function rtx_getStatusImage(state, stateImage, showOffline)
{
	var img = "blank.gif";

	if(stateImage == "")
	{
		switch(state)
		{
		case RTX_STATUS_OFFLINE:
			if(showOffline)
			{
				img = "rtxoff.gif";
			}
			else
			{
				img = "blank.gif";
			}
			break;      
		case RTX_STATUS_ONLINE:
			img = "rtxon.gif";
			break;  
		case RTX_STATUS_AWAY:
			img = "rtxaway.gif";
			break;
		default:
			break;
		}
	}
	else
	{
		if(state == RTX_STATUS_UNKNOWN || (state == RTX_STATUS_OFFLINE && !showOffline))
		{
			img = "blank.gif";
		}
		else
		{
			img = stateImage;
		}
	}

	return img;
}
function rtx_getStatusFromImage(stateImage)
{
	var state = RTX_STATUS_UNKNOWN;
	var stateFromImage;
	var ext = "";

	if(typeof(stateImage) == "string" && stateImage.length >= 5)
	{
		ext = stateImage.substring(stateImage.length - 4, stateImage.length);

		if(ext == ".bmp")
		{
			stateFromImage = stateImage.substring(stateImage.length - 5, stateImage.length - 4);
			
			stateFromImage = parseInt(stateFromImage, 10);
			
			if(isNaN(stateFromImage))
			{
				stateFromImage = 0;
			}
			
			switch(stateFromImage)
			{
			case 1:
				state = RTX_STATUS_ONLINE;
				break;
			case 2:
				state = RTX_STATUS_OFFLINE;
				break;
			case 3:
				state = RTX_STATUS_AWAY;
				break;
			default:
				state = RTX_STATUS_UNKNOWN;
				break;
			}
		}
	}

	return state;
}

function rtx_updateImageOfID(id, state, stateImage)
{
	var isUpdate = false;

	if(rtx_idDictionary && id != null)
	{
		var img = rtx_getStatusImage(state, stateImage, rtx_showOfflineDictionary[id]);

		if(rtx_stateDictionary[id] != state)
		{
			img = img.replace(/\\/g, "\\\\");
			window.setTimeout("rtx_updateImage('" + id + "', '" + img + "');rtx_stateDictionary['" + id + "'] = " + state + ";", 1);

			isUpdate = true;
		}
	}

	return isUpdate;
}

function rtx_updateImage(id, img)
{
	var obj = document.images(id);

	if(obj && typeof(img) == "string")
	{
		var oldImg = obj.src;
		var index;
		var newImg;

		if(!obj.imageBaseURL)
		{
			index = oldImg.lastIndexOf("/");
			obj.imageBaseURL = oldImg.slice(0, index + 1);
		}

		index = img.lastIndexOf("\\");

		if(index == -1)
		{
			newImg = obj.imageBaseURL + img;
		}
		else
		{
			newImg = img;
		}

		if(oldImg != newImg)
		{
			obj.style.filter = "Chroma(Color = '#00008080', Enable = true)";
			obj.src = newImg;
		}
	}
}
function rtx_browserInfoClass() {
	var agt = navigator.userAgent.toLowerCase();

	this.osver = 1.0;

	if (agt)
	{
		var stOSVer = agt.substring(agt.indexOf("windows ") + 11);
		this.osver = parseFloat(stOSVer);
	}

	this.major = parseInt(navigator.appVersion);
	this.nav = ((agt.indexOf('mozilla') != -1)
		&& ((agt.indexOf('spoofer') == -1)
		&& (agt.indexOf('compatible') == -1)));
	this.nav2 = (this.nav && (this.major == 2));
	this.nav3 = (this.nav && (this.major == 3));
	this.nav4 = (this.nav && (this.major == 4));
	this.nav6 = this.nav && (this.major == 5);
	this.nav6up = this.nav && (this.major >= 5);
	this.nav7up = false;

	if(this.nav6up)
	{
		var navIdx = agt.indexOf("netscape/");
		if(navIdx >=0)
		{
			this.nav7up = parseInt(agt.substring(navIdx+9)) >= 7;
		}
	}

	this.ie = (agt.indexOf("msie")!=-1);
	this.aol = this.ie && agt.indexOf(" aol ")!=-1;
	if (this.ie)
	{
		var stIEVer = agt.substring(agt.indexOf("msie ") + 5);
		this.iever = parseInt(stIEVer);
		this.verIEFull = parseFloat(stIEVer);
	}
	else
	{
		this.iever = 0;
	}
	
	this.ie3 = ( this.ie && (this.major == 2));
	this.ie4 = ( this.ie && (this.major == 4));
	this.ie4up = this.ie && (this.major >= 4);
	this.ie5up = this.ie && (this.iever >= 5);
	this.ie55up = this.ie && (this.verIEFull >= 5.5);
	this.ie6up = this.ie && (this.iever >= 6);
	this.win16 = ((agt.indexOf("win16") != -1)
		|| (agt.indexOf("16bit") != -1)
		|| (agt.indexOf("windows 3.1") != -1)
		|| (agt.indexOf("windows 16-bit") != -1));
	this.win31 = (agt.indexOf("windows 3.1") != -1)
		|| (agt.indexOf("win16") != -1)
		|| (agt.indexOf("windows 16-bit")!=-1);
	this.win98 = ((agt.indexOf("win98") != -1) || (agt.indexOf("windows 98") != -1));
	this.win95 = ((agt.indexOf("win95") != -1) || (agt.indexOf("windows 95") != -1));
	this.winnt = ((agt.indexOf("winnt") != -1) || (agt.indexOf("windows nt") != -1));
	this.win32 = this.win95
		|| this.winnt
		|| this.win98
		|| ((this.major >= 4) && (navigator.platform == "Win32"))
		|| (agt.indexOf("win32") != -1)
		|| (agt.indexOf("32bit") != -1);
	this.os2 = (agt.indexOf("os/2")!=-1) 
		|| (navigator.appVersion.indexOf("OS/2") != -1)  
		|| (agt.indexOf("ibm-webexplorer") != -1);
	this.mac = (agt.indexOf("mac") != -1);
	this.mac68k = this.mac && ((agt.indexOf("68k") != -1)
		|| (agt.indexOf("68000") != -1));
	this.macppc = this.mac
		&& ((agt.indexOf("ppc") != -1) || (agt.indexOf("powerpc") != -1));
	this.w3c = this.nav6up;
}
var rtx_browserInfo = new rtx_browserInfoClass();
