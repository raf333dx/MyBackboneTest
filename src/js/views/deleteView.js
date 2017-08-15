define([
  'jquery',
  'underscore',
  'backbone',
  'services/subscriberService',
  'text!templates/partials/deleteModal.html',
  'models/subscriberModel'
], function ($, _, Backbone, SubscriberService, DeleteModalTemplate, SubscriberModel) {
  var SubscribersDeleteView = Backbone.View.extend({
    template: _.template(DeleteModalTemplate),
    events: {
      'click button[data-type=\'delete\']': 'deleteSubscriber',
      'click button[data-type=\'close\']': 'closeModal',
    },

    initialize(){},

    render() {
      $('#modal').html(this.$el);
      this.$el.html(this.template({subscriber: this.model}));
      $('#modal').css('display', 'block');
    },

    deleteSubscriber(ev){
      this.model.destroy().done(() => {
        $('#modal').css('display', 'none');
        Backbone.history.navigate('', {trigger: true});
        this.remove();
      });
    },

    closeModal(){
      $('#modal').css('display', 'none');
      this.remove();
    }
  });
  return SubscribersDeleteView;
});
