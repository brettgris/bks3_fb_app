(($,window,document) ->
	class PressKitSlideShow
		defaults:
			thumbs: '.thumbs'
			attr: 'n'
			current:0
			items: '.items'
			next: '.next'
			prev: '.prev'
			speed: 1
			selected: 'selected'
			directional: true
			onStart: ->
			onSwitch: ->
			onEnd: ->

		constructor: (el,options) ->
			@options = $.extend({},@defaults,options)
			@$el = $(el)
			@current = @options.current
			@items = @$el.find(@options.items)
			@thumbs = @$el.find(@options.thumbs)

			@thumbs.eq( @current ).addClass(@options.selected)
			@items.hide()
			@items.eq(@current).show()

			@addClickEvents()

		addClickEvents: =>
			@thumbs.click (e) =>
				n = Number $(e.target).attr(@options.attr)
				if n!=@current
				 	if n>@current then d=1 else d=0
					@changeTo( n, d )
			
			@$el.find(@options.next).click =>
				n = @current
				n++
				if n==@items.length then n=0
				@changeTo( n, 1 )
			
			@$el.find(@options.prev).click =>
				n = @current
				n--
				if n<0 then n=@items.length-1
				@changeTo( n, -1 )

		changeTo: (num,d) =>
			if d==1 or !@options.directional
				s = "-100%"
				e = "200%"
			else
				s = "200%"
				e = "-100%"

			@options.onStart.call( undefined, @items.eq(@current) )

			TweenLite.to( @items.eq(@current), @options.speed, 
				'left':s
				onComplete: =>
					@items.eq(@current).attr("style","").hide()
					
					@options.onSwitch.call(undefined, @items.eq(@current))
					
					TweenLite.from( @items.eq(@current), @options.speed, 
						'left':e
						onComplete: =>
							@options.onEnd.call(undefined, @items.eq(@current))
							@items.eq(@current).attr("style","").show()
					)
					@items.eq(@current).show()	
			)
			
			@thumbs.eq( @current ).removeClass(@options.selected);
			@current = num;
			@thumbs.eq( @current ).addClass(@options.selected);

	$.fn.extend PressKitSlideShow: (options) ->
		@each ->
			$(this).data('PressKitSlideShow', new PressKitSlideShow(@,options))
) jQuery, window, document