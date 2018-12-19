package net.htjs.pt4;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;

/**
 * 
 * @author xieshiyu
 */
@SpringBootApplication
@EnableRedisHttpSession(maxInactiveIntervalInSeconds = 1800)
public class AppStart {

	public static void main(String[] args) {
		SpringApplication.run(AppStart.class, args);

	}
}