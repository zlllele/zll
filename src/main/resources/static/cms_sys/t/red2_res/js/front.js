Cms = {};
Cms.url = "http://localhost:8080";
/**
 * 浏览次数
 */
Cms.viewCount = function(contentId,siteId) {
	var url = Cms.url + "/view/content_view.do";
	$.getJSON(url, {
		"contentId" : contentId,
		"siteId" : siteId
	}, function(data) {
		if (data.length > 0) {
			$("#views").text(data[0]);
		}
	});
}
/**
 * 站点流量统计
 */
Cms.siteCount = function(siteId) {
	var url = Cms.url + "/view/site_view.do";
	$.getJSON(url, {
		siteId : siteId
	}, function(data) {
		if (data.length > 0) {
			$("#siteViews").text(data[0]);
		}
	});
}
/**
 * 统计下载次数
 */
Cms.download = function(contentId, num) {
	var url = Cms.url + "/view/file_download.do";
	if(num > 0){
		$.getJSON(url, {
			contentId : contentId
		});
	}
}
