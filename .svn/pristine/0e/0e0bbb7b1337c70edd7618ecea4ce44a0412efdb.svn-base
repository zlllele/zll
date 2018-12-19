package net.htjs.pt4.cms.controller;

import net.htjs.pt4.cms.service.IAdvertisingService;
import net.htjs.pt4.cms.service.ISiteService;
import net.htjs.pt4.cms.service.IStaticPageService;
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
 * 广告管理类
 * @author caojian
 */
@Controller
@RequestMapping("/advertising")
public class AdvertisingController extends BaseController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(AdvertisingController.class);

	@Autowired
	private IAdvertisingService advertisingService;
	@Autowired
	private ISiteService siteService;
	@Autowired
	private FriendLinkController friendLinkController;
	@Autowired
	private IStaticPageService staticservice;
	
	/**
	 * 获取广告列表
	 * @param page
	 * @param pageNo
	 * @param pageSize
	 * @param callback
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/list.do", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Object list(Integer page, Integer pageNo, Integer pageSize, String callback,HttpServletRequest request) {
		Map<String, Object> mapModel = new HashMap<String, Object>();
		int code = 0;
		String msg = "";
		try {
			String zzjgDm = UserUtils.getZzjgId(request);
			if (StringUtils.isNotBlank(zzjgDm)) {
				String site_id=siteService.findByZzjgDm(zzjgDm).getSiteId();
				Datagrid datagrid = advertisingService.getList(site_id,page,pageSize);
				mapModel.put("data", datagrid.getRows());
			} else {
				code = -3;
				msg = "登录信息失效 请重新登陆";
			}
		} catch (Exception e) {
			LOGGER.error("广告管理查询异常："+e.getMessage());
			code = -1;
		}
		Object obj = getResult(mapModel, code, msg, callback);
		return obj;
	}
	
	/**
	 * 首页静态化
	 * @param callback
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/doStaticIndex.do", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Object doStaticIndex(String callback,HttpServletRequest request) {
		Map<String, Object> mapModel = new HashMap<String, Object>();
		int code = 0;
		String msg = "";
		try {
			String zzjgDm = UserUtils.getZzjgId(request);
			if (StringUtils.isNotBlank(zzjgDm)) {
				staticservice.index(zzjgDm);
			} else {
				code = -3;
				msg = "登录信息失效 请重新登陆";
			}
		} catch (Exception e) {
			LOGGER.error("广告新增异常："+e.getMessage());
			code=-1;
		}
		Object obj = getResult(mapModel, code, msg, callback);
		return obj;
	}
	
	/**
	 * 增加广告
	 * @param name
	 * @param category
	 * @param adspace_id
	 * @param ad_weight
	 * @param ad_blank
	 * @param click_count
	 * @param is_enabled
	 * @param ad_url
	 * @param ad_info
	 * @param fileUrl
	 * @param ad_img_width
	 * @param ad_img_height
	 * @param ad_color
	 * @param ad_font
	 * @param callback
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/add.do", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Object add(String name,String category,String adspace_id,String ad_weight,String ad_blank,String click_count,String is_enabled,
			String ad_url,String ad_info,String fileUrl,String ad_img_width,String ad_img_height,String ad_color,String ad_font,
			String callback,HttpServletRequest request) {
		Map<String, Object> mapModel = new HashMap<String, Object>();
		int code = 0;
		String msg = "";
		try {
			String zzjgDm = UserUtils.getZzjgId(request);
			if (StringUtils.isNotBlank(zzjgDm)) {
				String site_id=siteService.findByZzjgDm(zzjgDm).getSiteId();
				advertisingService.addAdvertising(site_id,name,category,adspace_id,ad_weight,ad_blank,click_count,is_enabled,
						ad_url,ad_info,fileUrl,ad_img_width,ad_img_height,ad_color,ad_font);
			} else {
				code = -3;
				msg = "登录信息失效 请重新登陆";
			}
		} catch (Exception e) {
			LOGGER.error("广告新增异常："+e.getMessage());
			code=-1;
		}
		Object obj = getResult(mapModel, code, msg, callback);
		return obj;
	}
	
	/**
	 * 修改广告
	 * @param advertising_id
	 * @param name
	 * @param category
	 * @param adspace_id
	 * @param ad_weight
	 * @param ad_blank
	 * @param click_count
	 * @param is_enabled
	 * @param ad_url
	 * @param ad_info
	 * @param fileUrl
	 * @param fileUrl_old
	 * @param ad_img_width
	 * @param ad_img_height
	 * @param ad_color
	 * @param ad_font
	 * @param callback
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/update.do", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Object update(String advertising_id,String name,String category,String adspace_id,String ad_weight,String ad_blank,String click_count,String is_enabled,
			String ad_url,String ad_info,String fileUrl,String fileUrl_old,String ad_img_width,String ad_img_height,String ad_color,String ad_font,
			String callback,HttpServletRequest request) {
		Map<String, Object> mapModel = new HashMap<String, Object>();
		int code = 0;
		String msg = "";
		try {
			advertisingService.updateAdvertising(advertising_id,name,category,adspace_id,ad_weight,ad_blank,click_count,is_enabled,
					ad_url,ad_info,fileUrl,ad_img_width,ad_img_height,ad_color,ad_font);
			if(fileUrl_old!=null){
				friendLinkController.deleteFile(fileUrl_old,request);
			}
		} catch (Exception e) {
			LOGGER.error("广告修改异常："+e.getMessage());
			code=-1;
		}
		Object obj = getResult(mapModel, code, msg, callback);
		return obj;
	}
	
	/**
	 * 删除广告
	 * @param advertising_id
	 * @param adspace_id
	 * @param ad_img_url
	 * @param callback
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/delete.do", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Object delete(String advertising_id,String adspace_id,String ad_img_url, String callback,HttpServletRequest request) {
		Map<String, Object> mapModel = new HashMap<String, Object>();
		int code = 0;
		String msg = "";
		try {
			advertisingService.deleteAdvertising(advertising_id);
			if(adspace_id.equals("0")&&ad_img_url!=null){
				friendLinkController.deleteFile(ad_img_url,request);
			}
		} catch (Exception e) {
			LOGGER.error("广告删除异常："+e.getMessage());
			code = -1;
		}
		Object obj = getResult(mapModel, code, msg, callback);
		return obj;
	}
}
