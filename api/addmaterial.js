module.exports = (function () {
  var db = require('../db');

  var m = {
    POST: function (req, res, next) {
      db.addmaterial.create(req, res);
    },
    GET: function (req, res, next) {
      db.addmaterial.find(req, res);
    },
    UPDATE: function (req, res, next) {
      db.addmaterial.Update(req, res);
    }
  };

  return m;
})();
