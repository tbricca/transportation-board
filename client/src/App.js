import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import './App.css';
import Signup from './Signup';
import Login from './Login';
import Logout from './Logout';
import Home from './Home';
import UserProfile from './UserProfile';
import axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: '',
      user: {}
    }
    this.liftTokenToState = this.liftTokenToState.bind(this)
    this.logout = this.logout.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
  }

  liftTokenToState(data) {
    this.setState({token: data.token, user: data.user})
  }

  logout() {
    localStorage.removeItem('mernToken')
    this.setState({token: '', user: {}})
  }

  componentDidMount() {
    // If there is a token in localStorage
    var token = localStorage.getItem('mernToken')
    if (token === 'undefined' || token === null || token === '' || token === undefined) {
      localStorage.removeItem('mernToken')
      this.setState({
        token: '',
        user: {}
      })
    } else {
      //   Validate the token against the server
      axios.post('/auth/me/from/token', {
        token: token
      }).then(response => {
        //   Store the token and user
        localStorage.setItem('mernToken', response.data.token)
        this.setState({
          token: response.data.token,
          user: response.data.user
        })
        //   Pass User into child components and display main app
      }).catch(err => {
        // Both the JWT and db errors will be caught here
        console.log(err)
      })
    }
  }

  render() {
    var theUser = this.state.user
    if (typeof this.state.user === 'object' && Object.keys(this.state.user).length !== 0) {
      return (
        <div className='App'>
          <UserProfile user={this.state.user} logout={this.logout} />
        </div>
      );
    } else {
      return (
        <div>
          <Router>
        <div className='App'>
           <div className="container-fluid">
            <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
                {/* <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button> */}
                <Link className="navbar-brand" to="/">Transit Screen</Link>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                  <div className="navbar-nav">
                  <li><Link to="login"><span className="glyphicon glyphicon-log-in"></span>Login</Link></li>
                  <li><Link to="signup"><span className="glyphicon glyphicon-signup"></span>Signup</Link></li>
                    {/* <a className="nav-item nav-link" href="#">Signup</a> */}
                  </div>
                  {/* <ul className="nav navbar-nav navbar-right">
                  <li><Link to="signup"><span className="glyphicon glyphicon-user"></span>Sign Up</Link></li>
                  <li><Link to="login"><span className="glyphicon glyphicon-log-in"></span>Login</Link></li>
                </ul> */}
                </div>
              </nav>
              {/* <div className='SignupBox'>
                <Signup lift={this.liftTokenToState} />
              </div>

              <div className='LoginBox'>
                <Login lift={this.liftTokenToState} />
              </div> */}
              
          </div>
            <Route exact path="/" render={(props) => <Home />}/>
             {/* Link to log in log out paths */}
            <Route path="/login" render={(props)=> <Login lift={this.liftTokenToState} />} />
            <Route path="/signup" render={(props)=> <Signup lift={this.liftTokenToState} />} />
        </div>
      </Router>
      </div>       
      );
    }
  }
}

export default App;
