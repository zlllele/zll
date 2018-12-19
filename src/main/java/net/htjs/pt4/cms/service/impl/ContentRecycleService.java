package net.htjs.pt4.cms.service.impl;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

import net.htjs.pt4.cms.dao.ContentRecycleMapper;
import net.htjs.pt4.cms.service.IContentRecycleService;
import net.htjs.pt4.core.Datagrid;

/**
 * 回收站操作实现类
 * @author caojian
 *
 */
@Service
public class ContentRecycleService implements IContentRecycleService {

	@Autowired
	private ContentRecycleMapper contentRecycleMapper;

	/**
	 * 查询回收站列表
	 */
	@Override
	public Datagrid getList(String site_id,String title, String user_name, String sequencing, Integer page, Integer pageSize) {
		PageHelper.startPage(page, pageSize);
		Map<String ,Object> map=new HashMap<String ,Object>();
		map.put("site_id", site_id);
		map.put("title", title);
		map.put("user_name", user_name);
		map.put("sequencing", sequencing);
		List<Map<String, Object>> list = contentRecycleMapper.getList(map);
		PageInfo<Map<String, Object>> pageInfo = new PageInfo<Map<String, Object>>(list);
		for (Map<String, Object> u : list) {
			u.put("TOTAL", pageInfo.getTotal());
		}
		Datagrid datagrid = new Datagrid(pageInfo.getTotal(), pageInfo.getList());
		return datagrid;
	}

	/**
	 * 删除回收站内容
	 * 首先删除hj_content，然后删除图片、视频
	 */
	@Override
	public void deleteContent(String content_id, String media_path, String image_path) {
		//删除hj_content表
		contentRecycleMapper.deleteContent(content_id);
		//删除文件
		File file_media=new File(media_path);
		file_media.delete();
		File file_image=new File(image_path);
		file_image.delete();
	}

	/**
	 * 还原回收站
	 */
	@Override
	public void restoreContent(String content_id) {
		contentRecycleMapper.restoreContent(content_id);
	}
	
}
