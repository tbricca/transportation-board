import React, { Component } from 'react';
import $ from "jquery";

var axios = require('axios');
var cityMapper = "https://developer.citymapper.com/api/1/singlepointcoverage/?coord=51.578973%2C-0.124147&key=8d3b8bb18fc668fdf342d8e09fcf3249";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            routes: [],
            agency: []
        }

        // this.handleChange = this.handleChange.bind(this)
        // this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount() {
        // this gets the data from the backend
        axios.get('/bus-routes')
            .then(response => {
                this.setState({ agency: response.data.agency, routes:response.data.routes });
            });
    }
    render() {
        // let busRoute = this.state.busRoutes;
        // if (this.state.busRoutes){
        // console.log( this.state.busRoutes );
        return (
            <div>
            <h1>Transit Board</h1>
            <h4> A board to track all the transit around you </h4>
            <input className="searchbox" type='text' placeholder="Input your address here..." />
            <p> Agency: {this.state.agency} Bus Routes: {this.state.routes} </p>
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