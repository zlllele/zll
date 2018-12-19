$(function() {
	/*--------------拖曳效果----------------
	 * 在class=top_rq上添加鼠标移动事件。
	 *原理：标记拖曳状态dragging ,坐标位置iX, iY
	 *         mousedown:fn(){dragging = true, 记录起始坐标位置，设置鼠标捕获}
	 *         mouseover:fn(){判断如果dragging = true, 则当前坐标位置 - 记录起始坐标位置，绝对定位的元素获得差值}
	 *         mouseup:fn(){dragging = false, 释放鼠标捕获，防止冒泡}
	 */
	// 单点登录打开会传进来drag_win_id
	var drag_win_id = baseTools.getUrlQueryString("drag_win_id");
	drag_win_id = drag_win_id || "main";
	if (typeof external.DragForm != "undefined") {
		var dragging = false;
		var iX, iY;
		$(".top_rq").mousedown(function(e) {
			var e = e || window.event;
			dragging = true;
			iX = e.clientX;
			iY = e.clientY;
			this.setCapture && this.setCapture();
			return false;
		});
		document.onmousemove = function(e) {
			if (dragging) {
				var e = e || window.event;
				var oX = e.clientX - iX;
				var oY = e.clientY - iY;
				external.DragForm(oX, oY, drag_win_id);
				return false;
			}
		};
		$(document).mouseup(function(e) {
			if (dragging) {
				dragging = false;
				$(".top_rq")[0].releaseCapture();
				e.cancelBubble = true;
			}
		});

		$("#ctrl_min").click(function(e) {
			external.MinForm(drag_win_id);
		});
		$("#ctrl_max").click(function(e) {
			external.MaxForm(drag_win_id);
		});
		$("#ctrl_close").click(function(e) {
			external.CloseForm(drag_win_id);
		});
		baseTools.ctrl_min = function() {
			external.MinForm(drag_win_id);
		};
		baseTools.ctrl_max = function() {
			external.MaxForm(drag_win_id);
		};
		baseTools.ctrl_close = function() {
			external.CloseForm(drag_win_id);
		};
	}

});
