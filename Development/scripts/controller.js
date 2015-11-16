$(function() {
  var addSocialLinks, init, inviteFriends, setupCast, setupNavigation, sharewithfacebook, tweettotwitter;
  init = function() {
    setupNavigation();
    setupCast();
    return addSocialLinks();
  };
  setupNavigation = function() {
    return $('.content').PageSwitcher({
      nav: '.navlink',
      navattr: 'path',
      pages: '.section',
      pageid: 'section',
      ta: '.showta',
      current: 1
    });
  };
  setupCast = function() {
    return $('.cast').PressKitSlideShow({
      thumbs: '.cast-thumb',
      items: '.cast-bio',
      next: '.next-btn',
      prev: '.prev-btn',
      speed: 0.5,
      selected: 'selected',
      directional: true
    });
  };
  addSocialLinks = function() {
    $('.share').click(sharewithfacebook);
    $('.invite').click(inviteFriends);
    return $('.tweet').click(tweettotwitter);
  };
  sharewithfacebook = function() {
    return FB.ui({
      method: "share",
      name: "Blunt Talk",
      href: "https://www.facebook.com/BluntTalk.Starz",
      picture: "http://www.starz.com/sc/features/outlander/facebook/affiliates/generic/img/ols_fb_128x128.jpg",
      caption: "Blunt Talk premieres Aug 22 only on STARZ",
      message: 'Blunt Talk premieres Aug 22 only on STARZ.'
    });
  };
  inviteFriends = function() {
    return FB.ui({
      method: "apprequests",
      message: "Blunt Talk premieres Aug 22 only on STARZ."
    });
  };
  tweettotwitter = function() {
    var desc, loc;
    loc = "http://www.starz.com/orginals/blunttalk";
    desc = "Blunt Talk premieres Aug 22 only on STARZ.";
    return window.open('http://twitter.com/share?url=' + loc + '&text=' + desc + '&', 'twitterwindow', 'height=450, width=550, top=' + $(window).height() / 2 - 100 + ', left=' + $(window).width() / 2 + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
  };
  return init();
});
