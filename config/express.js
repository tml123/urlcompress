/**
 * Created by timdora on 12/15/16.
 */
var express = require('express'),
    config = require('./config'),
    morgan = require('morgan'),
    compress = require('compress'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');

module.exports = function (){
    var app = express();
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.set('views', 'views');
    app.set('view engine', 'ejs');
    //require('../routes/users.server.route')(app);
    require('../routes/index.server.route')(app);
    require('../routes/urls.server.route')(app);
    app.use(express.static('./public'));

    return app;
}