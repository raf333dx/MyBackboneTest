define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  var SubscriberModel = Backbone.Model.extend({
    defaults: {
      key: '',
      firstname: '',
      lastname: '',
      account: ''
    },
    urlRoot: 'http://0.0.0.0:9002/account',
    idAttribute: 'key',
    validation: {
      key: [{
        required: true,
        msg: 'Enter a key'
      }, {
        pattern: 'number',
        msg: 'Enter correct key'
      }],
      firstname: {
        required: true,
        msg: 'Enter an First name'
      },
      lastname: {
        required: true,
        msg: 'Enter an Last name'
      },
      account: [{
        required: true,
        msg: 'Enter a account number'
      }, {
        pattern: /^(([0-9]+-)+([0-9]+))|(([0-9])+)$/,
        msg: 'Enter correct key'
      }]
    }
  });

  return SubscriberModel;
});
