import React, { Component } from 'react';
import $ from "jquery";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
/* global google */

var axios = require('axios');

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = { 
    ////// unable to set state for routes or descriptions /////////////
            address: 'Seattle, WA', 
            data: [1,2],
            busDescriptions: '',
            theRoutes:[1,2]
            
                
            
            // busNumbers: [1,2],
            // busDescriptions: ''
        }
        this.onChange = (address) => this.setState({ address })
      }
    
      handleFormSubmit = (event) => {
        event.preventDefault()

        // let base = this

        geocodeByAddress(this.state.address)
          .then(results => getLatLng(results[0]))
    ////////////// storing latLng separetly to then send to backend //////////
          .then(latLng => {
            var lat = latLng.lat;
            var lng = latLng.lng;
            console.log(lat, lng);
            axios.post('/bus-routes', {
                lat: lat,
                lng: lng 
            }).then((body) => {
            // }).then(function (json) {
                /* axios.get('/bus-routes'); */
        //////////// this is where I get the json(body) file back, but i can't save it to a state/////
                console.log(body, "here body")
                // console.log(json, 'here');
               
         /////////// this worked on the backend so i tried it here; it didn't work ///////////
                var theRoutesArr = body.data.theRoutes;
                // console.log(theRoutes);

                // var theRoutes = body.data;
                
                //     theRoutes: 
                // })
                console.log(theRoutesArr);
                this.setState({
                    theRoutes: theRoutesArr
                    
                })
                // console.log(theRoutes);
                // routes.forEach(function(route){
                //     theRoutes.push(route.shortName)
                // });


      /////////////cant store json file as a state /////////////
                // base.setState({
                //     data: {
                //         theRoutes: json.theRoutes,
                //         busDescriptions: json.busDescriptions
                //     }
                    
                // }).catch(function(ex) {
                //     console.log('parsing json failed', ex)
                // })
                
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
////////////Axios call does not work here ///////////////////////
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
                    Your Bus Routes for this address: {this.state.theRoutes}
                </div>
            </div>
        )
    }
    
        
}


        

export default Search;