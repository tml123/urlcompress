/**
 * Created by timdora on 12/14/16.
 */
var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var urlSchema = new Schema({
    url: {
        type:String,
        set: function(url){
            if(!url) {
                return url;
            } else {
                if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
                    url = 'http://' + url;
                }
                return url;
            }
        }
    },
    shortUrl: {
        type: String,
        unique: true
    },
    hits: [{}],
    numHits: {type: Number,},
    created: {type: Date, default: Date.now}
    },
    {collection: "urls"}
);

mongoose.model("Url", urlSchema);



