!function($) {
	var HTJSPaginator = function(element, options) {
		this.$el = $(element);
		this.opts = options;
	};

	HTJSPaginator.prototype = {
		_initLayout : function() {
			var that = this;
			var $el = this.$el;
			var opts = this.opts;

			$el.addClass("mmPaginator");
			var pgHtmls = [ '<div class="totalCountLabel"></div>', '<ul class="pageList"></ul>', '<div class="limit"><select></select></div>' ];
			$el.append($(pgHtmls.join('')));

			this.$totalCountLabel = $el.find('.totalCountLabel');
			this.$pageList = $el.find('.pageList');
			this.$limitList = $el.find('.limit select');

			var $limitList = this.$limitList;
			$.each(opts.limitList, function() {
				var $option = $('<option></option>').prop('value', this).text(that.formatString(opts.limitLabel, [ this ]));
				$limitList.append($option);
			});

			$limitList.on('change', function() {
				// 清空页码标志
				$el.data('page', 1);
				that.reload();
			});

			// 拦截查询按钮，查询操作执行前清空页码标志
			var searchB = $("#" + opts.searchButtonId);
			if (searchB) {
				var searchB_onclick = searchB.attr("onclick");
				searchB.attr("onclick", null);
				searchB.click(function() {
					$el.data('page', 1);
					eval(searchB_onclick);
				});
			}
		},
		_plain : function(page, totalCount, limit) {
			var that = this;
			var $el = this.$el;
			var $pageList = this.$pageList;

			var totalPage = totalCount % limit === 0 ? parseInt(totalCount / limit) : parseInt(totalCount / limit) + 1;
			totalPage = totalPage ? totalPage : 0;
			if (totalPage === 0) {
				page = 1;
			} else if (page > totalPage) {
				page = totalPage;
			} else if (page < 1 && totalPage != 0) {
				page = 1;
			}

			var $prev = $('<li class="prev"><a>«</a></li>');
			if (page <= 1) {
				$prev.addClass('disable');
			} else {
				$prev.find('a').on('click', function() {
					$el.data('page', page - 1);
					that.reload();
				});
			}
			$pageList.append($prev);

			var list = [ 1 ];
			if (page > 4) {
				list.push('...');
			}
			for (var i = 0; i < 5; i++) {
				var no = page - 2 + i;
				if (no > 1 && no <= totalPage - 1) {
					list.push(no);
				}
			}
			if (page + 1 < totalPage - 1) {
				list.push('...');
			}
			if (totalPage > 1) {
				list.push(totalPage);
			}
			$.each(list, function(index, item) {
				var $li = $('<li><a></a></li>');
				if (item === '...') {
					$li.addClass('').html('...');
				} else if (item === page) {
					$li.addClass('active').find('a').text(item);
				} else {
					$li.find('a').text(item).prop('title', '第' + item + '页').on('click', function(e) {
						$el.data('page', item);
						that.reload();
					});
				}
				$pageList.append($li);
			});

			var $next = $('<li class="next"><a title="下一页">»</a></li>');
			if (page >= totalPage) {
				$next.addClass('disable');
			} else {
				$next.find('a').on('click', function() {
					$el.data('page', page + 1);
					that.reload();
				});
			}
			$pageList.append($next);
		},
		_search : function(page, totalCount, limit) {
		},
		reload : function(params) {
			var opts = this.opts;
			if (opts.loadFunction) {
				for (var i = 0; i < opts.loadFunction.length; i++) {
					opts.loadFunction[i]();
				}
			}
		},
		load : function(params) {
			var $el = this.$el;
			var $limitList = this.$limitList;
			var opts = this.opts;

			var page = params[opts.pageParamName];
			if (page === undefined) {
				page = $el.data('page');
			}
			$el.data('page', page);

			var totalCount = params[opts.totalCountName];
			if (totalCount === undefined) {
				totalCount = 0;
			}
			$el.data('totalCount', totalCount);

			var limit = params[opts.limitParamName];
			if (limit === undefined) {
				limit = $limitList.val();
			}
			this.$limitList.val(limit);

			this.$totalCountLabel.html(this.formatString(opts.totalCountLabel, [ totalCount ]));
			this.$pageList.empty();

			this._plain(page, totalCount, this.$limitList.val());
		},
		formatString : function(text, args) {
			return text.replace(/{(\d+)}/g, function(match, number) {
				return typeof args[number] != 'undefined' ? args[number] : match;
			});
		},
		params : function() {
			var opts = this.opts;
			var $el = this.$el;
			var $limitList = this.$limitList;

			var params = {};
			params[opts.pageParamName] = $el.data('page');
			params[opts.limitParamName] = $limitList.val();
			return params;
		},
		init : function($grid) {
			var that = this;
			var opts = that.opts;
			this.$mmGrid = $grid;
			this._initLayout();
			this.$mmGrid.on('loadSuccess', function(e, data) {
				if (data === undefined) {
					data = {};
				}
				that.load(data);
			});

			var params = {};
			params[opts.totalCountName] = 0;
			params[opts.pageParamName] = opts.page;
			params[opts.limitParamName] = opts.limit;
			this.load(params);

			if ($grid.opts.indexCol) {
				var indexCol = $grid.opts.cols[0];
				indexCol.renderer = function(val, item, rowIndex) {
					var params = that.params();
					return '<label class="mmg-index">' + (rowIndex + 1 + ((params[opts.pageParamName] - 1) * params[opts.limitParamName])) + '</label>';
				};
			}
		}
	};

	$.fn.htjsPaginator = function() {
		if (arguments.length === 0 || typeof arguments[0] === 'object') {
			var option = arguments[0], data = this.data('htjsPaginator'), options = $.extend(true, {}, $.fn.htjsPaginator.defaults, option);
			if (!data) {
				data = new HTJSPaginator(this[0], options);
				this.data('htjsPaginator', data);
			}
			return $.extend(true, this, data);
		}
		if (typeof arguments[0] === 'string') {
			var data = this.data('htjsPaginator');
			var fn = data[arguments[0]];
			if (fn) {
				var args = Array.prototype.slice.call(arguments);
				return fn.apply(data, args.slice(1));
			}
		}
	};

	$.fn.htjsPaginator.defaults = {
		style : 'plain',
		totalCountName : 'TOTAL',
		page : 1,
		pageParamName : 'page',
		limitParamName : 'pageSize',
		limitLabel : '每页{0}条',
		totalCountLabel : '共<span>{0}</span>条记录',
		limit : null,
		limitList : [ 20, 30, 40, 50 ],
		searchButtonId : "search_dg"
	// , loadFunction:[]
	};

	$.fn.htjsPaginator.Constructor = HTJSPaginator;

}(window.jQuery);