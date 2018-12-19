$(document).ready(function () {
    zzjggl.onLoad();
});

/**
 * <ol>
 * <li>date:13-11-24</li>
 * <li>editor:马恺</li>
 * <li>创建文档</li>
 * <li>功能：组织机构新增，修改，删除页面</li>
 * </ol>
 */
var zzjggl = (function () {
    // 私有属性
    var curSeg, tbList, gridObj, treeObj, zzjg = "", zzjgmc = "", sjzzjg = "", sjzzjgmc = "", winParam = {},zzjgAfterDelete;
    var curPage = 1, pageSize = 15;
    var cols;
    var formSave = "formSave", formSave_ = formSave + "_";
    var queryUrl = "";
    var haveCheckBox = true;

    var getVal = function (tagID) {
        return baseTools.byId(formSave_ + tagID).value;
    };
    // 私有方法
    var initLayout = function () {
        // 初始化页面UI
        curJsonObj = null;
        // 动态生成工具栏操作按钮插件
        // $(".panelBar .toolBar").toolbarBtn();
        $("#divSplitter").splitter({
            type: "v",
            splitVertical: true,
            outline: true, /* sizeLeft: true, */
            resizeTo: window, /* resizeTo: "divPageBody", resizeToWidth: true, */
            // resizeToWidth: true,
            sizeLeft: 200,
            minLeft: 200,
            minRight: 200, /* dock: "left", */
            dockSpeed: 100,
            accessKey: "I"
        });

        $.fn.zTree.init($("#treeModule"), {
            data: {
                key: {
                    name: "ZZJG_MC",
                    title: "ZZJG_MC"
                },
                simpleData: {
                    enable: true,
                    idKey: "ZZJG_DM",
                    pIdKey: "SJ_ZZJG_DM"
                }
            },
            async: {
                enable: true,
                type: "GET",
                dataType: "jsonp",
                url: "/channel/selectZzjgTree?xxx="+new Date().getTime(),
                autoParam: ["ZZJG_DM"],
                otherParam: {
//                    CUR_USERID: baseTools.getUserIdSeq(),
                    qxxkdm: baseTools.getUrlQueryString("qxxkdm")
                },
                // 数据过滤
                dataFilter: function (treeId, parentNode, responseData) {
                    if (responseData) {
                        for (var i = 0; i < responseData.length; i++) {
                            responseData[i].isParent = responseData[i].ISPARENT;// 对ISPANRENT转换为isParent
                        }
                    }
                    return responseData;
                }
            },
            callback: {
                onClick: function (e, treeId, node) {
                    if (node.isParent == true || node.isParent == "true") {
                        treeObj.expandNode(node, true, false, true);
                    }
                    zzjg = node.ZZJG_DM;
                    zzjgmc = node.ZZJG_MC;
                    sjzzjg = node.SJ_ZZJG_DM;
                    sjzzjgmc = node.SJ_ZZJG_MC;
                    if(node.isParent){
                    	curSeg.onQuery();
                    }else{
                    	curSeg.onQuery();
//                    	curSeg.onOpenSaveWin("栏目详情",zzjg,true);
                    }
                },
                // 加载成功后，如果树只有一个节点，默认展开。
                onAsyncSuccess: function (event, treeId, treeNode, msg) {
                    var treeNodes = treeObj.getNodes();
//                    if (treeNodes.length == 1 && !treeNodes[0].children) {
                        treeObj.expandNode(treeNodes[0], true, false, true);
                        node = treeNodes[0];
                        zzjg = node.ZZJG_DM;
                        zzjgmc = node.ZZJG_MC;
//                        curSeg.onQuery();
//                    }
                }
            }
        });
        treeObj = $.fn.zTree.getZTreeObj("treeModule");

        $("#btnDelZt").click(function () {
            var nodes = treeObj.getSelectedNodes();
            if (nodes.length == 0) {
                alert("请选择左侧的菜单项!");
                return;
            }
        });
        
        tbList = $("#tbList");
		var cols = [ {
			title : 'ID',
			name : 'channel_id',
			width : 170,
			hidden : false,
			align : 'center'
		}, {
			title : '栏目名称',
			name : 'channel_name',
			width : 120,
			align : 'center'
		},{
			title : '访问路径',
			name : 'channel_path',
			width : 100,
			align : 'center'
		},  {
			title : '排列顺序',
			name : 'priority',
			width : 80,
			align : 'center'
		}, {
			title : '显示',
			name : 'is_display',
			width : 70,
			align : 'center',
        	renderer : function(val, item) {
        		if(val==1){
        			return '是';
        		}else{
        			return '否';
        		}	
        	}
		},  {
			title : '操作',
			name : 'is_disable',
			width : 140,
			align : 'center',
			renderer : function(val, item) {
				if (item.isParent==0&&item.hasContent==0){
					
					return '<a href="javascript:zzjggl.onOpenSaveWin(\'栏目详情\',\''+item.channel_id+'\',1)">查看 </a>  <a href="javascript:zzjggl.onEdit(\''+item.channel_id+'\')">编辑 </a>  <a href="javascript:zzjggl.onDelete(\''+item.channel_id+'\',\''+item.channel_name+'\',\''+item.parent_id+'\')">删除 </a>';
				}else{
					return '<a href="javascript:zzjggl.onOpenSaveWin(\'栏目详情\',\''+item.channel_id+'\',1)">查看 </a>  <a href="javascript:zzjggl.onEdit(\''+item.channel_id+'\')">编辑 </a>';
				}
		}
		}];

		gridObj = tbList.mmGrid({
			height : jdglTools.getMmGridHeight(tbList),
			fullWidthRows : true,
			indexCol : false,
			checkCol : true,
			showBackboard : false,
			autoLoad : false,
			nowrap : true,
			cols : cols,
			plugins : [ $('#tbListPg').htjsPaginator({
				limitList : [ 10, 20, 30, 50 ],
				loadFunction : [ curSeg.onQuery ]
			}) ]
		});
        
    };
    // 公有方法
    return {
        onLoad: function () {
            curSeg = zzjggl;
            baseTools.setIdByName([formSave]);
            initLayout();
            // curSeg.onQuery();

            // 删除组件释放内存
            $(window).unload(function () {
            });
        },
        // 查询数据
        onQuery: function () {
            if (zzjgmc != ""){
            	zzjgAfterDelete = zzjg;
            	baseTools.xhrAjax({
                	type: "GET",
                    url: "/channel/selectLowerChannels/"+zzjg,
                    callback: [curSeg.pageFlowControl]
                });
            }
        },
     // 查询数据
        onQuery2: function () {
            if (zzjgmc != ""){
            	baseTools.xhrAjax({
                	type: "GET",
                    url: "/channel/selectLowerChannels/"+zzjgAfterDelete,
                    callback: [curSeg.pageFlowControl]
                });
            }
        },
     // 删除记录
		onDelete : function(id,name,pid) {
			if (!confirm("确认要删除『" + name + " 栏目』吗?")) {
				return;
			}
			baseTools.xhrAjax({
				url : "/channel/"+id,
				params : {
					_method : "DELETE"
				},
				callback : [ curSeg.pageFlowControl ]
			});

		},
        //启用与禁用
        onUpdateISDELETE: function (state) {
            var isDelete = $("#" + formSave_ + "ISDELETE").val();
            var isDeleteStr = $("#" + formSave_ + "ISDELETESTR").val();
            if (isDelete == state) {
                alert("该组织机构已" + isDeleteStr + "！");
            } else {
                if (zzjg == '14100000000') {
                    alert("根节点不能禁用！");
                } else {
                    baseTools.xhrAjax({
                        url: "/server/platform/qx/zzjggl/updatePtDmZzjgWz.do",
                        params: {
                            ZZJG_DM: $("#" + formSave_ + "ZZJG_DM").val(),
                            ISDELETE: state
                        },
                        callback: [function (jsonObj, xhrArgs) {
                            if (parseInt(jsonObj.code) == 1) {
                                alert("修改成功！");
                                curSeg.onQuery();
                            } else {
                                alert(jsonObj.msg);
                            }
                        }]
                    });
                }
            }
        },
        //新建下属机构
        onAdd: function () {
            curSeg.onOpenSaveWin("添加","",false);
        },
        //编辑
        onEdit: function (id) {
        	curSeg.onOpenSaveWin("编辑",id,false);
        },
        //新建、编辑的弹窗
        onOpenSaveWin: function (msg,id,leaf) {
        	var param = {
            	upperchannel : zzjg,
            	upperchannelname : zzjgmc,
                msg: msg,
                leaf : false
            };
        	if (msg == "编辑"||msg == "栏目详情") {
                var param = {
                    	upperchannel : zzjg,
                    	upperchannelname : zzjgmc,
                        msg: msg,
                        channel_id : id,
                        leaf : false     		
                    };
        	}
        	if (leaf){
        		param.leaf = true
        	}
            winParam = {
                id: 'win_module',
                title: msg,
                url: '/cms_sys/channel/channel_save.html',
                width: 650,
                height: 360,
                other: param
            };
            winObj = baseTools.showWinExt(winParam);
        },
        // 获取当前部门树选中节点的部门代码
        getCurZzjgDm: function () {
            var node = treeObj.getSelectedNodes();
            if (node.length == 0) {
                alert("你未选择任何机构!");
            } else {
                return node[0].ZZJG_DM;
            }
        },
        // 获取当前部门树选中节点的部门名称
        getCurZzjgMc: function () {
            var node = treeObj.getSelectedNodes();
            if (node.length == 0) {
                alert("你未选择任何机构!");
            } else {
                return node[0].ZZJG_MC;
            }
        },

        // 更新树数据
        refreshTree: function () {
//            var node = treeObj.getNodeByParam("id", pid, null);
//            // node.isParent = true;
//
//            // 局部加载树
//            node = node.id == 0 ? null : node;
//            treeObj.reAsyncChildNodes(node, "refresh");
//            treeObj.cancelSelectedNode();
            initLayout();
        },
        //刷新页面
        reLoad: function () {
            window.location.reload();
        },
        // 使用json格式的业务数据填充表格
        fillGridByJson: function (jsonObj, xhrArgs) {

//            // 绑定数据
//            if (jsonObj.data && jsonObj.data.length != 0) {
//
//                baseTools.bindFormData(formSave, jsonObj.data);
//
//                $("#" + formSave_ + "ZZJG_MC").val(jsonObj.data.ZZJG_MC);
//
//                $("#" + formSave_ + "SJ_ZZJG_MC").val(jsonObj.data.SJ_ZZJG_MC);
//                if (jsonObj.data.SJ_ZZJG_MC == "航天金穗") {
//                    $("#" + formSave_ + "SJ_ZZJG_MC").val("");
//                }
//                $("#" + formSave_ + "ISDELETESTR").val(jsonObj.data.ISDELETE == 0 ? "启用" : "禁用");
//            }
            
         // 绑定数据
			gridObj.load(jsonObj.data);
        },
        fillGridByJson1: function () {
            curSeg.onQuery2();
            curSeg.refreshTree();
        },
        /**
         * 需要的时候可以覆盖该方法 在ajax调用中，在得到数据时调用该方法
         */
        pageFlowControl: function (jsonObj, xhrArgs) {
            curJsonObj = jsonObj;
            switch (parseInt(jsonObj.code)) {
                // 查询操作返回标志
                case 0:
                    curSeg.fillGridByJson(jsonObj, xhrArgs);
                    break;
                // 添加、更新以及状态更新操作返回标志
                case 1:
                    alert(jsonObj.msg);
                    curSeg.fillGridByJson1();
                    break;
                // 删除操作返回标志
                case -1:
                    alert(jsonObj.msg);
                    break;
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