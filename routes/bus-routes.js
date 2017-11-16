var express = require("express");
var router = express.Router();
var axios = require('axios');

var apiUrl = 'http://api.pugetsound.onebusaway.org/api/where/routes-for-location.xml?key=ec76e3f1-3c97-4f4a-a55e-447cfffa457b&lat=47.6120&lon=-122.335167';
var cityMapper = "https://developer.citymapper.com/api/1/singlepointcoverage/?coord=51.578973%2C-0.124147&key=8d3b8bb18fc668fdf342d8e09fcf3249";

var request = require('request');


router.get("/", function(req, res, next){
    console.log("you got hit");

    // request call
    
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
       
            
    //     //     <currentTime>1270614730908</currentTime>
    //   <data class="listWithReferences">
    //   <references>...</references>
    //   <list>
    //     <route>...</route>
    //     <!-- More routes -->
    //   </list>
       
    
        request({
        url: "http://api.pugetsound.onebusaway.org/api/where/routes-for-location.xml?key=ec76e3f1-3c97-4f4a-a55e-447cfffa457b&lat=47.653435&lon=-122.305641",
        // busRoute: busRoute
        }, function (error, response, body) {
            console.log(response);
        if (!error && response.statusCode == 200) {
            var dataObj = JSON.parse(body);
           res.send(dataObj.Search);
        }
        });
});

module.exports = router