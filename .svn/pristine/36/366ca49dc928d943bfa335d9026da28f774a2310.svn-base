package net.htjs.pt4.cms.service.impl;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

import net.htjs.pt4.cms.dao.AttachmentMapper;
import net.htjs.pt4.cms.entity.Site;
import net.htjs.pt4.cms.service.IAttachmentService;
import net.htjs.pt4.cms.service.ISiteService;
import net.htjs.pt4.core.Datagrid;

/**
 * 附件管理实现类
 * @author caojian
 *
 */
@Service
public class AttachmentService implements IAttachmentService {

	@Autowired
	private AttachmentMapper attachmentMapper;
	@Autowired
	private ISiteService siteService;
	
	
	/**
	 * 获取站点文件夹列表
	 */
	@Override
	public Datagrid getListSite(Integer page, Integer pageSize) {
		PageHelper.startPage(page, pageSize);
		List<Map<String, Object>> list = attachmentMapper.getListSite();
		PageInfo<Map<String, Object>> pageInfo = new PageInfo<Map<String, Object>>(list);
		for (Map<String, Object> u : list) {
			u.put("TOTAL", pageInfo.getTotal());
		}
		Datagrid datagrid = new Datagrid(pageInfo.getTotal(), pageInfo.getList());
		return datagrid;
	}

	/**
	 * 获取时间文件夹列表
	 */
	@Override
	public Datagrid getListTime(Integer page, Integer pageSize, String site_id) {
		PageHelper.startPage(page, pageSize);
		Map<String, Object> map=new HashMap<String, Object>();
		map.put("site_id", site_id);
		List<Map<String, Object>> list = attachmentMapper.getListTime(map);
		PageInfo<Map<String, Object>> pageInfo = new PageInfo<Map<String, Object>>(list);
		for (Map<String, Object> u : list) {
			u.put("TOTAL", pageInfo.getTotal());
		}
		Datagrid datagrid = new Datagrid(pageInfo.getTotal(), pageInfo.getList());
		return datagrid;
	}
	
	/**
	 * 获取文件列表
	 */
	@Override
	public Datagrid getListFile(Integer page, Integer pageSize, String site_id, String file_time) {
		PageHelper.startPage(page, pageSize);
		Map<String, Object> map=new HashMap<String, Object>();
		map.put("site_id", site_id);
		map.put("file_time", file_time);
		List<Map<String, Object>> list = attachmentMapper.getListFile(map);
		PageInfo<Map<String, Object>> pageInfo = new PageInfo<Map<String, Object>>(list);
		for (Map<String, Object> u : list) {
			u.put("TOTAL", pageInfo.getTotal());
		}
		Datagrid datagrid = new Datagrid(pageInfo.getTotal(), pageInfo.getList());
		return datagrid;
	}

	/**
	 * 删除附件
	 * 首先删除hj_content_file表，然后删除附件
	 */
	@Override
	public String deleteAttachment(String content_id, String file_name, String file_path, String file_time, String site_id) {
		try {
			Map<String ,Object> map=new HashMap<String ,Object>();
			map.put("content_id", content_id);
			map.put("file_name", file_name);
			attachmentMapper.deleteAttachment(map);
			
			Site site=siteService.findById(site_id);
			String static_path=site.getStaticPath();
			String static_dir=site.getStaticDir();
			String file_ab=static_path+static_dir+file_path;
			File file=new File(file_ab);
			file.delete();
			
			Map<String, Object> map_file=new HashMap<String, Object>(); 
			map_file.put("site_id", site_id);
			map_file.put("file_time", file_time);
			List<Map<String, Object>> list_file = attachmentMapper.getListFile(map_file);
			if(list_file==null||list_file.size()==0){
				return "time";
			}else{
				return "file";
			}
		} catch (Exception e) {
			return "time";
		}
		
	}
}
