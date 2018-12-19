package net.htjs.pt4.sys.example;//package net.htjs.platform.sys.example;
//
//import org.springframework.cache.CacheManager;
//import org.springframework.cache.annotation.CachingConfigurerSupport;
//import org.springframework.cache.annotation.EnableCaching;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.data.redis.cache.RedisCacheManager;
//import org.springframework.data.redis.core.RedisTemplate;
//
///**
// * by lizhi
// * 提供redis的cacheManager实例
// * 参数列表中shiroExpiration，设置shiro中权限列表的缓存时间
// */
//@Configuration
//@EnableCaching
//public class RedisConfig extends CachingConfigurerSupport{
//	@Bean
//    public CacheManager cacheManager(RedisTemplate<?,?> redisTemplate){
//		RedisCacheManager rcm = new RedisCacheManager(redisTemplate);
//		/*配置redis过期时间，在system-param.properties中配置*/
//		rcm.setDefaultExpiration(Long.parseLong(ParamPropertiesReader.getProp("shiroExpiration")));
//        return rcm;
//    }
//}