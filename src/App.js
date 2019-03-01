import React, { Component } from 'react';
import './App.css';
import Register from './components/developer/Register';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/developer/Login';
import LandingPage from './components/LandingPage';
import Members from './components/client/Members';

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>

          <Route exact path='/' component={LandingPage} />

          {/* For Developers */}
          <Route exact path='/developer/login' component={Login} />
          <Route exact path='/developer/register' component={Register} />

          {/* For Client */}
          <Route exact path='/members' component={Members} />

        </React.Fragment>
      </Router>
    );
  }
}

export default App;
