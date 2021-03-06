/**
 * Created by timdora on 12/14/16.
 */
var mongoose = require("mongoose"),
    Url = require("mongoose").model("Url"),
    Base64 = require("js-base64").Base64,
    scrape = require("../utils/scraper");

function encode(length, chars){
    var result = "";
    for (var i = length; i > 0; i--){
        result += chars[Math.round(Math.random() * (chars.length - 1))];
    }
    return result;
}
exports.create = function(req, res, next) {
    // create url from request body
    var url = new Url(req.body);
    var that = url;
    if (url.shortUrl) {
        Url.findOne({shortUrl: url.shortUrl})
            .then(function (url) {
                if (url) {
                    res.json({shortUrl: "This short code has been taken. Try another."});
                    return;
                }
                else {
                    that.save(function(){
                        res.json(url);
                    });
                }
            });
    }
    // if no shortUrl
    // encode short url by taking base64 encoding
    // take random 10 characters from encoding
    else if (!url.shortUrl) {
        url.shortUrl = encode(10, Base64.encode(url.url));
        url.save(function(){
            res.json(url);
        });
    }
    /*
    url.save(function(err){
        if(err){
            return next(err);
        } else {
            res.json(url);
        }
    });
    */
}

exports.list = function(req, res, next) {
    var q = Url.find({});
    q.exec(function(err, urls){
        if(err){
            return next(err);
        } else {
            res.json(urls);
        }
    });
}

exports.read = function(req, res) {
    res.json(req.url);
}

exports.urlByHash = function(req, res, next, shortUrl) {
    Url.findOne({shortUrl: req.params.shortUrl}, function(err, url){
        if (err) {
            return next(err);
        } else {
            req.url = url;
            next();
        }
    });
}

exports.sendToUrl = function(req, res, next) {
    Url.findOne({shortUrl: req.params.shortUrl}, function(err, url){
        if(url) {
            // store date of hit as ISO
            url.hits.push({date: new Date().toJSON()});
            url.save();
            // redirect to long url
           res.redirect(url.url);
       } else {
            res.locals.message = "Oops. Try again.";
            res.locals.errorMsg = "The shortened URL you tried doesn't exist."

            // render the error page
            res.status(404);
            res.render('error');
       }
    });
}