package net.htjs.pt4.cms.dao;

import java.util.List;
import java.util.Map;

import net.htjs.pt4.cms.entity.Site;
import net.htjs.pt4.core.Mapper;

/**
 * 站点持久化接口
 * 
 * @author xieshiyu
 *
 */
public interface SiteMapper extends Mapper<Site> {

	/**
	 * 以站点ID查询站点信息
	 * 
	 * @param siteId
	 * @return
	 */
	public Site findById(String siteId);
	
	/**
	 * 站点列表
	 * @param map
	 * @return
	 */
	public List<Map<String, Object>> selectSite(Map<String, String> map);

	/**
	 * 更新站点信息
	 * 
	 * @param site
	 */
	public void updateSiteById(Site site);

	/**
	 * 以组织机构查询站点信息
	 * 
	 * @param siteId
	 * @return
	 */
	public Site findByZzjgDm(String zzjgDm);
	
	/**
	 * 站点是否重复
	 * @param map
	 * @return
	 */
	public List<Map<String,Object>> checkSiteIsExist(Map<String,Object> map);
	
	/**
	 * 站点新增
	 * @param map
	 */
	public void addSite(Map<String,Object> map);
	
	/**
	 * 站点修改
	 * @param map
	 */
	public void editSite(Map<String,Object> map);
	
	/**
	 * 站点删除
	 * @param map
	 */
	public void delSite(String siteId);
}
