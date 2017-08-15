define([
  'jquery',
  'underscore',
  'backbone',
  'js/router' // Request router.js
], function ($, _, Backbone, Router) {
  'use strict';
  var initialize = () => {
    $.fn.serializeObject = function () {
      var o = {};
      var a = this.serializeArray();
      $.each(a, function () {
        if (o[this.name] !== undefined) {
          if (!o[this.name].push) {
            o[this.name] = [o[this.name]];
          }
          o[this.name].push(this.value || '');
        } else {
          o[this.name] = this.value || '';
        }
      });
      return o;
    };
    // Pass in our Router module and call it's initialize function
    new Router();
    if (!Backbone.History.started) {
      Backbone.history.start();
    }
  };

  return {
    initialize: initialize
  };
});
