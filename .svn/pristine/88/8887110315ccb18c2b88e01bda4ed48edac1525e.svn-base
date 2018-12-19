package net.htjs.pt4.sys;

import com.google.code.kaptcha.impl.DefaultKaptcha;
import com.google.code.kaptcha.util.Config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Properties;

/**
 * 示例
@RequestMapping(value = "/validateCode")
public ModelAndView getKaptchaImage(HttpServletRequest request,HttpServletResponse response) throws Exception {
	response.setDateHeader("Expires",0);
    response.setHeader("Cache-Control","no-store, no-cache, must-revalidate");
    response.addHeader("Cache-Control","post-check=0, pre-check=0");
    response.setHeader("Pragma","no-cache");
    response.setContentType("image/jpeg");
    String capText = captchaProducer.createText();
    request.getSession().setAttribute(VALIDATE_CODE, capText);
    BufferedImage bi = captchaProducer.createImage(capText);
    ServletOutputStream out = response.getOutputStream();
    ImageIO.write(bi, "jpg", out);
    try{
        out.flush();
    }finally{
        out.close();
    }
	return null;
}
*/


@Configuration
public class CaptchaConfig{
	@Bean(name="captchaProducer")
	public DefaultKaptcha getKaptchaBean(){
		DefaultKaptcha defaultKaptcha=new DefaultKaptcha();
		Properties properties=new Properties();
		properties.setProperty("kaptcha.border", "no");
		properties.setProperty("kaptcha.border.color", "105,179,90");
		properties.setProperty("kaptcha.textproducer.font.color", "blue");
		properties.setProperty("kaptcha.image.width", "125");
		properties.setProperty("kaptcha.image.height", "45");
		properties.setProperty("kaptcha.session.key", "code");
		properties.setProperty("kaptcha.textproducer.char.length", "4");
		Config config=new Config(properties);
		defaultKaptcha.setConfig(config);
		return defaultKaptcha;
	}
}
