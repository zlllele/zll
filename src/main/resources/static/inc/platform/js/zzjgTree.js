
/*--------------------------------------------------|
| dTree 2.05 | www.destroydrop.com/javascript/tree/ |
|---------------------------------------------------|
| Copyright (c) 2002-2003 Geir Landr?               |
|                                                   |
| This script can be used freely as long as all     |
| copyright messages are intact.                    |
|                                                   |
| Updated: 17.04.2003                               |
|--------------------------------------------------*/

//以下禁止右键
/*if (window.Event) {
	document.captureEvents(Event.MOUSEUP);
}
function nocontextmenu() {
	event.cancelBubble = true;
	event.returnValue = false;
	return false;
}
function norightclick(e) {
	if (window.Event) {
		if (e.which == 2 || e.which == 3) {
			return false;
		}
	} else if (event.button == 2 || event.button == 3) {
		event.cancelBubble = true
		event.returnValue = false;
		return false;
	}
}
document.oncontextmenu = nocontextmenu;  // for IE5+
document.onmousedown = norightclick;  // for all others
*/
//禁止右键结束

// Node object
var loadRightUrl="list.jsp";

function Node(id, pid, name, url, title, target, icon, iconOpen, open,checked) {
	this.id = id;
	this.pid = pid;
	this.name = name;
	this.url = url;
	this.title = title;
	this.target = target;
	this.icon = icon;
	this.iconOpen = iconOpen;
	this.checked  = checked||false;
	this._io = open || false;
	this._is = false;
	this._ls = false;
	this._hc = false;
	this._ai = 0;
	this._p;
};

// Tree object
function dTree(objName) {
	this.config = {
		target					: null,
		folderLinks			: true,
		useSelection		: true,
		useCookies			: true,
		useLines				: true,
		useIcons				: true,
		useStatusText		: false,
		closeSameLevel	: false,
		inOrder					: false,
		isMultiple: false,//是否多选
		isChildrenSelected: false,//选中时，是否选择子节点
		mcFiled : "",//名称字段
		dmFiled:""//代码字段
	}
	this.icon = {
		root		: '/images/dtree/base.gif',
		folder		: '/images/dtree/folder.gif',
		folderOpen	: '/images/dtree/folderopen.gif',
		node		: '/images/dtree/page.gif',
		empty		: '/images/dtree/empty.gif',
		line		: '/images/dtree/line.gif',
		join		: '/images/dtree/join.gif',
		joinBottom	: '/images/dtree/joinbottom.gif',
		plus		: '/images/dtree/plus.gif',
		plusBottom	: '/images/dtree/plusbottom.gif',
		minus		: '/images/dtree/minus.gif',
		minusBottom	: '/images/dtree/minusbottom.gif',
		nlPlus		: '/images/dtree/nolines_plus.gif',
		nlMinus		: '/images/dtree/nolines_minus.gif'
	};
	this.obj = objName;
	this.aNodes = [];
	this.aIndent = [];
	this.root = new Node(-1);
	this.selectedNode = null;
	this.selectedFound = false;
	this.completed = false;
};

// Adds a new node to the node array
dTree.prototype.add = function(id, pid, name, url, title, target, icon, iconOpen, open,checked) {
	this.aNodes[this.aNodes.length] = new Node(id, pid, name, url, title, target, icon, iconOpen, open,checked);
};

// Open/close all nodes
dTree.prototype.openAll = function() {
	this.oAll(true);
};
dTree.prototype.closeAll = function() {
	this.oAll(false);
};

// Outputs the tree to the page
dTree.prototype.toString = function() {
	var str = '<div class="dtree">\n';
	if (document.getElementById) {
		if (this.config.useCookies) this.selectedNode = this.getSelected();
		str += this.addNode(this.root);
	} else str += 'Browser not supported.';
	str += '</div>';
	if (!this.selectedFound) this.selectedNode = null;
	this.completed = true;
	return str;
};

// Creates the tree structure
dTree.prototype.addNode = function(pNode) {
	var str = '';
	var n=0;
	if (this.config.inOrder) n = pNode._ai;
	for (n; n<this.aNodes.length; n++) {
		if (this.aNodes[n].pid == pNode.id) {
			var cn = this.aNodes[n];
			cn._p = pNode;
			cn._ai = n;
			this.setCS(cn);
			if (!cn.target && this.config.target) cn.target = this.config.target;
			if (cn._hc && !cn._io && this.config.useCookies) cn._io = this.isOpen(cn.id);
			if (!this.config.folderLinks && cn._hc) cn.url = null;
			if (this.config.useSelection && cn.id == this.selectedNode && !this.selectedFound) {
					cn._is = true;
					this.selectedNode = n;
					this.selectedFound = true;
			}
			str += this.node(cn, n);
			if (cn._ls) break;
		}
	}
	return str;
};

// Creates the node icon, url and text
dTree.prototype.node = function(node, nodeId) {
	var str = '<div class="dtree">' + this.indent(node, nodeId);
	if (this.config.useIcons) {
		if (!node.icon) node.icon = (this.root.id == node.pid) ? this.icon.root : ((node._hc) ? this.icon.folder : this.icon.node);
		if (!node.iconOpen) node.iconOpen = (node._hc) ? this.icon.folderOpen : this.icon.node;
		if (this.root.id == node.pid) {
			node.icon = this.icon.root;
			node.iconOpen = this.icon.root;
		}
		str += '<img id="i' + this.obj + nodeId + '" src="' + ((node._io) ? node.iconOpen : node.icon) + '" alt="" />';
	}
	if(this.config.isMultiple&&this.root.id != node.pid){
		//str + = '<input type="checkbox" name="dtreebox" value="'+""+'" onClick="dtreeboxClick(this)">';
		str+='<input type="checkbox" name="dtreebox" value="'+node.id+'" mc="'+node.name
			+'" '+(node.checked?'checked':'')+' onClick="dtreeboxClick(this,\''+this.config.dmFiled+'\',\''+this.config.mcFiled+'\','+this.config.isChildrenSelected+')">';
	}
	if (node.url) {
		str += '<a id="s' + this.obj + nodeId + '" title="'+node.name+'" class="' + ((this.config.useSelection) ? ((node._is ? 'nodeSel' : 'node')) : 'node') + '" href="' + node.url + '"';
		if (node.title) str += ' title="' + node.title + '"';
		if (node.target) str += ' target="' + node.target + '"';
		if (this.config.useStatusText) str += ' onmouseover="window.status=\'' + node.name + '\';return true;" onmouseout="window.status=\'\';return true;" ';
		if (this.config.useSelection && ((node._hc && this.config.folderLinks) || !node._hc))
			str += ' onclick="javascript: ' + this.obj + '.s(' + nodeId + ');"';
		str += '>';
	}
	else if ((!node.url)  && node.pid != this.root.id)
		str += '<a href="javascript:Choose(\'' + node.id + '\',\''+node.name+'\');" title="'+node.name+'" class="node">';
		//str += '<a href="javascript: ' + this.obj + '.o(' + nodeId + ');" class="node">';
	str += node.name+"</a>";
	if (node.url || ((!this.config.folderLinks || !node.url) && node._hc)) str += '</a>';
	str += '</div>';
	if (node._hc) {
		str += '<div id="d' + this.obj + nodeId + '" class="clip" style="display:' + ((this.root.id == node.pid || node._io) ? 'block' : 'none') + ';">';
		str += this.addNode(node);
		str += '</div>';
	}
	this.aIndent.pop();
	return str;
	
};

// Adds the empty and line icons
dTree.prototype.indent = function(node, nodeId) {
	var str = '';
	if (this.root.id != node.pid) {
		for (var n=0; n<this.aIndent.length; n++)
			str += '<img src="' + ( (this.aIndent[n] == 1 && this.config.useLines) ? this.icon.line : this.icon.empty ) + '" alt="" />';
		(node._ls) ? this.aIndent.push(0) : this.aIndent.push(1);
		if (node._hc) {
			str += '<a href="javascript: ' + this.obj + '.o(' + nodeId + ');"><img id="j' + this.obj + nodeId + '" src="';
			if (!this.config.useLines) str += (node._io) ? this.icon.nlMinus : this.icon.nlPlus;
			else str += ( (node._io) ? ((node._ls && this.config.useLines) ? this.icon.minusBottom : this.icon.minus) : ((node._ls && this.config.useLines) ? this.icon.plusBottom : this.icon.plus ) );
			str += '" alt="" /></a>';
		} else str += '<img src="' + ( (this.config.useLines) ? ((node._ls) ? this.icon.joinBottom : this.icon.join ) : this.icon.empty) + '" alt="" />';
	}
	return str;
};

// Checks if a node has any children and if it is the last sibling
dTree.prototype.setCS = function(node) {
	var lastId;
	for (var n=0; n<this.aNodes.length; n++) {
		if (this.aNodes[n].pid == node.id) node._hc = true;
		if (this.aNodes[n].pid == node.pid) lastId = this.aNodes[n].id;
	}
	if (lastId==node.id) node._ls = true;
};

// Returns the selected node
dTree.prototype.getSelected = function() {
	var sn = this.getCookie('cs' + this.obj);
	return (sn) ? sn : null;
};

// Highlights the selected node
dTree.prototype.s = function(id) {
	if (!this.config.useSelection) return;
	var cn = this.aNodes[id];
	if (cn._hc && !this.config.folderLinks) return;
	if (this.selectedNode != id) {
		if (this.selectedNode || this.selectedNode==0) {
			eOld = document.getElementById("s" + this.obj + this.selectedNode);
			eOld.className = "node";
		}
		eNew = document.getElementById("s" + this.obj + id);
		eNew.className = "nodeSel";
		this.selectedNode = id;
		if (this.config.useCookies) this.setCookie('cs' + this.obj, cn.id);
	}
};

// Toggle Open or close
dTree.prototype.o = function(id) {
	var cn = this.aNodes[id];
	this.nodeStatus(!cn._io, id, cn._ls);
	cn._io = !cn._io;
	if (this.config.closeSameLevel) this.closeLevel(cn);
	if (this.config.useCookies) this.updateCookie();
};

// Open or close all nodes
dTree.prototype.oAll = function(status) {
	for (var n=0; n<this.aNodes.length; n++) {
		if (this.aNodes[n]._hc && this.aNodes[n].pid != this.root.id) {
			this.nodeStatus(status, n, this.aNodes[n]._ls)
			this.aNodes[n]._io = status;
		}
	}
	if (this.config.useCookies) this.updateCookie();
};

// Opens the tree to a specific node
dTree.prototype.openTo = function(nId, bSelect, bFirst) {
	if (!bFirst) {
		for (var n=0; n<this.aNodes.length; n++) {
			if (this.aNodes[n].id == nId) {
				nId=n;
				break;
			}
		}
	}
	var cn=this.aNodes[nId];
	if (cn.pid==this.root.id || !cn._p) return;
	cn._io = true;
	cn._is = bSelect;
	if (this.completed && cn._hc) this.nodeStatus(true, cn._ai, cn._ls);
	if (this.completed && bSelect) this.s(cn._ai);
	else if (bSelect) this._sn=cn._ai;
	this.openTo(cn._p._ai, false, true);
};

// Closes all nodes on the same level as certain node
dTree.prototype.closeLevel = function(node) {
	for (var n=0; n<this.aNodes.length; n++) {
		if (this.aNodes[n].pid == node.pid && this.aNodes[n].id != node.id && this.aNodes[n]._hc) {
			this.nodeStatus(false, n, this.aNodes[n]._ls);
			this.aNodes[n]._io = false;
			this.closeAllChildren(this.aNodes[n]);
		}
	}
}

// Closes all children of a node
dTree.prototype.closeAllChildren = function(node) {
	for (var n=0; n<this.aNodes.length; n++) {
		if (this.aNodes[n].pid == node.id && this.aNodes[n]._hc) {
			if (this.aNodes[n]._io) this.nodeStatus(false, n, this.aNodes[n]._ls);
			this.aNodes[n]._io = false;
			this.closeAllChildren(this.aNodes[n]);
		}
	}
}

// Change the status of a node(open or closed)
dTree.prototype.nodeStatus = function(status, id, bottom) {
	eDiv	= document.getElementById('d' + this.obj + id);
	eJoin	= document.getElementById('j' + this.obj + id);
	if (this.config.useIcons) {
		eIcon	= document.getElementById('i' + this.obj + id);
		eIcon.src = (status) ? this.aNodes[id].iconOpen : this.aNodes[id].icon;
	}
	eJoin.src = (this.config.useLines)?
	((status)?((bottom)?this.icon.minusBottom:this.icon.minus):((bottom)?this.icon.plusBottom:this.icon.plus)):
	((status)?this.icon.nlMinus:this.icon.nlPlus);
	eDiv.style.display = (status) ? 'block': 'none';
};


// [Cookie] Clears a cookie
dTree.prototype.clearCookie = function() {
	var now = new Date();
	var yesterday = new Date(now.getTime() - 1000 * 60 * 60 * 24);
	this.setCookie('co'+this.obj, 'cookieValue', yesterday);
	this.setCookie('cs'+this.obj, 'cookieValue', yesterday);
};

// [Cookie] Sets value in a cookie
dTree.prototype.setCookie = function(cookieName, cookieValue, expires, path, domain, secure) {
	document.cookie =
		escape(cookieName) + '=' + escape(cookieValue)
		+ (expires ? '; expires=' + expires.toGMTString() : '')
		+ (path ? '; path=' + path : '')
		+ (domain ? '; domain=' + domain : '')
		+ (secure ? '; secure' : '');
};

// [Cookie] Gets a value from a cookie
dTree.prototype.getCookie = function(cookieName) {
	var cookieValue = '';
	var posName = document.cookie.indexOf(escape(cookieName) + '=');
	if (posName != -1) {
		var posValue = posName + (escape(cookieName) + '=').length;
		var endPos = document.cookie.indexOf(';', posValue);
		if (endPos != -1) cookieValue = unescape(document.cookie.substring(posValue, endPos));
		else cookieValue = unescape(document.cookie.substring(posValue));
	}
	return (cookieValue);
};

// [Cookie] Returns ids of open nodes as a string
dTree.prototype.updateCookie = function() {
	var str = '';
	for (var n=0; n<this.aNodes.length; n++) {
		if (this.aNodes[n]._io && this.aNodes[n].pid != this.root.id) {
			if (str) str += '.';
			str += this.aNodes[n].id;
		}
	}
	this.setCookie('co' + this.obj, str);
};

// [Cookie] Checks if a node id is in a cookie
dTree.prototype.isOpen = function(id) {
	var aOpen = this.getCookie('co' + this.obj).split('.');
	for (var n=0; n<aOpen.length; n++)
		if (aOpen[n] == id) return true;
	return false;
};

// If Push and pop is not implemented by the browser
if (!Array.prototype.push) {
	Array.prototype.push = function array_push() {
		for(var i=0;i<arguments.length;i++)
			this[this.length]=arguments[i];
		return this.length;
	}
};
if (!Array.prototype.pop) {
	Array.prototype.pop = function array_pop() {
		lastElement = this[this.length-1];
		this.length = Math.max(this.length-1,0);
		return lastElement;
	}
};

function dtreeboxClick(obj,dmFiled,mcFiled,isChildrenSelected){
	if(dmFiled!=""){
		tmp = document.getElementById(dmFiled);
		if(tmp){
			if(obj.checked){
				if(tmp.value!=""&&tmp.value.substr(tmp.value.length-1,1)!=','){
					tmp.value+=",";
				}
				tmp.value+=obj.value+','
			}else{
				tmp.value=(","+tmp.value).replace(','+obj.value+',',',');
				if(tmp.value.indexOf(',')==0){
					tmp.value = tmp.value.substr(1);
				}
			}
		}
	}
	if(mcFiled!=""){
		tmp = document.getElementById(mcFiled);
		if(tmp){
			if(obj.checked){
				if(tmp.value!=""&&tmp.value.substr(tmp.value.length-1,1)!=','){
					tmp.value+=",";
				}
				tmp.value+=obj.mc+','
			}else{
				tmp.value =(","+tmp.value)//.replace(','+obj.mc+',',',');
				tmp.value =tmp.value.replace(','+obj.mc+',',',');
				if(tmp.value.indexOf(',')==0){
					tmp.value = tmp.value.substr(1);
				}
			}
		}
	}
	if(isChildrenSelected){
		objs = document.getElementsByName("dtreebox");
		for(i=0;i<objs.length;i++){
			if(objs[i].value.substr(0,obj.value.length)==obj.value&&objs[i].value!=obj.value){
				objs[i].checked=obj.checked;
				dtreeboxClick(objs[i],dmFiled,mcFiled,false);
			}
		}
	}
}

function loadTree(isMultiple,isChildrenSelected,dmFiled,mcFiled,url){
	d = new dTree('d');
	d.config.isMultiple=isMultiple||false;
	d.config.dmFiled=dmFiled||null;
	d.config.mcFiled=mcFiled||null;
	d.config.isChildrenSelected=isChildrenSelected||false;
	d.add("00","-1","请选择部门");
	if(dm_zzjg.length>0)
		d.add(dm_zzjg[0].zzjg_dm,"00",dm_zzjg[0].zzjg_mc);
	for(i=1;i<dm_zzjg.length;i++){
		d.add(dm_zzjg[i].zzjg_dm,dm_zzjg[i].sj_zzjg_dm,dm_zzjg[i].zzjg_mc);
	}
	str = ""+d.addNode(d.root);
	$F("left").children[0].innerHTML=str;
}
function loadTreeChoose(){
	d = new dTree('d');
	d.add("00","-1","请选择部门");
	if(dm_zzjg.length>0)
		d.add(dm_zzjg[0].zzjg_dm,"00",dm_zzjg[0].zzjg_mc,'javascript:querygroups(\''+dm_zzjg[0].zzjg_dm+'\',\''+dm_zzjg[0].zzjg_mc+'\')');
	for(i=1;i<dm_zzjg.length;i++){
		d.add(dm_zzjg[i].zzjg_dm,dm_zzjg[i].sj_zzjg_dm,dm_zzjg[i].zzjg_mc,'javascript:querygroups(\''+dm_zzjg[i].zzjg_dm+'\',\''+dm_zzjg[i].zzjg_mc+'\')');
	}
	str = ""+d.addNode(d.root);
	$F("left").children[0].innerHTML=str;
}
function loadZzjg(){
	var post = "qxxkdm="+request.QueryString("qxxkdm");
	var loadRightUrl="zzjgList.jsp";
	send_request(loadRightUrl,post,loadZzjgDeal);
}
var d = new dTree("d");
				d.add("00","-1","请选择部门");
function loadZzjgDeal(){
	if (http_request.readyState == 4) { // 判断对象状态
          if (http_request.status == 200) { // 信息已经成功返回，开始处理信息
          		//alert(unescape(http_request.responseText))
          		querying--;
				try{
       				eval(unescape(http_request.responseText));
				}catch(e){
					
				}
				//var dmList = getDmList();
				
				
				//////////////////////////
var icon_folder='/images/dtree/icon_mark.gif';
var icon_page='/images/dtree/icon_mark.gif';
var icon_action='/images/dtree/icon_s.gif';
if(dmList.length>0){
	dmList[0].sj1="00";
}
var c_dm="";
	for(i=0;i<dmList.length;i++){
		if(dmList[i].dm2){//模块的叶子节点 和 许可的首节点
			if(dmList[i].dm1!=c_dm){//page and aciton
				d.add(dmList[i].dm1,
					dmList[i].sj1,
					dmList[i].mc1,
					'javascript:loadRight(\''+dmList[i].dm1+'\',\''+dmList[i].mc1+'\',\'Add\')'
					,'','',icon_page,icon_page);
				d.add(dmList[i].dm1+"_"+dmList[i].dm2,
					dmList[i].dm1,
					dmList[i].mc2,
					'javascript:loadRightDm2(\''+dmList[i].dm2+'\')'
					,'','',icon_action,icon_action);
			}else{//许可
				
				d.add(dmList[i].dm1+"_"+dmList[i].dm2,
					dmList[i].dm1,
					dmList[i].mc2,
					'javascript:loadRightDm2(\''+dmList[i].dm2+'\')'
					,'','',icon_action,icon_action);
			}
		}else{//模块的非叶子节点
			d.add(dmList[i].dm1,
					dmList[i].sj1,
					dmList[i].mc1,
					'javascript:loadRight(\''+dmList[i].dm1+'\',\''+dmList[i].mc1+'\',\'Add\')'
					,'','',icon_folder,icon_folder);
		}
		c_dm=dmList[i].dm1
	}
	var str = ""+d.addNode(d.root);
	$F('left').innerHTML=str;  


           } else { //页面不正常
               alert("您所请求的页面有异常。");
           }
    }
	
	///////////////////////////
}
 
 function Choose(node,nodeName,target){
 	if(node=="0")
		return;
	loadRight(node,nodeName);
 }
 
 function loadRight(node,nodeName,regx){
 	if(node){
 		setCookie("node",node);
 		setCookie("nodeName",nodeName);
	}else{
		node=getCookie("node");
		nodeName=getCookie("nodeName");
	}	
	if(node==null||node==""){
		return;
	}
	var post = "qxxkdm="+request.QueryString("qxxkdm");
	post +="&ZZJG_DM="+node;
	post +="&ZZJG_MC="+escape(nodeName);//为何不可？ 
	//post +="&ZZJG_MC="+encodeURI(nodeName);//为何不可？ 
	var loadRightUrl="list.jsp";
	reg_qxxk = regx;
	//alert("loadRight:"+post);
	send_request(loadRightUrl,post,loadList);
 }

 function loadList(){
 	    if (http_request.readyState == 4) { // 判断对象状态
          if (http_request.status == 200) { // 信息已经成功返回，开始处理信息
       			querying--;
       			 $F("right").innerHTML = unescape(http_request.responseText);
				 initQxxk();
           } else { //页面不正常
               alert("您所请求的页面有异常。");
           }
    }
 }
 
 function checkAddGnmk()
 {
 	if($FV("MKBZ")=="Y")
 	{
 	 	alert("请修改模块类型后添加子模块");
 	}
 	else
 	{
 		showModel('gnmkAdd.jsp')
 	}
 }
  
 function loadRightGnmk(gnmk_dm){
	var post = "qxxkdm="+request.QueryString("qxxkdm");
	post +="&GNMK_DM="+gnmk_dm;
	post +="&MKXKID="+gnmk_dm;
	loadRightUrl="list.jsp"+"?"+post;
	send_request(loadRightUrl,post,loadListGnmk);
 }
 
 function loadListGnmk(){
 	    if (http_request.readyState == 4) { // 判断对象状态
          if (http_request.status == 200) { // 信息已经成功返回，开始处理信息
       			querying--;
       			 $F("right").innerHTML = unescape(http_request.responseText); 
				 initQxxk(new String('gnmk'));
           } else { //页面不正常
               alert("您所请求的页面有异常。");
           }
    }
 }
 
 function loadRightAct(pageName){
 	
 	var post = $FV('dtParams');
	loadRightUrl=pageName+"?"+post;	
	send_request(loadRightUrl,post,loadListAct);
 }
 
 function loadListAct(){
 	    if (http_request.readyState == 4) { // 判断对象状态
          if (http_request.status == 200) { // 信息已经成功返回，开始处理信息
          		querying--;
       			 $F("right").innerHTML = unescape(http_request.responseText);       			 	 
           		 SHOW_KHJM();
           } else { //页面不正常
               alert("您所请求的页面有异常。");
           }
    }
 }
 
 function loadRightStore(pageName){ 	
 	var post = $FV('dtParams');
	loadRightUrl=pageName+"?"+post;	
	send_request(loadRightUrl,post,loadListStore);
 }
 
 function loadListStore(){
 	    if (http_request.readyState == 4) { // 判断对象状态
          if (http_request.status == 200) { // 信息已经成功返回，开始处理信息
          		querying--;
       			 $F("right").innerHTML = unescape(http_request.responseText);       						 
				 aa();				 		 
           } else { //页面不正常
               alert("您所请求的页面有异常。");
           }
    }
 }
 /*function loadRightAllStore(pageName){ 	
 	var post = $FV('dtParams');
	loadRightUrl=pageName+"?"+post;	
	send_request(loadRightUrl,post,loadListAllStore);
 } 
 function loadListAllStore(){
 	    if (http_request.readyState == 4) { // 判断对象状态
          if (http_request.status == 200) { // 信息已经成功返回，开始处理信息
          		querying--;
       			 $F("right").innerHTML = unescape(http_request.responseText); 	 
           } else { //页面不正常
               alert("您所请求的页面有异常。");
           }
    }
 }*/
 
 function loadRightQxxk(mkxkid){ 	
	var post = "qxxkdm="+request.QueryString("qxxkdm");
	post +="&MKXKID="+mkxkid;
	post +="&QXXK_DM="+mkxkid;
	//alert("loadRightQxxk-post:"+post);
	loadRightUrl="list.jsp?"+post;//loadRightUrl="listQxxk.jsp?"+post;
	send_request(loadRightUrl,post,loadListQxxk);
 }
  
 function loadListQxxk(){
 	    if (http_request.readyState == 4) { // 判断对象状态
          if (http_request.status == 200) { // 信息已经成功返回，开始处理信息
          		querying--;
       			 $F("right").innerHTML = unescape(http_request.responseText); 
				 initQxxk(new String('qx'));
           } else { //页面不正常
               alert("您所请求的页面有异常。");
           }
    }
 }
 function hideOpen(){
 	if($F("left").children[0].style.display=="none"){
 		$F("left").style.width=200;
		$F("left").children[0].style.display="";
 		$F("right").style.width=document.body.clientWidth-$F("left").scrollWidth-44;
	}else{
		$F("left").children[0].style.display="block";
		$F("left").style.width=3;
 		$F("right").style.width=document.body.clientWidth-$F("left").scrollWidth-44;
	}
 }
 function changeSize(){
 	//if($F("left").children[0].style.display=="none"){
 		$F("left").style.width=lwidth;
		if(lwidth>200&&$F("left").children[0].style.display=="none"){
			$F("left").children[0].style.display="block";
		}
 		$F("right").style.width=document.body.clientWidth-$F("left").scrollWidth-44;
 }
 var isMouseDown=false;
 var oldx;
 var lwidth;
 function mousedown(){
 	document.body.style.cursor="e_resize";
 	isMouseDown=true;
	oldx=window.event.x;
	lwidth=$F("left").scrollWidth;
	return false;
 }
 function mouseup(){
 	isMouseDown=false;
	lwidth=$F("left").scrollWidth;
	document.body.style.cursor="default";
 }
 function mousemove(){
 	if(isMouseDown){
		lwidth+=window.event.x-oldx;
		changeSize();
		oldx=window.event.x;
	}
	
 }
 
 function showModelQxxkJs(url,param){
	send_request(url,encodeParam(param),showModelDeal);		
}
	
function showModel(url){
 	var obj = window.event.srcElement;
	var qxxkdm= obj.qxxkdm;	
	send_request(url,encodeParam($FV("dtParams")+"&qxxkdm="+qxxkdm),showModelDeal);		
}
	
function showModelDeal(){
	if (http_request.readyState == 4) { // 判断对象状态
      if (http_request.status == 200) { // 信息已经成功返回，开始处理信息         
			querying--;
   			 $F("right").innerHTML = unescape(http_request.responseText);   
			 initQxxk();
			 
       } else { //页面不正常
           alert("您所请求的页面有异常。");
           querying--;
       }
	}
}
function showModelLine(url){//action类型为93的操作,列表	
	var obj = window.event.srcElement;
		var qxxkdm= obj.qxxkdm;
		var dtParams ="";
		if(obj.tagName=="INPUT"){
			dtParams = window.location.href.substr(window.location.href.indexOf("?")+1);			
			if(dtParams.indexOf("qxxkdm")!=-1){
				dtParams=dtParams.replace("qxxkdm="+request.QueryString("qxxkdm"),"");
				dtParams+="&list=1";
			}
		}else{
			obj = getParent(obj,"SPAN");
			dtParams=obj.dtParams;
		}
		if(url.indexOf("?")==-1){
			url = url+"?qxxkdm="+qxxkdm+"&"+dtParams;
		}else{
			url = url+"&qxxkdm="+qxxkdm+"&"+dtParams;
		}	
	send_request(url,url.substring(url.indexOf("?")+1),showModelDeal);		
}
	


function checkAddGnmk()
 {
 	if($FV("MKBZ")=="Y")
 	{
 	 	alert("请修改模块类型后添加子模块");
 	}
 	else
 	{
 		showModel('gnmkAdd.jsp')
 	}
 }
 
