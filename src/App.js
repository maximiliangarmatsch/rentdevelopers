import React, { Component } from 'react';
import './App.css';
import Register from './components/developer/register/Register';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/developer/login/Login';
import LandingPage from './components/LandingPage';
import Members from './components/client/Members';
import HireForm from './components/client/HireForm/HireForm';
import Member from './components/developer/Member';
import { Provider } from './context';

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <React.Fragment>

            <Route exact path='/' component={LandingPage} />

            {/* For Developers */}
            <Route exact path='/developer/login' component={Login} />
            <Route exact path='/developer/register' component={Register} />
            <Route exact path='/developer/member' component={Member} />

            {/* For Client */}
            <Route exact path='/members' component={Members} />
            <Route exact path='/hire' component={HireForm} />

          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
