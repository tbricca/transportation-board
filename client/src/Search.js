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
          // storing latLng separetly to then send to backend 
          .then(latLng => {
            var lat = latLng.lat;
            var lng = latLng.lng;
            console.log(lat, lng);
          })
            
          

        //   .then(results => {
        //     var location = getLatLng(results[0])
        //     this.setState({
        //         location:location
        //     })
        //   })

          // get call to upload latLong
        //   .then(latln axios.get("/bus-Routes"))
          .catch(error => console.error('Error', error))
      }
      

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