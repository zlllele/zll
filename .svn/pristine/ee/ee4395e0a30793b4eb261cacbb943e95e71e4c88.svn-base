/**
 * 
 * @param obj
 *            obj.url obj.treeId obj.inputMc obj.inputDm obj.autoParam obj.containerId
 */
function initZtree(obj) {

	var settingtree = {

		async : {
			enable : true,// true 表示 开启 异步加载模式 false 表示 关闭 异步加载模式
			url : obj.url,
			autoParam : obj.autoParam,
			// otherParam:obj.otherParam,
			otherParam : {
				YXBZ : '',
				CUR_USERID : baseTools.getUserIdSeq()
			},
			// 数据过滤
			dataFilter : function(treeId, parentNode, responseData) {
				if (responseData) {
					for (var i = 0; i < responseData.length; i++) {
						responseData[i].isParent = responseData[i].ISPARENT;// 对ISPANRENT转换为isParent
					}
				}
				return responseData;
			}
		},
		data : { // 非异步加载模式时通过id和pId去组织数据
			key : {
				name : obj.mc ? obj.mc : 'ZZJG_MC',
				title : obj.mc ? obj.mc : 'ZZJG_MC'
			},
			simpleData : {
				enable : true,
				idKey : obj.dm ? obj.dm : 'id',
				pIdKey : obj.sj_dm ? obj.sj_dm : 'pId'
			}
		},
		callback : {
			onClick : function(event, treeId, treeNode) {
				if (obj.inputMc) {
					document.getElementById(obj.inputMc).value = treeNode[obj.mc ? obj.mc : "ZZJG_MC"];
					$(document.getElementById(obj.inputMc)).change();
				}
				if (obj.inputDm) {
					document.getElementById(obj.inputDm).value = treeNode[obj.dm];
					$(document.getElementById(obj.inputDm)).change();
				}

				if (obj.selectUrl && obj.selectId) {
					var url = obj.selectUrl + treeNode[obj.dm];
					$.post(url, function(data) {
						$('#' + obj.selectId).empty();// 若 $('#' +
						// obj.selectId)
						// 对象不存在，在jQuery中也不会出错
						$('#' + obj.selectId).html(data);
					});
				}
				hideMenutree();
			}
		}
	};

	if (obj.openLevel) {
		settingtree.callback.onNodeCreated = openZtreeLevel;
	}
	if (obj.maxOpenDepth) {// 展开的最大深度设置
		settingtree.callback.beforeExpand = function zTreeBeforeExpand(treeId, treeNode) {
			if (treeNode.level >= obj.maxOpenDepth) {
				return false;
			} else {
				return true;
			}
		};
	}
	$.fn.zTree.init($("#" + obj.treeId), settingtree);

	// ‘关闭’按钮onclick事件
	$('#' + obj.containerId + ' .close_btn').click(function() {
		hideMenutree();
	});

	// ‘清空’按钮onclick事件
	$('#' + obj.containerId + ' .clear_btn').click(function() {
		if (obj.inputDm) {
			document.getElementById(obj.inputDm).value = "";
		}
		if (obj.inputMc) {
			document.getElementById(obj.inputMc).value = "";
		}
	});

	function openZtreeLevel(event, treeId, treeNode) {
		if (!obj.openLevel || treeNode.level >= obj.openLevel) {
			return;
		}

		if (treeNode.isParent == true || treeNode.isParent == 'true') {
			var treeObj = this.getZTreeObj(treeId);
			treeObj.expandNode(treeNode, true, false, true);
		}
	}

	var inputJNode = $('#' + obj.inputMc);
	var ztreeContainerJNode = $('#' + obj.containerId);
	var body = $("body");
	inputJNode.click(function() {
		var inputOffset = inputJNode.offset();

		if (!obj.showPos || obj.showPos == 'down') {
			ztreeContainerJNode.css({
				left : inputOffset.left + "px",
				top : inputOffset.top + inputJNode.outerHeight() + "px"
			}).slideDown("fast");
		} else if (obj.showPos == 'up') {
			ztreeContainerJNode.css({
				left : inputOffset.left + "px",
				top : inputOffset.top - ztreeContainerJNode.outerHeight() + "px"
			}).slideDown("fast");
		}

		body.bind("mousedown", onBodyDowntree);
	});

	function hideMenutree() {
		ztreeContainerJNode.fadeOut("fast");
		$('body').unbind("mousedown", onBodyDowntree);
	}

	function onBodyDowntree(event) {
		if (!(event.target.id == "menuBtn" || event.target.id == obj.containerId || $(event.target).parents("#" + obj.containerId).length > 0)) {
			hideMenutree();
		}
	}
}

/**
 * 
 * @param obj
 *            obj.url obj.treeId obj.inputMc obj.inputDm obj.autoParam obj.containerId
 */
function initCheckTree(obj) {

	var settingtree = {
		check : {
			enable : true,
			chkboxType : {
				"Y" : "",
				"N" : ""
			}
		},
		data : { // 非异步加载模式时通过id和pId去组织数据
			simpleData : {
				enable : true,
				idKey : obj.dm ? obj.dm : 'id'
			}
		},
		async : {
			enable : true,
			url : obj.url,
			autoParam : obj.autoParam
		},
		callback : {
			onCheck : CheckEvent,// 复选框选中时执行的事件 若是在外面定义此函数用法为 obj.CheckEvent
			onNodeCreated : openZtreeLevel
		}
	};

	var treeObj = $.fn.zTree.init($("#" + obj.treeId), settingtree);
	var inputJNode = $('#' + obj.inputMc);
	var ztreeContainerJNode = $('#' + obj.containerId);
	var body = $("body");
	inputJNode.click(function() {
		var inputOffset = inputJNode.offset();
		ztreeContainerJNode.css({
			left : inputOffset.left + "px",
			top : inputOffset.top + inputJNode.outerHeight() + "px"
		}).slideDown("fast");
		body.bind("mousedown", onBodyDowntree);
	});

	function hideMenutree() {
		ztreeContainerJNode.fadeOut("fast");
		$('body').unbind("mousedown", onBodyDowntree);
	}

	function onBodyDowntree(event) {
		if (!(event.target.id == "menuBtn" || event.target.id == obj.containerId || $(event.target).parents("#" + obj.containerId).length > 0)) {
			hideMenutree();
		}
	}

	// ‘确定’按钮onclick事件
	document.getElementById("ok_btn").onclick = function() {
		var nodes = treeObj.getCheckedNodes(true);
		var checkStrName = '';
		var checkStrDm = '';
		if (nodes.length == 0) {
			document.getElementById(obj.inputMc).value = '';
			document.getElementById(obj.inputDm).value = '';
			hideMenutree();
			return;
		}
		for (var i = 0; i < nodes.length; i++) {
			checkStrName += nodes[i].name + ',';
			checkStrDm += nodes[i][obj.dm] + ',';
		}

		if (checkStrName.substring(checkStrName.length - 1, checkStrName.length) == ',') {
			checkStrName = checkStrName.substring(0, checkStrName.length - 1);
		}

		if (checkStrDm.substring(checkStrDm.length - 1, checkStrDm.length) == ',') {
			checkStrDm = checkStrDm.substring(0, checkStrDm.length - 1);
		}

		document.getElementById(obj.inputMc).value = checkStrName;
		document.getElementById(obj.inputDm).value = checkStrDm;
		hideMenutree();
	};

	// ‘关闭’按钮onclick事件
	$('#' + obj.containerId + ' .close_btn').click(function() {
		hideMenutree();
	});
	// ‘清空’按钮onclick事件
	$('#' + obj.containerId + ' .clear_btn').click(function() {
		if (obj.inputDm) {
			document.getElementById(obj.inputDm).value = "";
		}
		if (obj.inputMc) {
			document.getElementById(obj.inputMc).value = "";
		}
	});
	// (1)有选中的其上级展开 (2)定义展开级别
	function openZtreeLevel(event, treeId, treeNode) {
		var treeObj = this.getZTreeObj(treeId);
		// 有选中的其上级展开
		if (treeNode.mustOpen == true || treeNode.mustOpen == 'true') {// mustOpen是zTree中定义的对象
			// dm_zzjg_jdsjqx_zTree.jsp中定义
			treeObj.expandNode(treeNode, true, false, true);
		}
		// 定义展开级别
		if (!obj.openLevel || treeNode.level >= obj.openLevel) {
			return;
		}

		// 本身是父节点则展开
		if (treeNode.isParent == true || treeNode.isParent == 'true') {
			treeObj.expandNode(treeNode, true, false, true);
		}
	}
}

// 控制复选框上下级选中规则：(1)下级都选中则只选中其上级(2)上级选中则所有下级不选中
function CheckEvent(event, treeId, treeNode) {
	var treeObj = this.getZTreeObj(treeId);
	checkP(treeNode, treeObj);

	// 点击父节点，弹出提示是否取消子节点的选中
	if (treeNode.isParent == true && treeNode.children && treeNode.children.length > 0) {
		var ns = treeObj.getNodesByParam("checked", true, treeNode);

		if (ns.length > 0) {
			if (confirm('是否取消选中的下级项！')) {
				for (var i = 0; i < ns.length; i++) {
					treeObj.checkNode(ns[i], false, true);
				}
			} else {
				treeObj.checkNode(treeNode, false, true);
			}
		}
	}
}

function checkP(treeNode, treeObj) {
	var parent = treeNode.getParentNode();
	if (!parent) {
		return;
	}
	var children = parent.children;

	var flag = true;
	for (var i = 0; i < children.length; i++) {
		if (children[i].checked == false) {
			flag = false;
			break;
		}
	}

	if (flag) {
		treeObj.checkNode(parent, true, true);
		for (var i = 0; i < children.length; i++) {
			treeObj.checkNode(children[i], false, true);
		}
		// 递归调用。。。！重要
		checkP(parent, treeObj);
	} else {
		var t = parent;
		//
		while (t) {
			treeObj.checkNode(t, false, true);
			t = t.getParentNode();
		}
	}
}
