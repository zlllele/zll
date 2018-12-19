package net.htjs.pt4.cms.service;

import java.util.List;
import java.util.Map;

import net.htjs.pt4.cms.entity.Mark;

/**
 * 水印管理的接口类
 * @author caojian
 *
 */
public interface IMarkService extends IBaseService<Mark> {

	/**
	 * 根据站点查询水印信息
	 * @param site_id
	 * @return
	 */
	public List<Map<String, Object>> queryMark(String site_id);

	/**
	 * 保存水印信息
	 * @param mark
	 */
	public void saveMark(Mark mark);

	/**
	 * 生成带水印的图片
	 * @param site_id
	 * @param absolutePath
	 * @return
	 */
	public Map<String, Object> createMark(String site_id,String absolutePath);
}
