package net.htjs.pt4.cms.dao;

import java.util.List;
import java.util.Map;

import net.htjs.pt4.cms.entity.Log;
import net.htjs.pt4.core.Mapper;

/**
 * 日志持久化接口
 * @author caojian
 *
 */
public interface LogMapper extends Mapper<Log> {

	public List<Map<String, Object>> getLogs(Map<String, Object> map);

	public void deleteLog(Map<String, Object> map);
	
	public void deleteBatch(Map<String, Object> map);

	public void addLog(Map<String, Object> map);
}