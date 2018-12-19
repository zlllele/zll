package net.htjs.pt4.sys;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;

@Aspect
@Component
public class WebLogAspect {
	ThreadLocal<Long> startTime = new ThreadLocal<>();
	
	private Logger logger = LoggerFactory.getLogger(getClass());
	/*
	 *切点order越小，优先级越高
	 *在切入点前的操作，按order的值由小到大执行
	 *在切入点后的操作，按order的值由大到小执行
	 */
	@Order(5)
    @Pointcut("execution(public * net.htjs.platform.controller..*.*(..))")
    public void webLog(){}
	
    @Before("webLog()")
    public void doBefore(JoinPoint joinPoint) throws Throwable {
    	startTime.set(System.currentTimeMillis());
        /* 接收到请求，记录请求内容*/
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();
        /* 记录下请求内容*/
        logger.info("URL : " + request.getRequestURL().toString());
        logger.info("HTTP_METHOD : " + request.getMethod());
        logger.info("IP : " + request.getRemoteAddr());
        logger.info("CLASS_METHOD : " + joinPoint.getSignature().getDeclaringTypeName() + "." + joinPoint.getSignature().getName());
        logger.info("ARGS : " + Arrays.toString(joinPoint.getArgs()));
    }
    @AfterReturning(returning = "ret", pointcut = "webLog()")
    public void doAfterReturning(Object ret) throws Throwable {
        /* 处理完请求，返回内容*/
        logger.info("RESPONSE : " + ret);
        logger.info("SPEND TIME : " + (System.currentTimeMillis() - startTime.get()));
    }
    
}