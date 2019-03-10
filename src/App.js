import React, { Component } from 'react';
import './App.css';
import Register from './components/developer/register/Register';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/developer/login/Login';
import LandingPage from './components/LandingPage';
import Members from './components/client/Members';
import Member from './components/developer/member/Member';
import MemberDetails from './components/developer/member/MemberDetails';

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>

          <Route exact path='/' component={LandingPage} />

          {/* For Developers */}
          <Route exact path='/developer/login' component={Login} />
          <Route exact path='/developer/register' component={Register} />
          <Route exact path='/developer/member/:userNicename' component={Member} />
          <Route exact path='/developer/member/:userNicename/details' component={MemberDetails} />

          {/* For Client */}
          <Route exact path='/members' component={Members} />

        </React.Fragment>
      </Router>
    );
  }
}

export default App;
