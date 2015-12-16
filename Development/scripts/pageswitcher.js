var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

(function($, window, document) {
  var PageSwitcher;
  PageSwitcher = (function() {
    PageSwitcher.prototype.defaults = {
      nav: '.nav',
      pages: '.pages',
      current: 0,
      navattr: 'path',
      pageid: 'section',
      selected: 'selected',
      animate: '.animate',
      ta: '.ta',
      onChange: function() {}
    };

    function PageSwitcher(el, options) {
      this.changeTo = bind(this.changeTo, this);
      this.addClickEvents = bind(this.addClickEvents, this);
      this.options = $.extend({}, this.defaults, options);
      this.$el = $(el);
      this.nav = $(this.options.nav);
      this.pages = this.$el.find(this.options.pages);
      this.ta = $(this.options.ta);
      this.current = this.options.current;
      this.changeTo(this.current);
      this.addClickEvents();
    }

    PageSwitcher.prototype.addClickEvents = function() {
      this.nav.click((function(_this) {
        return function(e) {
          var n;
          n = Number($(e.target).attr(_this.options.navattr));
          if (n !== _this.current) {
            return _this.changeTo(n);
          }
        };
      })(this));
      return this.ta.click((function(_this) {
        return function(e) {
          var n;
          n = Number($(e.target).attr(_this.options.navattr));
          if (n !== _this.current) {
            return _this.changeTo(n);
          }
        };
      })(this));
    };

    PageSwitcher.prototype.changeTo = function(n) {
      var a, p;
      this.pages.hide();
      $('#nav' + this.current).removeClass(this.options.selected);
      this.current = n;
      if (this.current >= 0) {
        $('#nav' + this.current).addClass(this.options.selected);
      }
      p = this.pages.eq(this.current);
      a = p.find(this.options.animate).hide();
      return p.fadeIn(500, (function(_this) {
        return function() {
          _this.options.onChange.call(_this.$el, p);
          return a.each(function(v, t) {
            var arr, to;
            t = $(t);
            to = "{" + t.attr('options') + "}";
            to = to.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": ');
            to = JSON.parse(to);
            t.show();
            if (t.attr('type') === "from") {
              return TweenMax.from(t, Number(t.attr('speed')), to);
            } else if (t.attr('type') === "to") {
              return TweenMax.to(t, Number(t.attr('speed')), to);
            } else if (t.attr('type') === "staggerFrom") {
              arr = [];
              t.children().each(function(i, c) {
                return arr.push($(c));
              });
              return TweenMax.staggerFrom(arr, Number(t.attr('speed')), to, Number(t.attr('stagger')));
            }
          });
        };
      })(this));
    };

    return PageSwitcher;

  })();
  return $.fn.extend({
    PageSwitcher: function(options) {
      return this.each(function() {
        return $(this).data('PageSwitcher', new PageSwitcher(this, options));
      });
    }
  });
})(jQuery, window, document);
