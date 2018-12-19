package net.htjs.pt4.sys.example;//package net.htjs.platform.sys.example;
//
//import org.apache.shiro.cache.AbstractCacheManager;
//import org.apache.shiro.cache.Cache;
//import org.apache.shiro.cache.CacheException;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Component;
//
///** 
// * by lizhi
// * 封装shiro中的CacheManager，在ShiroConfiguration中注入securityManager
// * 使用户的权限数据存储在redis服务中
// */
//@Component
//public class RedisShiroCacheManager extends AbstractCacheManager{
//	
//	@Autowired
//    private org.springframework.cache.CacheManager springCacheManger;
//	
//	@SuppressWarnings("rawtypes")
//	@Override
//	protected Cache createCache(String name) throws CacheException {
//		org.springframework.cache.Cache springCache = springCacheManger.getCache(name);
//        return new SpringCacheWrapper(springCache);
//	}
//	
//}