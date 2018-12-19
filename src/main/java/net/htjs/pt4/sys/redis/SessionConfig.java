package net.htjs.pt4.sys.redis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;
import org.springframework.session.web.http.CookieSerializer;
import org.springframework.session.web.http.DefaultCookieSerializer;

import net.htjs.pt4.cms.entity.CmsConfig;

/**
 * 设定session在跟路径存储
 */
@Configuration
@EnableRedisHttpSession
public class SessionConfig {

	@Autowired
	private CmsConfig cmsConfig;

	@Bean
	public CookieSerializer cookieSerializer() {
		DefaultCookieSerializer defaultCookieSerializer = new DefaultCookieSerializer();
		// cookie名字
		// 域
		String doMain = cmsConfig.getDoMain();
		defaultCookieSerializer.setDomainName(doMain);

		// 存储路径
		defaultCookieSerializer.setCookiePath("/");
		return defaultCookieSerializer;
	}
}
