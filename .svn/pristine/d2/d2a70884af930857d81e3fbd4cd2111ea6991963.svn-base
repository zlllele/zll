$(document).ready(function() {
	zzjg_tree.onLoad();
});

/**
 * <ol>
 * <li>date:13-11-24</li>
 * <li>editor:周朝阳</li>
 * <li>创建文档</li>
 * <li>新增、修改参数</li>
 * <li>功能：将部门树进行封装，左侧为部门树，由此为对树节点的明细信息</li>
 * </ol>
 */
var zzjg_tree = (function() {
	// 私有属性
	var curSeg, tbList, gridObj, treeObj, zzjg = "", zzjgmc = "";
	var curPage = 1, pageSize = 15;
	var cols;
	var formSearch = "formSearch", formSearch_ = formSearch + "_";
	var queryUrl = "";

	var getVal = function(tagID) {
		return baseTools.byId(formSearch_ + tagID).value;
	};
	// 私有方法
	var initLayout = function() {
		// 初始化页面UI
		curJsonObj = null;
		// 动态生成工具栏操作按钮插件
		// $(".panelBar .toolBar").toolbarBtn();
		tbList = $("#tbList");
		$("#divSplitter").splitter({
			type : "v",
			splitVertical : true,
			outline : true,/* sizeLeft: true, */
			resizeTo : window,/* resizeTo: "divPageBody", resizeToWidth: true, */
			// resizeToWidth: true,
			sizeLeft : 200,
			minLeft : 200,
			minRight : 200,/* dock: "left", */
			dockSpeed : 100,
			accessKey : "I"
		});

		$.fn.zTree.init($("#treeModule"), {
			data : {
				key : {
					name : "ZZJG_MC",
					title : "ZZJG_MC"
				},
				simpleData : {
					enable : true,
					idKey : "ZZJG_DM",
					pIdKey : "SJ_ZZJG_DM"
				}
			},
			async : {
				enable : true,
				type : "GET",
				dataType : "jsonp",
				url : jdglTools.cnf.clientURL+ baseTools.getWebRoot() + "/server/common/selectZzjgTree.do",
				autoParam : [ "ZZJG_DM" ],
				otherParam : {
					CUR_USERID : baseTools.getUserIdSeq(),
					qxxkdm : baseTools.getUrlQueryString("qxxkdm")
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
			callback : {
				onClick : function(e, treeId, node) {
					if (node.isParent == true || node.isParent == "true") {
						treeObj.expandNode(node, true, false, true);
					}
					zzjg = node.ZZJG_DM;
					zzjgmc = node.ZZJG_MC;
					curSeg.onQuery();
				},
				// 加载成功后，如果树只有一个节点，默认展开。
				onAsyncSuccess : function(event, treeId, treeNode, msg) {
					var treeNodes = treeObj.getNodes();
					if (treeNodes.length == 1 && !treeNodes[0].children) {
						treeObj.expandNode(treeNodes[0], true, false, true);
						node = treeNodes[0];
						zzjg = node.ZZJG_DM;
						zzjgmc = node.ZZJG_MC;
						curSeg.onQuery();
					}
				}
			}
		});
		treeObj = $.fn.zTree.getZTreeObj("treeModule");
		var _plugin = typeof curSeg.getPlugins != "undefined" ? curSeg.getPlugins() : [ $("#tbListPg").htjsPaginator({
			limitList : [ 20, 30, 40, 50 ],
			loadFunction : [ curSeg.onQuery ]
		}) ];

		gridObj = tbList.mmGrid({
			height : jdglTools.getMmGridHeight(tbList) - 10,
			fullWidthRows : true,
			checkCol : true,
			showBackboard : false,
			autoLoad : false,
			nowrap : true,
			cols : curSeg.getCols(),
			plugins : _plugin
		});

		$("#btnDelZt").click(function() {
			var nodes = treeObj.getSelectedNodes();
			if (nodes.length == 0) {
				alert("请选择左侧的菜单项!");
				return;
			}
		});
	};
	// 公有方法
	return {
		onLoad : function() {
			curSeg = zzjg_tree;
			baseTools.setIdByName([ formSearch ]);
			curSeg.setCols();
			initLayout();
			// curSeg.onQuery();

			// 删除组件释放内存
			$(window).unload(function() {
			});
		},
		// 查询数据
		onQuery : function() {
			if (zzjgmc != "")
				document.getElementById("formSearch_ZZJG_MC").getElementsByTagName("span")[0].innerHTML = zzjgmc;
			baseTools.xhrAjax({
				url : curSeg.getQueryUrl(),
				forms : [ formSearch ],
				params : {
					ZZJG_DM : zzjg,
					page : curPage,
					pageSize : pageSize
				},
				callback : [ curSeg.pageFlowControl ]
			});
		},
		// 获取当前部门树选中节点的部门代码
		getCurZzjgDm : function() {
			var node = treeObj.getSelectedNodes();
			if (node.length == 0) {
				alert("你未选择任何机构!");
			} else {
				return node[0].ZZJG_DM;
			}
		},
		// 获取当前部门树选中节点的部门名称
		getCurZzjgMc : function() {
			var node = treeObj.getSelectedNodes();
			if (node.length == 0) {
				alert("你未选择任何机构!");
			} else {
				return node[0].ZZJG_MC;
			}
		},
		// 对外提供接口
		getSelectedRows : function() {
			return gridObj.selectedRows();

		},
		// 对外提供接口，设置right区域的查询结果
		setCols : function(colobject) {
			cols = colobject;
		},

		getCols : function() {
			return cols;
		},
		// 对外提供接口，设置查询的地址
		setQueryUrl : function(url) {
			queryUrl = url;
		},

		getQueryUrl : function() {
			return queryUrl;
		},

		// 更新树数据
		refreshTree : function(pid) {
			var node = treeObj.getNodeByParam("id", pid, null);
			// node.isParent = true;

			// 局部加载树
			node = node.id == 0 ? null : node;
			treeObj.reAsyncChildNodes(node, "refresh");
			treeObj.cancelSelectedNode();
		},

		// 使用json格式的业务数据填充表格
		fillGridByJson : function(jsonObj, xhrArgs) {
			// 绑定数据
			if (jsonObj.data && jsonObj.data.length != 0) {
				baseTools.bindFormData(formSearch, jsonObj.data);
			}
			// if(jsonObj.list && jsonObj.list.length != 0){
			gridObj.load(jsonObj.list);
			// }
		},
		fillGridByJson1 : function() {
			curSeg.onQuery();
		},
		/**
		 * 需要的时候可以覆盖该方法 在ajax调用中，在得到数据时调用该方法
		 */
		pageFlowControl : function(jsonObj, xhrArgs) {
			curJsonObj = jsonObj;
			switch (parseInt(jsonObj.code)) {
			// 查询操作返回标志
			case 0:
				curSeg.fillGridByJson(jsonObj, xhrArgs);
				break;
			// 添加、更新以及状态更新操作返回标志
			case 1:
				alert(jsonObj.msg);
				curSeg.fillGridByJson(jsonObj, xhrArgs);
				break;
			// 删除操作返回标志
			case 2:
				alert(jsonObj.msg);
				curSeg.refreshTree(xhrArgs.params.SJ_MKXKID);
				break;
			case -3:// cookie 失效请重新登录
				alert(jsonObj.msg);
				baseTools.gotoLogin();
				break;
			default:
				alert(jsonObj.msg);
			}
		}
	};
})();