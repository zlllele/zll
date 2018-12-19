package net.htjs.pt4.cms.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.htjs.pt4.cms.dao.ContentCountMapper;
import net.htjs.pt4.cms.entity.ContentCount;
import net.htjs.pt4.cms.service.IContentCountService;

/**
 * 内容浏览量统计业务类
 * 
 * @author xieshiyu
 *
 */
@Service
public class ContentCountService implements IContentCountService {
	@Autowired
	private ContentCountMapper countMapper;

	/**
	 * 查询并计算浏览量
	 * 
	 * @param contentId
	 * @return
	 */
	public Integer viewAndGet(String contentId, String siteId) throws Exception {
		ContentCount cc = countMapper.getCountById(contentId);
		int count = 0;
		if (cc != null) {
			count = cc.getViews() + 1;
			cc.setViews(count);
			countMapper.updateCount(cc);
		} else {
			count = 1;
			cc = new ContentCount();
			cc.setContentId(contentId);
			cc.setSiteId(siteId);
			cc.setViews(count);
			cc.setViewsDay(0);
			cc.setViewsMonth(0);
			cc.setViewsWeek(0);
			countMapper.insertCount(cc);
		}
		return count;
	}
}
