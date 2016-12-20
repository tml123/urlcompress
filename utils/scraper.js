/**
 * Created by timdora on 12/18/16.
 */
var cheerio = require("cheerio"),
    request = require("request");

function scrape(url, urlRecord){
    request(url, urlRecord, function(error, response, html){
       if(!error){
           var $ = cheerio.load(html);
           title = $('title').text();
           var data = {title: ""};
           data.title = title;
       }
    });
}

module.exports = scrape;