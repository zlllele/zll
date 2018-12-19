var stack			=new Array();
var selector_layers	=new Array();
//var layers_root		=new Array();

//selector_layers[selector_layers.length]=document.all.swjgdm_tree_layer;
//layers_root[layers_root.length]	= new Array('swjgdm_tree_frame','14101000000','swjgDb',1,true,true);
/*var lable = FindLabel(swjgDb,14101000000);
document.getElementById("swjgdm").options.length=0;
document.getElementById("swjgdm").options[0]=new Option(lable==null?'':lable,lable==null?'':'14101000000');
lable=null;*/
function click_on_tree_selector(_select,_layer)
{
	if (_layer.style.visibility == "visible"){
		_layer.focus();
		comboList(_select,_layer);
	}else{
		comboList(_select,_layer);
		_layer.focus();
	}
}
function comboList(_select,_layer)
{
	for (var i=0;i<selector_layers.length;i++){
		if (selector_layers[i].id !=_layer.id && selector_layers[i].style.visibility =="visible") 
		{
		selector_layers[i].style.visibility =	"Hidden";
		stack.length = stack.length-1;
		}
	}
	if(_layer.style.visibility == "visible")
	{
		_layer.style.visibility =	"Hidden";
		stack.length = stack.length-1;
	}
	else
	{
		var t=parseInt(_select.offsetTop + 20);
		var l=parseInt(_select.offsetLeft) ;
		var temp  = _select;
		while(temp=temp.offsetParent){
			t+=temp.offsetTop;
			l+=temp.offsetLeft;
		}
		_layer.style.pixelLeft = l ;
		_layer.style.pixelTop  = t ;
		_layer.style.visibility =	"visible";
		stack[stack.length]=new Array(_select,_layer);
	}
}
function Choose(dm,mc){
	return setVal(dm,mc);
}
function setVal(dm,mc)
{
	var current_stack = stack[stack.length-1];
	var _select = current_stack[0];
	var _layer	= current_stack[1];
	if(_select.className.indexOf('spellCode')!=-1){
		setValue(_select.name,dm);
	}else{
		setValue(_select.name,mc);
		setValue(_select.dm_filed,dm);
	}
	_layer.style.visibility =	"Hidden" ;
	stack.length = stack.length-1;
}

/*get label of key 
function FindLabel(DataSource,primaryKey)
{
	if (primaryKey==null) return null;
	for (var i=0;i<DataSource.length;i++ )
	{
		if (DataSource[i].fwdwdm==primaryKey)
		{
			return DataSource[i].fwdwmc;
		}
	}
}*/