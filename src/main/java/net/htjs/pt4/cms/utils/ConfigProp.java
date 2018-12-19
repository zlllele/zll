package net.htjs.pt4.cms.utils;

import java.io.FileInputStream;
import java.util.Properties;

import org.apache.log4j.Logger;

public class ConfigProp {
	private Logger log = Logger.getLogger(this.getClass());
	private static Properties config;

	public void init() {
		config = new Properties();
		try {
			log.info("------------@@@@@@->" + ConfigProp.class.getClassLoader());
			log.info("------------@@@@@@->"
					+ ConfigProp.class.getClassLoader().getResource("CMS.properties"));
			config.load(new FileInputStream(
					ConfigProp.class.getClassLoader().getResource("CMS.properties").getFile()));
		} catch (Exception e) {
			log.info("配置文件加载失败：" + e.getMessage());
		}
	}

	/**
	 * 读取配置
	 * 
	 * @param key
	 * @return
	 */
	public static String getConfig(String key) {
		if (config == null) {
			new ConfigProp().init();
		}
		return config.getProperty(key);
	}
}
