package net.htjs.pt4.sys;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;


/**
 * by lizhi
 * 获得system-param.properties中的键值对
 **/
public class ParamPropertiesReader {
    private static Logger logger = LoggerFactory.getLogger(ParamPropertiesReader.class);
    private static Properties prop = null;

    static {
        prop = new Properties();
        InputStream in = ParamPropertiesReader.class.getResourceAsStream("/system-param.properties");
        try {
            prop.load(in);
        } catch (IOException e) {
            logger.error("读取配置文件出错" + e);
        } finally {
            try {
                in.close();
            } catch (IOException e) {
                logger.error("关闭流出错" + e);
            }
        }
    }

    public static String getProp(String key) {
        return prop.get(key) == null ? "" : ((String) prop.get(key)).trim();
    }
}