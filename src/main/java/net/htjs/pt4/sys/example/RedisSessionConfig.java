package net.htjs.pt4.sys.example;//package net.htjs.platform.sys.example;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.session.data.redis.RedisOperationsSessionRepository;
//import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;
//import org.springframework.session.web.http.SessionRepositoryFilter;
//
///**
// * by lizhi
// * boot启动spring session 
// * 由redis来保存session
// * 会话session由spring session来保管
// * 括号中为session失效时间
// **/
//@Configuration
//@EnableRedisHttpSession(maxInactiveIntervalInSeconds=1800)
//public class RedisSessionConfig {
//	/*获取被修改cookiepath的类*/
//	public CookieHttpSessionStrategy cookieHttpSessionStrategy(){
//		return new CookieHttpSessionStrategy();
//	}
//	@Autowired
//	RedisOperationsSessionRepository redisRepository;
//	/*配置名必须为springSessionRepositoryFilter，才能被调用到*/
//	@SuppressWarnings({"rawtypes","unchecked"})
//	@Bean
//	public SessionRepositoryFilter springSessionRepositoryFilter(){
//		SessionRepositoryFilter s = new SessionRepositoryFilter(redisRepository);
//		s.setHttpSessionStrategy(cookieHttpSessionStrategy());
//		return s;
//	}
//}