module.exports = (function(){
    var m = {
        server: {
            host: 'https://myraboutique.herokuapp.com/',
            port: 3000,
            ssl: false
        },
        db: {
            type: 'mysql',
            host: 'sql6.freemysqlhosting.net',
            port: 27017,
            user: 'sql6150869',
            password: 'Please wait',
            database: 'sql6150869'
        },
        logging: {
            level: "info"
        }
    };

    return m;
})();
