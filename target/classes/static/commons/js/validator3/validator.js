/*************************************************
 Validator v1.05
 code by 我佛山人
 wfsr@msn.com

 Validator v3.0
 refactoring by chenfuzhong
 yuyu_xn@yahoo.com.cn
 *************************************************/

vtools = {
    $:function(id) {
        return document.getElementById(id);
    },
    addEvent:function (obj, type, fn) {
        if (obj.attachEvent) {
            obj['e' + type + fn] = fn;
            obj[type + fn] = function() {
                obj['e' + type + fn](window.event);
            }
            obj.attachEvent('on' + type, obj[type + fn]);
        } else
            obj.addEventListener(type, fn, false);
    },
    removeEvent:function (obj, type, fn) {
        if (obj.detachEvent) {
            obj.detachEvent('on' + type, obj[type + fn]);
            obj[type + fn] = null;
        } else
            obj.removeEventListener(type, fn, false);
    } ,
    addclass:function(e, c) {
        var ocn = this.$(e).className;
        var cn = ocn.split(" ");
        if (this.classFilter(cn, c) == c) {
            ocn = ocn;
        } else {
            ocn = ocn + " " + c;
        }
        this.$(e).className = ocn;
    },
    addparentclass:function(e, c) {
        var ocn = e.className;
        var cn = ocn.split(" ");
        if (this.classFilter(cn, c) == c) {
            ocn = ocn;
        } else {
            ocn = ocn + " " + c;
        }
        e.className = ocn;
    },
    removeclass:function(e, c) {
        var ocn = this.$(e).className;
        var cn = ocn.split(" ");
        var nocn = this.classFilter(cn, c, true);
        var temp = "";
        var len = nocn.length * 1;
        for (i = 0; i < len; i++) {
            if (i == 0) {
                temp = temp + nocn[i];
            } else {
                temp = temp + " " + nocn[i];
            }

        }
        this.$(e).className = temp;
    },
    removeparentclass:function(e, c) {
        var ocn = e.className;
        var cn = ocn.split(" ");
        var nocn = this.classFilter(cn, c, true);
        var temp = "";
        var len = nocn.length * 1;
        for (i = 0; i < len; i++) {
            if (i == 0) {
                temp = temp + nocn[i];
            } else {
                temp = temp + " " + nocn[i];
            }

        }
        e.className = temp;
    },
    classFilter: function(r, m, not) {
        m = " " + m + " ";
        var tmp = [];
        for (var i = 0; r[i]; i++) {
            var pass = (" " + r[i] + " ").indexOf(m) >= 0;
            if (!not && pass || not && !pass)
                tmp.push(r[i]);
        }
        return tmp;
    },
    comptagName:function(e, t) {
        return this.$(e).parentNode.tagName.toUpperCase() == t.toUpperCase();
    },
    getattr:function(e, t) {
        if (t == 'value') {
            var temp = this.$(e).value;
        } else {
            var temp = this.$(e).getAttribute(t);
        }
        if (temp != null && "" != temp) {
            return temp.replace(/(^\s*)|(\s*$)/g, "");
        }
        else
            return '';

    },
    setattr:function(e, t, v) {
        this.$(e).setAttribute(t, v);
    }



};

Validator = {
    /**
     * Validator3 默认具有这个校验规则，作为
     * 示范，强烈建议定义规则同时定义它的默认提示信息！
     * 格式：msg + 规则名 如下：
     */
    Require : /[^\s]/,/*由原来的 Require : /.+/,改成现在解决保证不让它只输入个空格 必填项*/
    msgRequire : "必输项",

    //add by chenfuzhong 2007-9-9 begin
    /*********************************************************************************************
     * 功能：提供一个框架扩展接口，为特殊业务规则预留
     * funcList 此属性要求程序员指定要调用的自定义js函数名称，如果多个用&隔开
     *          例如：  <input type=text name="startDate" />
     <input type=text name="endDate"
     validatorRules="CFunction"
     funcList="validateEndDate(startDate,endDate,3)"
     msg0="不能大于3个月"/>
     其中，声明了endDate字段需要CFunction规则校验，CFunction执行的是
     用户自定义的js函数compareDate，其中的参数用startDate和endDate本身的值传入，和
     常量3传入。
     ********************************************************************************************/
    CFunction : "this.exeFunctionList(getAttribute('funcList'))",

    ErrorItem : [document.forms[0]],
    ErrorMessage : ["以下原因导致提交失败：\t\t\t\t"],
    tiperror: "tiperror",requideerror: "requideerror",
    wdatetiperror: "wdatetiperror",wdaterequideerror: "wdaterequideerror",
    tipmode:3,
    settiperror: function(Classname) {
        this.tiperror = Classname;
    },
    setrequideerror: function(Classname) {
        this.requideerror = Classname;
    },
    settipmode: function(tipmodenum) {
        this.tipmode = tipmodenum;
    },
    highlight: function(element, cssa) {
        vtools.addclass(element, cssa);

        if (vtools.comptagName(element, 'DIV')) {
            vtools.addparentclass(vtools.$(element).parentNode, cssa);
        }

        if (vtools.getattr(element, 'widtype') == 'date') {
            vtools.removeclass(element, 'Wdate');

            if (cssa == 'requideerror') {
                vtools.addclass(element, 'wdaterequideerror');
            }
            else {
                vtools.addclass(element, 'wdatetiperror');
            }
        }
    },
    unhighlight: function(element, cssa) {
        vtools.removeclass(element, cssa);
        if (vtools.comptagName(element, 'DIV')) {
            vtools.removeparentclass(vtools.$(element).parentNode, cssa);
        }
        if (vtools.getattr(element, 'widtype') == 'date') {

            if (cssa == 'requideerror') {
                vtools.removeclass(element, 'wdaterequideerror');
            }
            else {
                vtools.removeclass(element, 'wdatetiperror');
            }
            vtools.addclass(element, 'Wdate');
        }
    },
    showerrtip : function (element, conns) {

//		$('#'+element+"val").qtip("api").updateContent("My new content");
    },
    hidetip: function(element) {

//		$('#'+element+"val").qtip("api").updateContent("My new content");

    },
    /**
     * 框架主函数
     */
    validate: function(theForm, mode) {
        //设置提示模式
        this.settipmode(mode);
        var obj = theForm || event.srcElement;
        var count = obj.elements.length;
        this.ErrorMessage.length = 1;
        this.ErrorItem.length = 1;
        this.ErrorItem[0] = obj;

        for (var i = 0; i < count; i++) {
            if (obj.elements[i].id != null && "" != obj.elements[i].id) {
                if (vtools.getattr(obj.elements[i].id, 'validatorRules') != null && "" != vtools.getattr(obj.elements[i].id, 'validatorRules')) {
                    //解除事件绑定
                    vtools.addEvent(vtools.$(obj.elements[i].id), 'blur', function() {
                        Validator.immediateValidate4(this);
                    });

                    this.clearState(obj.elements[i]);
                    var iMsgCode = this.validateElement(obj.elements[i]);
                    /**
                     * 返回-1 表示校验通过，
                     * 返回-2 表示规则未定义或Validator3找不到规则
                     */
                    if (iMsgCode != -1) {
                        this.addError(i, iMsgCode);
                    }
                }
            }
        }
        if (this.ErrorMessage.length > 1) {
            this.showAllErrorMsg(mode);
            return false;
        }
        return true;
    },

    /**
     * 显示所有错误信息
     */
    showAllErrorMsg : function (mode) {
        mode = mode || 1;
        var errCount = this.ErrorItem.length;
        switch (mode) {
            case 2 :
                for (var i = 1; i < errCount; i++)
                    this.ErrorItem[i].style.color = "red";
            case 1 :
                for (var i = 1; i < errCount; i++) {
                    var iMsgCode = parseInt(this.ErrorMessage[i]);
                    /**
                     * 如果定义了 字段的本地名称，则取出来提示用户
                     */
                    var name = this.ErrorItem[i].getAttribute("fieldName");
                    if (null == name) {
                        name = "";
                    }
                    this.ErrorMessage[i] = name + " " + this.getErrorMsg(this.ErrorItem[i], iMsgCode);
                }
                alert(this.ErrorMessage.join("\n"));
                this.ErrorItem[1].focus();
                break;
            case 3 :
                for (var i = 1; i < errCount; i++) {
                    var iMsgCode = parseInt(this.ErrorMessage[i]);
                    this.showErrorMsg(this.ErrorItem[i], iMsgCode, false);
                }
                this.ErrorItem[1].focus();
                break;
            case 4 :
                for (var i = 1; i < errCount; i++) {
                    var iMsgCode = parseInt(this.ErrorMessage[i]);
                    this.showErrorMsg(this.ErrorItem[i], iMsgCode, false);
                }
                this.ErrorItem[1].focus();
                break;
            default :
                alert(this.ErrorMessage.join("\n"));
                break;
        }
    },

    /**
     * 校验一个表单元素
     */
    validateElement : function (obj) {
        if (vtools.getattr(obj.id, 'require') == 'false') {
            //不需要验证
            //判断值是不是空			
            if (vtools.getattr(obj.id, 'value') != '') {
                with (obj) {
                    var validatorRules = getAttribute("validatorRules");
                    var _rules = null;
                    if (validatorRules != null && "" != validatorRules) {
                        _rules = validatorRules.split(",");

                        for (var j = 0; j < _rules.length; j++) {
                            var key = _rules[j];
                            if (key in this) {
                                //js函数 回调
                                if (typeof(this[key]) == "string" && key == "CFunction") {
                                    var rs = eval(this[key]);
                                    if (rs != -1) {
                                        return j + rs;
                                    }
                                }
                                if (typeof(this[key]) == "string" && !eval(this[key])) {
                                    return j;
                                }
                                //正则表达式
                                if (typeof(this[key]) == "object" && !this[key].test(value)) {
                                    return j;
                                }
                            }
                            else {
                                /**
                                 * Validator3 找不到规则
                                 */
                                return -2;
                            }
                        }
                    }
                }
                return -1;
            } else {
                return -1;
            }
        }
        else {
            with (obj) {
                var validatorRules = getAttribute("validatorRules");
                var _rules = null;
                if (validatorRules != null && "" != validatorRules) {
                    _rules = validatorRules.split(",");

                    for (var j = 0; j < _rules.length; j++) {
                        var key = _rules[j];
                        if (key in this) {
                            //js函数 回调
                            if (typeof(this[key]) == "string" && key == "CFunction") {
                                var rs = eval(this[key]);
                                if (rs != -1) {
                                    return j + rs;
                                }
                            }
                            if (typeof(this[key]) == "string" && !eval(this[key])) {
                                return j;
                            }
                            //正则表达式
                            if (typeof(this[key]) == "object" && !this[key].test(value)) {
                                return j;
                            }
                        }
                        else {
                            /**
                             * Validator3 找不到规则
                             */
                            return -2;
                        }
                    }
                }
            }
            return -1;
        }
    },

    /**
     * 执行用户自定义校验函数
     */
    exeFunctionList : function (custFunListStr) {
        var sFuncs = custFunListStr.split("&");

        for (var i = 0; i < sFuncs.length; i++) {
            var j = sFuncs[i].indexOf("(") + 1;
            var k = sFuncs[i].indexOf(")");

            var paras = sFuncs[i].substring(j, k);
            var sParaNames = paras.split(",");
            var fname = sFuncs[i].substring(0, j - 1);

            var exeJs = fname + "(";
            for (var ii = 0; paras != "" && ii < sParaNames.length; ii++) {
                try {
                    var vTemp = document.getElementById(sParaNames[ii]).value;
                    if (typeof(vTemp) != "string") {
                        vTemp = sParaNames[ii];
                    }
                }
                catch (e) {
                    vTemp = sParaNames[ii];
                }
                exeJs += "'" + vTemp + "'";
                if (ii < sParaNames.length - 1) {
                    exeJs += ",";
                }
            }
            exeJs += ")";
            try {
                if (!eval(exeJs)) {
                    return i;
                }
            }
            catch(e) {
                alert("Validator3找不到自定义函数：" + exeJs);
                return -500;
            }
        }
        return -1;
    },

    /**
     * 获取表单元素的校验规则
     */
    getValidateRule : function (obj, index) {
        var validatorRules = obj.getAttribute("validatorRules");
        var _rules = null;
        if (validatorRules != null && "" != validatorRules) {
            _rules = validatorRules.split(",");
            return _rules[index];
        }
    },

    /**
     * 显示错误消息
     */
    showErrorMsg : function (obj, j, imgflag) {
        try {
            if (imgflag) {

                if (vtools.getattr(obj.id, 'require') == 'false') {
                    //不需要验证
                    //判断值是不是空
                    if (vtools.getattr(obj.id, 'value') != null && "" != vtools.getattr(obj.id, 'value')) {
                        if (typeof(obj.id) != 'undefined') {
                            //显示红色底纹提示
                            this.highlight(obj.id, this.tiperror);
                            //将错误提示信息
                            vtools.setattr(obj.id, 'title', this.getErrorMsg(obj, j));
                        }
                    }
                }
                else {

                    if (typeof(obj.id) != 'undefined') {
                        //显示红色底纹提示
                        this.highlight(obj.id, this.tiperror);
                        //将错误提示信息
                        vtools.setattr(obj.id, 'title', this.getErrorMsg(obj, j));
                    }
                }
            }
            else {
                if (vtools.getattr(obj.id, 'require') == 'false') {
                    //不需要验证
                    //判断值是不是空
                    if (vtools.getattr(obj.id, 'value') != null && "" != vtools.getattr(obj.id, 'value')) {
                        if (this.tipmode == 3) {
                            //显示黄色底纹提示
                            this.highlight(obj.id, this.requideerror);
                            //将错误提示信息
                            vtools.setattr(obj.id, 'title', this.getErrorMsg(obj, j));
                        }
                        if (this.tipmode == 4 && typeof(obj.id) != 'undefined') {
                            //显示红色底纹提示
                            this.highlight(obj.id, this.tiperror);
                            //将错误提示信息
                            vtools.setattr(obj.id, 'title', this.getErrorMsg(obj, j));
                        }
                    }
                }
                else {
                    if (this.tipmode == 3) {
                        //显示黄色底纹提示
                        this.highlight(obj.id, this.requideerror);
                        //将错误提示信息
                        vtools.setattr(obj.id, 'title', this.getErrorMsg(obj, j));
                    }
                    if (this.tipmode == 4 && typeof(obj.id) != 'undefined') {
                        //显示红色底纹提示
                        this.highlight(obj.id, this.tiperror);
                        //将错误提示信息
                        vtools.setattr(obj.id, 'title', this.getErrorMsg(obj, j));
                    }
                }
            }
        }
        catch (e) {
            alert(e.description);
        }
    },


    /**
     * 添加一个错误消息
     */
    addError : function(index, iMsgCode) {
        this.ErrorItem[this.ErrorItem.length] = this.ErrorItem[0].elements[index];
        this.ErrorMessage[this.ErrorMessage.length] = iMsgCode;
    },

    /**
     * 获取表单元素的校验提示
     * @ obj  表单元素
     * @ index  错误提示的下标
     */
    getErrorMsg : function(obj, index) {
        var msg = "";
        if (-2 == index) {
            msg = "规则未定义";
            return msg;
        }
        if (-100 > index) {
            msg = "Validator3找不到自定义函数";
            return msg;
        }
        try {
            msg = obj.getAttribute("msg" + index);
        }
        catch (e) {
            msg = "Validator3 : 找不到提示信息 msg" + index + " .";
        }
        finally {
            if (null == msg || "" == msg) {
                /**
                 * 获取规则的名称
                 */
                var m = this.getValidateRule(obj, index);
                //根据名称从框架默认提示信息中找
                msg = this["msg" + m];
                //new
                if ("" == msg || typeof(msg) == "undefined") {
                    msg = "Validator3 : 找不到提示信息 msg" + index + " .";
                }
                //end new
            }
        }
        return msg;
    },

    /**
     * 清除提示信息
     * @ obj  表单元素
     */
    clearState : function(obj) {
        //if (vtools.getattr(obj.elements[i].id,'validatorRules')!= null && "" != vtools.getattr(obj.elements[i].id,'validatorRules') ){
        with (obj) {
            //if(style.color == "red")
            //style.color = "";
            //var lastNode = parentNode.childNodes[parentNode.childNodes.length-1];
            this.unhighlight(obj.id, this.tiperror);
            this.unhighlight(obj.id, this.requideerror);
            //清空abc值
            vtools.setattr(obj.id, 'title', '');
            //if(lastNode.id == "__ErrorMessagePanel")
            //parentNode.removeChild(lastNode);
        }
    },

    /**
     * 立即校验表单元素
     * @ obj  表单元素
     */
    immediateValidate : function (obj) {
        this.clearState(obj);
        var rs = this.validateElement(obj);
        if (-1 != rs) {
            this.showErrorMsg(obj, rs, false);
        }
    },
    /**
     * 立即校验表单元素(4模式校验)
     * @ obj  表单元素
     */
    immediateValidate4 : function (obj) {
        this.clearState(obj);
        var rs = this.validateElement(obj);
        if (-1 != rs) {
            this.showErrorMsg(obj, rs, true);
        }
    },

    /**
     * 忽略表单元素的校验
     * @ obj  表单元素
     */
    ignoreRules : function (obj) {
        this.clearState(obj);
        var validatorRules = obj.getAttribute("validatorRules");
        if ("" != validatorRules) {
            //obj.validatorRules = "";
            obj.setAttribute("validatorRules", "");
            obj.setAttribute("tempRules", validatorRules);
        }
    },

    /**
     * 激活表单元素的校验规则
     * @ obj  表单元素
     */
    activeRules : function (obj) {
        this.clearState(obj);
        if (obj.validatorRules == "") {
            obj.validatorRules = obj.getAttribute("tempRules");
        }
    },

    /**
     * 替换规则
     */
    replaceRules : function (obj, rules) {
        obj.validatorRules = rules;
    }
};