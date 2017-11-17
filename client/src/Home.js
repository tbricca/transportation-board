import React, { Component } from 'react';
import $ from "jquery";
import Search from "./Search";

var axios = require('axios');
var cityMapper = "https://developer.citymapper.com/api/1/singlepointcoverage/?coord=51.578973%2C-0.124147&key=8d3b8bb18fc668fdf342d8e09fcf3249";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theRoutes: {},
            agency: {}
        }

        // this.handleChange = this.handleChange.bind(this)
        // this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount() {
        // this gets the data from the backend
        axios.get('/bus-routes')
            .then(response => { 
                console.log(response, "XKDJFFNJD");
                var theRoutes = response.data.theRoutes;
                var busDescriptions = response.data.busDescriptions;
                this.setState({ theRoutes: theRoutes});
                this.setState({ busDescriptions: busDescriptions});
                // , routes: routes 
            });
    }
    render() {
        var theRoutes = "loading"
        // if (this.state.theRoutes) {
        //     theRoutes = this.state.theRoutes;
        // };
        console.log(theRoutes,"routes");
        // axios.get('/bus-routes')
        // .then(response => { 
        //     console.log(response, "XKDJFFNJD");
        //     var theRoutes = response.data.theRoutes;
        //     var busDescriptions = response.data.busDescriptions;
        //     this.setState({ theRoutes: theRoutes});
        //     this.setState({ busDescriptions: busDescriptions});
        //     // , routes: routes 
        // });
        // $.get('/busRoutes', {
        //     q: 'theRoutes'
        //   }).done(function(data) {
        //     console.log(data, 'data call here');
        //   });
          
        //   console.log('Just fired AJAX request!');


        // var agency = "loading"
        // if (this.state.agency.agency) {
        //    agency= this.state.agency.agency[0].name[0];
        //    console.log(agency);
        // };
        // var routes = "loading"
        // var routeDescription = "loading"
        // if (this.state.routes) {
            //  do a map to iterate through all the elements in the array
            // routes= this.state.routes[0].shortName,
            // routeDescription = this.state.routes[0].description
            // routes=this.state.routes.routes[0]
        // }
        // let busRoute = this.state.busRoutes;
        // if (this.state.busRoutes){
        // 
        return (
            <div>
            <Search />
            <div className="container-fluid">
            <div className="card">
            <div className="card-block">
            
            {/* <h4> Agency: {agency} </h4> */}
            <h4>Bus Routes: {theRoutes} </h4>
            {/* <h4>Route Description: {routeDescription} </h4> */}
            </div>
            </div>
            
            <p>Place second api here</p>
            </div>
            </div>
        )
        
    }
    
        // return (
        //     <div>
        //         <p>Give it a moment would ya?</p>
        //     </div>
        // )
    
}

export default Home;