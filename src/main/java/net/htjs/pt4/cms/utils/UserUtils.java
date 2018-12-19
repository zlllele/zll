package net.htjs.pt4.cms.utils;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

/**
 * 用户信息获取工具类
 * 
 * @author xieshiyu
 *
 */
public class UserUtils {

	/**
	 * redis中用户对象的KEY
	 */
	public final static String USERINFO = "userInfo";
	/**
	 * 组织机构
	 */
	public final static String ZZJG_DM = "ZZJG_DM";
	/**
	 * 用户ID
	 */
	public final static String USERID = "USERID";
	/**
	 * 用户名称
	 */
	public final static String USERNAME = "USERNAME";

	/**
	 * 获取用户对象
	 * 
	 * @param request
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static Map<String, Object> getUserInfo(HttpServletRequest request) {
		Map<String, Object> user = (Map<String, Object>) request.getSession().getAttribute(USERINFO);
		return user;
	}

	/**
	 * 获取组织机构ID
	 * 
	 * @param request
	 * @return
	 */
	public static String getZzjgId(HttpServletRequest request) {
		Map<String, Object> user = UserUtils.getUserInfo(request);
		if (user != null) {
			return user.get(ZZJG_DM).toString();
		}
		return null;
	}

	/**
	 * 获取用户ID
	 * 
	 * @param request
	 * @return
	 */
	public static String getUserId(HttpServletRequest request) {
		Map<String, Object> user = UserUtils.getUserInfo(request);
		if (user != null) {
			return user.get(USERID).toString();
		}
		return null;
	}

	/**
	 * 获取用户名称
	 * 
	 * @param request
	 * @return
	 */
	public static String getUserName(HttpServletRequest request) {
		Map<String, Object> user = UserUtils.getUserInfo(request);
		if (user != null) {
			return user.get(USERNAME).toString();
		}
		return null;
	}
}
