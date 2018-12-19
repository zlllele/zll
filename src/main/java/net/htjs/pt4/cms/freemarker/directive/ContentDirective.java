package net.htjs.pt4.cms.freemarker.directive;

import static net.htjs.pt4.cms.freemarker.DirectiveUtils.OUT_BEAN;

import java.io.IOException;
import java.util.HashMap;
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
import net.htjs.pt4.cms.entity.Content;
import net.htjs.pt4.cms.freemarker.DirectiveUtils;
import net.htjs.pt4.cms.service.IContentService;

@Component
public class ContentDirective implements TemplateDirectiveModel {

	private static final Logger LOGGER = LoggerFactory.getLogger(ContentDirective.class);

	/**
	 * 输入参数，父栏目ID。存在时，获取该栏目的子栏目，不存在时获取顶级栏目。
	 */
	public static final String PARAM_CONTENT_ID = "contentId";

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void execute(Environment env, Map params, TemplateModel[] loopVars, TemplateDirectiveBody body)
			throws TemplateException, IOException {
		String contentId = DirectiveUtils.getString(PARAM_CONTENT_ID, params);
		Content content = null;
		if (StringUtils.isNotBlank(contentId)) {
			try {
				content = contentSvc.getContentById(contentId);
			} catch (Exception e) {
				LOGGER.error(e.getMessage());
			}
		} else {
			LOGGER.error("内容ID查不到值,{}", contentId);
		}
		DefaultObjectWrapperBuilder builder = new DefaultObjectWrapperBuilder(Configuration.VERSION_2_3_25);
		Map<String, TemplateModel> paramWrap = new HashMap<String, TemplateModel>(params);
		paramWrap.put(OUT_BEAN, builder.build().wrap(content));
		Map<String, TemplateModel> origMap = DirectiveUtils.addParamsToVariable(env, paramWrap);
		body.render(env.getOut());
		DirectiveUtils.removeParamsFromVariable(env, paramWrap, origMap);
	}

	@Autowired
	protected IContentService contentSvc;

}
