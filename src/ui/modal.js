define(['exports'], function (modal) {

  var FADE_DURATION = 200;
  var $win = $(window);

  modal.view = Backbone.View.extend({

    'events': { }

    ,'initialize': function (opts) {
      _.extend(this, opts);

      this.$el
        .css('display', 'none')
        .removeClass('hid');

      this._windowKeyhandler = _.bind(this.onWindowKeydown, this);
      this._windowClickhandler = _.bind(this.onWindowClick, this);
      this.$triggerEl.on('click', _.bind(this.onTriggerClick, this));
    }

    ,'onTriggerClick': function (evt) {
      if (this.$el.is(':visible')) {
        this.hide();
      } else {
        this.show();
      }

      evt.stopPropagation();
      evt.preventDefault();
    }

    ,'onWindowKeydown': function (evt) {
      if (evt.keyCode === 27) { // escape
        this.hide();
      }
    }

    ,'onWindowClick': function (evt) {
      if (!$.contains(this.$el[0], evt.srcElement)
          && this.$el[0] !== evt.srcElement) {
        this.hide();
      }
    }

    ,'show': function () {
      this.$el.fadeIn(FADE_DURATION);
      $win
        .on('keydown', this._windowKeyhandler)
        .on('click', this._windowClickhandler);
    }


    ,'hide': function () {
      this.$el.fadeOut(FADE_DURATION);
      $win
        .off('keydown', this._windowKeyhandler)
        .off('click', this._windowClickhandler);
    }

  });

});
