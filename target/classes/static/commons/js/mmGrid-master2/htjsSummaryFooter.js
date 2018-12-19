!function($) {
	var HTJSSummaryFooter = function(element, options) {
		this.$el = $(element);
		this.opts = options;
	};

	HTJSSummaryFooter.prototype = {
		// 默认计算渲染器
		calculatorRenderer : function(colDatas) {
			var sum = 0;
			for (var i = 0; i < colDatas.length; i++) {
				var n = parseFloat(colDatas[i]);
				if (isNaN(n)) {
				} else {
					sum += n;
				}
			}
			return sum;
		},
		load : function(params) {
			var $el = this.$el;
			var opts = this.opts;
			var summaryFooterCols = opts.summaryFooterCols;

			var rows = this.$mmGrid.rows();
			var item = {};
			for (var i = 0; i < summaryFooterCols.length; i++) {
				var name = summaryFooterCols[i].name;
				var calculatorRenderer = summaryFooterCols[i].calculatorRenderer;
				if (typeof calculatorRenderer != "function") {
					calculatorRenderer = this.calculatorRenderer;
				}
				var colDatas = [];
				for (var j = 0; j < rows.length; j++) {
					var row = rows[j];
					if (row)
						colDatas.push(row[name]);
				}
				item[name] = calculatorRenderer.call(this, colDatas);
			}
			// console.log(item);
			this.$mmGrid.addRow(item);
			var $lastTr = $("tr", $el).last();
			$lastTr.addClass("htjsSummaryFooter");
		},
		init : function($grid) {
			var that = this;
			this.$mmGrid = $grid;
			this.$mmGrid.on("loadSuccess", function(e, data) {
				that.load(data);
			});
		}
	};

	$.fn.htjsSummaryFooter = function() {
		if (arguments.length === 0 || typeof arguments[0] === 'object') {
			var option = arguments[0], data = this.data('htjsSummaryFooter'), options = $.extend(true, {}, $.fn.htjsSummaryFooter.defaults, option);
			if (!data) {
				data = new HTJSSummaryFooter(this[0], options);
				this.data('htjsSummaryFooter', data);
			}
			return $.extend(true, this, data);
		}
		if (typeof arguments[0] === 'string') {
			var data = this.data('htjsSummaryFooter');
			var fn = data[arguments[0]];
			if (fn) {
				var args = Array.prototype.slice.call(arguments);
				return fn.apply(data, args.slice(1));
			}
		}
	};

	$.fn.htjsSummaryFooter.defaults = {
		summaryFooterCols : []
	};

	$.fn.htjsSummaryFooter.Constructor = HTJSSummaryFooter;

}(window.jQuery);