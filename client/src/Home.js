import React, { Component } from 'react';
import $ from "jquery";

var axios = require('axios');
var cityMapper = "https://developer.citymapper.com/api/1/singlepointcoverage/?coord=51.578973%2C-0.124147&key=8d3b8bb18fc668fdf342d8e09fcf3249";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            busRoutes: {}
        }

        // this.handleChange = this.handleChange.bind(this)
        // this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount() {
        // this gets the data from the backend
        fetch('/bus-routes')
        .then(busRoutes => {
            console.log ( 'busRoutes' );
            console.log (busRoutes.data);
            this.setState({ busRoutes });
        });
        
        
        // var base = this
        // let cityMapperApi = "https://developer.citymapper.com/api/1/singlepointcoverage/?coord=51.578973%2C-0.124147&key=8d3b8bb18fc668fdf342d8e09fcf3249";
        // fetch (cityMapperApi)
        // .then((response) => {
        //     console.log(response);
        //     return response.json()
        // }).then((json) => {
        //     base.setState({ busRoutes: json.busRoute});
        // }).catch((ex) => {
        //     console.log('An error hath befallen the', ex)
        // })
    }
    
    // handleChange(event) {
    //     this.setState({zipcode: event.target.value})
    //     console.log('Y')
    // }

    
    // handleCityMapperSubmit = (e) => {
    //     $.ajax({
    //         url: cityMapper,
    //         type: "GET",
    //         data: {},
    //         dataType: 'json',
    //         success: function(data) {
    //             console.log(data);
    //         },
    //         error:function(err) {alert(err); }
    //     });
    // }
    

    // componentDidMount() {
    //     fetch('/bus-routes')
    //     .then(busRoutes => {
    //         console.log( 'busRoutes');
    //         this.setState({ busRoutes });
    //     });
    // }
    render() {
        // let busRoute = this.state.busRoutes;
        // if (this.state.busRoutes){
        console.log( this.state.busRoutes );
        return (
            <div>
            <h1>Transit Board</h1>
            <h4> A board to track all the transit around you </h4>
            <input className="searchbox" type='text' placeholder="Input your address here..." />
            {/* <p> Bus Api Call {busRoutes} </p> */}
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