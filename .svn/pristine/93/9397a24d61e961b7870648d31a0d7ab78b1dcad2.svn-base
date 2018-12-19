package net.htjs.pt4.cms.service.impl;

import java.awt.Color;
import java.io.File;
import java.io.FileInputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import net.htjs.pt4.cms.dao.MarkMapper;
import net.htjs.pt4.cms.entity.Mark;
import net.htjs.pt4.cms.markUtil.FileRepository;
import net.htjs.pt4.cms.markUtil.ImageScale;
import net.htjs.pt4.cms.service.IMarkService;

/**
 * 水印管理实现类
 * @author caojian
 *
 */
@Service
@SuppressWarnings("unused")
public class MarkService extends BaseService<Mark> implements IMarkService {

	@Resource
	private MarkMapper markMapper;
	@Resource
	private ImageScale imageScale;
	@Resource
	private FileRepository fileRepository;

	/**
	 * 根据站点查询水印信息
	 */
	@Override
	public List<Map<String, Object>> queryMark(String site_id) {
		Map<String,Object> map=new HashMap<String,Object>();
		map.put("site_id", site_id);
		List<Map<String, Object>> list = markMapper.queryMark(map);
		return list;
	}

	/**
	 * 保存水印信息
	 */
	@Override
	public void saveMark(Mark mark) {
		Map<String ,Object> map=new HashMap<String,Object>();
		map.put("mark_alpha", mark.getMark_alpha());
		map.put("mark_color", mark.getMark_color());
		map.put("mark_content", mark.getMark_content());
		map.put("mark_offset_x", mark.getMark_offset_x());
		map.put("mark_offset_y", mark.getMark_offset_y());
		map.put("mark_on", mark.getMark_on());
		map.put("mark_position", mark.getMark_position());
		map.put("mark_size",mark.getMark_size());
		map.put("site_id", mark.getSite_id());
		List<Map<String, Object>> list = markMapper.queryMark(map);
		if(list!=null&&list.size()>0){
			markMapper.updateMark(map);
		}else{
			markMapper.saveMark(map);	
		}
	}
	
	/**
	 * 为图片添加水印的方法
	 */
	@Override
	public Map<String ,Object> createMark(String site_id,String absolutePath){
		Map<String, Object> map_result=new HashMap<String, Object>();
		String code="1";
		String msg="水印图片生成成功";
		String url=absolutePath;
		
		Map<String,Object> map_mark=new HashMap<String,Object>();
		map_mark.put("site_id", site_id);
		List<Map<String, Object>> list_mark = markMapper.queryMark(map_mark);
		if(list_mark==null||list_mark.size()==0){
			code="-1";
			msg="该站点未设置水印";
			url="";
		}else{
			map_mark=list_mark.get(0);
			String mark_on=map_mark.get("mark_on")+"";
			if("false".equals(mark_on)){
				code="-2";
				msg="该站点禁用水印";
				url="";
			}else{
				Mark conf=new Mark();
				conf.setMark_alpha(Integer.parseInt(map_mark.get("mark_alpha")+""));
				conf.setMark_color(map_mark.get("mark_color")+"");
				conf.setMark_content(map_mark.get("mark_content")+"");
				conf.setMark_offset_x(Integer.parseInt(map_mark.get("mark_offset_x")+""));
				conf.setMark_offset_y(Integer.parseInt(map_mark.get("mark_offset_y")+""));
				conf.setMark_on((map_mark.get("mark_on")+"").equals("false")?0:1);
				conf.setMark_position(Integer.parseInt(map_mark.get("mark_position")+""));
				conf.setMark_size(Integer.parseInt(map_mark.get("mark_size")+""));
				conf.setSite_id(map_mark.get("site_id")+"");
				try {
					File file=new File(absolutePath);
					//读入 文件   
			        FileInputStream in_file = new FileInputStream(file);
					
			        //获得文件的名称
			        String separator = File.separator;
			        int position_name=absolutePath.lastIndexOf(separator);
			        String file_name=absolutePath.substring(position_name+1);
			        //获得后缀名
			        String ext=file_name.substring(file_name.lastIndexOf(".")+1);
			        //转 MultipartFile  
			        MultipartFile multi = new MockMultipartFile(file_name, in_file);  
			        
					File tempFile = mark(multi, conf, absolutePath,ext);
					//fileUrl = fileRepository.storeByExt(absolutePath , ext, tempFile);
					//tempFile.delete();
				} catch (Exception e) {
					code="-3";
					msg="水印生成出现异常："+e.getMessage();
					url="";
				}
			}
		}
		map_result.put("code", code);
		map_result.put("msg", msg);
		map_result.put("url", url);
		return map_result;
	}
	private File mark(MultipartFile file, Mark conf, String absolutePath,String ext) throws Exception {
		File tempFile = new File(absolutePath);
		file.transferTo(tempFile);
		imageScale.imageMark(tempFile, tempFile, /*conf.getMinWidth()*/10, /*conf.getMinHeight()*/10, 
				conf.getMark_position(), conf.getMark_offset_x(), conf.getMark_offset_y(), 
				conf.getMark_content(), Color.decode(conf.getMark_color()), conf.getMark_size(), conf.getMark_alpha(),ext);
		return tempFile;
	}

}
