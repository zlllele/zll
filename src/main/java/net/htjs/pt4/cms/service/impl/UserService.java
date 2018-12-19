package net.htjs.pt4.cms.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

import net.htjs.pt4.cms.dao.UserMapper;
import net.htjs.pt4.cms.service.IUserService;
import net.htjs.pt4.core.Datagrid;
import net.htjs.pt4.sys.util.UUIDUtils;

/**
 * Description: author dyenigma date 2017/08/31
 */
@Service
public class UserService implements IUserService {

	@Autowired
	private UserMapper userMapper;

	public Datagrid getAll(int pageNo, int pageSize) throws Exception {
		PageHelper.startPage(pageNo, pageSize);
		List<Map<String, Object>> list = userMapper.getAll();
		PageInfo<Map<String, Object>> pageInfo = new PageInfo<Map<String, Object>>(list);
		for (Map<String, Object> u : list) {
			u.put("TOTAL", pageInfo.getTotal());
		}
		Datagrid datagrid = new Datagrid(pageInfo.getTotal(), pageInfo.getList());
		return datagrid;
	}

	public PageInfo<Map<String, Object>> getPageInfo(int pageNo, int pageSize) throws Exception {
		PageHelper.startPage(pageNo, pageSize);
		List<Map<String, Object>> list = userMapper.getAll();
		PageInfo<Map<String, Object>> pageInfo = new PageInfo<Map<String, Object>>(list);
		return pageInfo;
	}

	public void insertUser(String userName) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("id", UUIDUtils.getUUID());
		map.put("title", userName);
		userMapper.insertUser(map);
	}

	public void updateUser(String id, String userName) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("id", id);
		map.put("title", userName);
		userMapper.updateUser(map);
	}

	public void deleteUser(String id) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("id", id);
		userMapper.deleteUser(map);
	}

	public Map<String, Object> findById(String id) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("id", id);
		return userMapper.findById(map);
	}
}
