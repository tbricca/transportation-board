var express = require("express");
var router = express.Router();
var axios = require('axios');
var parseString = require('xml2js').parseString;
var bodyParser = require('body-parser')

var apiUrl = 'http://api.pugetsound.onebusaway.org/api/where/routes-for-location.xml?key=ec76e3f1-3c97-4f4a-a55e-447cfffa457b&lat=47.6120&lon=-122.335167';
var cityMapper = "https://developer.citymapper.com/api/1/singlepointcoverage/?coord=51.578973%2C-0.124147&key=8d3b8bb18fc668fdf342d8e09fcf3249";

var request = require('request');
var lat;
var lng;


router.post("/", function(req, res, next){
   console.log(req.body.lat, req.body.lng, "lat lng here");
    lat = req.body.lat;
    lng = req.body.lng;
   console.log(lat,lng, "variables");
//    res.redirect('/');
    request({
        url: "http://api.pugetsound.onebusaway.org/api/where/routes-for-location.xml?key=ec76e3f1-3c97-4f4a-a55e-447cfffa457b&lat="+lat+"&lon="+lng,
        // busRoute: busRoute
        }, function (error, response, body) {
            
            
        if (!error && response.statusCode == 200) {
            
            var xml = (body);
            parseString(xml, function (err, result) {
                console.log(result.data);
                var agency = result.response.data[0].references[0].agencies[0];
                var routes = result.response.data[0].list[0].route.map(route => {
                    return route;
                })
                res.send({agency, routes});
            });
        }
    });
})

// pass through term like this /:Latlong 
router.get("/", function(req, res, next){
    console.log("you got hit");
    

    // request call
    
    // axios.get()

    // var request = require('request');
    // request("https://developer.citymapper.com/api/1/singlepointcoverage/?coord=51.578973%2C-0.124147&key=8d3b8bb18fc668fdf342d8e09fcf3249",
    // function (error, response, body){
    //     console.log('yep thats an error', error);
    //     console.log('statusCode:', response && response.statusCode);
    //     if (!error && response.statusCode == 200) {
    //         res.send(body);
    //     }
    // });
        // });
    // app.get('/', function(req, res) {
       
   
       

    
});

module.exports = router