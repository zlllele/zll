/**
 * 通知公告阅读
 * @param djid
 */
function viewTzgg(djid){
	window.open("server/OA/tzgg/viewGgxx.jsp?XXID="+djid+"&qxxkdm=691","tzgg");
}
/**
 * 
 * @param vgwid
 * @param op
 * @param qxxkdm
 */
function gwhs(vgwid,op,qxxkdm){
	window.showModalDialog("server/OA/gwgl/common/editGwcl.jsp?GWID="+vgwid+"&op="+op+"&FWBZ=2&qxxkdm="+qxxkdm,window,"dialogWidth:1000px;dialogHeight:900px;");
	self.location.reload();
}

function readMsg(xxid){
	window.showModalDialog("server/OA/fzgj/znxx/reply.jsp?xxlx=TO&qxxkdm=749&BH="+xxid,window,"dialogWidth:500px;dialogHeight:450px;");
		self.location.reload();
}

function tzsp(xxid,qxxkdm){
	window.showModalDialog("server/OA/tzgg/editGgxx.jsp?op=sh&XXID="+xxid+"&qxxkdm="+qxxkdm,window,'dialogWidth:800px;dialogHeight:700px;');
	self.location.reload();
}

function tzfb(xxid,qxxkdm){
	saveframe_KP.location=("server/OA/tzgg/ggxxResult.jsp?op=fb&XXID="+xxid+"&qxxkdm="+qxxkdm);
}



//考勤管理模块
function kqsp(oaid,splx,qxxkdm)
{
  form_kp.OAID.value=oaid;
  form_kp.PZFS.value=splx;
  form_kp.action="/server/OA/kqgl/kqsp/sp.jsp?qxxkdm="+qxxkdm;
  form_kp.submit();
}

//车辆管理
function clFunc(bh,qxxkdm){
   var iTop = (window.screen.availHeight-500+100)/2;       //获得窗口的垂直位置;
   var iLeft = (window.screen.availWidth-600+100)/2; 
   window.showModalDialog('/server/OA/clgl/clsysp/inc/djsp.jsp?qxxkdm='+qxxkdm+'&BH='+bh,window,'dialogWidth:800px;dialogHeight:450px;');
}

function Choose(dm,mc){
	   top.FRM_LEFT.Choose(dm,mc);
}

function hysp(hybh,qxxkid){
	   var iTop = (window.screen.availHeight-500+100)/2;       //获得窗口的垂直位置;
	   var iLeft = (window.screen.availWidth-600+100)/2; 
	   var url = "/server/OA/hygl/hysp/viewHy.jsp?qxxkdm="+qxxkid+"&HYBH="+hybh;
	   var result=window.showModalDialog(url,window,'dialogWidth:800px;dialogHeight:650px;');
	   document.location.reload();
	   }
