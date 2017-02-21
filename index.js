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
var multer = require('multer');

var jsonParser = bodyParser.json({ limit: 1024 * 1024 * 20, type: 'application/json' });
var urlencodedParser = bodyParser.urlencoded({ extended: true, limit: 1024 * 1024 * 20, type: 'application/x-www-form-urlencoding' })
app.use(jsonParser);
app.use(urlencodedParser);
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
app.use('/imgupload',express.static(__dirname + '/uploads'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.use(function(req, res, next) {
     
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS ,PATCH, UPDATE");
        res.header('Access-Control-Allow-Credentials', true);
        next();
    });

for (var i = 0; i < routes.length; i++) {
    app.use(routes[i]);
}
var cd = this;
var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './uploads/');
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
             cd = file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1];
            //  console.log(cd);
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
    }
           
    });

    var upload = multer({ //multer settings
                    storage: storage
                }).single('file');

app.post('/upload', function(req, res) {
    // console.log("uploadAPIs");
         
          
        upload(req,res,function(err){
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
            // console.log(cd);
             res.json({error_code:0,err_desc:null,fname:cd});
        });
    });


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
