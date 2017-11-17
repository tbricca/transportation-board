import React, { Component } from 'react';
import $ from "jquery";
import Search from "./Search";

var axios = require('axios');
var cityMapper = "https://developer.citymapper.com/api/1/singlepointcoverage/?coord=51.578973%2C-0.124147&key=8d3b8bb18fc668fdf342d8e09fcf3249";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // routes: {},
            agency: {}
        }

        // this.handleChange = this.handleChange.bind(this)
        // this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount() {
        // this gets the data from the backend
        axios.get('/bus-routes')
            .then(response => { 
                var agency = response.data.agency;
                var routes = response.data.routes;
                this.setState({ agency: agency});
                this.setState({ routes: routes});
                // , routes: routes 
            });
    }
    render() {
        var agency = "loading"
        if (this.state.agency.agency) {
            agency= this.state.agency.agency[0].name[0];
        };
        var routes = "loading"
        var routeDescription = "loading"
        if (this.state.routes) {
            //  do a map to iterate through all the elements in the array
            routes= this.state.routes[0].shortName,
            routeDescription = this.state.routes[0].description
            // routes=this.state.routes.routes[0]
        }
        // let busRoute = this.state.busRoutes;
        // if (this.state.busRoutes){
        // 
        return (
            <div>
            <Search />
            <p> Agency: {agency} Bus Routes: {routes} Route Description: {routeDescription} </p>
            <p>Place second api here</p>
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