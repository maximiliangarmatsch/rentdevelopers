import React, { Component } from 'react';
import './App.css';
import Register from './components/Developer/register/Register';
import { HashRouter as Router, Route } from 'react-router-dom';
import Login from './components/Developer/login/Login';
import LandingPage from './components/LandingPage';
import Members from './components/client/Members';
import Member from './components/Developer/member/Member';
import MemberDetails from './components/Developer/member/MemberDetails';
import HireForm from './components/client/HireForm/HireForm';
import OrderReceived from './components/client/HireForm/OrderReceived';
import MemberInfo from './components/client/MemberInfo';

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
          <Route exact path='/members/:member' component={MemberInfo} />
          <Route exact path='/hire' component={HireForm} />
          <Route exact path='/order' component={OrderReceived} />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
