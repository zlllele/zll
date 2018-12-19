package net.htjs.pt4.cms.controller;

import net.htjs.pt4.cms.entity.FriendLink;
import net.htjs.pt4.cms.service.IFriendLinkService;
import net.htjs.pt4.cms.service.IFriendLinkTypeService;
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
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

/**
 * 友情链接类别控制类
 * @author caojian
 */
@Controller
@RequestMapping("/friendLinkType")
public class FriendLinkTypeController extends BaseController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(FriendLinkTypeController.class);

	@Autowired
	private IFriendLinkTypeService friendLinkTypeService;
	@Autowired
	private IFriendLinkService friendLinkService;
	@Autowired
	private ISiteService siteService;
	
	/**
	 * 获取友情链接类别
	 * @param site_name
	 * @param page
	 * @param pageNo
	 * @param pageSize
	 * @param callback
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/list.do", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Object list(String site_name,Integer page, Integer pageNo, Integer pageSize, String callback,HttpServletRequest request) {
		Map<String, Object> mapModel = new HashMap<String, Object>();
		int code = 0;
		String msg = "";
		try {
			String zzjgDm = UserUtils.getZzjgId(request);
			if (StringUtils.isNotBlank(zzjgDm)) {
				String site_id=siteService.findByZzjgDm(zzjgDm).getSiteId();
				Datagrid datagrid = friendLinkTypeService.getList(site_id,page,pageSize);
				mapModel.put("data", datagrid.getRows());
			} else {
				code = -3;
				msg = "登录信息失效 请重新登陆";
			}
		} catch (Exception e) {
			LOGGER.error("获取友情链接类别查询异常："+e.getMessage());
			code = -1;
		}
		Object obj = getResult(mapModel, code, msg, callback);
		return obj;
	}
	
	/**
	 * 添加友情链接类别
	 * @param site_id
	 * @param name
	 * @param priority
	 * @param callback
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/add.do", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Object add(String name,String priority,String callback,HttpServletRequest request) {
		Map<String, Object> mapModel = new HashMap<String, Object>();
		int code = 0;
		String msg = "";
		try {
			String zzjgDm = UserUtils.getZzjgId(request);
			if (StringUtils.isNotBlank(zzjgDm)) {
				String site_id=siteService.findByZzjgDm(zzjgDm).getSiteId();
				friendLinkTypeService.addFriendLinkType(site_id,name,priority);
			} else {
				code = -3;
				msg = "登录信息失效 请重新登陆";
			}
		} catch (Exception e) {
			LOGGER.error("友情链接类别新增异常："+e.getMessage());
			code=-1;
		}
		Object obj = getResult(mapModel, code, msg, callback);
		return obj;
	}
	
	/**
	 * 修改友情链接类别
	 * @param friend_link_type_id
	 * @param name
	 * @param priority
	 * @param callback
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/update.do", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Object update(String friend_link_type_id,String name,String priority,String callback,HttpServletRequest request) {
		Map<String, Object> mapModel = new HashMap<String, Object>();
		int code = 0;
		String msg = "";
		try {
			friendLinkTypeService.updateFriendLinkType(friend_link_type_id,name,priority);
		} catch (Exception e) {
			LOGGER.error("友情链接类别修改异常："+e.getMessage());
			code=-1;
		}
		Object obj = getResult(mapModel, code, msg, callback);
		return obj;
	}
	
	/**
	 * 删除友情链接类别
	 * @param log_id
	 * @param callback
	 * @return
	 */
	@RequestMapping(value = "/delete.do", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Object delete(String friend_link_type_id, String callback) {
		Map<String, Object> mapModel = new HashMap<String, Object>();
		int code = 0;
		String msg = "";
		try {
			//首先查询该类别下有没有友情链接，有的话不删除
			List<FriendLink> list_friend_link=friendLinkService.getFriendLinksByTypeId(friend_link_type_id);
			if(list_friend_link==null||list_friend_link.size()==0){
				friendLinkTypeService.deleteFriendLinkType(friend_link_type_id);
			}else{
				code=-2;
			}
		} catch (Exception e) {
			LOGGER.error("友情链接删除异常："+e.getMessage());
			code = -1;
		}
		Object obj = getResult(mapModel, code, msg, callback);
		return obj;
	}
	
}
