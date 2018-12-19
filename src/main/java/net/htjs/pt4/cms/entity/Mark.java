package net.htjs.pt4.cms.entity;

/**
 * 水印实体类，对应表hj_mark
 * @author caojian
 *
 */
public class Mark {
	
	private String site_id;
	private Integer mark_on;
	private String mark_content;
	private Integer mark_size;
	private String mark_color;
	private Integer mark_alpha;
	private Integer mark_position;
	private Integer mark_offset_x;
	private Integer mark_offset_y;
	public String getSite_id() {
		return site_id;
	}
	public void setSite_id(String site_id) {
		this.site_id = site_id;
	}
	public Integer getMark_on() {
		return mark_on;
	}
	public void setMark_on(Integer mark_on) {
		this.mark_on = mark_on;
	}
	public String getMark_content() {
		return mark_content;
	}
	public void setMark_content(String mark_content) {
		this.mark_content = mark_content;
	}
	public Integer getMark_size() {
		return mark_size;
	}
	public void setMark_size(Integer mark_size) {
		this.mark_size = mark_size;
	}
	public String getMark_color() {
		return mark_color;
	}
	public void setMark_color(String mark_color) {
		this.mark_color = mark_color;
	}
	public Integer getMark_alpha() {
		return mark_alpha;
	}
	public void setMark_alpha(Integer mark_alpha) {
		this.mark_alpha = mark_alpha;
	}
	public Integer getMark_position() {
		return mark_position;
	}
	public void setMark_position(Integer mark_position) {
		this.mark_position = mark_position;
	}
	public Integer getMark_offset_x() {
		return mark_offset_x;
	}
	public void setMark_offset_x(Integer mark_offset_x) {
		this.mark_offset_x = mark_offset_x;
	}
	public Integer getMark_offset_y() {
		return mark_offset_y;
	}
	public void setMark_offset_y(Integer mark_offset_y) {
		this.mark_offset_y = mark_offset_y;
	}

	

}