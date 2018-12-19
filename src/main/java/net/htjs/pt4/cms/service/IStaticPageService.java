package net.htjs.pt4.cms.service;

import java.io.IOException;

import freemarker.template.TemplateException;

/**
 * 首页、栏目、内容 静态化业务类
 * 
 * @author xieshiyu
 *
 */
public interface IStaticPageService {

	/**
	 * 首页静态化
	 * 
	 * @throws IOException
	 * @throws TemplateException
	 * @throws Exception
	 */
	public void index(String zzjgDm) throws IOException, TemplateException, Exception;

	/**
	 * 栏目页静态化
	 * 
	 * @throws IOException
	 * @throws TemplateException
	 */
	public void channel(String zzjgDm, String channelId, boolean containChild)
			throws IOException, TemplateException, Exception;

	public void content(String zzjgDm, String channelId) throws IOException, TemplateException, Exception;
}
