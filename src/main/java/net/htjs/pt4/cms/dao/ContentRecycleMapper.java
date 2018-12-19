package net.htjs.pt4.cms.dao;

import java.util.List;
import java.util.Map;

import net.htjs.pt4.cms.entity.Log;
import net.htjs.pt4.core.Mapper;

/**
 * 回收站持久化接口
 * @author caojian
 *
 */
public interface ContentRecycleMapper extends Mapper<Log> {

	public List<Map<String, Object>> getList(Map<String, Object> map);

	public void deleteContent(String content_id);

	public void restoreContent(String content_id);
}