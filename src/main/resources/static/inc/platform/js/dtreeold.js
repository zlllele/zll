function dTree(objName) {
	this.config = {
		target				: null,
		folderLinks			: true,
		useLines			: true,
		useIcons			: true,
		useStatusText		: false,
		closeSameLevel	    : false
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
	this.root = new Node(-1);//执行Node方法   hzq
	//this.selectedNode = null;
	//this.selectedFound = false;
	this.completed = false;
};

// Open/close all nodes
dTree.prototype.openAll = function() {
	this.oAll(true);
};
dTree.prototype.closeAll = function() {
	this.oAll(false);
};

/*hzq分析的执行顺序：
  1、dTree--Node
  2、add--Node ………………中循环执行直至数组创建完毕，开始显示“document.write(d)”显示执行toString
  3、toString………………在显示时反复递归调用addNode--setCS--node
*/

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
    this.level = -2;
	this._ai = 0;
	this._p;
	this.pics = [];
};

// Adds a new node to the node array
dTree.prototype.add = function(id, pid, name, url, title, target, icon, iconOpen, open) {
	this.aNodes[this.aNodes.length] = new Node(id, pid, name, url, title, target, icon, iconOpen, open);
};

// Outputs the tree to the page
dTree.prototype.toString = function() {
	var str = '';
	if (document.getElementById) { //若浏览器支持
		str += this.addNode(this.root);
	} else str += 'Browser not supported.';
	this.completed = true;
	return str;
};

// Checks if a node has any children and if it is the last sibling(兄弟)
dTree.prototype.setCS = function(node) { 
	var lastId;
	for (var n=0; n<this.aNodes.length; n++) { 
		if (this.aNodes[n].pid == node.id) {
		    node._hc = true;
	    }
		if (this.aNodes[n].pid == node.pid) 
			lastId = this.aNodes[n].id;
	}
	if (lastId==node.id) node._ls = true;//true表示是最后一个子节点   hzq
}

dTree.prototype.setRoot = function(node) {
	for (var n=0; n<this.aNodes.length; n++) { 
		if (this.aNodes[n].id == node.pid) {
		    if (this.aNodes[n].pid=='9'){
				node.title=this.aNodes[n].url;
				break;
		    }else{
                var cn = this.aNodes[n];
				this.setRoot(cn);
			}
            continue;
	    }
	}
}
// Creates the tree structure(结构体)
dTree.prototype.addNode = function(pNode) {
	var str = '';
	var n=0;

	if (this.config.inOrder) n = pNode._ai;
	for (n; n<this.aNodes.length; n++) {
//         alert("pNode.id="+pNode.id+"  this.aNodes[n].id="+this.aNodes[n].id+"  n="+n);
    	if (this.aNodes[n].pid == pNode.id) {
			this.aIndent[this.aIndent.length]=n;
			var cn = this.aNodes[n]; 
		    cn._p = pNode;
		    cn._ai = n;
	        cn.level=pNode.level+1;
		    this.setCS(cn); 
       		this.indent_hu(this.aNodes[n],n,this.aIndent[this.aIndent.length-2]);
			str += this.node(cn, n,this.aIndent[this.aIndent.length-2]);
		    if (cn._ls) break; 
	    }
	}
	return str;
};
// Adds the empty and line icons
dTree.prototype.indent_hu = function(node, nodeId,sj) {
	if (this.root.id != node.pid) {
		//以下for循环判断本行数据需要显示的所有图标
		for (var n=0; n<node.level; n++){//原来是n<Math.max((node.level-this.aNodes[1].level),0)
		    var scnode = this.aNodes[sj];
			var temp=false;
		    for (var i=0; i<scnode.pics.length; i++)
               if (i==n && (scnode.pics[i]=='minus' || scnode.pics[i]=='plus' || scnode.pics[i]=='line')) temp=true;
			node.pics[node.pics.length] = (temp)?'line':'empty';
			temp=false;
		}
		if (node._hc) {//若有子节点
			if (!this.config.useLines) 
				 node.pics[node.pics.length] =   (node._io)?'nlMinus':'nlPlus';
			else node.pics[node.pics.length] = ( (node._io)?((node._ls && this.config.useLines)?'minusBottom':'minus'):((node._ls && this.config.useLines)?'plusBottom':'plus' ) );
		} else   node.pics[node.pics.length] = (this.config.useLines)?((node._ls)?'joinBottom':'join'):'empty';
	}
};
// Adds the empty and line icons
dTree.prototype.indent = function(node, nodeId,sj) {
	var str = '';
	if (this.root.id != node.pid) {
		for (var n=0; n<node.level; n++){
		    var scnode = this.aNodes[sj];
            var temp=false;
		    for (var i=0; i<scnode.pics.length; i++)
				if (i==n && (scnode.pics[i]=='minus' || scnode.pics[i]=='plus' || scnode.pics[i]=='line'))	temp=true;
				str += '<img src="'+((temp)?this.icon.line:this.icon.empty )+'"/>';
			temp=false;
		}
		if (node._hc) {//若有子节点
			str += '<font onClick="'+this.obj+'.o('+nodeId+');" style="cursor:hand"><img id="j'+this.obj+nodeId+'" src="';
			if (!this.config.useLines)	str += (node._io)?this.icon.nlMinus:this.icon.nlPlus;
			else//node._io 是否open
				str += ( (node._io)?((node._ls && this.config.useLines)?this.icon.minusBottom:this.icon.minus):((node._ls && this.config.useLines)?this.icon.plusBottom:this.icon.plus ) );
			str += '"/></font>';
		} else str += '<img src="'+((this.config.useLines)?((node._ls)?this.icon.joinBottom:this.icon.join):this.icon.empty)+'"/>';
		/*--------------------------------------hzq---20070131----------------begin
		if (node.pid!='9')
		{
		    if (node.title=='0') //0表示不是最后一个(岗位)--需要line.gif 1表示是最后一个(岗位)--
		       str = '<img src="'+this.icon.line+'"/>'+str;
     	    else str = '<img src="'+this.icon.empty+'"/>'+str;
		}
		/--------------------------------------hzq---20070131----------------end*/
	}
	return str;
};
// Creates the node icon, url and text
dTree.prototype.node = function(node, nodeId,sj) {
	var str = '<div class="dTreeNode">'+this.indent(node,nodeId,sj);
	
	if (this.config.useIcons) {
		if (!node.icon) node.icon = (this.root.id == node.pid)?this.icon.root:((node._hc)?this.icon.folder:this.icon.node);
		if (!node.iconOpen) node.iconOpen = (node._hc)?this.icon.folderOpen:this.icon.node;
		if (this.root.id == node.pid) {
			node.icon = this.icon.root;
			node.iconOpen = this.icon.root;
		}
		str += '<img id="i'+this.obj+nodeId+'" src="'+((node._io)?node.iconOpen:node.icon)+'"/>';
	}
	str += '<span id="selstr'+nodeId+'" onClick="Choose(\''+node.id+'\',\''+node.name+'\',\''+node.url+ '\');disp('+nodeId+');'+this.obj+'.o('+nodeId+');" style="cursor:hand">'+node.name+"</span>";
    if (node.url || ((!this.config.folderLinks || !node.url) && node._hc)) str += '</a>';
	str += '</div>';
	if (node._hc) {//若有子节点
		str += '<div id="d'+this.obj+nodeId+'" class="clip" style="display:'+((this.root.id == node.pid || node._io)?'block':'none')+';">';
		if (nodeId<2) str += this.addNode(node);
		str += '</div>';
	}
	return str;
};
var curindex=-1;
function disp(id) 
{
	eDiv	= document.getElementById('selstr'+id);
    if (curindex==-1) {
          eDiv.style.backgroundColor ="#A5B4FF";
          eDiv.style.color ="#ffffff";
          curindex=id;
    } else{
        if(id!=curindex){
			   eDiv1	= document.getElementById('selstr'+curindex);
	           eDiv.style.backgroundColor ="#A5B4FF";
	           eDiv.style.color ="#ffffff";
	           eDiv1.style.backgroundColor ='';
	           eDiv1.style.color ="#000000";
	           curindex=id;
		}else{
	           eDiv.style.backgroundColor ='';
	           eDiv.style.color ="#000000";
	           curindex=id;
	    }
    }
}
// Toggle Open or close
dTree.prototype.o = function(id) {
	var cn = this.aNodes[id];
	eDiv	= document.getElementById('d'+this.obj+id);
	if(!eDiv){
		return;
	}
	if (id>1 && !cn._io && (eDiv.innerHTML=='' || eDiv.innerHTML==null) ) {
		for (var n=this.aIndent.length; n>0; n--) {
		   this.aIndent[n-1]=null;
           this.aIndent.length=this.aIndent.length-1;
	    }
	    this.aIndent[0]=id;
		eDiv.innerHTML=this.addNode(cn);
	}	
	if (curindex==-1)  eDiv1 = document.getElementById('selstr1');
	else eDiv1 = document.getElementById('selstr'+curindex);
	eDiv1.style.backgroundColor ='';
    eDiv1.style.color ="#000000";
    if(cn._io==false){// curren node is close add by zhouchaoyang 2008-12-03
        //showHelp(cn.id);
    }
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
	this.updateCookie();
};

// Opens the tree to a specific node(特定的节点)
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
	eDiv	= document.getElementById('d'+this.obj+id);
	eJoin	= document.getElementById('j'+this.obj+id);
	if (this.config.useIcons) {
		eIcon	= document.getElementById('i'+this.obj+id);
		eIcon.src = (status)?this.aNodes[id].iconOpen:this.aNodes[id].icon;
	}
	if(eJoin){
		eJoin.src = (this.config.useLines)?
		((status)?((bottom)?this.icon.minusBottom:this.icon.minus):((bottom)?this.icon.plusBottom:this.icon.plus)):
		((status)?this.icon.nlMinus:this.icon.nlPlus);
	}
	eDiv.style.display = (status)?'block': 'none';
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
		escape(cookieName)+'='+escape(cookieValue)
		+ (expires?'; expires='+expires.toGMTString():'')
		+ (path?'; path='+path:'')
		+ (domain?'; domain='+domain:'')
		+ (secure?'; secure':'');
};

// [Cookie] Gets a value from a cookie
dTree.prototype.getCookie = function(cookieName) {
	var cookieValue = '';
	var posName = document.cookie.indexOf(escape(cookieName)+'=');
	if (posName != -1) {
		var posValue = posName+(escape(cookieName)+'=').length;
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
	this.setCookie('co'+this.obj, str);
};

// [Cookie] Checks if a node id is in a cookie
dTree.prototype.isOpen = function(id) {
	var aOpen = this.getCookie('co'+this.obj).split('.');
	for (var n=0; n<aOpen.length; n++)
		if (aOpen[n] == id) return true;
	return false;
};
//-->



