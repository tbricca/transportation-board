import React, { Component } from 'react';
import axios from "axios";
import $ from "jquery";


var cityMapper = "https://developer.citymapper.com/api/1/singlepointcoverage/?coord=51.578973%2C-0.124147&key=8d3b8bb18fc668fdf342d8e09fcf3249";

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            busRoutes: []
        }
    }
    handleCityMapperSubmit = (e) => {
        $.ajax({
            url: cityMapper,
            type: "GET",
            data: {},
            dataType: 'json',
            success: function(data) {
                console.log(data);
            },
            error:function(err) {alert(err); }
        });
    }
    

    // componentDidMount() {
    //     fetch('/bus-routes')
    //     .then(busRoutes => {
    //         console.log( 'busRoutes');
    //         this.setState({ busRoutes });
    //     });
    // }
    render() {
        return (
            <div>
            <h1>Transit Board</h1>
            <h4> A board to track all the transit around you </h4>
            <input className="searchbox" type='text' placeholder="Input your address here..." />
            <p> This is where the api's will start to go </p>
          </div>
        )
    }
}

export default Home;