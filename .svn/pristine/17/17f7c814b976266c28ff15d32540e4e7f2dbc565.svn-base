/**
 * <ol>
 * date:2011-12-22 editor:yanghongjian
 * <li>创建文档</li>
 * <li>组合选择插件</li>
 * <li>在指定的录入框上自动添加图标和下拉的DIV,参数格式为{readOnly:false,width:200,heigth:150}</li>
 * </ol>
 */
(function ($) {
    $.fn.dropqtable = function (o) {
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
            if (o.tableoptions.mmGrid.url && o.tableoptions.mmGrid
                    && o.tableoptions.mmGrid
                    && o.tableoptions.mmGrid.cols.length > 0) {
                $.extend(tableoption, o.tableoptions);
            } else {
                alert("tableoptions中的mmGrid参数(url)必须被配置");
                return;
            }
        }

        var qtparse = {
            name: "qtable",
            render: function (parent) {
                var target = this.target;
                var qpanel = $("<div class='querytainer'/>"); //querypanel
                var qtext = $("<input type='text' class='watermark' title='按回车键触发查询操作!' value='" + tableoption.qtitletext + "'/><span>" + tableoption.qtitletext + "</span>");
                $(qtext).data("watermark", tableoption.qtitletext);
                var qbtn = $("<a href='javascript:void(0);' class='qbtn'></a>");
                qtext.focus(
                        function () {
                            var v = $(this).val();
                            var mark = $(this).data("watermark");
                            if (v == mark) {
                                $(this).val("").removeClass("watermark");
                            }
                        }).blur(
                        function () {
                            var v = $(this).val();
                            var mark = $(this).data("watermark");
                            if (v == "") {
                                $(this).val(mark).addClass("watermark");
                            }

                        }).keypress(function (e) {
                    if (e.keyCode == 13) {
                        query(this.value, 0);
                        return false;
                    }
                });

                qbtn.click(function () {
                    var v = $(this).prev().val();
                    query(v, 0);
                    return false;
                });

                qpanel.append(qtext).append(qbtn);
                var tbpanel = $("<div class='tablecontaienr'/>");  //tablepanel
                var thtml = [];
                thtml.push("<table id='baseCombo_" + this.target[0].id + "'></table>");
                tbpanel.html(thtml.join(""));

                var ppanel = $("<div class='pagecontainer'/>");  //pagepanel
                var pnexta = $("<a class='pagenext' href='javascript:void(0);'>下一页</a>").click(function () {
                    var v = qtext.val();
                    query(v, 1);
                });

                var ppreva = $("<a class='pageprev' href='javascript:void(0);'>上一页</a>").click(function () {
                    var v = qtext.val();
                    query(v, -1);
                });

                ppanel.append(ppreva).append(pnexta).append("<span>0/0</span>");
                parent.append(qpanel).append(tbpanel).append(ppanel);

                tableoption.mmGrid.width = parseFloat(parent.css('width'))-3;
                tableoption.mmGrid.height = parseFloat(parent.css('height')) - 40;
                var gridObj = $("#baseCombo_" + this.target[0].id).mmGrid(tableoption.mmGrid)
                        .on('cellSelected',
                        function(e, item, rowIndex, colIndex) {
                            var cell = [rowIndex];
                            cell.push(colIndex);
                            var ret = o.dataformat(cell);
                            target.SelectedChanged(ret);
                            if (o.selectRowCall) {
                                o.selectRowCall(item);
                            }
                        }).on('loadSuccess', function(e, jsonObj) {
                    switch (parseInt(jsonObj.code)) {
                        case 0:
                            tableoption.total = jsonObj.mapParam.TOTAL;
                            tableoption.pagesize = jsonObj.mapParam.PAGESIZE;
                            tableoption.pageTotal = Math.ceil(tableoption.total / tableoption.pagesize);

                            ppanel.find(">span").html('&nbsp;&nbsp;当前' + (tableoption.pageindex ) + "页/共计" + tableoption.pageTotal + '页');
                            break;
                        default:
                            alert(jsonObj.msg);
                    }
                });
//                if (tableoption.autoload) {
//                    query("", 0);
//                }
                function query(v, ptype) {
                    if (v == tableoption.qtitletext) {
                        v = "";
                    }
                    if (ptype == 0) {
                        tableoption.pageindex = 1;
                    } else if (ptype == 1) {
                        if (tableoption.pageindex + 1 <= tableoption.pageTotal) {
                            tableoption.pageindex++;
                        }
                    } else {
                        if (tableoption.pageindex - 1 >= 0) {
                            tableoption.pageindex--;
                        }
                    }
                    var p = { "CURPAGE": tableoption.pageindex,
                        "PAGESIZE": tableoption.pagesize, "qtext": v };
                    $.extend(p, o.tableoptions.params);
                    gridObj.load(p);
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
