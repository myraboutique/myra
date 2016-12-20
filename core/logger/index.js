module.exports = (function(){

    var levels = require('./levels');
    var config = require('../../config');
    var logLevel = config.logging.level;
    var logLevelValue = levels.getLevel(logLevel);

    var log = function(value, level){
       
        var levelValue = levels.getLevel(level);

        var loggingEnabled = (logLevelValue >= levelValue) ? true: (levelValue == -1 ? true : false);

        if (loggingEnabled){
            console.log(value);
        } 
    }

    var m = {
        log: log
    };

    return m;
})();