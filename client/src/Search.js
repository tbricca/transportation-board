import React, { Component } from 'react';
import $ from "jquery";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
/* global google */

var axios = require('axios');

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            address: 'San Francisco, CA', 
            // transit:{}
        }
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
            axios.post('/bus-routes', {
                lat: lat,
                lng: lng 
            }).then(response => {
                axios.get('/bus-routes');
                console.log(response, 'here');
                console.log(response.data);
                this.onChange = (transit) => this.setState({ transit })
                    // transit:response.data
                    // descriptions:response.data.busDescriptions
                })
                console.log(transit);
                
            })
            .catch(function (error) {
                console.log(error);
            })
            console.log ('made it here');
          }

        //   .then(results => {
        //     var location = getLatLng(results[0])
        //     this.setState({
        //         location:location
        //     })
        //   })

          // get call to upload latLong
        //   .then(latln axios.get("/bus-Routes"))
        //   .catch(error => console.error('Error', error))
      }
      

    render () {
        const inputProps = {
            value: this.state.address,
            onChange: this.onChange,
        }
        // var transit = this.state.transit.map((item, index) => (<p>item.number</p>))
        return(
            <div>
                <h1>Transit Board</h1>
                <h4> A board to track all the transit around you </h4>
                <form onSubmit={this.handleFormSubmit}>
                    <PlacesAutocomplete inputProps={inputProps} />
                    <button type="submit">Submit</button>
                </form>
                <div>
                    {/* {transit} */}
                </div>
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