package net.htjs.pt4.cms.controller;

import net.htjs.pt4.cms.service.ISiteService;
import net.htjs.pt4.core.BaseController;
import net.htjs.pt4.core.Datagrid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

/**
 * 访问量控制类
 * @author caojian
 */
@Controller
@RequestMapping("/views")
public class ViewsController extends BaseController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(ViewsController.class);

	@Autowired
	private ISiteService siteService;
	
	/**
	 * 获取站点访问量
	 * @param callback
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/list.do", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Object getFriendLinkType(String site_name,Integer page, Integer pageNo, Integer pageSize,String callback,HttpServletRequest request) {
		Map<String, Object> mapModel = new HashMap<String, Object>();
		int code = 0;
		String msg = "";
		try {
			Map<String, String> map_site = new HashMap<String, String>();
			map_site.put("site_name", site_name);
			Datagrid datagrid = siteService.selectSite(map_site,page,pageSize);
			mapModel.put("data", datagrid.getRows());
		} catch (Exception e) {
			LOGGER.error("获取站点访问量异常："+e.getMessage());
			code=-1;
		}
		Object obj = getResult(mapModel, code, msg, callback);
		return obj;
	}
}
