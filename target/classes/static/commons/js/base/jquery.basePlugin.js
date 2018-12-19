/**
 * <ol>
 * date:11-11-29 editor:yanghongjian
 * <li>创建文档<li>
 * <li>基础框架的组件<li>
 * </ol>
 */
(function($) {
    //定义动态组织结构树插件
    $.fn.SWJG_ASYTREE = function(args) {
        args = args || {};
        var curSeg = args.curSeg;
        delete args.curSeg;
        var opts = $.extend({YXBZ:'Y',CUR_USERID:jdglTools.getUserId(),SJ_SWJG_DM:'14100000000'}, args);
        //带单选框的税务机关树
        if (args.checkFlag == '1') {
            $.fn.zTree.init(this,
            { check:{enable:true,chkStyle: "radio",
                radioType: "all"
            },data:{simpleData:{enable:true}},
                async: {
                    enable: true,
                    url:jdglTools.cnf.contextPath + "/base/swjg/getSwjgSyntaxTree.do",
                    autoParam:["id"] ,
                    otherParam: opts
                },
                callback: {
                    onClick: function(e, treeId, node) {
                        if (curSeg && curSeg.onTreeClick) {
                            curSeg.onTreeClick.call(node, node.id);
                        }

                    }
                }
            }
                    );
        } else if (args.checkFlag == '2') {          //带单选框,根据上级税务机关过滤的税务机关树
            $.fn.zTree.init(this,
            {check:{enable:true,chkStyle: "radio",
                radioType: "all"
            },data:{simpleData:{enable:true}},
                async: {
                    enable: true,
                    url:jdglTools.cnf.contextPath + "/base/swjg/getSwjgSyntaxTree.do",
                    autoParam:["id"] ,
                    otherParam: {SWJG_DM_SJ:args.SWJG_DM}
                },
                callback: {
                    onClick: function(e, treeId, node) {
                        if (curSeg && curSeg.onTreeClick) {
                            curSeg.onTreeClick.call(node, node.id);
                        }

                    }
                }
            }
                    );
        } else {          //不带单选框的税务机关树
            $.fn.zTree.init(this,
            {data:{simpleData:{enable:true}},
                async: {
                    enable: true,
                    url:"/base/swjg/getSwjgSyntaxTree.do",
                    autoParam:["id"] ,
                    otherParam: opts
                },
                callback: {
                    onClick: function(e, treeId, node) {
                        if (curSeg && curSeg.onTreeClick) {
                            curSeg.onTreeClick.call(node, node.id);
                        }

                    }
                }
            }
                    );
        }


        return $.fn.zTree.getZTreeObj($(this).attr('id'));
    };
})(jQuery);
