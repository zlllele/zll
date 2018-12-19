package net.htjs.pt4.cms.service;

import net.htjs.pt4.core.Datagrid;

/**
 * 友情链接类别业务接口
 * 
 * @author xieshiyu
 *
 */
public interface IFriendLinkTypeService {

	Datagrid getList(String site_id,Integer page, Integer pageSize);

	void addFriendLinkType(String site_id, String name, String priority);

	void updateFriendLinkType(String friend_link_type_id, String name, String priority);

	void deleteFriendLinkType(String friend_link_type_id);
}
