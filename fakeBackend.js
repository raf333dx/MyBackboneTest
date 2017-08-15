var express = require('express'),
  _ = require('underscore'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  corsOptions = {
    origin: true,
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['X-Requested-With', 'Content-Type', 'X-CSRF-TOKEN'],
    exposedHeaders: ['X-CSRF-TOKEN']
  },
  data = require('./fakeBackend.data'),

  app = express(),
  server = app.listen(9002, '0.0.0.0', function () {
    var _host = server.address().address,
      _port = server.address().port;

    console.log('Listening at http://%s:%s', _host, _port);
  });

app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/test', function (req, res) {
  res.sendStatus(200);
});

app.get('/account', function (req, res) {
  res.json(data.accounts);
});

app.post('/account', function (req, res) {
  var account = _.findWhere(data.accounts, {key: req.body.key});

  if (!account) {
    data.accounts.push(req.body);
    res.json(req.body);
    res.status(200).end();
  }
  res.status(409).end();
});

app.put('/account/:key', function (req, res) {
  var account = _.findWhere(data.accounts, {key: req.params.key});

  if (!account) {
    res.status(404).end();
  }
  _.extend(account, req.body);
  res.json(req.body);
  res.status(200).end();
});

app.delete('/account/:key', function (req, res) {
  var account = _.findWhere(data.accounts, {key: req.params.key});

  if (!account) {
    res.status(404).end();
  }
  data.accounts = _.without(data.accounts, account);
  res.json(req.body);
  res.status(200).end();
});
