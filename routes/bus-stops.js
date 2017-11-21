var express = require("express");
var router = express.Router();
var axios = require('axios');
var parseString = require('xml2js').parseString;
var bodyParser = require('body-parser')

var request = require('request');
var lat;
var lng;

router.post("/", function(req, res, next){
    //    console.log(req.body.lat, req.body.lng, "lat lng here");
        lat = req.body.lat;
        lng = req.body.lng;
    request({
        url: "http://api.pugetsound.onebusaway.org/api/where/stops-for-location.json?key=ec76e3f1-3c97-4f4a-a55e-447cfffa457b&lat="+lat+"&lon="+lng,
    }, function (error, response, body) {
        // console.log ("xxnum2", body);

            if (!error && response.statusCode == 200) {
                // console.log(body, "bus stops for location");
                console.log(JSON.parse(body).data.list, "bus stops per location refined");

                var theStops = []
                var stops = JSON.parse(body).data.list;
                stops.forEach(function(stop) {
                    theStops.push(stop.stop)
                });
                // console.log(theStops);
            }
        res.send({theStops});
    });
});

module.exports = router

