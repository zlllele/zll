package net.htjs.pt4.cms.service;

import java.util.List;

import net.htjs.pt4.cms.entity.Advertising;
import net.htjs.pt4.core.Datagrid;

/**
 * 广告管理业务接口
 * 
 * @author caojian
 *
 */
public interface IAdvertisingService {

	/**
	 * 获取广告列表
	 * 
	 * @param site_id
	 * @param page
	 * @param pageSize
	 * @return
	 */
	Datagrid getList(String site_id, Integer page, Integer pageSize);

	/**
	 * 增加广告
	 * 
	 * @param site_id
	 * @param name
	 * @param category
	 * @param adspace_id
	 * @param ad_weight
	 * @param ad_blank
	 * @param click_count
	 * @param is_enabled
	 * @param ad_url
	 * @param ad_info
	 * @param fileUrl
	 * @param ad_img_width
	 * @param ad_img_height
	 * @param ad_color
	 * @param ad_font
	 */
	void addAdvertising(String site_id, String name, String category, String adspace_id, String ad_weight,
			String ad_blank, String click_count, String is_enabled, String ad_url, String ad_info, String fileUrl,
			String ad_img_width, String ad_img_height, String ad_color, String ad_font);

	/**
	 * 修改广告
	 * 
	 * @param advertising_id
	 * @param name
	 * @param category
	 * @param adspace_id
	 * @param ad_weight
	 * @param ad_blank
	 * @param click_count
	 * @param is_enabled
	 * @param ad_url
	 * @param ad_info
	 * @param fileUrl
	 * @param ad_img_width
	 * @param ad_img_height
	 * @param ad_color
	 * @param ad_font
	 */
	void updateAdvertising(String advertising_id, String name, String category, String adspace_id, String ad_weight,
			String ad_blank, String click_count, String is_enabled, String ad_url, String ad_info, String fileUrl,
			String ad_img_width, String ad_img_height, String ad_color, String ad_font);

	/**
	 * 删除广告
	 * 
	 * @param advertising_id
	 */
	void deleteAdvertising(String advertising_id);

	/**
	 * 以广告类型查询其下广告
	 * 
	 * @param typeId
	 * @return
	 */
	public List<Advertising> getAdverByTypeId(String typeId, String siteId);

}
