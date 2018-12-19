/**
 * <ol>
 * date:12-3-5 editor:yanghongjian
 * <li>创建文档</li>
 * <li>基础表格操作方法封装</li>
 * </ol>
 */
;
baseGrid = {} || baseTools;
baseGrid.objGrid = null;
/**
 * 为grid增加交叉样式和选中样式
 * @param grid grid的ID或者grid的jquery对象,如果要提高性能就使用jquery对象
 * @param jsonCnf 配置设置{DATA:jsonObj,SINGSEL:false,callFn:null}
 */
baseGrid.gridCss = function(grid, jsonCnf) {
    var objGrid = grid;
    if (typeof grid == "string") {
        objGrid = $("#" + grid)
    }

//    jsonCnf = jsonCnf || {};
//        var opts = $.extend({data:[]},
//                jsonCnf);
//    objGrid.data("DATA",jsonCnf.data);

    var objTbody = objGrid.find("tbody");
    var objTr = objTbody.find("tr");
    if (objTr == 0)
        return;

    var bSel = false,callFn = null;
    if (jsonCnf) {
        if (jsonCnf.DATA)
            objGrid.data("DATA", jsonCnf.DATA);
        bSel = jsonCnf.SINGSEL ? jsonCnf.SINGSEL : false;
        callFn = jsonCnf.callFn ? jsonCnf.callFn : null;
    }
//    this.objGrid = objGrid;
    //交替显示行
    objTr.filter(":odd").toggleClass('alternation');
    //为表格行添加选择事件处理
    objTr.click(
            function() {
                objTr.filter(".selected").removeClass('selected');
                if (bSel) {
                    $(this).addClass('selected'); //this 表示引发事件的对象，但它不是 jquery 对象
                    var b = $(":input[type='checkbox']", $(this)).attr("checked");
                    $(":input[type='checkbox']", $(this)).attr("checked", !b);
                }
                if (callFn)
                    callFn($(this));

            }).hover(//注意这里的链式调用
            function() {
                $(this).addClass('mouseOver');
            },
            function() {
                $(this).removeClass('mouseOver');
            }
            );
};

/**
 *  清空指定表的tbody数据
 * @param grid 表格ID或者grid的jquery对象,如果要提高性能就使用jquery对象
 */
baseGrid.gridClear=function(grid){
   var objGrid = grid;
    if (typeof grid == "string") {
        objGrid = $("#" + grid)
    }
    objGrid.find("tbody > tr").remove();
    objGrid.find("tfoot > tr").remove();
};
/**
 * 全选
 * @param grid 表格ID或者grid的jquery对象,如果要提高性能就使用jquery对象
 * @param cbTagID 全选的checkbox的ID
 * @param cbName 被选项checkbox的Name
 */
baseGrid.selectAll = function(grid, cbTagID, cbName) {
    var objGrid = grid;
    if (typeof grid == "string") {
        objGrid = $("#" + grid)
    }
    objGrid.find("tbody").find(":input[type='checkbox'][name='" + cbName + "']").each(function() {
        this.checked = document.getElementById(cbTagID).checked;
    });
};

/**
 * 获取表格中选择的行对象或者checkbox的值(val,val)
 * @param grid 表格ID或者grid的jquery对象,如果要提高性能就使用jquery对象
 * @param rowIndex 指定行索引时，返回指定行对象,注意索引是从tbody内tr的0开始.
 */
//baseGrid.getSelectRowObj = function(grid, rowIndex) {
//    var objRow = null;
//    var objGrid = grid;
//    if (typeof grid == "string") {
//        objGrid = $("#" + grid)
//    }
//    var objTr = objGrid.find("tbody").find("tr");
//    if (objTr == 0)
//        return null;
//
//    if (rowIndex || rowIndex == 0)
//        objRow = objTr.eq(rowIndex);
//    else
//    //获取当前选中条的行对象
//        objRow = objTr.filter(".selected");
//
//    return objRow.size() > 0 ? objRow : null;
//};

/**
 * 获取表格中选择的checkbox的数组值
 * @param grid 表格ID或者grid的jquery对象,如果要提高性能就使用jquery对象
 */
baseGrid.getCheckedRowsIds = function(grid) {
    var ret = [];
    var objGrid = grid;
    if (typeof grid == "string") {
        objGrid = $("#" + grid)
    }
    var objTr = objGrid.find("tbody").find("tr");
    if (objTr == 0)
        return null;
    //获取当前选中条的行对象
//    objRow = objTr.filter(".selected");

    objTr.each(function(i) {
        if (this.cells[0].children[0].checked)
            ret.push(this.cells[0].children[0].value);
    });
    return ret;
};

/**
 * 在数据集中获取指定关键字和值的json数据对象
 * @param jsonObjs json格式的对象数组
 * @param pkKey 键
 * @param pkVal 键值
 */
baseGrid.getRowData = function(jsonObjs, pkKey, pkVal) {
    var ret = null;
//    if (jsonObjs = null) {
//        jsonObjs = this.objGrid;
//    }
    if (typeof jsonObjs == "object") {
        var obj = null;
        for (var i = 0; i < jsonObjs.length; i++) {
            obj = jsonObjs[i];
            for (var key in obj) {
                if (key == pkKey && obj[key] == pkVal) {
                    ret = obj;
                    break;
                }
            }
            if (ret != null)
                break;
        }
    }
    return ret;
};