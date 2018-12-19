package net.htjs.pt4.cms.controller;

import net.htjs.pt4.cms.service.ILogService;
import net.htjs.pt4.cms.service.ISiteService;
import net.htjs.pt4.cms.utils.UserUtils;
import net.htjs.pt4.core.BaseController;
import net.htjs.pt4.core.Datagrid;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

/**
 * 日志控制类
 * @author caojian
 */
@Controller
@RequestMapping("/log")
public class LogController extends BaseController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(LogController.class);

	@Autowired
	private ILogService logService;
	@Autowired
	private ISiteService siteService;

	/**
	 * 获取日志列表
	 * @param user_name
	 * @param title
	 * @param ip
	 * @param page
	 * @param pageNo
	 * @param pageSize
	 * @param callback
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/list.do", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Object list(String user_name, String title, String ip, Integer page, Integer pageNo, Integer pageSize, String callback,HttpServletRequest request) {
		Map<String, Object> mapModel = new HashMap<String, Object>();
		int code = 0;
		String msg = "";
		try {
			String zzjgDm = UserUtils.getZzjgId(request);
			if (StringUtils.isNotBlank(zzjgDm)) {
				String site_id=siteService.findByZzjgDm(zzjgDm).getSiteId();
				Datagrid datagrid = logService.getLogs(site_id,user_name,title,ip,page,pageSize);
				mapModel.put("data", datagrid.getRows());
			} else {
				code = -3;
				msg = "登录信息失效 请重新登陆";
			}
		} catch (Exception e) {
			LOGGER.error("日志记录查询异常："+e.getMessage());
			msg=e.getMessage();
			code = -1;
		}
		Object obj = getResult(mapModel, code, msg, callback);
		return obj;
	}
	
	/**
	 * 删除日志
	 * @param log_id
	 * @param callback
	 * @return
	 */
	@RequestMapping(value = "/delete.do", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Object delete(String log_id, String callback) {
		Map<String, Object> mapModel = new HashMap<String, Object>();
		int code = 0;
		String msg = "";
		try {
			logService.deleteLog(log_id);
		} catch (Exception e) {
			LOGGER.error("日志记录删除异常："+e.getMessage());
			msg=e.getMessage();
			code = -1;
		}
		Object obj = getResult(mapModel, code, msg, callback);
		return obj;
	}
	
	/**
	 * 批量删除
	 * @param deleteType
	 * @param callback
	 * @return
	 */
	@RequestMapping(value = "/deleteBatch.do", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Object deleteBatch(String deleteType, String callback,HttpServletRequest request) {
		Map<String, Object> mapModel = new HashMap<String, Object>();
		int code = 0;
		String msg = "";
		try {
			String zzjgDm = UserUtils.getZzjgId(request);
			if (StringUtils.isNotBlank(zzjgDm)) {
				String site_id=siteService.findByZzjgDm(zzjgDm).getSiteId();
				logService.deleteBatch(site_id,deleteType);
			} else {
				code = -3;
				msg = "登录信息失效 请重新登陆";
			}
		} catch (Exception e) {
			LOGGER.error("日志记录批量删除异常："+e.getMessage());
			msg=e.getMessage();
			code = -1;
		}
		Object obj = getResult(mapModel, code, msg, callback);
		return obj;
	}
	
}
