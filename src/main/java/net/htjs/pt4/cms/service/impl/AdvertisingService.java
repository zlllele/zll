package net.htjs.pt4.cms.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

import net.htjs.pt4.cms.dao.AdvertisingMapper;
import net.htjs.pt4.cms.entity.Advertising;
import net.htjs.pt4.cms.service.IAdvertisingService;
import net.htjs.pt4.core.Datagrid;
import net.htjs.pt4.sys.util.UUIDUtils;

/**
 * 广告管理业务类
 * 
 * @author caojian
 * 
 */
@Service
public class AdvertisingService implements IAdvertisingService {

	@Autowired
	private AdvertisingMapper advertisingMapper;

	/**
	 * 获取广告列表
	 */
	@Override
	public Datagrid getList(String site_id, Integer page, Integer pageSize) {
		PageHelper.startPage(page, pageSize);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("site_id", site_id);
		List<Map<String, Object>> list = advertisingMapper.getList(map);
		PageInfo<Map<String, Object>> pageInfo = new PageInfo<Map<String, Object>>(list);
		for (Map<String, Object> u : list) {
			u.put("TOTAL", pageInfo.getTotal());
		}
		Datagrid datagrid = new Datagrid(pageInfo.getTotal(), pageInfo.getList());
		return datagrid;
	}

	/**
	 * 增加广告
	 */
	@Override
	public void addAdvertising(String site_id, String name, String category, String adspace_id, String ad_weight,
			String ad_blank, String click_count, String is_enabled, String ad_url, String ad_info, String fileUrl,
			String ad_img_width, String ad_img_height, String ad_color, String ad_font) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("advertising_id", UUIDUtils.getUUID());
		map.put("site_id", site_id);
		map.put("name", name);
		map.put("category", category);
		map.put("adspace_id", adspace_id);
		map.put("ad_weight", ad_weight);
		map.put("ad_blank", ad_blank);
		map.put("click_count", click_count);
		map.put("is_enabled", is_enabled);
		map.put("ad_url", ad_url);
		map.put("ad_info", ad_info);
		map.put("ad_img_url", fileUrl);
		map.put("ad_img_width", ad_img_width);
		map.put("ad_img_height", ad_img_height);
		map.put("ad_color", ad_color);
		map.put("ad_font", ad_font);
		advertisingMapper.addAdvertising(map);
	}

	/**
	 * 修改广告
	 */
	@Override
	public void updateAdvertising(String advertising_id, String name, String category, String adspace_id,
			String ad_weight, String ad_blank, String click_count, String is_enabled, String ad_url, String ad_info,
			String fileUrl, String ad_img_width, String ad_img_height, String ad_color, String ad_font) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("advertising_id", advertising_id);
		map.put("name", name);
		map.put("category", category);
		map.put("adspace_id", adspace_id);
		map.put("ad_weight", ad_weight);
		map.put("ad_blank", ad_blank);
		map.put("click_count", click_count);
		map.put("is_enabled", is_enabled);
		map.put("ad_url", ad_url);
		map.put("ad_info", ad_info);
		map.put("ad_img_url", fileUrl);
		map.put("ad_img_width", ad_img_width);
		map.put("ad_img_height", ad_img_height);
		map.put("ad_color", ad_color);
		map.put("ad_font", ad_font);
		advertisingMapper.updateAdvertising(map);
	}

	/**
	 * 删除广告
	 */
	@Override
	public void deleteAdvertising(String advertising_id) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("advertising_id", advertising_id);
		advertisingMapper.deleteAdvertising(map);
	}

	/**
	 * 以广告类型查询其下广告
	 * 
	 * @param typeId
	 * @return
	 */
	public List<Advertising> getAdverByTypeId(String typeId, String siteId) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("typeId", typeId);
		map.put("siteId", siteId);
		return advertisingMapper.getAdverByTypeId(map);
	}
}
