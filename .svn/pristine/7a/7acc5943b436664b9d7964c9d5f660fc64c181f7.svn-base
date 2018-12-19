package net.htjs.pt4.cms.utils;

import java.io.PrintWriter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import com.alibaba.fastjson.JSONObject;

/**
 * 拦截未登录的用户信息
 * @author wupeng
 * 
 */
public class UserSecurityInterceptor extends HandlerInterceptorAdapter {
	 @Override
	    public boolean preHandle(HttpServletRequest request,
	            HttpServletResponse response, Object handler) throws Exception {
	         //验证用户是否登陆
	        String zzjgDm = UserUtils.getZzjgId(request);
			if (StringUtils.isNotBlank(zzjgDm)) {
				return true;
			} else {
				response.setCharacterEncoding("UTF-8");    
	        	response.setContentType("application/json; charset=utf-8");  
	        	PrintWriter out = null ;  
	        	try{  
	        	    JSONObject res = new JSONObject();  
	        	    String callback = request.getParameter("callback");
	        	    res.put("code",-3);  
	        	    res.put("msg","登录信息失效 请重新登陆");  
	        	    out = response.getWriter();  
	        	    out.append(callback+"("+res.toString()+")");  
	        	    return false;  
	        	}  
	        	catch (Exception e){  
	        	    e.printStackTrace();  
	        	    response.sendError(500);  
	        	    return false;  
	        	}
			}
	    }

	    @Override
	    public void postHandle(HttpServletRequest request,
	            HttpServletResponse response, Object handler,
	            ModelAndView modelAndView) throws Exception {
	    }

	    @Override
	    public void afterCompletion(HttpServletRequest request,
	            HttpServletResponse response, Object handler, Exception ex)
	            throws Exception {

	    }


}
