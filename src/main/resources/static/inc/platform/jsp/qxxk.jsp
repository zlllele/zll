<%@ taglib uri="http://www.htjs.net" prefix="htjs"%>
<%@page contentType="text/html; charset=UTF-8"%>
<%@page import="net.htjs.util.CommonUtil" %>
<%@page import="java.util.List" %>
<jsp:useBean id="user1" class="net.htjs.platform.web.bean.qx.QxUser"></jsp:useBean>
<jsp:directive.page import="net.htjs.platform.dao.*"/>
	<%
	String accountid=String.valueOf(request.getSession().getAttribute("ACCOUNTID"));
	//request.setAttribute("ACCID",accountid);
	//out.println(CommonUtil.toJSON("qxxk",baseBean.getList("selectQX_GNMK_QXXK_ALL",request)));
	out.println(CommonUtil.toJSON("qxxk",user1.getUserGnmkAll(request)));//改动selectQX_GNMK_QXXK_ALL增加了此行程序 hzq 20121224
	if(session.getAttribute("MYQXXKDMS")==null||session.getAttribute("MYQXXKDMS").equals("")||session.getAttribute("MYQXXKDMS").equals("#")){
		session.setAttribute("MYQXXKDMS","NULL");
	}
	Object dao=user1.ctx.getBean("baseDao");
	List list=null;
	if(dao instanceof BaseDao){
		list= ((BaseDao)dao).getLogSqlidList();
	}else{
		list= ((BaseDaoWithEjb)dao).getLogSqlidList();
	}
	//baseBean.log.error("++++++++++++++MYQXXKIDS=="+session.getAttribute("MYQXXKDMS"));
	out.println("var myqxxkdms='"+session.getAttribute("MYQXXKDMS")+"';");
	out.print("var logqxxkdms='");
	if(list!=null&&list.size()>0){
		StringBuffer strBuffer = new StringBuffer();
		for(int i=0;i<list.size();i++){
			String tmp = (String)list.get(i);
			if(tmp.startsWith(accountid+"_")&&tmp.endsWith("4")){//记录登陆用户所在账套的需要进行查询的模块；accountid_mkxkid_4
				strBuffer.append(list.get(i));
				strBuffer.append(";");
			}
		}
		out.print(strBuffer);
	}
	out.print("'");
    out.println("");//打印换行
	%>
    for(i=0;i<qxxk.length;i++){
		tmp = qxxk[i];
		str ="";
		while(tmp&&tmp.sj_mkxkid!="0"){
			str+='##';
			tmp = getSj(tmp);
		}
		qxxk[i].appendStr=str;
	}
	
	function getSj(obj){
		for(j=0;j<qxxk.length;j++){
			if(obj.sj_mkxkid==qxxk[j].mkxkid){
				return qxxk[j];
			}
		}
	}