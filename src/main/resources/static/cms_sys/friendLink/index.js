var friendLinkType;
var fileUrl_pre="";
$(document).ready(function() {
    index.onLoad();
});
var index = (function() {
	// 私有属性
	var rylb = "", curSeg, tbList, formSearch = "formSearch", gridObj, winParam = {};
	// 私有方法
	var initLayout = function() {
		// 初始化页面UI
		tbList = $("#tbList");
        
        var cols = [
            { title:'ID', name:'friend_link_id' ,width:190, align:'left', hidden: false } ,
            { title:'网站名称', name:'name' ,width:80, align:'left', hidden: false } ,
            { title:'网站LOGO', name:'logo_path_complete' ,width:80, align:'left', hidden: false,renderer: function(val, item) {
            		if(val!=null&&val!=""){
            			return "<img alt=\"等待上传\" src=\""+val+"\" style=\"width: 80px; height: 30px;\">";
            		}
            } } ,
            { title:'点击次数', name:'views' ,width:80, align:'left', hidden: false } ,
            { title:'排列顺序', name:'priority' ,width:80, align:'left', hidden: false } ,
            { title:'显示', name:'is_display' ,width:80, align:'left', hidden: false,renderer: function(val, item) {
            	if(val==0){
            		return "否";
            	}else if(val=="1"){
            		return "是";
            	}
            } } ,
        ];

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
    //公有方法
    return {
        onLoad : function() {
			curSeg = index;
			initLayout();
			rylb = "";
			formSearch_ = formSearch + "_";
			baseTools.setIdByName([ formSearch ]);
			curSeg.getFriendLinkType();
			curSeg.onQuery();
			// 删除组件释放内存
			$(window).unload(function() {
			});
		},
		onToolbarClick : function(cmd) {
			switch (cmd) {
				case 1: // 添加操作
					curSeg.onAdd();
					break;
				case 2: // 修改操作
					curSeg.onUpdate();
					break;
				case -1: // 删除操作
					curSeg.onDelete();
					break;
				default:
					alert("未知的操作命令!");
			}
		},
		getFriendLinkType:function(){
			baseTools.xhrAjax({
				url : '/friendLink/getFriendLinkType.do',
				callback : [ curSeg.showFriendLinkType ]
			});
		},
		showFriendLinkType:function(jsonObj, xhrArgs){
			switch (parseInt(jsonObj.code)) {
				// 查询操作返回标志
				case 0:
					var datas=jsonObj.data;
					friendLinkType=datas;
					var seleteOption="";
					for(var i=0;i<datas.length;i++){
						var data=datas[i];
						var friend_link_type_id=data.friend_link_type_id;
						var name=data.name;
						seleteOption+="<option value=\""+friend_link_type_id+"\">"+name+"</option>";
					}
					$("select[name='friend_link_type']").append(seleteOption);
					break;
				case -1:
					alert("请稍后重试");
					break;
				case -2:
					//没有找到友情链接类别
					break;
				case -3:// cookie 失效请重新登录
					alert(jsonObj.msg);
					baseTools.gotoLogin();
					break;
				default:
			}
		},
        // 查询数据
		onQuery : function() {
			var friend_link_type=$("select[name='friend_link_type']").val();
			baseTools.xhrAjax({
				url:"/friendLink/list.do",
	            params:{friend_link_type_id:friend_link_type,pageNo:'46',pageSize:'1'},
				callback : [ curSeg.pageFlowControl ]
			});
		},
		pageFlowControl : function(jsonObj, xhrArgs) {
			switch (parseInt(jsonObj.code)) {
				// 查询操作返回标志
				case 0:
					curSeg.fillGridByJson(jsonObj, xhrArgs);
					break;
				case -1:
					alert("请稍后重试");
					break;
				case -2:// 其它错误返回标志
					alert(jsonObj.msg);
					baseTools.hideMash();
					break;
				case -3:// cookie 失效请重新登录
					alert(jsonObj.msg);
					baseTools.gotoLogin();
					break;
				default:
			}
		},
		//新增
        onAdd:function() {
            curSeg.onOpenAddWin();
        },
        //修改
        onUpdate:function() {
        	var ids = gridObj.selectedRows();
            if (ids.length == 0 || ids.length > 1) {
                alert("请选择一条记录!");
                return false;
            }
        	curSeg.onOpenUpdateWin(ids[0]);
        },
		onDelete:function(){
			//逐条删除
			var ids = gridObj.selectedRows();
            if (ids.length == 0 || ids.length > 1) {
                alert("请选择一条记录!");
                return false;
            }
            if (!confirm("确认要删除这条友情链接吗?")) {
                return;
            }
            baseTools.xhrAjax({
				url:"/friendLink/delete.do",
	            params:{friend_link_id:ids[0].friend_link_id,logo_path:ids[0].logo_path},
				callback : [ curSeg.deleteLogFinish ]
			});
		},
		deleteLogFinish:function(jsonObj, xhrArgs){
			//删除后的操作
			switch (parseInt(jsonObj.code)) {
				case 0:
					alert("删除成功");
					curSeg.onQuery();
					break;
				case -1:
					alert("请稍后重试");
					break;
				case -3:// cookie 失效请重新登录
					alert(jsonObj.msg);
					baseTools.gotoLogin();
					break;
				default:
			}
		},
		onOpenAddWin : function() {
			if(friendLinkType==null){
				alert("请先维护友情链接类别");
				return false;
			}
			winParam = {
				id : 'win_module',
				title : '添加',
				height : '300px',
				width : '600px',
				url : "/cms_sys/friendLink/friendLinkAdd.html",
				other : {friendLinkType:friendLinkType}
			};
			baseTools.showWinExt(winParam);
		},
		onOpenUpdateWin : function(data) {
			if(friendLinkType==null){
				alert("请先维护友情链接类别");
				return false;
			}
			winParam = {	
				id : 'win_module',
				title : '修改',
				height : '300px',
				width : '600px',
				url : "/cms_sys/friendLink/friendLinkUpdate.html",
				other : {
					friend_link:data,
					friendLinkType:friendLinkType,
					fileUrl_pre:fileUrl_pre
				}
			};
			baseTools.showWinExt(winParam);
		},
		// 使用json格式的业务数据填充表格
		fillGridByJson : function(jsonObj, xhrArgs) {
			gridObj.load(jsonObj.data);
			fileUrl_pre=jsonObj.fileUrl_pre;
		}
    };
})();