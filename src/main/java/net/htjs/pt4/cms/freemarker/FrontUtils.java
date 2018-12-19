package net.htjs.pt4.cms.freemarker;

import java.util.Map;

import net.htjs.pt4.cms.entity.Site;

/**
 * 前台工具类
 * 
 * @author xieshiyu
 *
 */
public class FrontUtils {

	/**
	 * 路径分隔符
	 */
	public static final String SPT = "/";

	/**
	 * 首页、栏目文件名
	 */
	public static final String INDEX_NAME = "index.html";
	/**
	 * 首页模板文件名
	 */
	public static final String INDEXj_TPL_NAME = "index.html";
	/**
	 * 首页模板目录名称
	 */
	public static final String INDEX_TPL_DIR = "index";
	/**
	 * 分页模板目录名称
	 */
	public static final String STYLE_TPL_DIR = "style_page";
	/**
	 * 栏目模板目录名称
	 */
	public static final String CHANNEL_TPL_DIR = "channel";
	/**
	 * 内容模板目录名称
	 */
	public static final String CONTENT_TPL_DIR = "content";
	/**
	 * 栏目分页模板名称
	 */
	public static final String CHANNEL_PAGE_TPL_NAME = "channel_0.html";

	/**
	 * 模板后缀
	 */
	public static final String TPL_SUFFIX = ".html";
	/**
	 * 索引页
	 */
	public static final String INDEX = "index";

	/**
	 * UTF-8 编码
	 */
	public static final String UTF8 = "UTF-8";

	/**
	 * 站点
	 */
	public static final String SITE = "site";
	/**
	 * 部署路径
	 */
	public static final String BASE = "base";
	/**
	 * href前半部（相对于分页）
	 */
	public static final String HREF_FORMER = "hrefFormer";
	/**
	 * href后半部（相对于分页）
	 */
	public static final String HREF_LATTER = "hrefLatter";
	/**
	 * 页码
	 */
	public static final String PAGE_NO = "pageNo";

	/**
	 * 首页静态化时初始化值
	 * 
	 * @param map
	 * @param site
	 */
	public static void frontData(Map<String, Object> map, Site site) {
		map.put(SITE, site);
		map.put(BASE, site.getContextPath());
	}

	/**
	 * 为前台模板设置分页相关数据
	 * 
	 * @param pageNo
	 * @param urlFormer
	 * @param urlLatter
	 * @param map
	 */
	public static void frontPageData(int pageNo, String hrefFormer, String hrefLatter, Map<String, Object> map) {
		map.put(PAGE_NO, pageNo);
		map.put(HREF_FORMER, hrefFormer);
		map.put(HREF_LATTER, hrefLatter);
	}
}
