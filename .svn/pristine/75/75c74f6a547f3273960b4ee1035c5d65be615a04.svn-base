
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

function Node(id, pid, name, url, title, target, icon, iconOpen, open) {
	this.id = id;
	this.pid = pid;
	this.name = name;
	this.url = url;
	this.title = title;
	this.target = target;
	this.icon = icon;
	this.iconOpen = iconOpen;
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
		target				: null,
		folderLinks			: true,
		useSelection		: true,
		useCookies			: true,
		useLines			: true,
		useIcons			: true,
		useStatusText		: false,
		closeSameLevel		: false,
		inOrder				: false,
		isMultiple			: false,//是否多选
		isChildrenSelected	: false,//选中时，是否选择子节点
		mcFiled				: "",//名称字段
		dmFiled				:""//代码字段
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
dTree.prototype.add = function(id, pid, name, url, title, target, icon, iconOpen, open) {
	this.aNodes[this.aNodes.length] = new Node(id, pid, name, url, title, target, icon, iconOpen, open);
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
		str+='<input type="checkbox" name="dtreebox" id="'+node.id+'" value="'+node.id+'" mc="'+node.name
			+'" onClick="dtreeboxClick(this,\''+this.config.dmFiled+'\',\''+this.config.mcFiled+'\','+this.config.isChildrenSelected+')">';
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


function loadTree(isMultiple,isChildrenSelected,dmFiled,mcFiled){
	d = new dTree('d');
	d.config.isMultiple=isMultiple||false;
	d.config.dmFiled=dmFiled||null;
	d.config.mcFiled=mcFiled||null;
	d.config.isChildrenSelected=isChildrenSelected||false;
	d.add("0","-1","请选择部门");
	if(dm_bm.length>0)
		d.add(dm_bm[0][0],"0",dm_bm[0][1]);
	for(i=1;i<dm_bm.length;i++){
		d.add(dm_bm[i][0],dm_bm[i][0].substr(0,dm_bm[i][0].length-2)||0,dm_bm[i][1]);
	}
	str = ""+d.addNode(d.root);
	$F("left").children[0].innerHTML=str;
		
}
 
 function Choose(node,nodeName,target){
 	if(node=="0")
		return;
 	 $F("SSBM").value=node;
 	 $F("BMMC").value=nodeName;
	 reloadUser(node);
	 $F("thisform").submit();
 }
 function hideOpen(){
 	if($F("left").children[0].style.display=="none"){
 		$F("left").style.width=200;
		$F("left").children[0].style.display="";
 		$F("right").style.width=document.body.clientWidth-$F("left").scrollWidth-44;
	}else{
		$F("left").children[0].style.display="none";
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
 
