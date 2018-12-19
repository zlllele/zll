package net.htjs.pt4.cms.service;

import java.util.List;
import java.util.Map;

import net.htjs.pt4.cms.entity.FriendLink;
import net.htjs.pt4.core.Datagrid;

/**
 * 友情链接业务接口
 * 
 * @author caojian
 *
 */
public interface IFriendLinkService {

	/**
	 * 查询友情链接，用于友情链接类别删除的时候进行判断
	 * @param typeId
	 * @return
	 * @throws Exception
	 */
	public List<FriendLink> getFriendLinksByTypeId(String typeId) throws Exception;

	/**
	 * 增加友情链接
	 * @param site_id
	 * @param name
	 * @param domain
	 * @param type_id
	 * @param email
	 * @param fileUrl
	 * @param description
	 * @param priority
	 * @param views
	 * @param is_display
	 */
	public void addFriendLink(String site_id, String name, String domain, String type_id, String email, String fileUrl,
			String description, String priority, String views, String is_display);
	
	/**
	 * 查询友情链接，分页
	 * @param friend_link_type_id
	 * @param site_id
	 * @param logo_path
	 * @param page
	 * @param pageSize
	 * @return
	 */
	public Datagrid getList(String friend_link_type_id,String site_id,String logo_path, Integer page, Integer pageSize);

	/**
	 * 修改友情链接
	 * @param friend_link_id
	 * @param name
	 * @param domain
	 * @param type_id
	 * @param email
	 * @param fileUrl
	 * @param description
	 * @param priority
	 * @param views
	 * @param is_display
	 */
	public void updateFriendLink(String friend_link_id, String name, String domain, String type_id, String email,
			String fileUrl, String description, String priority, String views, String is_display);

	/**
	 * 删除友情链接
	 * @param friend_link_id
	 */
	void deleteFriendLink(String friend_link_id);

	/**
	 * 得到友情链接类别
	 * @param site_id
	 * @return
	 */
	public List<Map<String, Object>> getFriendLinkType(String site_id);

}
