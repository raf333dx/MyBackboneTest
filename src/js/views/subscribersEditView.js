define([
  'jquery',
  'underscore',
  'backbone',
  'services/subscriberService',
  'text!templates/subscriberEditTpl.html',
  'text!templates/partials/header.html',
  'models/subscriberModel',
  'js/views/deleteView'
], function ($, _, Backbone, SubscriberService, SubscribersEditTemplate, HeaderTemplate, SubscriberModel, DeleteView) {
  var SubscribersEditView = Backbone.View.extend({
    header: _.template(HeaderTemplate),
    template: _.template(SubscribersEditTemplate),
    events: {
      'submit .custom-form-control': 'saveSubscriber',
      'click button[data-type=\'delete\']': 'deleteSubscriber',
      'click button[data-type=\'cancel\']': 'cancelButton',
      'input input': 'validation'
    },

    initialize(options){
      this.dataId = options.key;
      this.subscriberService = new SubscriberService();
      this.subscriberService.initialize();

      if (this.dataId === null) {
        this.headerData = {title: 'Subscribers: create new', button: 'hidden'};
      } else {
        this.headerData = {title: 'Subscribers: edit existing', button: 'hidden'};
      }
      Backbone.Validation.bind(this);
    },

    render() {
      $('.header').html(this.header(this.headerData));

      this.$el.html(this.template({subscriber: this.model}));
    },

    saveSubscriber(ev) {
      var subscriber = $(ev.currentTarget).serializeObject();

      ev.preventDefault();
      this.model.set(subscriber);

      if (this.model.isValid(true)) {
        if (this.dataId === null) {
          this.model.save({}, {type: 'POST', url: 'http://0.0.0.0:9002/account'})
            .done(() => {
              Backbone.history.navigate('', {trigger: true})
            });
        } else {
          this.model.save({}, {type: 'PUT', url: 'http://0.0.0.0:9002/account/' + this.dataId})
            .done(() => {
              Backbone.history.navigate('', {trigger: true})
            });
        }
      }
    },

    validation(ev){
      var subscriber = $(ev.currentTarget).serializeArray(),
        errorMessage = this.model.preValidate(subscriber[0].name, subscriber[0].value),
        $el = this.$('[name=' + subscriber[0].name + ']'),
        $group = $el.closest('.form-group'),
        allSubscriber,
        exited;

      if (subscriber[0].name === 'key') {
        allSubscriber = this.subscriberService.getSubscribers();
        exited = allSubscriber.findWhere({key: subscriber[0].value});
      }

      if (exited && exited.attributes.key !== this.dataId) {
        errorMessage = 'Subscriber with this key is already created';
      }

      if (errorMessage) {
        this.$('button[data-type="submit"]').prop('disabled', true);

        $group.addClass('has-error');
        $group.find('.help-block').html(errorMessage).removeClass('hidden');
      } else {
        this.$('button[data-type="submit"]').prop("disabled", false);

        $group.removeClass('has-error');
        $group.find('.help-block').html('').addClass('hidden');
      }

    },

    deleteSubscriber(ev){
      ev.preventDefault();
      this.modal = new DeleteView({model: this.model}).render();
    },

    cancelButton(){
      Backbone.history.navigate('', {trigger: true});
      this.remove();
    }
  });

  return SubscribersEditView;
});
