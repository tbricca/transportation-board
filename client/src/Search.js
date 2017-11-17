import React, { Component } from 'react';
import $ from "jquery";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
/* global google */

var axios = require('axios');

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            address: 'Seattle, WA', 
            data: {
                theRoutes:[1,2],
                busDescriptions: ''
            }
                
            
            // busNumbers: [1,2],
            // busDescriptions: ''
        }
        this.onChange = (address) => this.setState({ address })
      }
    
      handleFormSubmit = (event) => {
        event.preventDefault()

        let base = this

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
            }).then(function (json) {
                /* axios.get('/bus-routes'); */
                console.log(json, 'here');

                base.setState({
                    data: {
                        theRoutes: json.theRoutes,
                        busDescriptions: json.busDescriptions
                    }
                    
                }).catch(function(ex) {
                    console.log('parsing json failed', ex)
                })
                
                // console.log(response.data.busDescriptions);

                // var busNumbers = response.data.theRoutes;
                
                // console.log(busNumbers);
               
                
            })
            .catch(function (error) {
                console.log(error);
            })
            console.log ('made it here');
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
        $.get('/busRoutes', {
            q: 'theRoutes'
          }).done(function(data) {
            console.log(data, 'data call here');
          });
          
          console.log('Just fired AJAX request!');
        // axios.get('/bus-routes')
        // .then(response => { 
        //     console.log(response, "XKDJFFNJD");
        //     var theRoutes = response.data.theRoutes;
        //     var busDescriptions = response.data.busDescriptions;
        //     this.setState({ theRoutes: theRoutes});
        //     this.setState({ busDescriptions: busDescriptions});
        // });
        // console.log(response);
        // this.setState({
        //     busNumbers: response.data.theRoutes,
        // }) 
        return(
            <div>
                <h1>Transit Board</h1>
                <h4> A board to track all the transit around you </h4>
                <form onSubmit={this.handleFormSubmit}>
                    <PlacesAutocomplete inputProps={inputProps} />
                    <button type="submit">Submit</button>
                </form>
                <div>
                    {/* {busNumbers} */}
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