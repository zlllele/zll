/**
 * <ol>
 * date:2011-12-22 editor:yanghongjian
 * <li>创建文档</li>
 * <li>组合选择插件</li>
 * <li>在指定的录入框上自动添加图标和下拉的DIV,参数格式为{readOnly:false,width:200,heigth:150}</li>
 * </ol>
 */
(function ($) {
    $.fn.basecombox = function (o) {
        if (!this.dropdown) {
            alert("请引用jquery-dropdown.js");
            return;
        }
        if (!o.dataformat) {
            o.dataformat = function (data) {
                return { text: data[1], value: data[0] };
            };
        }
//        var tableoption = { qtitletext: "请输入关键字", pagesize: 10, autoload: true, textindex: 1, valueindex: 0 };

        if(!o.tableName){
        	alert("必须制定调用的数据来源表！");
        	return false;
        }
        //加载数据
        
        
//        if(o.pageSize < o.data.length){
        	   	
//        }
        var targObj = this[0];
//        this.each(function() {
//        	targObj = $(this);
//		});
//        alert(targObj.value);
        var qtparse = {
                name: "qtable",
                render: function (parent) {
                    var target = this.target;
                    var tbpanel = $("<div class='tablecontaienr' style='z-index:999;'/>");  //tablepanel
                    var thtml = [];
                    var _id = targObj.id;
                    thtml.push("<table id='baseCombo_" + _id + "' style='z-index:999'></table>");
                    thtml.push("<div id='tbListPg_" + _id + "' ></div>");
                    tbpanel.html(thtml.join(""));
//                    ppanel.append(ppreva).append(pnexta).append("<span>0/0</span>");
                    parent.append(tbpanel);
                    var divpage = $("<div class='mmPaginator' style='width:100%;text-align:center;'/>");
                    var ppanel = $("<ul class='pageList' style='margin:0px;'/>");  //pagepanel
                    var pnexta = $("<li class='prev disable'><a class='pagenext' href='javascript:void(0);'>»</a></li>").click(function () {
//                        var v = qtext.val();
                        query(targObj,opts, 39);
                    });

                    var ppreva = $("<li class='prev disable'><a class='' href='javascript:void(0);'>«</a></li>").click(function () {
                    	query(targObj,opts, 37);
                    });
                    
                    ppanel.append(ppreva).append("<li class='active' id='pag_" +_id+ "'>0/0</li>").append(pnexta);
                    divpage.append(ppanel);
                    parent.append(divpage);
                    var opts = $.extend({},$.fn.basecombox.defaults, o);
                    var _mc = opts.textFiled || "MC";
                	var _dm = opts.valueFiled || "DM";
                	var _pyt = opts.pytFiled || "PYT";
                	
                	_tbwidth = parseFloat(parent.css('width'))-3;
                    _tbheight = parseFloat(parent.css('height')) - 33;
                    var cols = opts.cols||[{
                    				title : "---",
                    				name : _mc,
                    				width : _tbwidth,
                    				align : "left",
                    				renderer :function(val,item){
//                    					alert(val);
                    					if(!opts.dataFormat){
                    						return val ;                    						
                    					}else if(opts.dataFormat=="2"){
                    						return val;
                    					}else if(opts.dataFormat=="1"){
                    						return item[_dm];
                    					}else{
                    						return item[_dm] + "|" + val;
                    					}
                    				}
                    			}
                    		];
                        var tbList = $("#baseCombo_" + _id);
                       
	                    var gridObj = tbList.mmGrid({
	            			height : _tbheight,
	            			width  : _tbwidth,
//	            			fullWidthRows : true,
	            			multiSelect : false,
	            			checkCol : false,
	            			indexCol : false,
	            			showBackboard : false,
	            			autoLoad : false,
	            			nowrap : true,
	            			cols : cols
//	            			plugins : [ $("#tbListPg_" + targObj.id).htjsPaginator({
//	            				limitList : [ _lineCount - 1],
//	            				loadFunction : [ query(targObj,opts) ]
//	            			}) ]
	            		}).on('cellSelected',
                        function(e, item, rowIndex, colIndex) {
	            			var cell = [rowIndex];
                            cell.push(colIndex);
                            var ret = o.dataformat(cell);
                            target.SelectedChanged(ret);
                            targObj.value = item[_mc];
                        	if(opts.dmFiled){
                        		$("#" + opts.dmFiled).val(item[_dm]);
                        	}
                            if (o.selectRowCall) {
                                o.selectRowCall(item);
                            }
                        });
	                    tbList.css("width",_tbwidth);//IE正常模式下，生成的宽度为0，必须重新设置宽度
//	                    tbList.siblings().find(".mmg-headWrapper").hide();
	                    function query(obj,opts,keyCode){
	                    	if(opts.async){//异步加载
	                    		
	                    	}else{//同步加载        	
	                    		if(!opts.data){	
	                    			var param = $.extend({}, opts.param , {TABLENAME : opts.tableName});
	                    			var data = jdglTools.getBindData(opts.tableName);
	                    			if(data){
	                    				opts.data = data;
	                    			}else{
		                    			baseTools.xhrAjax({
		                    				url : "/cm/selectDmPlugin.do",
		                    				params : param, 
	//	                    				async : false,//同步加载，使用异步在修改时，可能会造成无法选中。
		                    				callback : [ function(jsonObj, xhrArgs) {
		                    					
		                    					switch (parseInt(jsonObj.code)) {
		                    					case 0:
		                    						var data = jsonObj["data"+opts.tableName];
		                    						if(data){
		                    							opts.data = data;
		                    							jdglTools.bindData(opts.tableName,data);
	//	                    							gridObj.items = data;
	//	                    							alert(data);
		                    							filterData(obj.value);
		                    							
		                    						}
		                    						break;
		                    					case -3:
		                    						alert(jsonObj.msg);
		                    						baseTools.gotoLogin();
		                    						break;
		                    					default:
		                    						alert(jsonObj.msg);
		                    					}
		                    				} ]
		                    			});
		                    		}
	                    		}else{
	                    			filterData(obj.value,keyCode);
	                    		}
	                    	}
	                    };
	                    function filterData(val,keyCode){
	                    	
	                    	var items = gridObj.rows();
	                    	var _ps = opts.pageSize;
	                    	var _mc = opts.textFiled || "MC";
                        	var _dm = opts.valueFiled || "DM";
                        	var _xztjFiled = opts.xztjFiled;
                        	var _max_page = Math.ceil(opts.total>0?opts.total/_ps:opts.data.length/_ps);
	                    	opts.total = 0;
	                    	if(keyCode){//
	                    		if(!target.isShow()){
	                    			target.click();
	                    		}
	                    		if(keyCode != 13 && (keyCode<37 || keyCode>40 )){
//	                    			alert(keyCode);
	                    			opts.page = 1;
	                    			$("#" + opts.dmFiled).val("");
	                    		}
	                    	}
	                    	if(keyCode == 13){//enter
	                    		if(items.length > 0){
	                    			var _idx = opts.selectedIndex > -1 ? opts.selectedIndex : 0;
	                    			gridObj.select(_idx);
	                    			target.SelectedChanged(items[_idx]);
	                    			if (o.selectRowCall) {
	                    				o.selectRowCall(items[_idx]);
	                    			}
	                    			targObj.value = items[_idx][_mc];
	                    			if(opts.dmFiled){
	                    				$("#" + opts.dmFiled).val(items[_idx][_dm]);
	                    			}
	                    		}
//	                    		alert(true);
	                            return ;
	                    	}
	                    	if(keyCode == 38){//up
	                    		if(opts.selectedIndex - 1 > -1){
	                    			opts.selectedIndex = opts.selectedIndex - 1;
	                    			gridObj.select(opts.selectedIndex);
		                    		return;
	                    		}else{
	                    			if(opts.page > 1){	 
	                    				
	                    				opts.selectedIndex = opts.pageSize - 1;
//	                    				alert(opts.selectedIndex);
	                    				keyCode = 37;
	                    			}else{
	                    				gridObj.select(opts.selectedIndex);
	    	                    		return;
	                    			}
	                    		}
	                    		
	                    	}
	                    	if(keyCode == 40){//down
	                    		
	                    		if(opts.selectedIndex + 1 < opts.pageSize){
//	                    			alert(opts.selectedIndex + 1)
//	                    			alert(items.length);
//	                    			alert(opts.selectedIndex + 1 < items.length);
	                    			if(opts.selectedIndex + 1 < items.length){//未超出最带结果集
	                    				opts.selectedIndex = opts.selectedIndex + 1;
	                    			}
	                    			gridObj.select(opts.selectedIndex);
	                    			return;
	                    		}else{
	                    			opts.selectedIndex = 0;
	                    			keyCode = 39;
	                    		}
	                    	}
	                    	if(keyCode == 39){//right
	                    		opts.page = opts.page<_max_page?opts.page+1:opts.page;
	                    	}
	                    	if(keyCode == 37){//left
	                    		opts.page = opts.page>1?opts.page-1:1;
	                    	}
	                    	
	                    	items = [];
	                    	var _start = (opts.page - 1) * _ps;
	                    	var xztj = _xztjFiled?$("#" + _xztjFiled).val():"";//获取限制条件的值
	                    	if(val){
	                    		
	                        	
	                        	
	                    		
	                    		for(var i in opts.data){
	                    			if(xztj){
	                    				if(!opts.data[i]["XZTJ"]||opts.data[i]["XZTJ"].indexOf(xztj)==-1){//返回集必须首先满足限制条件，再进行其他判断
	                    					continue;
	                    				}
	                    			}
	                    			if(opts.data[i][_dm].indexOf(val)>-1||opts.data[i][_mc].indexOf(val)>-1||(opts.data[i][_pyt]&&opts.data[i][_pyt].indexOf(val.toUpperCase())>-1)){
	                    				if(items.length< _ps && opts.total>=_start){
	                    					items.push(opts.data[i]);
	                    				}
	                    				opts.total = opts.total + 1;
	                    			}
	                    		}
	                    	}else{
	                    		for(var i in opts.data){
	                    			if(xztj){
	                    				if(!opts.data[i]["XZTJ"]||opts.data[i]["XZTJ"].indexOf(xztj)==-1){//返回集必须首先满足限制条件，再进行其他判断
	                    					continue;
	                    				}
	                    			}
//	                    			if(opts.data[i][_dm].indexOf(val)>-1||opts.data[i][_mc].indexOf(_mc)>-1){
                    				if(items.length < _ps && opts.total>=_start){
                    					items.push(opts.data[i]);
                    				}
                    				opts.total = opts.total + 1;
	                    		}
	                    	}
	                    	gridObj.load(items);
	                    	if(items.length > 0){
//	                    		opts.selectedIndex = 0;
	                    		gridObj.select(opts.selectedIndex);
	                    	}
	                    	$("#pag_" + _id).html(opts.page + "/" + Math.ceil(opts.total/opts.pageSize));
	                    };//end query
	                    query(targObj,opts);
                    		
	                    $(targObj).unbind("keypress");//接触所有keypress事件
	                    $(targObj).keyup(function(e){
	                    	var keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
	                    	query(targObj,opts,keyCode);
	                    	
	                    });
	                    $(targObj).blur(function(e){//失去焦点时，如果没有选中，将文本清空
//	                    	if(opts.dmFiled && $("#" + opts.dmFiled).val() == ""){
//	                    		$(this).val("");
//	                    	}
	                    	
	                    });
	                    $(targObj).bind("click",function(){query(targObj,opts);});
//                    
//                    alert(o);
                    
                }
        };
//        $.extend(o, { parse: qtparse, containerCssClass: "qtableContainer", autoheight: true });
        $.extend(o, { parse: qtparse, containerCssClass: "divCombo" ,vinputid:o.dmFiled});
        $(this).addClass("baseCombo");
        
        var _rtn = $(this).dropdown(o);
        _rtn.init();
//        alert($("#tbListPg_" + targObj.id).length);
        return _rtn;
    };
    
    $.fn.basecombox.defaults = {
    		pageSize: 		5,//分页大小
    		page    :        1,//当前页
    		total   :        0,//总记录数
    		selectedIndex :  0,//选中的下标
    		dataFormat    :  '0',//显示格式
    		async   :    false //默认异步加载
    	};
    
})(jQuery);
