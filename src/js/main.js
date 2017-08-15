require.config({
  paths: {
    jquery: '/libs/jquery/dist/jquery.min',
    underscore: '/libs/underscore/underscore-min',
    backbone: '/libs/backbone/backbone-min',
    text: '/libs/text/text',
    collections: '/js/collections',
    models: '/js/models',
    services: '/js/services',
    validation: '/libs/backbone.validation/dist/backbone-validation'
  },
  shim: {
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'underscore': {
      exports: '_'
    },
    'validation': {
      deps: ['backbone']
    }
  }
});

require([
  'js/app',
  'validation'
], function (App, ValidationMixin) {
  _.extend(Backbone.Model.prototype, ValidationMixin);

  _.extend(Backbone.Validation.callbacks, {
    valid: function (view, attr, selector) {
      var $el = view.$('[name=' + attr + ']'),
        $group = $el.closest('.form-group');

      $group.removeClass('has-error');
      $group.find('.help-block').html('').addClass('hidden');
    },
    invalid: function (view, attr, error, selector) {
      var $el = view.$('[name=' + attr + ']'),
        $group = $el.closest('.form-group');

      $group.addClass('has-error');
      $group.find('.help-block').html(error).removeClass('hidden');
    }
  });

  App.initialize();
});
