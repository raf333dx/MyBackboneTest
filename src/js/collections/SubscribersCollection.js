define([
  'underscore',
  'backbone',
  'models/subscriberModel'
], function (_, Backbone, SubscriberModel) {
  return Backbone.Collection.extend({
    model: SubscriberModel,
    url: 'http://0.0.0.0:9002/account'
  });
});
