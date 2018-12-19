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
import net.htjs.pt4.cms.entity.Channel;
import net.htjs.pt4.cms.entity.Site;
import net.htjs.pt4.cms.freemarker.DirectiveUtils;
import net.htjs.pt4.cms.freemarker.directive.abs.AbstractChannelListDirective;

/**
 * 栏目列表自定义标签
 * 
 * @author xieshiyu
 *
 */
@Component
public class ChannelListDirective extends AbstractChannelListDirective {

	private static final Logger LOGGER = LoggerFactory.getLogger(ChannelListDirective.class);

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void execute(Environment env, Map params, TemplateModel[] loopVars, TemplateDirectiveBody body)
			throws TemplateException, IOException {
		String parentId = DirectiveUtils.getString(PARAM_PARENT_ID, params);
		String siteId = DirectiveUtils.getString(PARAM_SITE_ID, params);
		int count = DirectiveUtils.getCount(params);
		List<Channel> list = null;
		try {
			if (StringUtils.isNotBlank(parentId)) {
				// 查询此节点的子节点
				PageHelper.startPage(1, count);
				List<Channel> channels = channelSvc.getChannelByParentId(parentId);
				PageInfo<Channel> pageInfo = new PageInfo<Channel>(channels);
				list = pageInfo.getList();
			} else {
				if (StringUtils.isBlank(siteId)) {
					Site site = DirectiveUtils.getSite(env);
					siteId = site.getSiteId();
				}
				// 查询站点下的根节点
				Channel channel = channelSvc.getRootChannelBySiteId(siteId);
				if (channel != null) {
					PageHelper.startPage(1, count);
					List<Channel> channels = channelSvc.getChannelByParentId(channel.getChannelId());
					PageInfo<Channel> pageInfo = new PageInfo<Channel>(channels);
					list = pageInfo.getList();
				} else {
					list = new ArrayList<Channel>();
					LOGGER.info("栏目未维护");
				}
			}
		} catch (Exception e) {
			list = new ArrayList<Channel>();
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
