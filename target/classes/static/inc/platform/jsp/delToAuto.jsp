<%@ taglib uri="http://www.htjs.net" prefix="htjs"%>
<%@page contentType="text/html;charset=GBK"%>
<jsp:useBean id="qxUserHomepage" class="net.htjs.platform.web.bean.qx.QxUserHomepage"></jsp:useBean>
<%
	int i = qxUserHomepage.delete(request);
	if(i==1){
		out.print("ȡ���ɹ�");
	}else if(i==0){
		out.print("ȡ��ʧ�ܣ��������Ա��ϵ");
	}else if(i==-1){
		out.print("��û�����ù�����Ŀ");
	}else if(i==2){
		out.print("�ض���Ŀ��������ɾ��");
	}
%>
