package net.htjs.pt4.cms.service;

import net.htjs.pt4.core.Datagrid;

/**
 * 附件管理的接口类
 * @author caojian
 *
 */
public interface IAttachmentService {

	public Datagrid getListSite(Integer page, Integer pageSize);
	
	public Datagrid getListTime(Integer page, Integer pageSize, String site_id);
	
	public Datagrid getListFile(Integer page, Integer pageSize, String site_id, String file_time);

	public String deleteAttachment(String content_id, String file_name, String file_path, String file_time, String site_id);

}
