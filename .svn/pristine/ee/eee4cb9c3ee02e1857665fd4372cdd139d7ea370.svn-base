package net.htjs.pt4.cms.dao;

import java.util.List;
import java.util.Map;

import net.htjs.pt4.cms.entity.Advertising;

/**
 * 广告管理持久化接口
 * 
 * @author caojian
 *
 */
public interface AdvertisingMapper {

	/**
	 * 查询广告列表
	 * 
	 * @param map
	 * @return
	 */
	List<Map<String, Object>> getList(Map<String, Object> map);

	/**
	 * 增加广告
	 * 
	 * @param map
	 */
	void addAdvertising(Map<String, Object> map);

	/**
	 * 修改广告
	 * 
	 * @param map
	 */
	void updateAdvertising(Map<String, Object> map);

	/**
	 * 删除广告
	 * 
	 * @param map
	 */
	void deleteAdvertising(Map<String, Object> map);

	/**
	 * 以广告类型查询其下广告
	 * 
	 * @param typeId
	 * @return
	 */
	public List<Advertising> getAdverByTypeId(Map<String, Object> map);

}
