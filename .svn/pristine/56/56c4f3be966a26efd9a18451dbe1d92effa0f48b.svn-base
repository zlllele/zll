package net.htjs.pt4.cms.controller;

import net.htjs.pt4.cms.entity.Site;
import net.htjs.pt4.cms.service.IFriendLinkService;
import net.htjs.pt4.cms.service.ISiteService;
import net.htjs.pt4.cms.utils.UserUtils;
import net.htjs.pt4.core.BaseController;
import net.htjs.pt4.core.Datagrid;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 友情链接控制类
 * @author caojian
 */
@Controller
@RequestMapping("/friendLink")
public class FriendLinkController extends BaseController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(FriendLinkController.class);

	@Autowired
	private IFriendLinkService friendLinkService;
	@Autowired
	private ISiteService siteService;
	
	/**
	 * 获取友情链接类别
	 * @param callback
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getFriendLinkType.do", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Object getFriendLinkType(String callback,HttpServletRequest request) {
		Map<String, Object> mapModel = new HashMap<String, Object>();
		int code = 0;
		String msg = "";
		try {
			String zzjgDm = UserUtils.getZzjgId(request);
			if (StringUtils.isNotBlank(zzjgDm)) {
				String site_id=siteService.findByZzjgDm(zzjgDm).getSiteId();
				List<Map<String, Object>> list=friendLinkService.getFriendLinkType(site_id);
				if(list==null||list.size()==0){
					code=-2;
				}else{
					mapModel.put("data", list);
				}
			} else {
				code = -3;
				msg = "登录信息失效 请重新登陆";
			}
		} catch (Exception e) {
			LOGGER.error("获取友情链接异常："+e.getMessage());
			code=-1;
		}
		Object obj = getResult(mapModel, code, msg, callback);
		return obj;
	}

	/**
	 * 根据友情链接类别查询友情链接
	 * @param friend_link_type_id
	 * @param page
	 * @param pageNo
	 * @param pageSize
	 * @param callback
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/list.do", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Object list(String friend_link_type_id,Integer page, Integer pageNo, Integer pageSize, String callback,HttpServletRequest request) {
		Map<String, Object> mapModel = new HashMap<String, Object>();
		int code = 0;
		String msg = "";
		try {
			String zzjgDm = UserUtils.getZzjgId(request);
			if (StringUtils.isNotBlank(zzjgDm)) {
				String separator = File.separator;
				Site site=siteService.findByZzjgDm(zzjgDm);
				String site_id=site.getSiteId();
				String static_path=site.getStaticPath();
				String static_dir=site.getStaticDir();
				String domain=site.getDomain();
				String contextPath=site.getContextPath();
				String logo_path=domain+separator+contextPath+separator;
				Datagrid datagrid = friendLinkService.getList(friend_link_type_id,site_id,logo_path,page,pageSize);
				mapModel.put("data", datagrid.getRows());
				
				String fileUrl_pre=static_path+separator+static_dir+separator;
				mapModel.put("fileUrl_pre", fileUrl_pre);
			} else {
				code = -3;
				msg = "登录信息失效 请重新登陆";
			}
		} catch (Exception e) {
			LOGGER.error("友情链接查询异常："+e.getMessage());
			code = -1;
		}
		Object obj = getResult(mapModel, code, msg, callback);
		return obj;
	}
	
	/**
	 * 添加友情链接
	 * @param name
	 * @param domain
	 * @param type_id
	 * @param email
	 * @param fileUrl
	 * @param description
	 * @param priority
	 * @param views
	 * @param is_display
	 * @param callback
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/add.do", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Object add(String name,String domain,String type_id,String email,String fileUrl,String description,String priority,
			String views,String is_display,String callback,HttpServletRequest request) {
		Map<String, Object> mapModel = new HashMap<String, Object>();
		int code = 0;
		String msg = "";
		try {
			//站点从登录用户获取
			String zzjgDm = UserUtils.getZzjgId(request);
			if (StringUtils.isNotBlank(zzjgDm)) {
				Site site=siteService.findByZzjgDm(zzjgDm);
				String site_id=site.getSiteId();
				friendLinkService.addFriendLink(site_id,name,domain,type_id,email,fileUrl,description,priority,views,is_display);
			} else {
				code = -3;
				msg = "登录信息失效 请重新登陆";
			}
		} catch (Exception e) {
			LOGGER.error("友情链接新增异常："+e.getMessage());
			code=-1;
		}
		Object obj = getResult(mapModel, code, msg, callback);
		return obj;
	}
	
	/**
	 * 修改友情链接
	 * @param friend_link_id
	 * @param name
	 * @param domain
	 * @param type_id
	 * @param email
	 * @param fileUrl
	 * @param fileUrl_old
	 * @param description
	 * @param priority
	 * @param views
	 * @param is_display
	 * @param callback
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/update.do", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Object update(String friend_link_id,String name,String domain,String type_id,String email,String fileUrl,
			String fileUrl_old,String description,String priority,
			String views,String is_display,String callback,HttpServletRequest request) {
		Map<String, Object> mapModel = new HashMap<String, Object>();
		int code = 0;
		String msg = "";
		try {
			if(fileUrl==null||fileUrl.equals("")||fileUrl.equals("null")){
				friendLinkService.updateFriendLink(friend_link_id,name,domain,type_id,email,fileUrl_old,description,priority,views,is_display);
			}else{
				friendLinkService.updateFriendLink(friend_link_id,name,domain,type_id,email,fileUrl,description,priority,views,is_display);
				if(fileUrl_old!=null){
					deleteFile(fileUrl_old,request);
				}
			}
		} catch (Exception e) {
			LOGGER.error("友情链接修改异常："+e.getMessage());
			code=-1;
		}
		Object obj = getResult(mapModel, code, msg, callback);
		return obj;
	}
	
	/**
	 * 删除友情链接
	 * @param log_id
	 * @param callback
	 * @return
	 */
	@RequestMapping(value = "/delete.do", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Object delete(String friend_link_id,String logo_path, String callback,HttpServletRequest request) {
		Map<String, Object> mapModel = new HashMap<String, Object>();
		int code = 0;
		String msg = "";
		try {
			friendLinkService.deleteFriendLink(friend_link_id);
			deleteFile(logo_path,request);
		} catch (Exception e) {
			LOGGER.error("友情链接删除异常："+e.getMessage());
			code = -1;
		}
		Object obj = getResult(mapModel, code, msg, callback);
		return obj;
	}
	
	/**
	 * 上传图片
	 * @param uploadfileUrl_bak
	 * @param file
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/uploadFriendLinkLOGO.do")
	@ResponseBody
	public Object upload_image( String uploadfileUrl_bak,@RequestParam(value = "uploadFile", required = false) MultipartFile file, HttpServletRequest request,HttpServletResponse response) throws Exception {
		Map<String, Object> mapModel = new HashMap<String, Object>();
		int code=0;
		String msg="";
		String callback="";
		
		String zzjgDm = UserUtils.getZzjgId(request);
		if (StringUtils.isNotBlank(zzjgDm)) {
			Site site=siteService.findByZzjgDm(zzjgDm);
			String origName = file.getOriginalFilename();
			String ext = FilenameUtils.getExtension(origName).toLowerCase(Locale.ENGLISH);
			String arryext="jpg,jpeg,JPEG,png,PNG,";
			if(arryext.indexOf(ext)==-1){
				code=-1;
			}else{
				String separator = File.separator;
				String static_path=site.getStaticPath();
				String static_dir=site.getStaticDir();
				//站点域名+站点根目录+图片地址
				String domain=site.getDomain();
				String contextPath=site.getContextPath();
				SimpleDateFormat sdf=new SimpleDateFormat("yyyyMM");
				SimpleDateFormat sdf_sss=new SimpleDateFormat("yyyyMMddHHmmssSSS");
				String sdf_rq=sdf.format(new Date());
				String file_name=sdf_sss.format(new Date());
				String saveUrl="u"+separator+sdf_rq;
				String staticUrl=static_path+separator+static_dir;
				String path=staticUrl+separator+saveUrl;
				File file_path=new File(path);
				if(!file_path.exists()){
					file_path.mkdirs();
				}
				saveUrl=saveUrl+separator+file_name+"."+ext;
				String path_name=staticUrl+separator+saveUrl;
				FileOutputStream fs = new FileOutputStream(path_name);
				byte[] b = file.getBytes();  
				// 下载签章
	            fs.write(b, 0, b.length);
	            fs.close();
				
	            path_name=domain+contextPath+separator+saveUrl;
				mapModel.put("fileUrl", path_name);
				mapModel.put("saveUrl", saveUrl);
				
				if(uploadfileUrl_bak!=null){
					deleteFile(uploadfileUrl_bak,request);
				}
			}
		} else {
			code = -3;
			msg = "登录信息失效 请重新登陆";
		}
		Object obj = getResult(mapModel, code, msg, callback);
		return obj;
	}
	
	
	/**
	 * 删除文件
	 * @param log_id
	 * @param callback
	 * @return
	 */
	public void deleteFile(String fileUrl,HttpServletRequest request) {
		try {
			if(fileUrl!=null&&!fileUrl.equals("")){
				String zzjgDm = UserUtils.getZzjgId(request);
				if (StringUtils.isNotBlank(zzjgDm)) {
					Site site=siteService.findByZzjgDm(zzjgDm);
					String static_path=site.getStaticPath();
					String static_dir=site.getStaticDir();
					String separator = File.separator;
					fileUrl=static_path+separator+static_dir+separator+fileUrl;
					File file=new File(fileUrl);
					file.delete();
				}
			}
		} catch (Exception e) {
			LOGGER.error("友情链接文件删除异常："+e.getMessage());
		}
	}
	
	/**
	 * 用于ajax删除文件
	 * @param log_id
	 * @param callback
	 * @return
	 */
	@RequestMapping("/deleteFile.do")
	@ResponseBody
	public Object deleteFile(String fileUrl,String callback,HttpServletRequest request) {
		Map<String, Object> mapModel = new HashMap<String, Object>();
		int code=0;
		String msg="";
		try {
			if(fileUrl!=null&&!fileUrl.equals("")){
				String zzjgDm = UserUtils.getZzjgId(request);
				if (StringUtils.isNotBlank(zzjgDm)) {
					Site site=siteService.findByZzjgDm(zzjgDm);
					String static_path=site.getStaticPath();
					String static_dir=site.getStaticDir();
					String separator = File.separator;
					fileUrl=static_path+separator+static_dir+separator+fileUrl;
					File file=new File(fileUrl);
					file.delete();
				}
			}
		} catch (Exception e) {
			LOGGER.error("友情链接ajax文件删除异常："+e.getMessage());
			code=-1;
		}
		Object obj = getResult(mapModel, code, msg, callback);
		return obj;
	}
}
