;
/**
 * <ol>
 * date:2011-12-22 editor:yanghongjian
 * <li>创建文档</li>
 * <li>组合选择插件</li>
 * <li>在指定的录入框上自动添加图标和下拉的DIV</li>
 * </ol>
 */
(function($) {
    function hideMenu() {
        $("#comboDiv").fadeOut("fast");
        $("body").unbind("mousedown", onBodyDown);
    }

    function onBodyDown(event) {
        //var keyCode = event.keyCode? event.keyCode : event.which ? event.which : event.charCode;
        //alert(keyCode);

        if (!(event.target.id == "comboDiv" || $(event.target).parents("#comboDiv").length > 0)) {
            hideMenu();
        }
    }

    function showCombo(obj) {
        var cityOffset = obj.offset();
        $("#comboDiv").css({left:cityOffset.left + "px", top:cityOffset.top + obj.outerHeight() + "px"}).slideDown("fast");

        $("body").bind("mousedown", onBodyDown);
    }

    //在指定的录入框上自动添加图标和下拉的DIV
    $.fn.combo = function(args) {
        args = args || {};
        var opts = $.extend({}, args);
        return this.each(function() {
            //插件实现代码
            var obj = $(this);
            obj.css({border:'#999 1px solid',cursor:'hand',background:'url(../commons/js/down.gif) no-repeat right'});

            var strDiv = [];
            strDiv.push('<div id="comboDiv" style="display:none; position: absolute;border:1px solid black;width:200px;height:150px">');
            strDiv.push("<table border='1' style='height:100%;width:100%'><tr><td height='90%'>其它UI</td></tr><tr><td height='10%'>测试</td></tr></table>");
            strDiv.push('</div>');
            obj.after(strDiv.join(''));

            obj.click(function() {
                showCombo($(this));
                $("body").bind("mousedown", onBodyDown);
            });
        });
    }
})(jQuery);