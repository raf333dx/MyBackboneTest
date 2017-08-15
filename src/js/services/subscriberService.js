define([
  'jquery',
  'underscore',
  'backbone',
  'collections/subscribersCollection'
], function ($, _, Backbone, SubscribersCollection) {
  var subscribersCollection,
    instance;

  function SubscriberService() {
    if (instance) {
      return this;
    }
    instance = this;
  }

  _.extend(SubscriberService.prototype, {
    initialize () {
      var d = new $.Deferred();

      subscribersCollection = new SubscribersCollection();
      subscribersCollection.fetch().then(d.resolve, d.reject);

      return d;
    },
    getSubscribers () {
      return subscribersCollection;
    },
    getSubscriber(key) {
      return _.findWhere(subscribersCollection.models, {key: key})
    }
  });

  return SubscriberService;
});

