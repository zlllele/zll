package net.htjs.pt4.cms.service.impl;

import net.htjs.pt4.cms.dao.ContentTypeMapper;
import net.htjs.pt4.cms.service.IContentTypeService;
import net.htjs.pt4.core.Datagrid;
import net.htjs.pt4.core.entity.DaoException;
import net.htjs.pt4.core.entity.SaveException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;


import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 内容类型业务处理类
 * 
 * @author wupeng
 *
 */
@Service
@Transactional
public class ContentTypeService implements IContentTypeService {

	private final Logger logger = LoggerFactory.getLogger(ContentTypeService.class);

	@Resource
	private ContentTypeMapper contentTypeMapper;

	/**
	 * 查询内容类型
	 * 
	 * @param map,pageNum,pageSize
	 * @return Datagrid
	 */
	@Override
	public Datagrid selectContentType(Map<String,Object> map, int pageNum, int pageSize) throws Exception {
		PageHelper.startPage(pageNum, pageSize);
		List<Map<String,Object>> list = contentTypeMapper.selectContentType(map);
		PageInfo<Map<String,Object>> pageInfo = new PageInfo<Map<String, Object>>(list);
		for (Map<String,Object> u : list) {
			u.put("TOTAL", pageInfo.getTotal());
		}

		Datagrid datagrid = new Datagrid(pageInfo.getTotal(), pageInfo.getList());

		return datagrid;
	}

	/**
	 * 插入内容类型
	 * 
	 * @param map
	 * @return int
	 */
	@Override
	public int insertContentType(Map<String,Object> map) throws SaveException {
		try {
			contentTypeMapper.insertContentType(map);
		} catch (DaoException e) {
			logger.error("添加出错", e);
			throw new SaveException(e);
		}
		return 1;
	}

	/**
	 * 查询指定id内容类型
	 * 
	 * @param id
	 * @return Map
	 */
	@Override
	public Map<String,Object> findById(String id) throws Exception {
		Map<String, Object> map = contentTypeMapper.selectContentTypeById(id);
		return map;
	}

	/**
	 * 查询内容类型下拉列表
	 * 
	 * @param map
	 * @return Map
	 */
	@Override
	public Map<String,Object> queryNames(Map<String,Object> map) throws Exception {
		Map<String, Object> mapres = contentTypeMapper.queryNames(map);
		return mapres;
	}

	/**
	 * 更新内容类型
	 * 
	 * @param map
	 * @return int
	 */
	@Override
	public int updateContentTypeById(Map<String,Object> map) throws SaveException {
		try {
			contentTypeMapper.updateContentTypeById(map);
		} catch (DaoException e) {
			logger.error("添加出错", e);
			throw new SaveException(e);
		}
		return 1;
	}

	/**
	 * 删除内容类型
	 * 
	 * @param map
	 * @return int
	 */
	@Override
	public int deleteById(String id) throws Exception {
		try {
			contentTypeMapper.deleteById(id);
		} catch (DaoException e) {
			logger.error("删除出错", e);
			throw new SaveException(e);
		}
		return 1;
	}

}


