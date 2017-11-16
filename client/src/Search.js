import React, { Component } from 'react';
import $ from "jquery";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
/* global google */

var axios = require('axios');

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = { address: 'San Francisco, CA' }
        this.onChange = (address) => this.setState({ address })
      }
    
      handleFormSubmit = (event) => {
        event.preventDefault()
    
        geocodeByAddress(this.state.address)
          .then(results => getLatLng(results[0]))
          .then(latLng => console.log('Success', latLng))
          // get call to upload latLong
        //   .then(latln axios.get("/bus-Routes"))
          .catch(error => console.error('Error', error))
      }
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         location: ""
    //     }
    // }
    // handleSubmit = (e) => {
    //     let tempLocationLat = "";
    //     let tempLocationLng = "";
    //     var getLocation = axios.get('https://maps.googleapis.com/maps/api/geocode/json?address='+this.state.location+'&key='+'AIzaSyACjP02sW8yzMCfY0Nm7289ZZrDKFpxOxo&libraries=places&callback=initAutocomplete')
    //     .then((latLng) => {
    //       console.log("latLng: ", latLng);
    //       tempLocationLat = latLng.data.results[0].geometry.location.lat;
    //       tempLocationLng = latLng.data.results[0].geometry.location.lng;
          
    //     });
    // }
    // handleLocationChange = (e) => {
    //     this.setState({location: e.target.value});
    // }

    render () {
        const inputProps = {
            value: this.state.address,
            onChange: this.onChange,
        }
        return(
            <div>
                <h1>Transit Board</h1>
                <h4> A board to track all the transit around you </h4>
                <form onSubmit={this.handleFormSubmit}>
                    <PlacesAutocomplete inputProps={inputProps} />
                    <button type="submit">Submit</button>
                </form>
                <input className="searchbox" type='text' placeholder="Search by city..." value={this.state.location} onChange={this.handleLocationChange} />
            </div>
        )
    }
        
}
        
        
// geocodeByAddress(this.state.address)
// .then(results => getLatLng(results[0]))
// .then(latLng => console.log('Success', latLng))

// .catch(error => console.error('Error', error))

// }

        

export default Search;