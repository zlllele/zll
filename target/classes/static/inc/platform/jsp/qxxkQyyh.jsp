<%@ taglib uri="http://www.htjs.net" prefix="htjs"%>
<%@page contentType="text/html; charset=UTF-8"%>
<%@page import="net.htjs.util.CommonUtil" %>
<%@page import="net.htjs.platform.bo.qx.IQxUser" %>
<%@page import="net.htjs.platform.action.qydgl.PtQxQyyhAction" %>
<%@page import="net.htjs.platform.persistence.sqlmapdao.*" %>
<%@page import="java.util.*" %>
	<%
	String accountid=String.valueOf(request.getSession().getAttribute("ACCOUNTID"));
	//request.setAttribute("ACCID",accountid);
	//out.println(CommonUtil.toJSON("qxxk",baseBean.getList("selectQX_GNMK_QXXK_ALL",request)));
	IQxUser user1=((PtQxQyyhAction)net.htjs.platform.actions.BaseAction.getBean("ptQxQyyhAction")).getiQxUser();
	Map map = new HashMap();
	map.put("USERID", session.getAttribute("USERID"));
	map.put("NSRSBH", session.getAttribute("SJ_YHID"));
	StringBuffer strBuffer2 = new StringBuffer("#");
	List list = user1.getUserGnmkAll(map);
	for (Iterator iterator = list.iterator(); iterator.hasNext();) {
		Map map2 = (Map) iterator.next();
		strBuffer2.append(map2.get("MKXKID"));
		strBuffer2.append("#");
	}
	out.println(CommonUtil.toJSON("qxxk",list));//改动selectQX_GNMK_QXXK_ALL增加了此行程序 hzq 20121224
	if(strBuffer2.equals("#")){
		session.setAttribute("MYQXXKDMS","NULL");
	}else{
		session.setAttribute("MYQXXKDMS", strBuffer2);
	}
	Object dao=net.htjs.platform.actions.BaseAction.getBean("baseDao");
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