require("dotenv").config();
var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config').get();

var root = require('./root');
// var works = require('./works');
// var sentiment = require('./sentiment');

// var dbconn = require('./db');
// dbconn('gallery-db');

var app = express();

app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb'
}));
app.use(bodyParser.json({
  limit: '50mb'
}));

// require('./auth.js')(app, config);

var listenPort = process.env.PORT || 3001;

app.use('/api',function(req, res, next){
  console.log('get url', req.url)
  // dbconn('gallery-db', req.url).then(function(db){
  //   req.db = db;
  //   next();
  // });
});

// app.use('/api/sentiment',sentiment);
// app.use('/api/works',works);
app.use('/', root);

app.use(function(err, req, res, next){
  console.log('error:', err);
  res.status(err.statusCode || 500).json(err);
});

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/root/public/index.html');
});

app.listen(listenPort, function(){
  console.log('server listening on port', listenPort + '...');
});
