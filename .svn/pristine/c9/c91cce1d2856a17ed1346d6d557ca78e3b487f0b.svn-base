package net.htjs.pt4.cms.service;


import javax.servlet.http.HttpServletRequest;

import net.htjs.pt4.core.Datagrid;

/**
 * 日志管理的接口类
 * @author caojian
 *
 */
public interface ILogService {
	/**
	 * 增加日志
	 * @param request
	 * @param site_id
	 * @param user_id
	 * @param user_name
	 * @param title
	 * @param content
	 */
	public void addLog(HttpServletRequest request,String site_id, String user_id, String user_name, String title, String content);

	/**
	 * 获取日志列表
	 * @param username
	 * @param title
	 * @param ip
	 * @param page
	 * @param pageSize
	 * @return
	 */
	public Datagrid getLogs(String site_id,String username, String title, String ip, Integer page, Integer pageSize);
	
	/**
	 * 删除日志
	 * @param log_id
	 */
	public void deleteLog(String log_id);

	/**
	 * 批量删除日志
	 * @param deleteType
	 */
	public void deleteBatch(String site_id,String deleteType);


}
