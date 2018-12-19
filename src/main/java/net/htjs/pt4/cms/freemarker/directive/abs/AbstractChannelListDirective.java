package net.htjs.pt4.cms.freemarker.directive.abs;

import org.springframework.beans.factory.annotation.Autowired;

import freemarker.template.TemplateDirectiveModel;
import net.htjs.pt4.cms.service.IChannelService;

public abstract class AbstractChannelListDirective implements TemplateDirectiveModel {

	/**
	 * 输入参数，父栏目ID。存在时，获取该栏目的子栏目，不存在时获取顶级栏目。
	 */
	public static final String PARAM_PARENT_ID = "parentId";
	/**
	 * 输入参数，站点ID
	 */
	public static final String PARAM_SITE_ID = "siteId";

	@Autowired
	protected IChannelService channelSvc;
}
