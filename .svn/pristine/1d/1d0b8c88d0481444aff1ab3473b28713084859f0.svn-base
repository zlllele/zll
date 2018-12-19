/**
 * <ol>
 * date:13-10-22 editor:yanghongjian
 * <li>创建文档<li>
 * <li>局端管理使用到的jquery组件库<li>
 * </ol>
 */
(function($) {
    /**
     * 异步加载的税务机关组合树选择插件
     * @param args
     */
    $.fn.swjgAsyTreeCombo = function(args) {
        args = args || {};
        var arg = {
            vinputid: '', //值所存放的区域
//            dropwidth: "auto", //下拉层的宽度
            dropwidth: "200px", //下拉层的
            autoheight:false,
            dropheight:'300px',
            selecteditem: { text: "", value: "" }, //默认值
            dataformat: function (data) {
                return { text: data[1], value: data[0] };
            },
            tableoptions: {
                autoload: true,
                qtitletext: "", //查询框的默认文字
                zTree:{async:false
                    ,YXBZ:'Y',CUR_USERID:jdglTools.getUserId(),SJ_SWJG_DM:'14100000000'
                    ,url:jdglTools.getClientOrServerUrl() + '/base/swjg/getSwjgSyntaxTree.do'}
            }
        };
        var opts = $.extend(arg, args);

        return this.each(function() {
            //插件实现代码
            var obj = $(this);
            obj.dropqtableTree(opts);
        });
    };
})(jQuery);