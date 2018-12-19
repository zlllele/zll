package net.htjs.pt4.cms.controller;

import java.io.File;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import net.htjs.pt4.cms.entity.Site;
import net.htjs.pt4.cms.service.ISiteService;
import net.htjs.pt4.cms.utils.FileUtils;
import net.htjs.pt4.cms.utils.UserUtils;
import net.htjs.pt4.core.BaseController;
/**
 * 模板管理
 * @author llc_sixu
 *
 */
@RestController
@RequestMapping("/template")
public class TemplateController extends BaseController{
	private static final String MSG_SUCCESS = "操作成功！";
	
	@Resource
	private ISiteService siteService;
	
	/**
	 * 删除模板文件
	 * @param siteMap
	 * @param callback
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@PostMapping(value="/fileDel", produces = "application/json;charset=UTF-8")
	public Object fileDel(@RequestParam Map<String, Object> siteMap,String callback) throws Exception {
		int code = 0;
	    String msg = MSG_SUCCESS;
	    Map<String, Object> mapModel = new HashMap<String, Object>();
		String path = (String) siteMap.get("path");
		if (path==null||"".equals(path)) {
			code = -1;
			msg = "路径错误";
		}else {
			FileUtils.deleteFile(path);
		}
		return getResult(mapModel, code, msg, callback);
	}
	
	/**
	 * 模板页面修改保存
	 * @param siteMap
	 * @param callback
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@PostMapping(value="/fileSave", produces = "application/json;charset=UTF-8")
	public Object fileSave(@RequestParam Map<String, Object> siteMap,String callback,HttpServletRequest request) throws Exception {
		int code = 0;
	    String msg = MSG_SUCCESS;
	    Map<String, Object> mapModel = new HashMap<String, Object>();
		String path = (String) siteMap.get("path");
		String content = (String) siteMap.get("content");
		String zzjgDm = UserUtils.getZzjgId(request);
		if (StringUtils.isNotBlank(zzjgDm)) {
			if (path==null||"".equals(path)) {
				code = -1;
				msg = "路径错误";
			}else {
				Site site = siteService.findByZzjgDm(zzjgDm);
				FileUtils.writeToFile(path, content, false);
				String path1 = site.getTplPath()+"/"+site.getTplSolution()+"_res";
				String path2 = site.getStaticPath()+"/"+site.getStaticDir();
				path1 = path1.replace("//", "/");
				path2 = path2.replace("//", "/");
				path = path.replace("//", "/");
				String pathTemp = path.replace(path1, path2);
				FileUtils.writeToFile(pathTemp, content, false);
			}
		}
		return getResult(mapModel, code, msg, callback);
	}
	
	/**
	 * 获取模板文件txt详情
	 * @param siteMap
	 * @param callback
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@GetMapping(value="/getFileDetail", produces = "application/json;charset=UTF-8")
	public Object getFileDetail(@RequestParam Map<String, Object> siteMap,String callback,HttpServletRequest request) throws Exception {
		int code = 0;
	    String msg = MSG_SUCCESS;
	    Map<String, Object> mapModel = new HashMap<String, Object>();
		String path = (String) siteMap.get("path");
		if (path==null||"".equals(path)) {
			code = -1;
			msg = "路径错误";
		}else{
			String fileText = FileUtils.GetFileDetailAsText(path); 
			mapModel.put("data", fileText);
		}
		return getResult(mapModel, code, msg, callback);
	}
	
	/**
	 * 获取文件属性
	 * @param siteMap
	 * @param callback
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@GetMapping(value="/getFile", produces = "application/json;charset=UTF-8")
	public Object getFile(@RequestParam Map<String, Object> siteMap,String callback,HttpServletRequest request) throws Exception {
		int code = 0;
	    String msg = MSG_SUCCESS;
	    Map<String, Object> mapModel = new HashMap<String, Object>();
		String path = (String) siteMap.get("path");
		if (path==null||"".equals(path)) {
			code = -1;
			msg = "路径错误";
		}else{
			File file = new File(path);
			String name = FileUtils.GetFileName(file);
			String size = FileUtils.GetFileSize(file);
			String updTime = FileUtils.GetFileModifiedTime(file);
			Map<String, Object> temp = new HashMap<String, Object>();
			temp.put("path", path);
			temp.put("name", name);
			temp.put("size", size);
			temp.put("updTime", updTime);
			List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
			list.add(temp);
			mapModel.put("data", list);
		}
		return getResult(mapModel, code, msg, callback);
	}
	
	/**
	 * 读取目录下文件树
	 * @param siteMap
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@GetMapping(value="/tree", produces = "application/json;charset=UTF-8")
	public void tree(@RequestParam Map<String, Object> siteMap,HttpServletRequest request,HttpServletResponse response) throws Exception {
		String zzjgDm = UserUtils.getZzjgId(request);
		if (StringUtils.isNotBlank(zzjgDm)) {
			Site site = siteService.findByZzjgDm(zzjgDm);
			String root = (String) siteMap.get("root");
			String path = site.getTplPath()+"/"+site.getTplSolution();
			if ("source".equals(root)) {
				root = path;
			}
	        response.setContentType("text/json;charset=UTF-8");
	        response.setCharacterEncoding("UTF-8");
	        PrintWriter out = response.getWriter();
	        String json = FileUtils.listfile(root);
			out.print(json);
	        out.flush();
	        out.close();
		}
	}
	
}
