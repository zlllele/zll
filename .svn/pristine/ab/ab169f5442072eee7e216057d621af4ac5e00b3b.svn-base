package net.htjs.pt4.cms.freemarker.directive;

import static net.htjs.pt4.cms.freemarker.FrontUtils.STYLE_TPL_DIR;
import static net.htjs.pt4.cms.freemarker.FrontUtils.CHANNEL_PAGE_TPL_NAME;
import static net.htjs.pt4.cms.freemarker.FrontUtils.SPT;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import freemarker.core.Environment;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateDirectiveBody;
import freemarker.template.TemplateDirectiveModel;
import freemarker.template.TemplateException;
import freemarker.template.TemplateModel;
import net.htjs.pt4.cms.freemarker.DirectiveUtils;

/**
 * 分页包含标签
 * 
 * @author xieshiyu
 *
 */
@Component
public class PaginationDirective implements TemplateDirectiveModel {
	/**
	 * 是否为内容分页。1：内容分页；0：栏目分页。默认栏目分页。
	 */
	public static final String PARAM_SYS_PAGE = "sysPage";

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void execute(Environment env, Map params, TemplateModel[] loopVars, TemplateDirectiveBody body)
			throws TemplateException, IOException {
		String sysPage = DirectiveUtils.getString(PARAM_SYS_PAGE, params);
		if ("0".equals(sysPage)) {
			Template template = conf.getTemplate(STYLE_TPL_DIR + SPT + CHANNEL_PAGE_TPL_NAME);
			env.include(template);
		} else {

		}
	}

	private Configuration conf;

	@Autowired
	public void setFreeMarkerConfigurer(FreeMarkerConfigurer freeMarkerConfigurer) {
		this.conf = freeMarkerConfigurer.getConfiguration();
	}
}
