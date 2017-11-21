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
//    console.log(req.body.lat, req.body.lng, "lat lng here");
////////////this gets the lat long from the address on the front end
    lat = req.body.lat;
    lng = req.body.lng;

    request({
        url: "http://api.pugetsound.onebusaway.org/api/where/routes-for-location.json?key=ec76e3f1-3c97-4f4a-a55e-447cfffa457b&lat="+lat+"&lon="+lng,
        // busRoute: busRoute
        
        }, function (error, response, body) {
            // console.log("XXXXXXXXXX", body)
  /////// console.log(response);
            
        if (!error && response.statusCode == 200) {
            
            // console.log(body, "bus routes");
            // console.log(JSON.parse(body).data.list, "bus routes");
            
////////array to get specific bus routes////////////////////////
            var theRoutes = []
            var routes = JSON.parse(body).data.list;
            routes.forEach(function(route){
                console.log(JSON.parse(body).data.list);
                theRoutes.push(route.shortName)
            });
    //////// array to get bus decriptions //////////////////////////////
            var busDescriptions = []
            var descriptions = JSON.parse(body).data.list;
            descriptions.forEach(function(description) {
                busDescriptions.push(description.description)
            });
      
                }
  ///////////////// this sends the data to the front end ////
                res.send({theRoutes, busDescriptions});
            });
    
    
   //////////// Api call to get bus stops for a particular location ////////////////////
            request({
                url: "http://api.pugetsound.onebusaway.org/api/where/stops-for-location.json?key=TEST&lat="+lat+"&lon="+lng,
                
            }, function (error, response, body) {
                // console.log ("xxnum2", body);

                if (!error && response.statusCode == 200) {
                    // console.log(body, "bus stops for location");
                    console.log(JSON.parse(body).data.list[0].name, "bus stops per location refined");
                    var theStops = []
                    var stops = JSON.parse(body).data.list;
                    stops.forEach(function(stop) {
                        theStops.push(stop.name)
                    });
          //////////////////////// this gets the proper data //////////////////////////////
                    console.log(theStops);
                }
 ///////// cannot send this back without it breakiing it, ////////////////////////
                // res.send({theStops});
            });
   /////////// out of scope, breaks it  ////////////////////////////
            // res.send({theRoutes, busDescriptions, theStops})
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