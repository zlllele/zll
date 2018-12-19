package net.htjs.pt4.cms.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FilenameUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import net.htjs.pt4.cms.utils.FileUtils;
import net.htjs.pt4.cms.utils.UserUtils;
import net.htjs.pt4.cms.utils.fck.ResourceType;
import net.htjs.pt4.cms.utils.fck.UploadResponse;
import net.htjs.pt4.core.BaseController;

/**
 * @author xieshiyu
 */
@Controller
public class UserController extends BaseController {

	private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

	@RequestMapping(value = "/user/list.do")
	public String list(Integer uploadNum, @RequestParam(value = "uploadFile", required = false) MultipartFile file,
			HttpServletRequest request, ModelMap model) throws IOException {
		Map<String, Object> user = UserUtils.getUserInfo(request);
		System.out.println(user);
		// 判断签章证书是否为空
		if (file != null && !file.isEmpty()) {
			String path = "C:\\software\\tomcat7\\webapps\\www\\u\\201803";
			// 转存文件
			FileUtils.createDirectory(path);
			file.transferTo(new File(path + "\\111.jpg"));
			model.put("uploadPath", "/www/u/201803/111.jpg");
			model.put("uploadNum", uploadNum);
		}
		return "iframe_upload";
	}

	@RequestMapping(value = "/fck/upload.do", method = RequestMethod.POST)
	public void upload(@RequestParam(value = "Command", required = false) String commandStr,
			@RequestParam(value = "Type", required = false) String typeStr,
			@RequestParam(value = "CurrentFolder", required = false) String currentFolderStr,
			@RequestParam(value = "mark", required = false) Boolean mark, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		System.out.println("fck upload.........");
		LOGGER.debug("Entering Dispatcher#doPost");
		responseInit(response);
		if (isEmpty(commandStr) && isEmpty(currentFolderStr)) {
			commandStr = "QuickUpload";
			currentFolderStr = "/";
			if (isEmpty(typeStr)) {
				typeStr = "File";
			}
		}
		if (currentFolderStr != null && !currentFolderStr.startsWith("/")) {
			currentFolderStr = "/".concat(currentFolderStr);
		}
		LOGGER.debug("Parameter Command: {}", commandStr);
		LOGGER.debug("Parameter Type: {}", typeStr);
		LOGGER.debug("Parameter CurrentFolder: {}", currentFolderStr);

		UploadResponse ur = doUpload(request, typeStr, currentFolderStr, mark);

		PrintWriter out = response.getWriter();
		out.print(ur);
		out.flush();
		out.close();
	}

	private UploadResponse doUpload(HttpServletRequest request, String typeStr, String currentFolderStr, Boolean mark)
			throws Exception {
		try {
			MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
			// We upload just one file at the same time
			MultipartFile uplFile = multipartRequest.getFileMap().entrySet().iterator().next().getValue();
			// Some browsers transfer the entire source path not just the
			// filename
			String filename = FilenameUtils.getName(uplFile.getOriginalFilename());
			LOGGER.debug("Parameter NewFile: {}", filename);
			String ext = FilenameUtils.getExtension(filename);

			if (uplFile != null && !uplFile.isEmpty()) {
				String path = "C:\\software\\tomcat7\\webapps\\www\\u\\201803";
				// 转存文件
				FileUtils.createDirectory(path);
				uplFile.transferTo(new File(path + "\\111.jpg"));
			}

			return UploadResponse.getOK(request, "/www/u/201803/111.jpg");
		} catch (IOException e) {
			return null;
		}
	}

	private void responseInit(HttpServletResponse response) {
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html");
		response.setHeader("Cache-Control", "no-cache");
	}

	public boolean isEmpty(final String str) {
		return str == null || str.length() == 0;
	}

}
