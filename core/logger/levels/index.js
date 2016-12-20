module.exports = (function(){
    var m = {
        none: 0,
        error: 1,
        warning: 2,
        info: 3,
        debug: 4,
        getLevel: function(text){
            var levels = this.stringify();
            if(text == levels.debug ) return this.debug;
            if(text == levels.info) return this.info;
            if(text == levels.warning) return this.warning;
            if(text == levels.error) return this.error;
            if(text == levels.none) return this.none;
            return -1;
        },
        stringify: function(){
            return {
                none: "none",
                error: "error",
                warning: "warning",
                info: "info",
                debug: "debug"
            }
        }
    };

    return m;
})();