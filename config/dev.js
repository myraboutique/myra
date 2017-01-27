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
            port: 3306,
            user: 'root',
            password: 'root',
            database: 'demo1'
        },
        logging: {
            level: "info"
        }
    };

   return m;
})();

// module.exports = (function(){
//     var m = {
//         server: {
//             host: 'localhost',
//             port: 3000,
//             ssl: false
//         },
//         db: {
//             type: 'mysql',
//             host: 'localhost',
//             port: 3306,
//             user: 'root',
//             password: 'root',
//             database: 'demo1'
//         },
//         logging: {
//             level: "info"
//         }
//     };
//
//     return m;
// })();
