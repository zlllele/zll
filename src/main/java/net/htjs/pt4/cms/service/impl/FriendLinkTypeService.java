package net.htjs.pt4.cms.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

import net.htjs.pt4.cms.dao.FriendLinkTypeMapper;
import net.htjs.pt4.cms.service.IFriendLinkTypeService;
import net.htjs.pt4.core.Datagrid;
import net.htjs.pt4.sys.util.UUIDUtils;

/**
 * 友情链接类别业务类
 * 
 * @author caojian
 * 
 */
@Service
public class FriendLinkTypeService implements IFriendLinkTypeService {

	@Autowired
	private FriendLinkTypeMapper fLTMapper;

	/**
	 * 获取友情链接类别
	 */
	@Override
	public Datagrid getList(String site_id,Integer page, Integer pageSize) {
		PageHelper.startPage(page, pageSize);
		Map<String, Object> map=new HashMap<String, Object>();
		map.put("site_id", site_id);
		List<Map<String, Object>> list = fLTMapper.getList(map);
		PageInfo<Map<String, Object>> pageInfo = new PageInfo<Map<String, Object>>(list);
		for (Map<String, Object> u : list) {
			u.put("TOTAL", pageInfo.getTotal());
		}
		Datagrid datagrid = new Datagrid(pageInfo.getTotal(), pageInfo.getList());
		return datagrid;
	}

	/**
	 * 增加友情链接类别
	 */
	@Override
	public void addFriendLinkType(String site_id, String name, String priority) {
		Map<String, Object> map=new HashMap<String, Object>();
		map.put("friend_link_type_id", UUIDUtils.getUUID());
		map.put("site_id", site_id);
		map.put("name", name);
		map.put("priority", priority);
		fLTMapper.addFriendLinkType(map);
	}

	/**
	 * 修改友情链接类别
	 */
	@Override
	public void updateFriendLinkType(String friend_link_type_id, String name, String priority) {
		Map<String, Object> map=new HashMap<String, Object>();
		map.put("friend_link_type_id", friend_link_type_id);
		map.put("name", name);
		map.put("priority", priority);
		fLTMapper.updateFriendLinkType(map);
	}

	/**
	 * 删除友情链接类别
	 */
	@Override
	public void deleteFriendLinkType(String friend_link_type_id) {
		Map<String, Object> map=new HashMap<String, Object>();
		map.put("friend_link_type_id", friend_link_type_id);
		fLTMapper.deleteFriendLinkType(map);
	}
}
