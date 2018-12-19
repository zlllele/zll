package net.htjs.pt4.cms.freemarker.directive;

import static net.htjs.pt4.cms.freemarker.DirectiveUtils.OUT_LIST;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

import freemarker.core.Environment;
import freemarker.template.Configuration;
import freemarker.template.DefaultObjectWrapperBuilder;
import freemarker.template.TemplateDirectiveBody;
import freemarker.template.TemplateException;
import freemarker.template.TemplateModel;
import net.htjs.pt4.cms.entity.FriendLink;
import net.htjs.pt4.cms.freemarker.DirectiveUtils;
import net.htjs.pt4.cms.freemarker.directive.abs.AbstractFriendLinkDirective;

/**
 * 友情链接列表自定义标签
 * 
 * @author xieshiyu
 *
 */
@Component
public class FriendLinkDirective extends AbstractFriendLinkDirective {

	private static final Logger LOGGER = LoggerFactory.getLogger(FriendLinkDirective.class);

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void execute(Environment env, Map params, TemplateModel[] loopVars, TemplateDirectiveBody body)
			throws TemplateException, IOException {
		String typeId = DirectiveUtils.getString(TYPE_ID, params);
		int count = DirectiveUtils.getCount(params);
		List<FriendLink> list = null;
		try {
			if (StringUtils.isNotBlank(typeId)) {
				PageHelper.startPage(1, count);
				List<FriendLink> fls = flSvc.getFriendLinksByTypeId(typeId);
				PageInfo<FriendLink> pageInfo = new PageInfo<FriendLink>(fls);
				list = pageInfo.getList();
			} else {
				list = new ArrayList<FriendLink>();
				LOGGER.info("友情链接类别为空,类别ID{}", typeId);
			}
		} catch (Exception e) {
			list = new ArrayList<FriendLink>();
			LOGGER.error(e.getMessage());
		}
		DefaultObjectWrapperBuilder builder = new DefaultObjectWrapperBuilder(Configuration.VERSION_2_3_25);
		Map<String, TemplateModel> paramWrap = new HashMap<String, TemplateModel>(params);
		paramWrap.put(OUT_LIST, builder.build().wrap(list));
		Map<String, TemplateModel> origMap = DirectiveUtils.addParamsToVariable(env, paramWrap);
		body.render(env.getOut());
		DirectiveUtils.removeParamsFromVariable(env, paramWrap, origMap);
	}

}
