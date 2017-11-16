import React, { Component } from 'react';
import $ from "jquery";


class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            location: ""
        }
    }
    handleSubmit = (e) => {
        var getLocation = axios.get('https://maps.googleapis.com/maps/api/geocode/json?address='+this.state.location+'&key='+'AIzaSyACjP02sW8yzMCfY0Nm7289ZZrDKFpxOxo')
        .then((latLng) => {
          console.log("latLng: ", latLng);
          tempLocationLat = latLng.data.results[0].geometry.location.lat;
          tempLocationLng = latLng.data.results[0].geometry.location.lng;
          counter++;
        });
    }
    handleLocationChange = (e) => {
        this.setState({location: e.target.value});
    }

    render () {
        return(
            <div>
                <h1>Transit Board</h1>
                <h4> A board to track all the transit around you </h4>
                <input className="searchbox" type='text' placeholder="Search by city..." value={this.state.location} onChange={this.handleLocationChange} />
            </div>
        )
    }
        





}
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        

export default Search;