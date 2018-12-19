/****************************************
 *             有效性校验函数使用示例
 * 1、<td>身份证：</td><td><input name="Card" dataType="IdCard" msg="身份证号码不正确"></td>
 * 2、<td>年龄：</td><td><input name="Year" dataType="Range" msg="年龄必须在18~28之间" min="18" max="28"></td>
 * 3、<td>年龄1：</td><td><input name="Year1" require="false" dataType="Compare" msg="年龄必须在18以上" to="18" operator="GreaterThanEqual"></td>
 * 4、<td>邮政编码：</td><td><input name="Zip" dataType="Custom" regexp="^[1-9]\d{5}$" msg="邮政编码不存在"></td>
 * 5、<td>操作系统：</td><td><select name="Operation" dataType="Require"  msg="未选择所用操作系统" ><option value="">选择您所用的操作系统</option><option value="Win98">Win98</option><option value="Win2k">Win2k</option><option value="WinXP">WinXP</option></select></td>
 * 6、<td>所在省份：</td><td>广东<input name="Province" value="1" type="radio">陕西<input name="Province" value="2" type="radio">浙江<input name="Province" value="3" type="radio">江西<input name="Province" value="4" type="radio" dataType="Group"  msg="必须选定一个省份" ></td>
 * 7、<td>爱好：</td><td>运动<input name="Favorite" value="1" type="checkbox">上网<input name="Favorite" value="2" type="checkbox">听音乐<input name="Favorite" value="3" type="checkbox">看书<input name="Favorite" value="4" type="checkbox"" dataType="Group" min="2" max="3"  msg="必须选择2~3种爱好"></td>
 * 8、<td colspan="2"><input name="Submit" type="submit" value="确定提交"><input onClick=\"Validator.Validate(document.getElementById('demo(form的名字)'))" value="检验" type="button"></td>
 ****************************************/
Validator = {
	Require : "this.IsNotEmpty(value)",  
	Email : /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
	Phone : /^((\(\d{3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}$/,
	Mobile : /^(0|(\,)?(13[0-9]|15[0-9]|18[0-9])\d{8}(\,)?)+$/,
	MoblieGroup:/^(0|(\,)?(13[0-9]|15[0-9]|18[0-9])\d{8}(\,)?)+$/,
	PhoneAll:/^(0?(10|2[0-57-9]|[3-9]\d{2}|1(3\d|5\d|8\d))-?)?\d{7,8}(-\d{2,4})?$/,
	Url : /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/,
	IdCard : /^\d{18}(\d{2}[A-Za-z0-9])?$/,
	Currency : /^\d+(\.\d+)?$/,
	Number : /^\d+$/,
	Number2 :/^[0-9]*[1-9][0-9]*$/,
	Number3 : /^[0-9]{1}$|^[0-4][0-9]$|^50$/,  
	Zip : /^[1-9]\d{5}$/,
	QQ : /^[1-9]\d{4,8}$/,
	Integer : /^[-\+]?\d+$/,
	Double : /^[-\+]?\d+(\.\d+)?$/,
	English : /^[A-Za-z]+$/,
	English2 : /^[A-Za-z\d_]+$/,
	Date2 : /^(19)\d{2}|([2-9])\d{3}-{1}[0-1]{1}[0-9]{1}-{1}[0-3]{1}[0-9]{1}$/,
	Date3 : /^(19)\d{2}|([2-9])\d{3}((0[1-9])|(1[0-2]))$/,
	Chinese :  /^[\u0391-\uFFE5]+$/,
	UnSafe : /^(([A-Z]*|[a-z]*|\d*|[-_\~!@#\$%\^&\*\.\(\)\[\]\{\}<>\?\\\/\'\"]*)|.{0,5})$|\s/,
	IsSafe : function(str){return !this.UnSafe.test(str);},
	SafeString : "this.IsSafe(value)",
	Limit : "this.limit(value.length,getAttribute('min'),  getAttribute('max'))",
	LimitB : "this.limit(this.LenB(value), getAttribute('min'), getAttribute('max'))",
	Date : "this.IsDate(value, getAttribute('min'), getAttribute('format'))",
	Repeat : "value == document.getElementsByName(getAttribute('to'))[0].value",
	Range : "getAttribute('min') < value && value < getAttribute('max')",
	Compare : "this.compare(value,getAttribute('operator'),getAttribute('to'))",
	Custom : "this.Exec(value, getAttribute('regexp'))",
	Group : "this.MustChecked(getAttribute('name'), getAttribute('min'), getAttribute('max'))",
	ErrorItem : [document.forms[0]],
	ErrorMessage : ["以下原因导致提交失败：\t\t\t\t"],
	Validate : function(theForm, mode){
		if(typeof jQuery != 'undefined'){
			$(".must[type=text]").each(function(){
				var _this=$(this);
				if(_this.val()==_this.attr("placeholder")){
					_this.val("");
				}
			});
		}
		var obj = theForm || event.srcElement;
		var count = obj.elements.length;
		this.ErrorMessage.length = 1;
		this.ErrorItem.length = 1;
		this.ErrorItem[0] = obj;
		for(var i=0;i<count;i++){
			//alert(obj.elements[i].name)
			if(obj.elements[i].disabled){//如果控件无效，不进行校验
				continue;
			}
			with(obj.elements[i]){
				var _dataType = getAttribute("dataType");
				if(typeof(_dataType) == "object" || typeof(this[_dataType]) == "undefined")  continue;
				this.ClearState(obj.elements[i]);
				if(getAttribute("require") == "false" && value == "") continue;
				switch(_dataType){
					case "Date" :
					case "Repeat" :
					case "Range" :
					case "Compare" :
					case "Custom" :
					case "Group" :
					case "Limit" :
					case "LimitB" :
					case "SafeString" :
					case "Require":
						if(!eval(this[_dataType]))	{
							this.AddError(i, getAttribute("msg"));
						}
						break;
					default :
						if(!this[_dataType].test(value)){
							this.AddError(i, getAttribute("msg"));
						}
						break;
				}
			}
		}
		if(this.ErrorMessage.length > 1){
			mode = mode || 1;
			var errCount = this.ErrorItem.length;
			switch(mode){
			case 2 :
				for(var i=1;i<errCount;i++)
					this.ErrorItem[i].style.color = "red";
			case 1 :
				alert(this.ErrorMessage.join("\n"));
				if(this.ErrorItem[1].type.toUpperCase()!="HIDDEN")
					this.ErrorItem[1].focus();
				break;
			case 3 :
				for(var i=1;i<errCount;i++){
				try{
					var span = document.createElement("SPAN");
					span.id = "__ErrorMessagePanel";
					span.style.color = "red";
					this.ErrorItem[i].parentNode.appendChild(span);
					span.innerHTML = this.ErrorMessage[i].replace(/\d+:/,"*");
					}
					catch(e){alert(e.description);}
				}
				this.ErrorItem[1].focus();
				break;
			default :
				alert(this.ErrorMessage.join("\n"));
				break;
			}
			if(typeof jQuery != 'undefined'){
				 $(".must[type=text]").each(function(){
						$(this).placeholder();
					});
			}
			return false;
		}
		return true;
	},
	limit : function(len,min, max){
		min = min || 0;
		max = max || Number.MAX_VALUE;
		return min <= len && len <= max;
	},
	LenB : function(str){
		return str.replace(/[^\x00-\xff]/g,"**").length;
	},
	ClearState : function(elem){
		with(elem){
			if(style.color == "red")
				style.color = "";
			var lastNode = parentNode.childNodes[parentNode.childNodes.length-1];
			if(lastNode.id == "__ErrorMessagePanel")
				parentNode.removeChild(lastNode);
		}
	},
	AddError : function(index, str){
		this.ErrorItem[this.ErrorItem.length] = this.ErrorItem[0].elements[index];
		this.ErrorMessage[this.ErrorMessage.length] = this.ErrorMessage.length + ":" + str;
	},
	Exec : function(op, reg){
		return new RegExp(reg,"g").test(op);
	},
	compare : function(op1,operator,op2){
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
	},
	MustChecked : function(name, min, max){
		var groups = document.getElementsByName(name);
		var hasChecked = 0;
		min = min || 1;
		max = max || groups.length;
		for(var i=groups.length-1;i>=0;i--)
			if(groups[i].checked) hasChecked++;
		return min <= hasChecked && hasChecked <= max;
	},
	IsNotEmpty : function(op){
		op = op.replace(/\n|\s|\r/g,"");
		return op.length!=0;
	},
	IsDate : function(op, formatString){
		formatString = formatString || "ymd";
		var m, year, month, day;
		switch(formatString){
			case "ymd" :
				m = op.match(new RegExp("^((\\d{4})|(\\d{2}))([-./])(\\d{1,2})\\4(\\d{1,2})$"));
				if(m == null ) return false;
				day = m[6];
				month = m[5]--;
				year =  (m[2].length == 4) ? m[2] : GetFullYear(parseInt(m[3], 10));
				break;
			case "dmy" :
				m = op.match(new RegExp("^(\\d{1,2})([-./])(\\d{1,2})\\2((\\d{4})|(\\d{2}))$"));
				if(m == null ) return false;
				day = m[1];
				month = m[3]--;
				year = (m[5].length == 4) ? m[5] : GetFullYear(parseInt(m[6], 10));
				break;
			default :
				break;
		}
		if(!parseInt(month)) return false;
		//month = month==12 ?0:month;
		month = month-1;
		var date = new Date(year, month, day);
        return (typeof(date) == "object" && year == date.getFullYear() && month == date.getMonth() && day == date.getDate());
		function GetFullYear(y){return ((y<30 ? "20" : "19") + y)|0;}
	}
 }