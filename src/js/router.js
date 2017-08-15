define([
  'jquery',
  'underscore',
  'backbone',
  'services/subscriberService',
  'js/views/subscribersListView',
  'js/views/subscribersEditView',
  'collections/subscribersCollection',
  'models/subscriberModel'
], function ($, _, Backbone, SubscriberService, SubscribersListView, SubscribersEditView, SubscribersCollection, SubscriberModel) {
  return Backbone.Router.extend({
    routes: {
      '': 'showSubscribersList',
      'new': 'editSubscriber',
      'edit/:id': 'editSubscriber'
    },

    initialize() {
    },

    showSubscribersList() {
      var collection = new SubscribersCollection(),
        subscribersListView;

      if (this.current) {
        this.current.remove()
      }

      collection.fetch()
        .then(() => {
          subscribersListView = new SubscribersListView({model: collection});
          this.current = subscribersListView;
          subscribersListView.render();
          subscribersListView.$el.appendTo('.main');
        });
    },

    editSubscriber(id){
      var subscribersEditView,
        collection,
        model;

      if (this.current) {
        this.current.remove()
      }

      if (id === null) {
        model = new SubscriberModel();
        subscribersEditView = new SubscribersEditView({model: model, key: id});
        this.current = subscribersEditView;
        subscribersEditView.render();
        subscribersEditView.$el.appendTo('.main');
      } else {
        collection = new SubscribersCollection();
        collection.fetch()
          .then(() => {
            model = collection.findWhere({key: id});
            subscribersEditView = new SubscribersEditView({model: model, key: id});
            this.current = subscribersEditView;
            subscribersEditView.render();
            subscribersEditView.$el.appendTo('.main');
          })
      }
    }
  });
});
