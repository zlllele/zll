package net.htjs.pt4.cms.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import net.htjs.pt4.cms.entity.Channel;
import net.htjs.pt4.cms.service.IChannelService;
import net.htjs.pt4.cms.service.IStaticPageService;
import net.htjs.pt4.cms.utils.UserUtils;
import net.htjs.pt4.core.BaseController;

/**
 * 首页、栏目、内容静态化控制类
 * 
 * @author xieshiyu
 *
 */
@Controller
@RequestMapping("/static")
public class StaticController extends BaseController {
	private static final Logger LOGGER = LoggerFactory.getLogger(StaticController.class);

	/**
	 * 首页静态化
	 * 
	 * @param callback
	 * @return
	 */
	@RequestMapping(value = "/o_index.do", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Object indexSubmit(HttpServletRequest request, HttpServletResponse response, String callback) {
		int code = 0;
		String msg = "";
		Map<String, Object> mapModel = new HashMap<String, Object>();

		String zzjgDm = UserUtils.getZzjgId(request);
		if (StringUtils.isNotBlank(zzjgDm)) {
			try {
				staticPageSvc.index(zzjgDm);
				code = 0;
				msg = "操作成功";
			} catch (Exception e) {
				code = -1;
				LOGGER.error(e.getMessage());
			}
		} else {
			code = -3;
			msg = "登录信息失效 请重新登陆";
		}
		LOGGER.info(msg);
		return getResult(mapModel, code, msg, callback);
	}

	/**
	 * 查询栏目列表
	 * 
	 * @param callback
	 * @return
	 */
	@RequestMapping(value = "/v_channel.do", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Object channel(HttpServletRequest request, String callback) {
		int code = 0;
		String msg = "";
		Map<String, Object> mapModel = new HashMap<String, Object>();

		String zzjgDm = UserUtils.getZzjgId(request);
		if (StringUtils.isNotBlank(zzjgDm)) {
			try {
				Channel parent = channelSvc.getRootChannelByZzjgDm(zzjgDm);
				List<Channel> list = null;
				if (parent != null) {
					list = channelSvc.getChannelByParentId(parent.getChannelId());
				} else {
					list = new ArrayList<Channel>();
				}
				mapModel.put("data", list);
				code = 1;
			} catch (Exception e) {
				code = -1;
				LOGGER.error(e.getMessage());
			}
		} else {
			code = -3;
			msg = "登录信息失效 请重新登陆";
		}
		LOGGER.info(msg);
		return getResult(mapModel, code, msg, callback);
	}

	/**
	 * 栏目静态化
	 * 
	 * @param channelId
	 * @param containChild
	 * @param callback
	 * @return
	 */
	@RequestMapping(value = "/o_channel.do", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Object channelSubmit(String channelId, boolean containChild, HttpServletRequest request, String callback) {
		int code = 0;
		String msg = "";
		Map<String, Object> mapModel = new HashMap<String, Object>();

		String zzjgDm = UserUtils.getZzjgId(request);
		if (StringUtils.isNotBlank(zzjgDm)) {
			try {
				staticPageSvc.channel(zzjgDm, channelId, containChild);
				code = 0;
				msg = "操作成功";
			} catch (Exception e) {
				code = -1;
				LOGGER.error(e.getMessage());
			}
		} else {
			code = -3;
			msg = "登录信息失效 请重新登陆";
		}
		LOGGER.info(msg);
		return getResult(mapModel, code, msg, callback);
	}

	/**
	 * 内容静态化
	 * 
	 * @param channelId
	 * @param callback
	 * @return
	 */
	@RequestMapping(value = "/o_content.do", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Object contentSubmit(String channelId, HttpServletRequest request, String callback) {
		int code = 0;
		String msg = "";
		Map<String, Object> mapModel = new HashMap<String, Object>();

		String zzjgDm = UserUtils.getZzjgId(request);
		if (StringUtils.isNotBlank(zzjgDm)) {
			try {
				staticPageSvc.content(zzjgDm, channelId);
				code = 0;
				msg = "操作成功";
			} catch (Exception e) {
				code = -1;
				LOGGER.error(e.getMessage());
			}
		} else {
			code = -3;
			msg = "登录信息失效 请重新登陆";
		}
		LOGGER.info(msg);
		return getResult(mapModel, code, msg, callback);
	}

	@Autowired
	private IStaticPageService staticPageSvc;
	@Autowired
	private IChannelService channelSvc;
}
