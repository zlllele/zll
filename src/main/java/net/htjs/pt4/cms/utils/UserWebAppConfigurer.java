package net.htjs.pt4.cms.utils;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;


/**
 * 拦截未登录的用户信息配置类
 * @author wupeng
 * 
 */
@Configuration
public class UserWebAppConfigurer extends WebMvcConfigurerAdapter {
	
	@Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new UserSecurityInterceptor()).addPathPatterns("/**");
        super.addInterceptors(registry);
    }


}
