package net.htjs.pt4.cms.controller;


import net.htjs.pt4.cms.service.IContentService;
import net.htjs.pt4.cms.service.ISiteService;
import net.htjs.pt4.cms.utils.UserUtils;
import net.htjs.pt4.core.BaseController;
import net.htjs.pt4.sys.util.UUIDUtils;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartException;
import org.springframework.web.multipart.MultipartFile;


import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 内容上传管理控制类
 * 
 * @author wupeng
 *
 */
@Controller
@RequestMapping("/contentupload")
public class ContentUploadController extends BaseController {

	private final Logger logger = LoggerFactory.getLogger(ContentUploadController.class);
	private static final String MSG_SUCCESS = "操作成功！";

	@Resource
	private IContentService contentService;

	@Resource
	private ISiteService siteService;

	private String attachmentSavePath;

	/**
	 * 附件上传
	 * 
	 * @param id,page,pageSize,contentTypeMap,callback，request
	 * @return Object
	 */
	@SuppressWarnings("finally")
	@RequestMapping(value = "/uploadfile.do")
	public Object uploadfile(@RequestParam(defaultValue = "0") Integer page,
			@RequestParam(defaultValue = "0") Integer pageSize, String callback,
			@RequestParam Map<String, String> contentTypeMap, HttpServletRequest request,
			@RequestParam(value = "upload") MultipartFile file, ModelMap model) {

		String msg = MSG_SUCCESS;
		String filename;
		String filepath;
		
		BufferedOutputStream stream = null;
		
		try {
			attachmentSavePath = siteService.findById(siteService.findByZzjgDm(UserUtils.getZzjgId(request)).getSiteId()).getStaticPath() + siteService.findById(siteService.findByZzjgDm(UserUtils.getZzjgId(request)).getSiteId()).getStaticDir()
					+ "/u/" + new SimpleDateFormat("yyyyMM").format(new Date()) + "/";
			if (!new SimpleDateFormat("yyyyMM/").format(new Date()).equals(
					attachmentSavePath.substring(attachmentSavePath.length() - 7, attachmentSavePath.length() - 1))) {
				attachmentSavePath = attachmentSavePath.substring(0, attachmentSavePath.length() - 7)
						+ new SimpleDateFormat("yyyyMM").format(new Date()) + "/";
			}
			File f = new File(attachmentSavePath);
			if (!f.exists()) {
				f.mkdirs();
			}
			filename = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("\\") + 1);
			filepath = attachmentSavePath + UUIDUtils.getUUID() + filename.substring(filename.lastIndexOf("."));
			byte[] bytes = file.getBytes();
			stream = new BufferedOutputStream(new FileOutputStream(new File(filepath)));
			stream.write(bytes);
			model.put("filename", filename);
			model.put("filepath", filepath);
			model.put("name", (String) contentTypeMap.get("name"));
			model.put("path", (String) contentTypeMap.get("path"));
			model.put("code", 1); 

		}catch (MultipartException e) {
			msg = e.getMessage();
			logger.error(msg);
			model.put("code", -1);
			model.put("msg", "上传失败,文件大小超过100M,请重新上传!");
		} catch (Exception e) {
			msg = e.getMessage();
			logger.error(msg);
			model.put("code", -2);
			model.put("msg", "上传失败,服务异常,请重新上传!");
		} finally {
			try {
				if(stream!=null){
					stream.close();
				}
			} catch (IOException e) {
				logger.error(e.getMessage());
			}
			return "iframe_aupload";
		}

	}

	/**
	 * 媒体视频上传
	 * 
	 * @param id,page,pageSize,contentTypeMap,callback，request
	 * @return Object
	 */
	@SuppressWarnings("finally")
	@RequestMapping(value = "/uploadfile2.do")
	public Object uploadfile2(@RequestParam(defaultValue = "0") Integer page,
			@RequestParam(defaultValue = "0") Integer pageSize, String callback,
			@RequestParam Map<String, String> contentTypeMap, HttpServletRequest request,
			@RequestParam(value = "mupload") MultipartFile file, ModelMap model) {

		String msg = MSG_SUCCESS;
		String filename;
		String filepath;

		BufferedOutputStream stream = null;
		
		try {
			attachmentSavePath = siteService.findById(siteService.findByZzjgDm(UserUtils.getZzjgId(request)).getSiteId()).getStaticPath() + siteService.findById(siteService.findByZzjgDm(UserUtils.getZzjgId(request)).getSiteId()).getStaticDir()
					+ "/u/" + new SimpleDateFormat("yyyyMM").format(new Date()) + "/";
			if (!new SimpleDateFormat("yyyyMM/").format(new Date()).equals(
					attachmentSavePath.substring(attachmentSavePath.length() - 7, attachmentSavePath.length() - 1))) {
				attachmentSavePath = attachmentSavePath.substring(0, attachmentSavePath.length() - 7)
						+ new SimpleDateFormat("yyyyMM").format(new Date()) + "/";
			}
			File f = new File(attachmentSavePath);
			if (!f.exists()) {
				f.mkdirs();
			}
			filename = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("\\") + 1);
			filepath = attachmentSavePath + UUIDUtils.getUUID() + filename.substring(filename.lastIndexOf("."));
			byte[] bytes = file.getBytes();
			stream = new BufferedOutputStream(new FileOutputStream(new File(filepath)));
			stream.write(bytes);
			model.put("filename", filename);
			model.put("filepath", filepath);
			model.put("name", (String) contentTypeMap.get("name"));
			model.put("path", (String) contentTypeMap.get("path"));
			model.put("code", 1);

		} catch (MultipartException e) {
			msg = e.getMessage();
			logger.error(msg);
			model.put("code", -1);
			model.put("msg", "上传失败,文件大小超过100M,请重新上传!");
		} catch (Exception e) {
			msg = e.getMessage();
			logger.error(msg);
			model.put("code", -2);
			model.put("msg", "上传失败,服务异常,请重新上传!");
		} finally {
			try {
				if(stream!=null){
					stream.close();
				}
			} catch (IOException e) {
				logger.error(e.getMessage());
			}
			return "iframe_aupload";
		}

	}

	/**
	 * 类型图上传
	 * 
	 * @param id,page,pageSize,contentTypeMap,callback，request
	 * @return Object
	 */
	@SuppressWarnings("finally")
	@RequestMapping(value = "/uploadfile3.do")
	public Object uploadfile3(@RequestParam(defaultValue = "0") Integer page,
			@RequestParam(defaultValue = "0") Integer pageSize, String callback,
			@RequestParam Map<String, String> contentTypeMap, HttpServletRequest request,
			@RequestParam(value = "tupload") MultipartFile file, ModelMap model) {

		String msg = MSG_SUCCESS;
		String filename;
		String filepath;

		BufferedOutputStream stream = null;
		
		try {
			attachmentSavePath = siteService.findById(siteService.findByZzjgDm(UserUtils.getZzjgId(request)).getSiteId()).getStaticPath() + siteService.findById(siteService.findByZzjgDm(UserUtils.getZzjgId(request)).getSiteId()).getStaticDir()
					+ "/u/" + new SimpleDateFormat("yyyyMM").format(new Date()) + "/";
			if (!new SimpleDateFormat("yyyyMM/").format(new Date()).equals(
					attachmentSavePath.substring(attachmentSavePath.length() - 7, attachmentSavePath.length() - 1))) {
				attachmentSavePath = attachmentSavePath.substring(0, attachmentSavePath.length() - 7)
						+ new SimpleDateFormat("yyyyMM").format(new Date()) + "/";
			}
			File f = new File(attachmentSavePath);
			if (!f.exists()) {
				f.mkdirs();
			}
			filename = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("\\") + 1);
			filepath = attachmentSavePath + UUIDUtils.getUUID() + filename.substring(filename.lastIndexOf("."));
			byte[] bytes = file.getBytes();
			stream = new BufferedOutputStream(new FileOutputStream(new File(filepath)));
			stream.write(bytes);
			model.put("filename", filename);
			model.put("filepath", filepath);
			model.put("name", (String) contentTypeMap.get("name"));
			model.put("path", (String) contentTypeMap.get("path"));
			model.put("code", 1);

		} catch (MultipartException e) {
			msg = e.getMessage();
			logger.error(msg);
			model.put("code", -1);
			model.put("msg", "上传失败,文件大小超过100M,请重新上传!");
		} catch (Exception e) {
			msg = e.getMessage();
			logger.error(msg);
			model.put("code", -2);
			model.put("msg", "上传失败,服务异常,请重新上传!");
		} finally {
			try {
				if(stream!=null){
					stream.close();
				}
			} catch (IOException e) {
				logger.error(e.getMessage());
			}
			return "iframe_aupload";
		}

		

	}

}