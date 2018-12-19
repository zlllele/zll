package net.htjs.pt4.cms.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

import net.htjs.pt4.cms.dao.FriendLinkMapper;
import net.htjs.pt4.cms.dao.FriendLinkTypeMapper;
import net.htjs.pt4.cms.entity.FriendLink;
import net.htjs.pt4.cms.service.IFriendLinkService;
import net.htjs.pt4.core.Datagrid;
import net.htjs.pt4.sys.util.UUIDUtils;

/**
 * 友情链接业务类
 * 
 * @author caojian
 * 
 */
@Service
public class FriendLinkService implements IFriendLinkService {

	@Autowired
	private FriendLinkMapper fLMapper;
	
	@Autowired
	private FriendLinkTypeMapper fLTMapper;

	/**
	 * 查询友情链接
	 */
	public List<FriendLink> getFriendLinksByTypeId(String typeId) throws Exception {
		return fLMapper.getFriendLinksByTypeId(typeId);
	}
	
	/**
	 * 查询友情连接，分页
	 */
	@Override
	public Datagrid getList(String friend_link_type_id,String site_id,String logo_path, Integer page, Integer pageSize) {
		PageHelper.startPage(page, pageSize);
		Map<String, Object> map=new HashMap<String, Object>();
		map.put("type_id", friend_link_type_id);
		map.put("site_id", site_id);
		map.put("logo_path", logo_path);
		List<Map<String, Object>> list = fLMapper.getList(map);
		PageInfo<Map<String, Object>> pageInfo = new PageInfo<Map<String, Object>>(list);
		for (Map<String, Object> u : list) {
			u.put("TOTAL", pageInfo.getTotal());
		}
		Datagrid datagrid = new Datagrid(pageInfo.getTotal(), pageInfo.getList());
		return datagrid;
	}

	/**
	 * 增加友情链接
	 */
	@Override
	public void addFriendLink(String site_id, String name, String domain, String type_id, String email, String fileUrl,
			String description, String priority, String views, String is_display) {
		Map<String, Object> map=new HashMap<String, Object>();
		map.put("friend_link_id", UUIDUtils.getUUID());
		map.put("site_id", site_id);
		map.put("name", name);
		map.put("domain", domain);
		map.put("type_id", type_id);
		map.put("email", email);
		map.put("logo_path", fileUrl);
		map.put("description", description);
		map.put("priority", priority);
		map.put("views", views);
		map.put("is_display", is_display);
		fLMapper.addFriendLink(map);
	}

	/**
	 * 修改友情链接
	 */
	@Override
	public void updateFriendLink(String friend_link_id, String name, String domain, String type_id, String email,
			String fileUrl, String description, String priority, String views, String is_display) {
		Map<String, Object> map=new HashMap<String, Object>();
		map.put("friend_link_id", friend_link_id);
		map.put("name", name);
		map.put("domain", domain);
		map.put("type_id", type_id);
		map.put("email", email);
		map.put("logo_path", fileUrl);
		map.put("description", description);
		map.put("priority", priority);
		map.put("views", views);
		map.put("is_display", is_display);
		fLMapper.updateFriendLink(map);
	}
	
	/**
	 * 删除友情链接
	 */
	@Override
	public void deleteFriendLink(String friend_link_id) {
		Map<String, Object> map=new HashMap<String, Object>();
		map.put("friend_link_id", friend_link_id);
		fLMapper.deleteFriendLink(map);
	}

	/**
	 * 获取友情链接类别
	 */
	@Override
	public List<Map<String, Object>> getFriendLinkType(String site_id) {
		Map<String, Object> map=new HashMap<String, Object>();
		map.put("site_id", site_id);
		List<Map<String, Object>> list=fLTMapper.getList(map);
		return list;
	}

}
