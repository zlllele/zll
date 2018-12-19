package net.htjs.pt4.cms.entity;

import java.io.Serializable;

/**
 * 友情链接类别实体
 * 
 * @author xieshiyu
 *
 */
public class FriendLinkType implements Serializable {

	private static final long serialVersionUID = 9181523569682934863L;

	// 友情链接分类ID
	private String friendLinkTypeId;

	// 站点ID
	private String siteId;

	// 友情链接类别名称
	private String name;

	// 排序
	private Integer priority;

	public String getFriendLinkTypeId() {
		return friendLinkTypeId;
	}

	public void setFriendLinkTypeId(String friendLinkTypeId) {
		this.friendLinkTypeId = friendLinkTypeId;
	}

	public String getSiteId() {
		return siteId;
	}

	public void setSiteId(String siteId) {
		this.siteId = siteId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getPriority() {
		return priority;
	}

	public void setPriority(Integer priority) {
		this.priority = priority;
	}
}
