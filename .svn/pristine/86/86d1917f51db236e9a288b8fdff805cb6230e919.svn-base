package net.htjs.pt4.cms.utils;

import javax.servlet.http.HttpServletRequest;

/**
 * Description: 从代理中获取请求的真实IP地址
 * author  caojian
 */
public class IpUtil {
    private IpUtil() {
    }

    public static String getIpAddr(HttpServletRequest request) {
		String ip = request.getHeader("X-Real-IP"); 
	    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
	        ip = request.getHeader("x-forwarded-for");  
	    }  
	    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
	        ip = request.getHeader("Proxy-Client-IP");  
	    }  
	    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
	        ip = request.getHeader("WL-Proxy-Client-IP");  
	    }  
	    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
	        ip = request.getRemoteAddr();  
	    }  
	    if(ip!=null&&ip.indexOf(",")!=-1){
			ip=ip.substring(0, ip.indexOf(","));
	    }
	    return ip;  
    }
}
