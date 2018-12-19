dojo.require("dojo.lang.*");
dojo.require("dojo.widget.*");
dojo.require("dojo.widget.Tree");
dojo.require("dojo.widget.Button");
dojo.require("dojo.widget.LayoutContainer");
dojo.require("dojo.widget.LinkPane");
dojo.require("dojo.widget.SplitContainer");
dojo.require("dojo.widget.ContentPane");
dojo.require("dojo.widget.TreeRPCController");
dojo.require("dojo.widget.TreeSelector");
dojo.require("dojo.widget.TreeNode");
dojo.require("dojo.widget.TreeContextMenu");
dojo.require("dojo.widget.Dialog");
dojo.require("dojo.widget.FloatingPane");

function restoreIconSrc() {
	this.icon.src = this.oldIconSrc;
}

var treeNode, paraControllerId, paraIcon;

function NewTreeNode(objval) {
	parentNode = dojo.widget.manager.getWidgetById('treeSelector').selectedNode;
	controller = dojo.widget.manager.getWidgetById("treeController");
	if (parentNode != null && controller != null && objval != "") {
		if (!parentNode.isFolder) {
			parentNode.isFolder = true;
			parentNode.expandIcon.src = dojo.uri
					.dojoUri("src/widget/templates/images/Tree/treenode_expand_minus.gif");
		}

		var res = controller.createChild(parentNode, 0,
				eval('(' + objval + ')'));
		if (res == false) {
			alert("failed");
		}

		var docPane = dojo.widget.byId("docpane");
		var file = parentNode.object;
		if (!file) {
			docPane.setContent("");
		} else {
			docPane.setUrl(file);
		}
	}
}


function openChat(czryDm){
	parent.addChatMember(czryDm);
	var chat=window.open("/inc/platform/jsp/chat/chat.jsp?CZRY_DM="+czryDm,"win_"+czryDm,"left="+(screen.availWidth - 650)/2+",top="+(screen.availHeight - 500)/2+",width=635px,height=510px,scrollbars,resizable=yes,toolbar=no");
}



function DisplayTreeContent() {
	this.update = function(message) {
		var clickedTreeNode = message.node;

		var docPane = dojo.widget.byId("docpane");
		var file = clickedTreeNode.object;
		if (!file) {
			docPane.setContent("");
		} else if (file.indexOf("javascript:") != -1) {
			eval(file.replace("javascript:", ""));
			//将节点标记为未选中，以免下次点击时不反应
			dojo.widget.manager.getWidgetById('treeSelector').deselect();
		} else {
			docPane.setUrl(file);
		}
	};
}
var displayer = new DisplayTreeContent();

var nodeSelectionTopic = dojo.event.topic.getTopic("nodeSelected");
nodeSelectionTopic.subscribe(displayer, "update");

// display custom loadError or use built in
// works best from live server instead of filesystem
function contentLoadError(e) {
	var chkbox = dojo.byId("defaultLoadError");
	if (chkbox && chkbox.checked) {
		// use built in
		return;
	}
	e.preventDefault(); // or e.returnValue = false;
	var pane = dojo.widget.byId('docpane')
	pane
			.setContent("Custom Loaderror goes here<br/><img src='images/x.gif' style='float:left;'/> file not found");
	dialogHandler();// turn off loading dialog
}

// display custom Error(Content java/javascript eval error) or use built in
// method
function contentExecError(e) {
	var chkbox = dojo.byId("defaultEvalError");
	if (chkbox && chkbox.checked) {
		// use built in
		return;
	}
	e.preventDefault();
	alert('Oops! error occured:' + arguments[0]);
}

// display loading dialog or use built in "Loading..." message
function contentDownloadStart(e) {
	var chkbox = dojo.byId("defaultLoadInfo");
	if (chkbox && chkbox.checked) {
		// use built in
		return;
	}
	dialogHandler(e, true);
}

// show / hide loading dialog
function dialogHandler(e, show) {
	var dialog = dojo.widget.byId("statusDialog");
	if (show) {
		e.preventDefault();
		dialog.show();
		return;
	}
	dialog.hide();
}

dojo.addOnLoad(function() {

	var treeController = dojo.widget.manager.getWidgetById('treeController');
	var treeNode = dojo.widget.manager
			.getWidgetById('402881e70ad1d990010ad1e5ec930008');
	treeController.expand(treeNode);
	
	var treeSelector = dojo.widget.manager.getWidgetById('treeSelector');
	 
    dojo.event.connect(treeSelector,'click','treeClick');
});

 function treeClick() {
	 
	    var treeSelector = dojo.widget.manager.getWidgetById('treeSelector');
	    var treeNode = treeSelector.selectedNode;
	    alert(treeNode)
 }

