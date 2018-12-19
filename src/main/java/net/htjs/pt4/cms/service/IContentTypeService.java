package net.htjs.pt4.cms.service;

import java.util.Map;
import net.htjs.pt4.core.Datagrid;
import net.htjs.pt4.core.entity.SaveException;


/**
 * 内容类型业务接口
 * 
 * @author wupeng
 *
 */
public interface IContentTypeService {
	/**
	 * 查询内容类型
	 * 
	 * @param map,pageNum,pageSize
	 * @return Datagrid
	 */
	Datagrid selectContentType(Map<String,Object> map, int pageNum, int pageSize) throws Exception;
	/**
	 * 插入内容类型
	 * 
	 * @param map
	 * @return int
	 */
	int insertContentType(Map<String,Object> map) throws SaveException;
	/**
	 * 查询指定id内容类型
	 * 
	 * @param id
	 * @return Map
	 */
	Map<String,Object> findById(String id) throws Exception;
	/**
	 * 查询内容类型下拉列表
	 * 
	 * @param map
	 * @return Map
	 */
	Map<String,Object> queryNames(Map<String,Object> map) throws Exception;
	/**
	 * 更新内容类型
	 * 
	 * @param map
	 * @return int
	 */
	int updateContentTypeById(Map<String,Object> map) throws SaveException;
	/**
	 * 删除内容类型
	 * 
	 * @param map
	 * @return int
	 */
	int deleteById(String id) throws Exception;
	
}

