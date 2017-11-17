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
        url: "http://api.pugetsound.onebusaway.org/api/where/routes-for-location.json?key=ec76e3f1-3c97-4f4a-a55e-447cfffa457b&lat="+lat+"&lon="+lng,
        // busRoute: busRoute
        }, function (error, response, body) {
            console.log("XXXXXXXXXX", body)
            // console.log(response);
            
            
        if (!error && response.statusCode == 200) {
            
            console.log(body, "bus routes");
            console.log(JSON.parse(body).data.list, "bus routes");
            
            //array to get specific bus routes
            var theRoutes = []
            var routes = JSON.parse(body).data.list;
            routes.forEach(function(route){
                theRoutes.push(route.shortName)
            });
             // array to get bus decriptions 
            var busDescriptions = []
            var descriptions = JSON.parse(body).data.list;
            descriptions.forEach(function(description) {
                busDescriptions.push(description.description)
            });
            
            console.log(theRoutes);
            console.log(busDescriptions);
            
            console.log(routes.shortname, "ahhhhhhhhhhhhhh");
            // for(var i = 0; i < length; i++)
            // var xml = (body);
            // parseString(xml, function (err, result) {
            //     console.log("foofoofoofoofoofoofoofoo");
            //     console.log();
            //     var agency = result.response.data[0].references[0].agencies[0];
            //     var routes = result.response.data[0].list[0].route.map(route => {
            //         return route;
                }
                res.send({theRoutes, busDescriptions});
            });
        });
    


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