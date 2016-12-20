/**
 * Created by timdora on 12/14/16.
 */
var urls = require('../controllers/urls.server.controller')

module.exports = function(app) {
    app.route('/api/urls')
        .get(urls.list)
        .post(urls.create);
    app.route('/@:shortUrl')
        .get(urls.sendToUrl);
    app.route('/api/urls/:shortUrl')
        .get(urls.read);
    app.param('shortUrl', urls.urlByHash);
    app.get('/', function(req, res){
        res.sendfile('./public/views/index.html');
    });
};
