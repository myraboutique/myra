module.exports = (function () {
    var db = require('../db');

    var m = {
        GET: function (req, res, next) {
            db.addsubdesign.find(req, res);
        },
        POST: function (req, res, next) {
            db.addsubdesign.Create(req, res);
        },
        UPDATE: function (req, res, next) {
            db.addsubdesign.Update(req, res);
        }
    };
    return m;
})();