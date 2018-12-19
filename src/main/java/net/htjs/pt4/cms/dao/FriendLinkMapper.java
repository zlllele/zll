package net.htjs.pt4.cms.dao;

import java.util.List;
import java.util.Map;

import net.htjs.pt4.cms.entity.FriendLink;

/**
 * 友情链接持久层接口
 * 
 * @author caojian
 *
 */
public interface FriendLinkMapper {
	
	/**
	 * 查询友情链接类别
	 * @param typeId
	 * @return
	 */
	public List<FriendLink> getFriendLinksByTypeId(String typeId);

	/**
	 * 获取友情链接
	 * @param map
	 * @return
	 */
	public List<Map<String, Object>> getList(Map<String, Object> map);
	
	/**
	 * 保存友情链接
	 * @param map
	 */
	public void addFriendLink(Map<String, Object> map);

	/**
	 * 修改友情链接
	 * @param map
	 */
	public void updateFriendLink(Map<String, Object> map);

	/**
	 * 删除友情链接
	 * @param map
	 */
	public void deleteFriendLink(Map<String, Object> map);
}
