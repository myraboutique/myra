/// <reference path="../../typings/tsd.d.ts" />
module.exports = (function(){

    var config = require('../../config');
    var logger = require('../logger');
    var mongoose = require('mongoose');

    var connectionString = 'mongodb://' + config.db.host + ':' + config.db.port + '/' + config.db.database;

    var db = mongoose.connect(connectionString);

    // When successfully connected
    mongoose.connection.on('connected', function () {
        logger.log('Mongoose default connection open to ' + connectionString);
    });

    // If the connection throws an error
    mongoose.connection.on('error', function (err) {
        logger.log('Mongoose default connection error: ' + err);
    });

    // When the connection is disconnected
    mongoose.connection.on('disconnected', function () {
        logger.log('Mongoose default connection disconnected');
    });

    // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });

    return db;
})();
