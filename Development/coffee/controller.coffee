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
			current: 1
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
			name:"Blunt Talk"
			href:"https://www.facebook.com/BluntTalk.Starz"
			picture:"http://www.starz.com/sc/features/outlander/facebook/affiliates/generic/img/ols_fb_128x128.jpg"
			caption:"Blunt Talk premieres Aug 22 only on STARZ"
			message:'Blunt Talk premieres Aug 22 only on STARZ.'
		)

	inviteFriends = ->
		FB.ui(
			method:"apprequests"
			message:"Blunt Talk premieres Aug 22 only on STARZ."
		)

	tweettotwitter = ->
		loc = "http://www.starz.com/orginals/blunttalk"
		desc = "Blunt Talk premieres Aug 22 only on STARZ."
		window.open('http://twitter.com/share?url=' + loc + '&text=' + desc + '&', 'twitterwindow', 'height=450, width=550, top='+$(window).height()/2 - 100 +', left='+$(window).width()/2 +', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0')
	
	init()