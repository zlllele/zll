package net.htjs.pt4.cms.freemarker;

import java.beans.PropertyEditorSupport;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.util.StringUtils;

/**
 * 日期编辑器
 * 
 * 根据日期字符串长度判断是长日期还是短日期。只支持yyyy-MM-dd，yyyy-MM-dd HH:mm:ss两种格式。
 * 扩展支持yyyy,yyyy-MM日期格式
 * 
 * @author xieshiyu
 * 
 */
public class DateTypeEditor extends PropertyEditorSupport {

	/**
	 * 短类型日期长度
	 */
	public static final int SHORT_DATE = 10;

	public static final int YEAR_DATE = 4;

	public static final int MONTH_DATE = 7;

	public void setAsText(String text) throws IllegalArgumentException {
		text = text.trim();
		if (!StringUtils.hasText(text)) {
			setValue(null);
			return;
		}
		try {
			if (text.length() <= YEAR_DATE) {
				DateFormat df_year = new SimpleDateFormat("yyyy");
				setValue(new java.sql.Date(df_year.parse(text).getTime()));
			} else if (text.length() <= MONTH_DATE) {
				DateFormat df_month = new SimpleDateFormat("yyyy-MM");
				setValue(new java.sql.Date(df_month.parse(text).getTime()));
			} else if (text.length() <= SHORT_DATE) {
				DateFormat df_short = new SimpleDateFormat("yyyy-MM-dd");
				setValue(new java.sql.Date(df_short.parse(text).getTime()));
			} else {
				DateFormat df_long = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				setValue(new java.sql.Timestamp(df_long.parse(text).getTime()));
			}
		} catch (ParseException ex) {
			IllegalArgumentException iae = new IllegalArgumentException("Could not parse date: " + ex.getMessage());
			iae.initCause(ex);
			throw iae;
		}
	}

	/**
	 * Format the Date as String, using the specified DateFormat.
	 */
	public String getAsText() {
		Date value = (Date) getValue();
		DateFormat df_long = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return (value != null ? df_long.format(value) : "");
	}
}
