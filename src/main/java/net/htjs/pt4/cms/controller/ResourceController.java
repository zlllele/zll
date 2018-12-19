package net.htjs.pt4.cms.controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import net.htjs.pt4.cms.entity.Site;
import net.htjs.pt4.cms.service.ISiteService;
import net.htjs.pt4.cms.utils.FileUtils;
import net.htjs.pt4.cms.utils.UserUtils;
import net.htjs.pt4.core.BaseController;
/**
 * 资源管理
 * @author llc_sixu
 *
 */
@RestController
@RequestMapping("/resource")
public class ResourceController extends BaseController{
	
	private final Logger logger = LoggerFactory.getLogger(ResourceController.class);
	private static final String MSG_SUCCESS = "操作成功！";
	
	@Resource
	private ISiteService siteService;
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
//			String path = site.getStaticPath()+"/"+site.getTplSolution()+"_res/"+site.getStaticDir()+"/";
			String path = site.getTplPath()+"/"+site.getTplSolution()+"_res/";
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
	
	/**
	 * 附件上传
	 */
	@SuppressWarnings("finally")
	@RequestMapping(value = "/uploadfile")
	public Object uploadfile(String callback,
			@RequestParam Map<String, String> contentTypeMap,
			@RequestParam(value = "upload") MultipartFile file,
			HttpServletRequest request, ModelMap model) {
		String filename = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("\\") + 1);;
		String filepath = contentTypeMap.get("path");
		String type = contentTypeMap.get("type");
		byte[] bytes;
		try {
			String zzjgDm = UserUtils.getZzjgId(request);
			if (StringUtils.isNotBlank(zzjgDm)) {
				Site site = siteService.findByZzjgDm(zzjgDm);
				String path = site.getTplPath()+"/"+site.getTplSolution()+"_res";
				if (filepath.indexOf("source")>=0) {
					filepath = filepath.replace("source", path);
				}
				bytes = file.getBytes();
				if ("template".equals(type)) {
					BufferedOutputStream tmpStream = new BufferedOutputStream(new FileOutputStream(new File(filepath.replace("_res", "")+"/"+filename)));
					tmpStream.write(bytes);
					tmpStream.close();
				} else if ("resource".equals(type)) {
					BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new File(filepath+"/"+filename)));
					stream.write(bytes);
					stream.close();
					String path1 = site.getTplPath()+"/"+site.getTplSolution()+"_res";
					String path2 = site.getStaticPath()+"/"+site.getStaticDir();
					path1 = path1.replace("//", "/");
					path2 = path2.replace("//", "/");
					filepath = filepath.replace("//", "/");
					String pathTemp = filepath.replace(path1, path2);
					BufferedOutputStream stream2 = new BufferedOutputStream(new FileOutputStream(new File(pathTemp+"/"+filename)));
					stream2.write(bytes);
					stream2.close();
				}
				model.put("filename", filename);
				model.put("code", 1);
			}
		} catch (Exception e) {
			logger.error("上传失败{}", e.getMessage());
			model.put("code", -2);
			model.put("msg", "上传失败,服务异常,请重新上传!");
		} finally {
			return "iframe_aupload";
		}
	}
	
	/**
	 * 新增文件夹
	 */
	@RequestMapping(value = "/addDir")
	public Object addDir(String callback,
			@RequestParam Map<String, String> contentTypeMap,
			HttpServletRequest request, ModelMap model) {
		int code;
		String msg = MSG_SUCCESS;
		String filepath = contentTypeMap.get("path");
		String type = contentTypeMap.get("type");
		String dirName = contentTypeMap.get("dirName");
		try{
			String zzjgDm = UserUtils.getZzjgId(request);
			Site site = siteService.findByZzjgDm(zzjgDm);
			if (StringUtils.isNotEmpty(type)&&"1".equals(type)) {
				//模板
				String path = site.getTplPath()+"/"+site.getTplSolution();
				if (filepath.indexOf("source")>=0) {
					filepath = filepath.replace("source", path);
				}
				File descDir = new File(filepath+"/"+dirName);
				if (descDir.mkdirs()) {
					code = 0;
				}else{
					code = -2;
					msg = "新增失败";
				}
			} else {
				//资源
				String path = site.getStaticPath()+"/"+site.getStaticDir();
				if (filepath.indexOf("source")>=0) {
					filepath = filepath.replace("source", path);
				}
				File descDir = new File(filepath+"/"+dirName);
				String path1 = site.getTplPath()+"/"+site.getTplSolution()+"_res";
				path1 = path1.replace("//", "/");
				path = path.replace("//", "/");
				filepath = filepath.replace("//", "/");
				String pathTemp = filepath+"/"+dirName;
				pathTemp = pathTemp.replace(path1, path);
				File descDir2 = new File(filepath+"/"+dirName);
				if (descDir.mkdirs()&&descDir2.mkdirs()) {
					code = 0;
				}else{
					code = -2;
					msg = "新增失败";
				}
			}
		} catch (Exception e) {
			logger.error("新增失败{}", e.getMessage());
			code = -2;
			msg = "新增失败";
		} 
		return getResult(model, code, msg, callback);
	}
	
	@GetMapping(value="/getImg", produces = "application/json;charset=UTF-8")
	public Object getImg(String callback,
			@RequestParam Map<String, String> contentTypeMap,
			HttpServletRequest request, ModelMap model) {
		int code = 9;
		String msg = MSG_SUCCESS;
		Map<String, Object> mapModel = new HashMap<String, Object>();
		String filepath = contentTypeMap.get("path");
		filepath = filepath.replace("//", "/");
		try {
			String zzjgDm = UserUtils.getZzjgId(request);
			Site site = siteService.findByZzjgDm(zzjgDm);
			filepath = filepath.replace(site.getTplPath(), "");
			filepath = filepath.replace(site.getTplSolution()+"_res/", ""); //  /images/01.gif
			filepath = site.getDomain() + "/" + site.getStaticDir() + filepath;
			mapModel.put("data", filepath);
		} catch (Exception e) {
			code = -1;
			e.printStackTrace();
		}
		return getResult(mapModel, code, msg, callback);
	}
}
