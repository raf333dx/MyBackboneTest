define([
  'jquery',
  'underscore',
  'backbone',
  'services/subscriberService',
  'text!templates/subscribersTpl.html',
  'text!templates/partials/header.html',
  'text!templates/partials/subscribersListTpl.html',
  'js/views/deleteView',
  'js/views/detailsView'
], function ($, _, Backbone, SubscriberService, SubscribersTemplate, HeaderTemplate, SubscribersListTemplate, DeleteView, DetailsView) {
  var SubscribersListView = Backbone.View.extend({
    events: {
      'click button[data-type=\'edit\']': 'editSubscriber',
      'click button[data-type=\'show\']': 'detailsModal',
      'click button[data-type=\'delete\']': 'deleteSubscriber'
    },

    header: _.template(HeaderTemplate),
    template: SubscribersTemplate,
    templateRows: _.template(SubscribersListTemplate),

    initialize(){
      this.listenTo(this.model, 'change destroy', this.render);
    },

    render() {
      $('.header').html(this.header({title: 'Listing Subscribers', button: 'visible'}));

      this.$el.html(this.template);

      var compiledTemplate = this.templateRows({subscribers: this.model.models});
      this.$(".table-body-container").html(compiledTemplate);
    },

    editSubscriber(ev){
      var subscriberKey = $(ev.currentTarget).closest('[data-itemid]').data('itemid');

      Backbone.history.navigate('edit/' + subscriberKey, {trigger: true});
      this.remove();
    },

    detailsModal(ev){
      var subscriberKey = $(ev.currentTarget).closest('[data-itemid]').data('itemid').toString(),
        modelToDetale = this.model.findWhere({key: subscriberKey});

      this.modal = new DetailsView({model: modelToDetale}).render();
    },

    deleteSubscriber(ev){
      var subscriberKey = $(ev.currentTarget).closest('[data-itemid]').data('itemid').toString(),
        modelToDelete = this.model.findWhere({key: subscriberKey});

      this.modal = new DeleteView({model: modelToDelete}).render();
    },

  });
  return SubscribersListView;
});
