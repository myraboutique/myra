
module.exports = (function(){
    var m = {
        server: {
            host: 'localhost',
            port: 3000,
            ssl: false
        },
        db: {
            type: 'mysql',
            host: '85.10.205.273',
            port: 3307,
            user: 'myraboutique',
            password: 'myra@123',
            database: 'myra'
        },
        logging: {
            level: "info"
        }
    };

    return m;
})();

