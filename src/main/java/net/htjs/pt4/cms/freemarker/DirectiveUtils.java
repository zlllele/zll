package net.htjs.pt4.cms.freemarker;

import static org.springframework.web.servlet.view.AbstractTemplateView.SPRING_MACRO_REQUEST_CONTEXT_ATTRIBUTE;
import static net.htjs.pt4.cms.freemarker.FrontUtils.SITE;
import static net.htjs.pt4.cms.freemarker.FrontUtils.PAGE_NO;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import org.apache.commons.lang.StringUtils;
import org.springframework.web.servlet.support.RequestContext;

import freemarker.core.Environment;
import freemarker.template.AdapterTemplateModel;
import freemarker.template.TemplateBooleanModel;
import freemarker.template.TemplateDateModel;
import freemarker.template.TemplateException;
import freemarker.template.TemplateModel;
import freemarker.template.TemplateModelException;
import freemarker.template.TemplateNumberModel;
import freemarker.template.TemplateScalarModel;
import net.htjs.pt4.cms.entity.Site;
import net.htjs.pt4.cms.freemarker.exception.MustBooleanException;
import net.htjs.pt4.cms.freemarker.exception.MustDateException;
import net.htjs.pt4.cms.freemarker.exception.MustNumberException;
import net.htjs.pt4.cms.freemarker.exception.MustSplitNumberException;
import net.htjs.pt4.cms.freemarker.exception.MustStringException;

/**
 * Freemarker标签工具类
 * 
 * @author xieshiyu
 * 
 */
public abstract class DirectiveUtils {
	/**
	 * 输出参数：对象数据
	 */
	public static final String OUT_BEAN = "tag_bean";
	/**
	 * 输出参数：列表数据
	 */
	public static final String OUT_LIST = "tag_list";
	/**
	 * 输出参数：分页数据
	 */
	public static final String OUT_PAGINATION = "tag_pagination";

	/**
	 * 将params的值复制到variable中
	 * 
	 * @param env
	 * @param params
	 * @return 原Variable中的值
	 * @throws TemplateException
	 */
	public static Map<String, TemplateModel> addParamsToVariable(Environment env, Map<String, TemplateModel> params)
			throws TemplateException {
		Map<String, TemplateModel> origMap = new HashMap<String, TemplateModel>();
		if (params.size() <= 0) {
			return origMap;
		}
		Set<Map.Entry<String, TemplateModel>> entrySet = params.entrySet();
		String key;
		TemplateModel value;
		for (Map.Entry<String, TemplateModel> entry : entrySet) {
			key = entry.getKey();
			value = env.getVariable(key);
			if (value != null) {
				origMap.put(key, value);
			}
			env.setVariable(key, entry.getValue());
		}
		return origMap;
	}

	/**
	 * 将variable中的params值移除
	 * 
	 * @param env
	 * @param params
	 * @param origMap
	 * @throws TemplateException
	 */
	public static void removeParamsFromVariable(Environment env, Map<String, TemplateModel> params,
			Map<String, TemplateModel> origMap) throws TemplateException {
		if (params.size() <= 0) {
			return;
		}
		for (String key : params.keySet()) {
			env.setVariable(key, origMap.get(key));
		}
	}

	/**
	 * 获得RequestContext
	 * 
	 * ViewResolver中的exposeSpringMacroHelpers必须为true
	 * 
	 * @param env
	 * @return
	 * @throws TemplateException
	 */
	public static RequestContext getContext(Environment env) throws TemplateException {
		TemplateModel ctx = env.getGlobalVariable(SPRING_MACRO_REQUEST_CONTEXT_ATTRIBUTE);
		if (ctx instanceof AdapterTemplateModel) {
			return (RequestContext) ((AdapterTemplateModel) ctx).getAdaptedObject(RequestContext.class);
		} else {
			throw new TemplateModelException(
					"RequestContext '" + SPRING_MACRO_REQUEST_CONTEXT_ATTRIBUTE + "' not found in DataModel.");
		}
	}

	public static String getString(String name, Map<String, TemplateModel> params) throws TemplateException {
		TemplateModel model = params.get(name);
		if (model == null) {
			return null;
		}
		if (model instanceof TemplateScalarModel) {
			return ((TemplateScalarModel) model).getAsString();
		} else if ((model instanceof TemplateNumberModel)) {
			return ((TemplateNumberModel) model).getAsNumber().toString();
		} else {
			throw new MustStringException(name);
		}
	}

	public static Long getLong(String name, Map<String, TemplateModel> params) throws TemplateException {
		TemplateModel model = params.get(name);
		if (model == null) {
			return null;
		}
		if (model instanceof TemplateScalarModel) {
			String s = ((TemplateScalarModel) model).getAsString();
			if (StringUtils.isBlank(s)) {
				return null;
			}
			try {
				return Long.parseLong(s);
			} catch (NumberFormatException e) {
				throw new MustNumberException(name);
			}
		} else if (model instanceof TemplateNumberModel) {
			return ((TemplateNumberModel) model).getAsNumber().longValue();
		} else {
			throw new MustNumberException(name);
		}
	}

	public static Integer getInt(String name, Map<String, TemplateModel> params) throws TemplateException {
		TemplateModel model = params.get(name);
		if (model == null) {
			return null;
		}
		if (model instanceof TemplateScalarModel) {
			String s = ((TemplateScalarModel) model).getAsString();
			if (StringUtils.isBlank(s)) {
				return null;
			}
			try {
				return Integer.parseInt(s);
			} catch (NumberFormatException e) {
				throw new MustNumberException(name);
			}
		} else if (model instanceof TemplateNumberModel) {
			return ((TemplateNumberModel) model).getAsNumber().intValue();
		} else {
			throw new MustNumberException(name);
		}
	}

	public static Integer[] getIntArray(String name, Map<String, TemplateModel> params) throws TemplateException {
		String str = DirectiveUtils.getString(name, params);
		if (StringUtils.isBlank(str)) {
			return null;
		}
		String[] arr = StringUtils.split(str, ',');
		Integer[] ids = new Integer[arr.length];
		int i = 0;
		try {
			for (String s : arr) {
				ids[i++] = Integer.valueOf(s);
			}
			return ids;
		} catch (NumberFormatException e) {
			throw new MustSplitNumberException(name, e);
		}
	}

	public static Boolean getBool(String name, Map<String, TemplateModel> params) throws TemplateException {
		TemplateModel model = params.get(name);
		if (model == null) {
			return null;
		}
		if (model instanceof TemplateBooleanModel) {
			return ((TemplateBooleanModel) model).getAsBoolean();
		} else if (model instanceof TemplateNumberModel) {
			return !(((TemplateNumberModel) model).getAsNumber().intValue() == 0);
		} else if (model instanceof TemplateScalarModel) {
			String s = ((TemplateScalarModel) model).getAsString();
			// 空串应该返回null还是true呢？
			if (!StringUtils.isBlank(s)) {
				return !(s.equals("0") || s.equalsIgnoreCase("false") || s.equalsIgnoreCase("f"));
			} else {
				return null;
			}
		} else {
			throw new MustBooleanException(name);
		}
	}

	public static Date getDate(String name, Map<String, TemplateModel> params) throws TemplateException {
		TemplateModel model = params.get(name);
		if (model == null) {
			return null;
		}
		if (model instanceof TemplateDateModel) {
			return ((TemplateDateModel) model).getAsDate();
		} else if (model instanceof TemplateScalarModel) {
			DateTypeEditor editor = new DateTypeEditor();
			editor.setAsText(((TemplateScalarModel) model).getAsString());
			return (Date) editor.getValue();
		} else {
			throw new MustDateException(name);
		}
	}

	/**
	 * 标签参数中获得条数。
	 * 
	 * @param params
	 * @return 如果不存在，或者小于等于0，或者大于100则返回100；否则返回条数。
	 * @throws TemplateException
	 */
	public static int getCount(Map<String, TemplateModel> params) throws TemplateException {
		Integer count = DirectiveUtils.getInt("count", params);
		if (count == null || count <= 0 || count >= 100) {
			return 100;
		} else {
			return count;
		}
	}

	/**
	 * 标签中获得页码
	 * 
	 * @param env
	 * @return
	 * @throws TemplateException
	 */
	public static int getPageNo(Environment env) throws TemplateException {
		TemplateModel pageNo = env.getGlobalVariable(PAGE_NO);
		if (pageNo instanceof TemplateNumberModel) {
			return ((TemplateNumberModel) pageNo).getAsNumber().intValue();
		} else {
			throw new TemplateModelException("'pageNo' not found in DataModel.");
		}
	}

	/**
	 * 标签中获得字符串
	 * 
	 * @param env
	 * @return
	 * @throws TemplateException
	 */
	public static String getStrByEnv(Environment env, String key) throws TemplateException {
		TemplateModel templatePath = env.getGlobalVariable(key);
		if (templatePath instanceof TemplateScalarModel) {
			return ((TemplateScalarModel) templatePath).getAsString();
		} else {
			throw new TemplateModelException("'" + key + "' not found in DataModel.");
		}
	}

	/**
	 * 标签中获得站点
	 * 
	 * @param env
	 * @return
	 * @throws TemplateModelException
	 */
	public static Site getSite(Environment env) throws TemplateModelException {
		TemplateModel model = env.getGlobalVariable(SITE);
		if (model instanceof AdapterTemplateModel) {
			return (Site) ((AdapterTemplateModel) model).getAdaptedObject(Site.class);
		} else {
			throw new TemplateModelException("'" + SITE + "' not found in DataModel");
		}
	}

}
