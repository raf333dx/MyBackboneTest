define([
  'jquery',
  'underscore',
  'backbone',
  'services/subscriberService',
  'text!templates/partials/detailsModal.html'
], function ($, _, Backbone, SubscriberService, DetailsModalTemplate) {
  var SubscribersDetailsView = Backbone.View.extend({
    template: _.template(DetailsModalTemplate),
    events: {
      'click button[data-type=\'close\']': 'closeModal',
    },

    initialize(){
    },

    render() {
      $('#modal').html(this.$el);
      this.$el.html(this.template({subscriber: this.model}));
      $('#modal').css('display', 'block');
    },

    closeModal(){
      $('#modal').css('display', 'none');
      this.remove();
    }
  });

  return SubscribersDetailsView;
});
