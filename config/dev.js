module.exports = (function(){
    var m = {
        server: {
            host: 'localhost',
            port: 3000,
            ssl: false
        },
        db: {
            type: 'mysql',
            host: 'localhost',
            port: 27017,
            user: 'root',
            password: 'root@123',
            database: 'myra'
        },
        logging: {
            level: "info"
        }
    };

    return m;
})();
