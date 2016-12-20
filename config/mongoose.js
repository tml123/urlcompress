/**
 * Created by timdora on 12/15/16.
 */
var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function () {
    mongoose.Promise = global.Promise;
    var db = mongoose.connect(config.db);
    require('../models/urls.server.model');
    return db;
};