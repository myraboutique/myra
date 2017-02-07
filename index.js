/// <reference path="typings/tsd.d.ts" />
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var express = require('express');
var app = express();
var http = require('http');
var https = require('https');
var path = require('path');

var config = require('./config');
var logger = require('./core/logger');
var logLevels = require('./core/logger/levels').stringify();
var routes = require('./routes');
var bodyParser = require('body-parser');

var jsonParser = bodyParser.json({ limit: 1024 * 1024 * 20, type: 'application/json' });
var urlencodedParser = bodyParser.urlencoded({ extended: true, limit: 1024 * 1024 * 20, type: 'application/x-www-form-urlencoding' })
app.use(jsonParser);
app.use(urlencodedParser);
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

for (var i = 0; i < routes.length; i++) {
    app.use(routes[i]);
}

var server = http.createServer(app);
var port = process.env.PORT || config.server.port;
var host = config.server.host;
var urlPrefix = (config.server.ssl ? 'https://' : 'http://');
var url = urlPrefix + host + ':' + port;

server.listen(port, function () {
    console.log('Server started on : ' + url);
    // logger.log('Server started on : ' + url);
    // console.log('This should only be seen if level id debug', logLevels.debug);
    // logger.log('This should only be seen if level id debug', logLevels.debug);
});
