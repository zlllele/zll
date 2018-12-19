package net.htjs.pt4.cms.freemarker.directive.abs;

import org.springframework.beans.factory.annotation.Autowired;

import freemarker.template.TemplateDirectiveModel;
import net.htjs.pt4.cms.service.IFriendLinkService;

public abstract class AbstractFriendLinkDirective implements TemplateDirectiveModel {

	/**
	 * 友情链接类别ID
	 */
	public static final String TYPE_ID = "typeId";

	@Autowired
	protected IFriendLinkService flSvc;
}
