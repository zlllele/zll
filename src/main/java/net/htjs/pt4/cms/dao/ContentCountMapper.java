package net.htjs.pt4.cms.dao;

import net.htjs.pt4.cms.entity.ContentCount;

/**
 * 内容浏览量统计
 * 
 * @author xieshiyu
 *
 */
public interface ContentCountMapper {
	/**
	 * 查询并计算浏览量
	 * 
	 * @param contentId
	 * @return
	 */
	public ContentCount getCountById(String contentId);

	/**
	 * 保存
	 * 
	 * @param contentCount
	 */
	public void insertCount(ContentCount contentCount);

	/**
	 * 更新
	 * 
	 * @param contentCount
	 */
	public void updateCount(ContentCount contentCount);
}