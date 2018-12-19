package net.htjs.pt4.cms.service.impl;

import static net.htjs.pt4.cms.freemarker.FrontUtils.CHANNEL_TPL_DIR;
import static net.htjs.pt4.cms.freemarker.FrontUtils.CONTENT_TPL_DIR;
import static net.htjs.pt4.cms.freemarker.FrontUtils.INDEX_NAME;
import static net.htjs.pt4.cms.freemarker.FrontUtils.INDEX_TPL_DIR;
import static net.htjs.pt4.cms.freemarker.FrontUtils.INDEXj_TPL_NAME;
import static net.htjs.pt4.cms.freemarker.FrontUtils.SPT;
import static net.htjs.pt4.cms.freemarker.FrontUtils.UTF8;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import net.htjs.pt4.cms.entity.Channel;
import net.htjs.pt4.cms.entity.Content;
import net.htjs.pt4.cms.entity.Site;
import net.htjs.pt4.cms.freemarker.FrontUtils;
import net.htjs.pt4.cms.freemarker.exception.SiteNotFoundException;
import net.htjs.pt4.cms.service.IChannelService;
import net.htjs.pt4.cms.service.IContentService;
import net.htjs.pt4.cms.service.ISiteService;
import net.htjs.pt4.cms.service.IStaticPageService;

/**
 * 首页、栏目、内容 静态化业务类
 * 
 * @author xieshiyu
 *
 */
@Service
public class StaticPageService implements IStaticPageService {

	private static final Logger LOGGER = LoggerFactory.getLogger(StaticPageService.class);

	/**
	 * 首页静态化
	 * 
	 * @throws Exception
	 */
	public void index(String zzjgDm) throws Exception {
		long time = System.currentTimeMillis();

		Site site = siteSvc.findByZzjgDm(zzjgDm);
		if (site == null) {
			throw new SiteNotFoundException(zzjgDm);
		}
		Map<String, Object> map = new HashMap<String, Object>();
		FrontUtils.frontData(map, site);

		index(site, map);
		time = System.currentTimeMillis() - time;
		LOGGER.info("create index page, in {} ms", time);
	}

	// 首页静态化
	private void index(Site site, Map<String, Object> map) throws IOException, TemplateException {
		String indexStaticPath = site.getIndexStaticPath() + SPT + INDEX_NAME;
		File f = new File(indexStaticPath);
		File parent = f.getParentFile();
		if (!parent.exists()) {
			parent.mkdirs();
		}
		Writer out = null;
		try {
			// FileWriter不能指定编码确实是个问题，只能用这个代替了。
			out = new OutputStreamWriter(new FileOutputStream(f), UTF8);
			conf.setDirectoryForTemplateLoading(new File(site.getTemplatePath()));
			Template template = conf.getTemplate(INDEX_TPL_DIR + SPT + INDEXj_TPL_NAME);
			template.process(map, out);

			conf.setClassForTemplateLoading(StaticPageService.class, "/common");
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (out != null) {
				try {
					out.flush();
					out.close();
				} catch (IOException e) {
					LOGGER.error(e.getMessage());
				}
			}
		}
	}

	/**
	 * 栏目页静态化
	 * 
	 * @throws IOException
	 * @throws TemplateException
	 */
	public void channel(String zzjgDm, String channelId, boolean containChild)
			throws IOException, TemplateException, Exception {
		long time = System.currentTimeMillis();

		Site site = siteSvc.findByZzjgDm(zzjgDm);
		if (site == null) {
			throw new SiteNotFoundException(zzjgDm);
		}
		Map<String, Object> map = new HashMap<String, Object>();
		FrontUtils.frontData(map, site);

		List<Channel> channels = new ArrayList<Channel>();
		// 查询栏目集合
		if (StringUtils.isNotBlank(channelId)) {
			Channel c = channelSvc.getChannelById(channelId);
			channels.add(c);
			if (containChild) {
				setChannels(channels, c);
			}
		} else {
			if (StringUtils.isNotBlank(zzjgDm)) {
				Channel cl = channelSvc.getRootChannelByZzjgDm(zzjgDm);
				if (cl != null) {
					List<Channel> cs = channelSvc.getChannelByParentId(cl.getChannelId());
					if (!cs.isEmpty()) {
						for (int i = 0; i < cs.size(); i++) {
							Channel c = cs.get(i);
							channels.add(c);
							if (containChild) {
								setChannels(channels, c);
							}
						}
					}
				}
			}
		}
		if (!channels.isEmpty()) {
			channel(site, channels, map);
		} else {
			LOGGER.warn("channel is empty");
		}
		time = System.currentTimeMillis() - time;
		LOGGER.info("create channel page, in {} ms", time);
	}

	// 递归设置栏目
	private void setChannels(List<Channel> list, Channel c) throws Exception {
		List<Channel> channels = channelSvc.getChannelByParentId(c.getChannelId());
		if (!channels.isEmpty()) {
			c.setHasChildChannel(true);
			for (int i = 0; i < channels.size(); i++) {
				Channel channel = channels.get(i);
				list.add(channel);
				setChannels(list, channel);
			}
		}
	}

	// 栏目页静态化
	private void channel(Site site, List<Channel> channels, Map<String, Object> map)
			throws IOException, TemplateException, Exception {
		for (int i = 0; i < channels.size(); i++) {
			Channel c = channels.get(i);
			if (StringUtils.isNotBlank(c.getLink())) {
				continue;
			}
			// 内容不够一页的只生成一页
			int quantity = 0, totalPage = 0;
			if (c.hasChildChannel()) {
				// 查询多栏目内容
				quantity = contentSvc.getCountByChannelParentId(c.getChannelId());
			} else {
				// 查询单栏目内容
				quantity = contentSvc.getCountByChannelId(c.getChannelId());
			}
			if (quantity <= 0) {
				totalPage = 1;
			} else {
				totalPage = (quantity - 1) / c.getPageSize() + 1;
			}
			for (int j = 1; j <= totalPage; j++) {
				File f = new File(site.getIndexStaticPath() + c.getStaticFileName(totalPage, j));
				File parent = f.getParentFile();
				if (!parent.exists()) {
					parent.mkdirs();
				}
				FrontUtils.frontPageData(j, c.getHrefFormer(), c.getHrefLatter(), map);
				map.put("channel", c);
				Writer out = null;
				try {
					// FileWriter不能指定编码确实是个问题，只能用这个代替了。
					out = new OutputStreamWriter(new FileOutputStream(f), UTF8);
					conf.setDirectoryForTemplateLoading(new File(site.getTemplatePath()));
					Template template = conf.getTemplate(CHANNEL_TPL_DIR + SPT + c.getTplChannel());
					template.process(map, out);
				} finally {
					if (out != null) {
						try {
							out.flush();
							out.close();
						} catch (IOException e) {
							LOGGER.error(e.getMessage());
						}
					}
				}
			}
			LOGGER.info("create {} page , {} page", c.getName(), totalPage);
		}
		conf.setClassForTemplateLoading(StaticPageService.class, "/common");
	}

	/**
	 * 内容页静态化
	 * 
	 * @throws IOException
	 * @throws TemplateException
	 */
	public void content(String zzjgDm, String channelId) throws IOException, TemplateException, Exception {
		long time = System.currentTimeMillis();

		Site site = siteSvc.findByZzjgDm(zzjgDm);
		if (site == null) {
			throw new SiteNotFoundException(zzjgDm);
		}
		Map<String, Object> map = new HashMap<String, Object>();
		FrontUtils.frontData(map, site);

		int quantity = 0, totalPage = 0, pageSize = 20;
		if (StringUtils.isNotBlank(channelId)) {
			Channel channel = channelSvc.getChannelById(channelId);
			pageSize = channel.getPageSize();
			quantity = contentSvc.getCountByChannelParentId(channelId);
		} else {
			if (StringUtils.isNotBlank(zzjgDm)) {
				Channel parent = channelSvc.getRootChannelByZzjgDm(zzjgDm);
				if (parent != null) {
					pageSize = parent.getPageSize();
					channelId = parent.getChannelId();
					quantity = contentSvc.getCountByChannelParentId(channelId);
				}
			}
		}
		if (quantity <= 0) {
			totalPage = 1;
		} else {
			totalPage = (quantity - 1) / pageSize + 1;
		}
		if (StringUtils.isNotBlank(channelId)) {
			content(site, channelId, totalPage, pageSize, map);
		} else {
			LOGGER.warn("channel is empty");
		}

		time = System.currentTimeMillis() - time;
		LOGGER.info("create content page, in {} ms", time);
	}

	// 内容页静态化
	private void content(Site site, String channelId, int totalPage, int pageSize, Map<String, Object> map)
			throws IOException, TemplateException, Exception {
		for (int i = 1; i <= totalPage; i++) {
			PageHelper.startPage(i, pageSize);
			List<Content> contents = contentSvc.getContentsByChannelParentId(site.getSiteId(), channelId, null);
			PageInfo<Content> pageInfo = new PageInfo<Content>(contents);
			for (Content c : pageInfo.getList()) {
				map.put("content", c);
				map.put("channel", c.getChannel());
				// 图片集
				map.put("pics", c.getPics());
				// 附件集
				map.put("files", c.getFiles());

				File f = new File(site.getIndexStaticPath() + c.getStaticFileName());
				File parent = f.getParentFile();
				if (!parent.exists()) {
					parent.mkdirs();
				}
				Writer out = null;
				try {
					// FileWriter不能指定编码确实是个问题，只能用这个代替了。
					out = new OutputStreamWriter(new FileOutputStream(f), UTF8);
					conf.setDirectoryForTemplateLoading(new File(site.getTemplatePath()));
					Template template = conf.getTemplate(CONTENT_TPL_DIR + SPT + c.getTplContent());
					template.process(map, out);
				} finally {
					if (out != null) {
						try {
							out.flush();
							out.close();
						} catch (IOException e) {
							e.printStackTrace();
						}
					}
				}
			}
		}
		conf.setClassForTemplateLoading(StaticPageService.class, "/common");
	}

	@Autowired
	private Configuration conf;
	@Autowired
	private ISiteService siteSvc;
	@Autowired
	private IChannelService channelSvc;
	@Autowired
	private IContentService contentSvc;
}
