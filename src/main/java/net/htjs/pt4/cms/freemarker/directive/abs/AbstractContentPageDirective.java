package net.htjs.pt4.cms.freemarker.directive.abs;

import org.springframework.beans.factory.annotation.Autowired;

import freemarker.template.TemplateDirectiveModel;
import net.htjs.pt4.cms.service.IChannelService;
import net.htjs.pt4.cms.service.IContentService;

public abstract class AbstractContentPageDirective implements TemplateDirectiveModel {
	/**
	 * 输入参数，栏目ID
	 */
	public static final String PARAM_CHANNEL_ID = "channelId";
	/**
	 * 输入参数，站点ID
	 */
	public static final String PARAM_SITE_ID = "siteId";
	/**
	 * 输入参数，内容类型ID
	 */
	public static final String PARAM_TYPE_ID = "typeId";

	@Autowired
	protected IContentService contentSvc;
	@Autowired
	protected IChannelService channelSvc;
}
