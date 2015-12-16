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
      current: 0
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
      name: "Black Sails",
      href: "https://www.facebook.com/blacksails.starz",
      picture: "http://www.starz.com/sc/features/outlander/facebook/affiliates/generic/img/ols_fb_128x128.jpg",
      caption: "Exclusive content from Black Sails, returning on STARZ January 23rd.",
      message: 'Exclusive content from Black Sails, returning on STARZ January 23rd.'
    });
  };
  inviteFriends = function() {
    return FB.ui({
      method: "apprequests",
      message: "Exclusive content from Black Sails, returning on STARZ January 23rd."
    });
  };
  tweettotwitter = function() {
    var desc, loc;
    loc = "http://www.starz.com/orginals/blacksails";
    desc = "Exclusive content from Black Sails, returning on STARZ January 23rd..";
    return window.open('http://twitter.com/share?url=' + loc + '&text=' + desc + '&', 'twitterwindow', 'height=450, width=550, top=' + $(window).height() / 2 - 100 + ', left=' + $(window).width() / 2 + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
  };
  return init();
});
