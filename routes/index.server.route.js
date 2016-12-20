/* GET home page. */
module.exports = function(app) {
  var index = require('../controllers/index.server.controller');
  app.get('/api', index.render);
};
