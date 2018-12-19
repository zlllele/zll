<%@page import="net.htjs.oa.web.rlzy.Rygl"%>
<%
    response.setContentType("image/jpeg;charset=GB2312");
    ServletOutputStream os = response.getOutputStream();
    response.reset();
    response.setHeader("Cache-Control", "no-store");
    response.setHeader("Pragrma", "no-cache");
    response.setDateHeader("Expires", 0);
    
    if (request.getParameter("TEXTID") != null&&!request.getParameter("TEXTID").equals("")) 
    {
    	Rygl  Rygl= new Rygl();
        byte[] c = Rygl.selectOA_TEXT_BLOB(request);
        if (c != null&&c.length>10) 
        {
            os.write(c);
            os.flush();
            os.close();
            return;
        }
    }
%>