package net.htjs.pt4.cms.service;

import java.util.Map;

import com.github.pagehelper.PageInfo;

import net.htjs.pt4.core.Datagrid;

/**
 * Description: author dyenigma date 2017/08/31
 */
public interface IUserService {

	public Datagrid getAll(int pageNo, int pageSize) throws Exception;

	public PageInfo<Map<String, Object>> getPageInfo(int pageNo, int pageSize) throws Exception;

	public void insertUser(String userName) throws Exception;

	public void updateUser(String id, String userName) throws Exception;

	public void deleteUser(String id) throws Exception;

	public Map<String, Object> findById(String id) throws Exception;

}
