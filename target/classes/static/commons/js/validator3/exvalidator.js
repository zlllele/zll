/*************************************************
 Validator v1.05
 code by 我佛山人
 wfsr@msn.com

 modify by 我是乐东人
 yuyu_xn@yahoo.com.cn
 2007-9-9
 *************************************************/
/**************************************************************
 【修改说明】原框架存在以下缺点：
 1、文档化不高，注释太少，不方便扩展。
 2、校验的对象只能是类型等少量的规则。
 3、当被校验的对象有多个规则时，提示只能有一个，不够精细。
 4、不能对一个对象提供多个校验规则，并且它们之间有依赖关系。
 *************************************************************/

Validator.English = /^[A-Za-z]+$/;
Validator.msgEnglish = "英文名只允许英文字母";
Validator.Email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
Validator.Phone = /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/;
//Validator.Mobile = /^((\(\d{2,3}\))|(\d{3}\-))?13\d{9}$/;  //部分手机号通不过校验
Validator.Mobile = /^[1][3-8]\d{9}$/;
Validator.Url = /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
Validator.IdCard = "this.IsIdCard(value)";
Validator.Currency = /^\d+(\.\d+)?$/;
Validator.Number = /^\d+$/;
Validator.Zip = /^[1-9]\d{5}$/;
Validator.QQ = /^[1-9]\d{4,8}$/;
Validator.Integer = /^[-\+]?\d+$/;
Validator.Double = /^[-\+]?\d+(\.\d+)?$/;
Validator.Chinese = /^[\u0391-\uFFE5]+$/;
Validator.Username = /^[a-z]\w{3,}$/i;
Validator.UnSafe = /^(([A-Z]*|[a-z]*|\d*|[-_\~!@#\$%\^&\*\.\(\)\[\]\{\}<>\?\\\/\'\"]*)|.{0,5})$|\s/;
Validator.dh = /(^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-?)?[1-9]\d{6,7}(\-\d{1,4})?$)|(^((\(\d{2,3}\))|(\d{3}\-))?(13|15|18|17)\d{9}$)/; //电话包括固话和手机	Validator.IsSafe = function(str){return !this.UnSafe.test(str);};
Validator.SafeString = "this.IsSafe(value)";
Validator.Filter = "this.DoFilter(value, getAttribute('accept'))";
Validator.Limit = "this.limit(value.length,getAttribute('min'),  getAttribute('max'))";
Validator.LimitB = "this.limit(this.LenB(value), getAttribute('min'), getAttribute('max'))";
Validator.Date = "this.IsDate(value, getAttribute('min'), getAttribute('format'))";
Validator.Repeat = "value == document.getElementsByName(getAttribute('to'))[0].value";
Validator.htCurrency = /^[-]?[\d]{1,9}(\.[\d]{1,2})?$/;//货币验证
Validator.ZDouble = /^[+]?\d+(\.\d+)?$/;//非负数
Validator.ZFloat = /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/;//正数
Validator.ChinaOrNumbOrLett = /^[0-9|\[|\]_a-zA-Z\u4e00-\u9fa5]+$/;//中文数字英文
Validator.NumbOrLett = /^[0-9a-zA-Z]+$/;//数字英文
Validator.czybh = /^([0-9]{3})$/;
Validator.fphm = /^((\d){8})$/;
Validator.fpdm = /^((\d){12})$/;
Validator.nsrsbh = /^(([A-Za-z0-9|-]{15})|([A-Za-z0-9|-]{17})|([A-Za-z0-9|-]{18})|([A-Za-z0-9|-]{19})|([A-Za-z0-9|-]{20}))+$/; //纳税人识别号
Validator.fkg = /\S/; //非空字符
Validator.zzs = /^[1-9]*[1-9][0-9]*$/;  //正整数
Validator.zfds = /^(([1-9]+[0-9]*.{1}[0-9]+)|(0\.[1-9]+[0-9]*)|([1-9][0-9]*)|(0\.[0-9]*[1-9]+))$/;
Validator.cjhm = /^[A-Za-z0-9|-]+$/;  //车架号码
Validator.msgtszf = "不允许输入特殊字符";
Validator.tszf = /^[^<>]+$/;
Validator.Zip1 = /^((\d){6})$/;
Validator.username = /^[^`~!@#$%^&*()+=|\\\][\]\{\}:;'\,.<>\?\s]{1}[^`~!@$%^&()+=|\\\][\]\{\}:;'\,.<>?\s]{0,15}$/;//用户名称
Validator.dhhm = /^(((\(\d{2,3}\))|(\d{3}\-))?13\d{9})|(((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?)$/;

/**
 * 是否输入的值属于指定的范围中
 * @ min 最小值
 * @ max 最大值
 */
Validator.Range = "getAttribute('min') < (value|0) && (value|0) < getAttribute('max')";

/**
 * 比较两个输入值是否符合给定的操作
 * @ value 当前值
 * @ operator 操作【NotEqual、GreaterThan、GreaterThanEqual、LessThan、LessThanEqual】
 * @ to 被比较的属性
 */
Validator.Compare = "this.compare(value,getAttribute('operator'),getAttribute('to'))";
Validator.Custom = "this.Exec(value, getAttribute('regexp'))";
Validator.Group = "this.MustChecked(getAttribute('name'), getAttribute('min'), getAttribute('max'))";

/*********************************************************************************************
 * 功能：提供一个比较两个日期是否在用户指定的范围内
 * @diff 此属性要求程序员指定日期范围，比如7天， diff="7"
 * @to 此属性指定要比较的域
 ********************************************************************************************/
Validator.CompareDate = "this.compareDate(value,getAttribute('diff'),document.getElementsByName(getAttribute('to'))[0].value)";

Validator.compareDate = function(endDate, diff, startDate) {
    var e = endDate.split("-");
    var s = startDate.split("-");

    var sDate = new Date(s[0], s[1], s[2]);
    var eDate = new Date(e[0], e[1], e[2]);

    var diffs = eDate.getTime() - sDate.getTime();

    var date = diffs / (1000 * 24 * 60 * 60);

    if (date > diff) {
        return false;
    }
    else {
        return true;
    }
};
//add by chenfuzhong 2007-9-9 end

/**************************************************************************************************
 *  扩展未有的业务规则,步骤1：
 *  增加规则名称及其回调代码，如下：
 *  CompareDate : "this.compareDate(value,getAttribute('diff'),document.getElementsByName(getAttribute('to'))[0].value)",
 *
 *   注：可以自定义属性，如diff，当compareDate被调用的时候，传入的参数是diff的value，
 **************************************************************************************************/


Validator.limit = function(len, min, max) {
    min = min || 0;
    max = max || Number.MAX_VALUE;
    return min <= len && len <= max;
};
Validator.LenB = function(str) {
    return str.replace(/[^\x00-\xff]/g, "**").length;
};
Validator.ClearState = function(elem) {
    with (elem) {
        if (style.color == "red")
            style.color = "";
        var lastNode = parentNode.childNodes[parentNode.childNodes.length - 1];
        if (lastNode.id == "__ErrorMessagePanel")
            parentNode.removeChild(lastNode);
    }
};
Validator.AddError = function(index, str) {
    this.ErrorItem[this.ErrorItem.length] = this.ErrorItem[0].elements[index];
    this.ErrorMessage[this.ErrorMessage.length] = this.ErrorMessage.length + ":" + str;
};
Validator.Exec = function(op, reg) {
    return new RegExp(reg, "g").test(op);
};
Validator.compare = function(op1, operator, op2) {
    switch (operator) {
        case "NotEqual":
            return (op1 != op2);
        case "GreaterThan":
            return (op1 > op2);
        case "GreaterThanEqual":
            return (op1 >= op2);
        case "LessThan":
            return (op1 < op2);
        case "LessThanEqual":
            return (op1 <= op2);
        default:
            return (op1 == op2);
    }
};

// add by chenfuzhong 2007-9-9 begin
/**************************************************
 * 增加自定义函数校验类型
 *
 * @fname 自定义的函数名称
 * @funcParams 自定义函数的参数名称数组
 *************************************************/
Validator.customFunction = function(fname, funcParams) {
    var sParaNames = funcParams.split(",");
    var sParaValues = new Array();
    var exeJs = fname + "(";
    for (var i = 0; i < sParaNames.length; i++) {
        exeJs += "'" + document.getElementsByName(sParaNames[i])[0].value + "'";
        if (i < sParaNames.length - 1) {
            exeJs += ",";
        }
    }
    exeJs += ")";
    //据说使用eval函数进行回调 不安全
    if (!eval(exeJs)) {
        return false;
    }
    return true;

};
//add by chenfuzhong 2007-9-9 end
/********************************************************************************
 *  扩展未有的业务规则,步骤3：
 *  增加未有业务的回调函数，如下：
 *  比较给定的两个日期之间的天数不能大于diff
 *
 *  compareDate : function(endDate,diff,startDate){
 var e = endDate.split("-");
 var s = startDate.split("-");

 var sDate = new Date(s[0],s[1],s[2]);
 var eDate = new Date(e[0],e[1],e[2]);

 var diffs = eDate.getTime() - sDate.getTime();

 var date = diffs/(1000 * 24 * 60 * 60);

 if(date > diff) {
 return false;
 }
 else {
 return true;
 }
 },
 ********************************************************************************/

Validator.MustChecked = function(name, min, max) {
    var groups = document.getElementsByName(name);
    var hasChecked = 0;
    min = min || 1;
    max = max || groups.length;
    for (var i = groups.length - 1; i >= 0; i--)
        if (groups[i].checked) hasChecked++;
    return min <= hasChecked && hasChecked <= max;
};

Validator.DoFilter = function(input, filter) {
    return new RegExp("^.+\.(?=EXT)(EXT)$".replace(/EXT/g, filter.split(/\s*,\s*/).join("|")), "gi").test(input);
};
//	Validator.IsIdCard = function(number){
//		var date, Ai;
//		var verify = "10x98765432";
//		var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
//		var area = ['','','','','','','','','','','','北京','天津','河北','山西','内蒙古','','','','','','辽宁','吉林','黑龙江','','','','','','','','上海','江苏','浙江','安微','福建','江西','山东','','','','河南','湖北','湖南','广东','广西','海南','','','','重庆','四川','贵州','云南','西藏','','','','','','','陕西','甘肃','青海','宁夏','新疆','','','','','','台湾','','','','','','','','','','香港','澳门','','','','','','','','','国外'];
//		var re = number.match(/^(\d{2})\d{4}(((\d{2})(\d{2})(\d{2})(\d{3}))|((\d{4})(\d{2})(\d{2})(\d{3}[x\d])))$/i);
//		if(re == null) return false;
//		if(re[1] >= area.length || area[re[1]] == "") return false;
//		if(re[2].length == 12){
//			Ai = number.substr(0, 17);
//			date = [re[9], re[10], re[11]].join("-");
//		}
//		else{
//			Ai = number.substr(0, 6) + "19" + number.substr(6);
//			date = ["19" + re[4], re[5], re[6]].join("-");
//		}
//		if(!this.IsDate(date, "ymd")) return false;
//		var sum = 0;
//		for(var i = 0;i<=16;i++){
//			sum += Ai.charAt(i) * Wi[i];
//		}
//		Ai +=  verify.charAt(sum%11);
//		return (number.length ==15 || number.length == 18 && number == Ai);
//	};
/**
 *身份证验证,
 *idcard: 身份证号
 *xb: 检测之后,对性别赋值的文本框或者下拉菜单id,不赋值传空值
 *jg:对籍贯赋值的文本框id不赋值传空值
 *csrq:对出生日期赋值的文本框点,不赋值传空值
 */
Validator.IsIdCard = function(idcard, xb, jg, csrq, sfzh) {

    var Errors = new Array(
            "验证通过!",
            "身份证号码位数不对!",
            "身份证号码出生日期超出范围或含有非法字符!",
            "身份证号码校验错误!",
            "身份证号码校验错误!"
            );
    var area = {11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"}

    var Y,JYM;
    var S,M;


    var idcard_array = new Array();
    idcard_array = idcard.split("");
    //地区检验
    if (area[parseInt(idcard.substr(0, 2))] == null) {
        //alert(Errors[4]);
        return false;
    }
    //身份号码位数及格式检验
    switch (idcard.length) {
        case 15:
            if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 )) {
                ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;

                //测试出生日期的合法性
            } else {
                ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;
                //测试出生日期的合法性
            }
            if (ereg.test(idcard)) {
                var csrq_o = document.getElementById(csrq);
                var xb_o = document.getElementById(xb);
                var jg_o = document.getElementById(jg);
                var sfzhv = idcard.substr(0, 6) + "19" + idcard.substr(6);
                sfzhv = sfzhv + getYZM(sfzhv);
                if (sfzh != undefined && sfzh.length > 0) {
                    var sfzh_o = document.getElementById(sfzh);
                    sfzh_o.value = sfzhv;
                }


                //设置籍贯
                if (jg_o != undefined) {
                    jg_o.value = area[parseInt(idcard.substr(0, 2))];
                }

                //出生日期

                if (csrq_o != undefined) {
                    csrq_o.value = "19" + idcard.substr(6, 2) + "-" + idcard.substr(8, 2) + "-" + idcard.substr(10, 2);
                }
                //性别
                if (xb_o != undefined) {
                    if (parseInt(idcard.substr(14, 1)) % 2 == 0) {
                        if (xb_o.tagName.toLowerCase() == "select") {
                            xb_o.selectedIndex = 2;
                        } else {
                            xb_o.value = "女"
                        }
                        //女
                    } else {
                        if (xb_o.tagName.toLowerCase() == "select") {
                            xb_o.selectedIndex = 1;
                        } else {
                            xb_o.value = "男"
                        }
                        //男
                    }
                }

                return true;
            }
            else {
                //alert(Errors[2]);
                return false;
            }
            break;
        case 18:
            //18位身份号码检测
            //出生日期的合法性检查
            //闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
            //平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
            if (parseInt(idcard.substr(6, 4)) % 4 == 0 || (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0 )) {
                ereg = /^[1-9][0-9]{5}[1-9][0-9]{3}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;
                //闰年出生日期的合法性正则表达式
            } else {
                ereg = /^[1-9][0-9]{5}[1-9][0-9]{3}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;
                //平年出生日期的合法性正则表达式
            }
            if (ereg.test(idcard)) {//测试出生日期的合法性
                M = getYZM(idcard)
                if (M == idcard_array[17]) {

                    var csrq_o = document.getElementById(csrq);
                    var xb_o = document.getElementById(xb);
                    var jg_o = document.getElementById(jg)

                    //设置籍贯
                    if (jg_o != undefined) {
                        jg_o.value = area[parseInt(idcard.substr(0, 2))];
                    }

                    //出生日期
                    if (csrq_o != undefined) {
                        csrq_o.value = idcard.substr(6, 4) + "-" + idcard.substr(10, 2) + "-" + idcard.substr(12, 2);
                    }
                    //性别
                    if (xb_o != undefined) {
                        if (parseInt(idcard.substr(16, 1)) % 2 == 0) {
                            if (xb_o.tagName.toLowerCase() == "select") {
                                xb_o.selectedIndex = 2;
                            } else {

                                xb_o.value = "女"
                            }
                            //女
                        } else {
                            if (xb_o.tagName.toLowerCase() == "select") {
                                xb_o.selectedIndex = 1;
                            } else {
                                xb_o.value = "男"
                            }
                            //男
                        }
                    }

                    return true;
                    //检测ID的校验位
                }
                else {
                    //alert(Errors[3]);
                    return false;
                }
            }
            else {
                //alert(Errors[2]);
                return false
            }
            break;
        default:
            //alert(Errors[1]);
            return false;
    }

    function getYZM(sfzh) {
        //计算校验位
        var sfzh_array = new Array();
        sfzh_array = sfzh.split("");
        S = (parseInt(sfzh_array[0]) + parseInt(sfzh_array[10])) * 7
                + (parseInt(sfzh_array[1]) + parseInt(sfzh_array[11])) * 9
                + (parseInt(sfzh_array[2]) + parseInt(sfzh_array[12])) * 10
                + (parseInt(sfzh_array[3]) + parseInt(sfzh_array[13])) * 5
                + (parseInt(sfzh_array[4]) + parseInt(sfzh_array[14])) * 8
                + (parseInt(sfzh_array[5]) + parseInt(sfzh_array[15])) * 4
                + (parseInt(sfzh_array[6]) + parseInt(sfzh_array[16])) * 2
                + parseInt(sfzh_array[7]) * 1
                + parseInt(sfzh_array[8]) * 6
                + parseInt(sfzh_array[9]) * 3;
        Y = S % 11;
        M = "F";
        JYM = "10X98765432";
        M = JYM.substr(Y, 1);
        return M;
        //判断校验位

    }

};
Validator.IsDate = function(op, formatString) {
    formatString = formatString || "ymd";
    var m, year, month, day;
    switch (formatString) {
        case "ymd" :
            m = op.match(new RegExp("^((\\d{4})|(\\d{2}))([-./])(\\d{1,2})\\4(\\d{1,2})$"));
            if (m == null) return false;
            day = m[6];
            month = m[5] * 1;
            year = (m[2].length == 4) ? m[2] : GetFullYear(parseInt(m[3], 10));
            break;
        case "dmy" :
            m = op.match(new RegExp("^(\\d{1,2})([-./])(\\d{1,2})\\2((\\d{4})|(\\d{2}))$"));
            if (m == null) return false;
            day = m[1];
            month = m[3] * 1;
            year = (m[5].length == 4) ? m[5] : GetFullYear(parseInt(m[6], 10));
            break;
        default :
            break;
    }
    if (!parseInt(month)) return false;
    month = month == 0 ? 12 : month;
    var date = new Date(year, month - 1, day);
    return (typeof(date) == "object" && year == date.getFullYear() && month == (date.getMonth() + 1) && day == date.getDate());
    function GetFullYear(y) {
        return ((y < 30 ? "20" : "19") + y) | 0;
    }
};
 
