$ ->
	init = ->
		setupNavigation()
		setupCast()
		addSocialLinks()

	setupNavigation = ->
		$('.content').PageSwitcher(
			nav: '.navlink'
			navattr: 'path'
			pages: '.section'
			pageid: 'section'
			ta: '.showta'
			current: 0
		);

	setupCast = ->
		$('.cast').PressKitSlideShow(
			thumbs:'.cast-thumb'
			items:'.cast-bio'
			next: '.next-btn'
			prev: '.prev-btn'
			speed: 0.5
			selected: 'selected'
			directional: true
		)

	addSocialLinks = ->
		$('.share').click ( sharewithfacebook )
		$('.invite').click( inviteFriends )
		$('.tweet').click( tweettotwitter )

	sharewithfacebook = ->
		FB.ui(
			method:"share"
			name:"Black Sails"
			href:"https://www.facebook.com/blacksails.starz"
			picture:"http://www.starz.com/sc/features/outlander/facebook/affiliates/generic/img/ols_fb_128x128.jpg"
			caption:"Exclusive content from Black Sails, returning on STARZ January 23rd."
			message:'Exclusive content from Black Sails, returning on STARZ January 23rd.'
		)

	inviteFriends = ->
		FB.ui(
			method:"apprequests"
			message:"Exclusive content from Black Sails, returning on STARZ January 23rd."
		)

	tweettotwitter = ->
		loc = "http://www.starz.com/orginals/blacksails"
		desc = "Exclusive content from Black Sails, returning on STARZ January 23rd.."
		window.open('http://twitter.com/share?url=' + loc + '&text=' + desc + '&', 'twitterwindow', 'height=450, width=550, top='+$(window).height()/2 - 100 +', left='+$(window).width()/2 +', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0')
	
	init()