package net.htjs.pt4.cms.dao;

import java.util.List;
import java.util.Map;

import net.htjs.pt4.cms.entity.Mark;
import net.htjs.pt4.core.Mapper;

/**
 * 水印持久化接口
 * @author caojian
 *
 */
public interface MarkMapper extends Mapper<Mark> {

	public List<Map<String, Object>> queryMark(Map<String , Object> map);

	public void saveMark(Map<String, Object> map);

	public void updateMark(Map<String, Object> map);
}