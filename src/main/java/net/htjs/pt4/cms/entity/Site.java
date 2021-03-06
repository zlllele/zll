package net.htjs.pt4.cms.entity;

import java.io.Serializable;

/**
 * 站点实体
 * 
 * @author xieshiyu
 *
 */
public class Site implements Serializable {

	private static final long serialVersionUID = 5609940158155488649L;
	// 站点ID
	private String siteId;
	// 站点名称
	private String siteName;
	// 站点简称
	private String shortName;
	// 模板存放路径
	private String tplPath;
	// 静态资源存放路径
	private String staticPath;
	// 域名
	private String domain;
	// 静态页存放目录
	private String staticDir;
	// 启用模板目录名称
	private String tplSolution;
	// 是否开启回收站，1是，0否
	private boolean recydeOn;
	// 是否根目录，1是，0否
	private boolean root;
	// 站点浏览量
	private Integer views;
	// 组织机构代码
	private String zzjgDm;
	//系统模板
	private String sysTplSolution;

	public boolean isRecydeOn() {
		return recydeOn;
	}

	public void setRecydeOn(boolean recydeOn) {
		this.recydeOn = recydeOn;
	}

	public boolean isRoot() {
		return root;
	}

	public void setRoot(boolean root) {
		this.root = root;
	}

	public String getSiteId() {
		return siteId;
	}

	public void setSiteId(String siteId) {
		this.siteId = siteId;
	}

	public String getSiteName() {
		return siteName;
	}

	public void setSiteName(String siteName) {
		this.siteName = siteName;
	}

	public String getShortName() {
		return shortName;
	}

	public void setShortName(String shortName) {
		this.shortName = shortName;
	}

	public String getTplPath() {
		return tplPath;
	}

	public void setTplPath(String tplPath) {
		this.tplPath = tplPath;
	}

	public String getStaticPath() {
		return staticPath;
	}

	public void setStaticPath(String staticPath) {
		this.staticPath = staticPath;
	}

	public String getDomain() {
		return domain;
	}

	public void setDomain(String domain) {
		this.domain = domain;
	}

	public String getStaticDir() {
		return staticDir;
	}

	public void setStaticDir(String staticDir) {
		this.staticDir = staticDir;
	}

	public String getTplSolution() {
		return tplSolution;
	}

	public void setTplSolution(String tplSolution) {
		this.tplSolution = tplSolution;
	}

	/**
	 * 获取访问站点的根目录
	 * 
	 * @return
	 */
	public String getContextPath() {
		String ctx = isRoot() ? "" : "/" + getStaticDir();
		return ctx;
	}

	/**
	 * 获取站点的首页路径
	 * 
	 * @return
	 */
	public String getIndexStaticPath() {
		StringBuilder sb = new StringBuilder(getStaticPath() + getStaticDir());
		return sb.toString();
	}

	/**
	 * 获取站点的模板路径
	 * 
	 * @return
	 */
	public String getTemplatePath() {
		StringBuilder sb = new StringBuilder(getTplPath() + getTplSolution());
		return sb.toString();
	}

	public Integer getViews() {
		return views;
	}

	public void setViews(Integer views) {
		this.views = views;
	}

	public String getZzjgDm() {
		return zzjgDm;
	}

	public void setZzjgDm(String zzjgDm) {
		this.zzjgDm = zzjgDm;
	}

	public String getSysTplSolution() {
		return sysTplSolution;
	}

	public void setSysTplSolution(String sysTplSolution) {
		this.sysTplSolution = sysTplSolution;
	}
	
}
