package net.htjs.pt4.cms.service;


import net.htjs.pt4.core.Datagrid;

/**
 * 回收站的接口类
 * @author caojian
 *
 */
public interface IContentRecycleService {

	public Datagrid getList(String site_id,String title, String user_name, String sequencing, Integer page, Integer pageSize);

	public void deleteContent(String content_id, String media_path, String image_path);

	public void restoreContent(String content_id);

}
