package net.htjs.pt4.cms.dao;

import java.util.List;
import java.util.Map;

/**
 * 内容类型持久化接口
 * 
 * @author wupeng
 *
 */
public interface ContentTypeMapper {
	/**
	 * 查询内容类型
	 * 
	 * @param map
	 * @return List
	 */
	List<Map<String,Object>> selectContentType(Map<String,Object> map);
	/**
	 * 插入内容类型
	 * 
	 * @param map
	 * @return int
	 */
	int insertContentType(Map<String,Object> map);
	/**
	 * 根据id查询内容类型
	 * 
	 * @param id
	 * @return Map
	 */
	Map<String,Object> selectContentTypeById(String id);
	/**
	 * 查询内容类型下拉列表
	 * 
	 * @param map
	 * @return Map
	 */
	Map<String,Object> queryNames(Map<String,Object> map);
	/**
	 * 更新内容类型
	 * 
	 * @param map
	 * @return int
	 */
	int updateContentTypeById(Map<String,Object> map);
	/**
	 * 删除内容类型
	 * 
	 * @param map
	 * @return int
	 */
	int deleteById(String id);
}