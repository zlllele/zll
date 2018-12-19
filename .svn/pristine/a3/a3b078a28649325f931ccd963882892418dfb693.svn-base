package net.htjs.pt4.cms.freemarker.directive;

import static net.htjs.pt4.cms.freemarker.DirectiveUtils.OUT_BEAN;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import freemarker.core.Environment;
import freemarker.template.Configuration;
import freemarker.template.DefaultObjectWrapperBuilder;
import freemarker.template.TemplateDirectiveBody;
import freemarker.template.TemplateDirectiveModel;
import freemarker.template.TemplateException;
import freemarker.template.TemplateModel;
import net.htjs.pt4.cms.entity.Advertising;
import net.htjs.pt4.cms.freemarker.DirectiveUtils;
import net.htjs.pt4.cms.service.IAdvertisingService;

@Component
public class AdverDirective implements TemplateDirectiveModel {

	private static final Logger LOGGER = LoggerFactory.getLogger(AdverDirective.class);

	/**
	 * 输入参数，类型ID。
	 */
	public static final String PARAM_TYPE_ID = "typeId";
	/**
	 * 输入参数，站点ID
	 */
	public static final String PARAM_SITE_ID = "siteId";

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void execute(Environment env, Map params, TemplateModel[] loopVars, TemplateDirectiveBody body)
			throws TemplateException, IOException {
		String typeId = DirectiveUtils.getString(PARAM_TYPE_ID, params);
		String siteId = DirectiveUtils.getString(PARAM_SITE_ID, params);
		Advertising adver = null;
		if (StringUtils.isNotBlank(typeId) && StringUtils.isNotBlank(siteId)) {
			try {
				List<Advertising> list = adverSvc.getAdverByTypeId(typeId, siteId);
				if (!list.isEmpty()) {
					adver = list.get(0);
				}
			} catch (Exception e) {
				LOGGER.error(e.getMessage());
			}
		} else {
			LOGGER.error("类型ID和站点ID查不到值,{},{}", typeId, siteId);
		}
		DefaultObjectWrapperBuilder builder = new DefaultObjectWrapperBuilder(Configuration.VERSION_2_3_25);
		Map<String, TemplateModel> paramWrap = new HashMap<String, TemplateModel>(params);
		paramWrap.put(OUT_BEAN, builder.build().wrap(adver));
		Map<String, TemplateModel> origMap = DirectiveUtils.addParamsToVariable(env, paramWrap);
		body.render(env.getOut());
		DirectiveUtils.removeParamsFromVariable(env, paramWrap, origMap);
	}

	@Autowired
	protected IAdvertisingService adverSvc;

}
