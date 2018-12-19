package net.htjs.pt4.sys.example;//package net.htjs.platform.sys.example;
//
//import java.util.Collection;
//import java.util.Set;
//
//import org.apache.shiro.cache.Cache;
//import org.apache.shiro.cache.CacheException;
//import org.springframework.cache.support.SimpleValueWrapper;
//
///** 
// * by lizhi
// * redisCache缓存对象，托管给spring的类型  
// **/
//public class SpringCacheWrapper<K, V> implements Cache<K, V> {
//	private org.springframework.cache.Cache springCache;
//    public SpringCacheWrapper(org.springframework.cache.Cache springCache) {
//        this.springCache = springCache;
//    }
//
//    @SuppressWarnings("unchecked")
//	@Override
//    public V get(K key) throws CacheException {
//        Object value = springCache.get(key);
//        if (value instanceof SimpleValueWrapper) {
//            return (V)((SimpleValueWrapper)value).get();
//        }
//        return (V)value;
//    }
//
//    @Override
//    public V put(K key, V value) throws CacheException {
//        springCache.put(key, value);
//        return value;
//    }
//
//    @SuppressWarnings("unchecked")
//	@Override
//    public V remove(K key) throws CacheException {
//        Object value = get(key);
//        springCache.evict(key);
//        return (V)value;
//    }
//
//    @Override
//    public void clear() throws CacheException {
//        springCache.clear();
//    }
//
//    @Override
//    public int size() {
//        throw new UnsupportedOperationException("invoke spring cache abstract size method not supported");
//
//    }
//
//    @Override
//    public Set<K> keys() {
//        throw new UnsupportedOperationException("invoke spring cache abstract keys method not supported");
//
//    }
//
//    @Override
//    public Collection<V> values() {
//        throw new UnsupportedOperationException("invoke spring cache abstract values method not supported");
//    }
//}
