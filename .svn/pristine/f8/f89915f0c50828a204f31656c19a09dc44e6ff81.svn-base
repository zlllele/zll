package net.htjs.pt4.cms.dao;

import java.util.List;
import java.util.Map;

import net.htjs.pt4.cms.entity.Log;
import net.htjs.pt4.core.Mapper;

/**
 * 附件管理持久化接口
 * @author caojian
 *
 */
public interface AttachmentMapper extends Mapper<Log> {

	public List<Map<String, Object>> getListSite();
	
	public List<Map<String, Object>> getListTime(Map<String, Object> map);
	
	public List<Map<String, Object>> getListFile(Map<String, Object> map);

	public void deleteAttachment(Map<String, Object> map);
}