/**
 * <ol>
 * date:2013-08-09 editor:yanghongjian
 * <li>创建文档</li>
 * <li>组合选择树插件</li>
 * <li>在指定的录入框上自动添加图标和下拉的DIV,参数格式为{readOnly:false,width:200,heigth:150}</li>
 * </ol>
 */
(function ($) {
    $.fn.dropqtableTree = function (o) {
        if (!this.dropdown) {
            alert("请引用jquery-dropdown.js");
            return;
        }
        if (!o.dataformat) {
            o.dataformat = function (data) {
                return { text: data[1], value: data[0] };
            };
        }
        var tableoption = { qtitletext: "请输入关键字", pagesize: 10, autoload: true, textindex: 1, valueindex: 0 };

        if (!o || !o.tableoptions) {
            alert("tableoptions必须被设置");
            return;
        } else {
            if (o.tableoptions.zTree && o.tableoptions.zTree.url) {
                $.extend(tableoption, o.tableoptions);
            } else {
                alert("tableoptions中的zTree参数(url)必须被配置");
                return;
            }
        }

        var qtparse = {
            name: "qtable",
            render: function (parent) {
                var target = this.target;
                var tbpanel = $("<div class='tablecontaienr'/>");  //tablepanel
                var thtml = []; //<ul id="treeModule" class="ztree"></ul>
                thtml.push("<ul id='baseComboTree_" + this.target[0].id + "' class='ztree'></ul>");
                tbpanel.html(thtml.join(""));
                parent.append(tbpanel);
                var treeID = this.target[0].id;
                var treeObj;

                if (tableoption.zTree.async != undefined && tableoption.zTree.async) {
                    treeObj = $.fn.zTree.init($("#baseComboTree_" + treeID),
                    {data:{simpleData:{enable:true}},
                        async: {
                            type:'GET',
                            dataType:'jsonp',
                            enable: true,
                            url:tableoption.zTree.url,
                            autoParam:["id"] ,
                            otherParam: tableoption.zTree
                        },
                        callback: {
                            onClick: function(event, treeId, treeNode, clickFlag) {
                                if (treeNode.isParent) {
                                    treeObj.expandNode(treeNode);
                                }
                                var ret = o.dataformat(treeNode);
                                target.SelectedChanged(ret);
                                if (o.onClick) {
                                    o.onClick(event, treeId, treeNode, clickFlag);
                                }
                            }
                        }
                    }
                            );
                } else {
                    baseTools.xhrAjax({
                        async:false,
                        bShow:false,
                        url:tableoption.zTree.url,
                        callback:[function(jsonObj) {
                            switch (parseInt(jsonObj.code)) {
                                //查询操作返回标志
                                case 0:
                                    if (jsonObj.data != null && jsonObj.data.length > 0) {
                                        treeObj = $.fn.zTree.init($("#baseComboTree_" + treeID), {
                                            data: {
                                                simpleData: {
                                                    enable: true
                                                }
                                            },callback: {
                                                onClick: function(event, treeId, treeNode, clickFlag) {
                                                    if (treeNode.isParent) {
                                                        treeObj.expandNode(treeNode);
                                                    }
                                                    var ret = o.dataformat(treeNode);
                                                    target.SelectedChanged(ret);
                                                    if (o.onClick) {
                                                        o.onClick(event, treeId, treeNode, clickFlag);
                                                    }
                                                }
                                            }
                                        }, eval(jsonObj.data));

                                    }
                                    break;
                                default:
                                    alert(jsonObj.msg);
                            }
                        }]
                    });
                }
            },
            items: [],
            setValue: function (item) {
            },
            onshow: function (parent) {
                var input = parent.find("input.watermark").val("");
                if (tableoption.autoload) {
                    parent.find("a.qbtn").click();
                }
            },
            target: null
        };
//        $.extend(o, { parse: qtparse, containerCssClass: "qtableContainer", autoheight: true });
        $.extend(o, { parse: qtparse, containerCssClass: "divCombo"});

        $(this).addClass("baseCombo");
        return $(this).dropdown(o);
    };
})(jQuery);
