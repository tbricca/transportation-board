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
            busDescriptions: [],
            theRoutes:[],
            // theStops: []

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
        
        //////////// this is where I get the json(body) file back, but i can't save it to a state/////
                console.log(body, "here body")
                // console.log(json, 'here');

         /////////// this worked on the backend so i tried it here; it didn't work ///////////
                var theRoutesArr = body.data.theRoutes;
                var theDescriptionsArr = body.data.busDescriptions;
      
                this.setState({
                    theRoutes: theRoutesArr,
                    busDescriptions: theDescriptionsArr,
                    // theStops: theStopsArr
                })
            })
            .catch(function (error) {
                // console.log(theStops);
          ///    ////  // not console logging here 
                // console.log(this.state.theRoutes, "bus descriptiones");
            })
            console.log ('made it here');
            
          })
         
          .catch(error => console.error('Error', error))
      }
      
    render () {

 ////////// this is for converting address to latLong ///////// 
        const inputProps = {
            value: this.state.address,
            onChange: this.onChange,
        }
       
        let busDirections =  this.state.busDescriptions.map((item, index) => (
            <li key = {index}> {item}</li>
        ))

        let mappedBuses =  this.state.theRoutes.map((item, index) => (
            <li key = {index}> {item}</li>
        ))

        // let mappedStops = this.state.theStops.map((item, index) => (
        //     <li key = {index}> {item}</li>
        // ))

          console.log('Just fired AJAX request!');
////////////Axios get call does not work here ///////////////////////
       
        return(
            <div>
                <div className = "title">
                    <h1>Transit Board</h1>
                </div>
                <h4> A board to track the bus routes closest to you in Seattle <b>(Beta Version)</b></h4>
                
                <h6> Insert your address in the text box, click submit and the bus routes will display below.</h6>
                <br />
                <div className = "search-box">
                <form onSubmit={this.handleFormSubmit}>
                    <PlacesAutocomplete inputProps={inputProps} />
                    <button type="submit" class="btn btn-success">Submit</button>
                    {/* <button type="submit">Submit</button> */}
                </form>
                </div>
                <br />
                <div className="card routes" >
                {/* style="width: 20rem;" */}
                    {/* <img className="card-img-top" src="..." alt="Card image cap" /> */}
                    <div className="card-block">
                        <h4 className="card-title"><b>Bus Route Number</b></h4>
                        <p className="card-text">{mappedBuses}</p>
                        <a href="http://kingcounty.gov/depts/transportation/metro/schedules-maps.aspx" className="btn btn-primary">Full King County Bus Schedule</a>
                    </div>
                </div>
                <div className="card descriptions" >
                {/* style="width: 20rem;" */}
                    {/* <img className="card-img-top" src="..." alt="Card image cap" /> */}
                    <div className="card-block">
                        <h4 className="card-title"><b>Bus Route Description</b></h4>
                        <p className="card-text">{busDirections}</p>
                        <a href="http://kingcounty.gov/depts/transportation/metro/schedules-maps/maps/route.aspx" className="btn btn-primary"> King County Bus Map</a>
                    </div>
                    {/* <p> {mappedStops} </p> */}
                </div>
                {/* <div>
                    <h4><b> Bus Routes for this address:</b> {mappedBuses} </h4>
                    <h4><b> Neighbordhoods it goes to:</b> {busDirections} </h4>
                    
                </div> */}

            </div>
        )
    }
    
        
}


        

export default Search;