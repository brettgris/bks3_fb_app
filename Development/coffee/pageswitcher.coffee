(($,window,document) ->
	class PageSwitcher
		defaults:
			nav: '.nav'
			pages: '.pages'
			current: 0
			navattr: 'path'
			pageid: 'section'
			selected: 'selected'
			animate: '.animate'
			ta: '.ta'
			onChange: ->

		constructor: (el,options) ->
			@options = $.extend({},@defaults,options)
			@$el = $(el)
			@nav = $(@options.nav)
			@pages = @$el.find(@options.pages)
			@ta = $(@options.ta)
			@current = @options.current

			@changeTo(@current)
			@addClickEvents()

		addClickEvents: =>
			@nav.click (e) =>
				n = Number( $(e.target).attr(@options.navattr) )
				if n!=@current
					@changeTo(n)
			@ta.click (e) =>
				n = Number( $(e.target).attr(@options.navattr) )
				if n!=@current
					@changeTo(n)

		changeTo: (n) =>
			@pages.hide()
			@nav.eq(@current).removeClass(@options.selected)
			@current = n

			if @current>= 0 
				 @nav.eq(@current).addClass(@options.selected)

			p = @pages.eq(@current)
			a = p.find(@options.animate).hide()

			p.fadeIn 500, =>
				@options.onChange.call @$el,p
				a.each (v,t) =>
					t = $(t)
					to = "{"+t.attr('options')+"}"
					to = to.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": ')
					to = JSON.parse(to)
					t.show()

					if t.attr('type')=="from"
						TweenMax.from(t, Number(t.attr('speed')), to)
					else if t.attr('type')=="to"
						TweenMax.to(t, Number(t.attr('speed')), to)
					else if t.attr('type')=="staggerFrom"
						arr = []
						t.children().each (i,c) =>
							arr.push( $(c) )
						TweenMax.staggerFrom(arr, Number(t.attr('speed')), to, Number(t.attr('stagger')))


	$.fn.extend PageSwitcher: (options) ->
		@each ->
			$(this).data('PageSwitcher', new PageSwitcher(@,options))
	
) jQuery, window, document