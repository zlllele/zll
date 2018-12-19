package net.htjs.pt4.core;

import com.fasterxml.jackson.databind.util.JSONPObject;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Map;

/**
 * Description: author zcy date 2017-07-22 15:23
 */
public class BaseController {

	private static final String YMDH = "yyyy-MM-dd HH:mm:ss";
	private static final String YMD = "yyyy-MM-dd";

	/**
	 * 从表单中获取返回视图类型(RESULT_TYPE)
	 * <p>
	 * return 默认返回 success
	 */
	protected Object getResult(Map<String, Object> mapModel, Integer code, String msg, String callback) {
		// 保存数据
		mapModel.put("code", code);
		mapModel.put("msg", msg);
		if (callback == null || "".equals(callback)) {
			return mapModel;
		} else {
			return new JSONPObject(callback, mapModel);
		}
	}

	protected String getMapByKey(Map<String, Object> mapParam, String key) {
		Object val = mapParam.get(key);
		if (val instanceof String) {
			return val.toString();
		}
		if (val != null) {
			// 定义格式并转化成字符型日期格式
			if (val instanceof Timestamp) {
				return (new SimpleDateFormat(YMDH)).format(new Timestamp(((Timestamp) val).getTime()));
			} else if (val instanceof java.sql.Date) {
				return (new SimpleDateFormat(YMD)).format(val);
			} else if (val instanceof BigDecimal) {
				return val.toString();
			}
		}
		return "";
	}
}
