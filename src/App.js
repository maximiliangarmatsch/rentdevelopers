import React, { Component } from 'react';
import './App.css';
import Register from './components/Developer/Register/Register';
import { HashRouter as Router, Route } from 'react-router-dom';
import Login from './components/Developer/Login/Login';
import LandingPage from './components/LandingPage';
import Members from './components/Client/Members';
import Member from './components/Developer/Member/Member';
import MemberDetails from './components/Developer/Member/MemberDetails';
import HireForm from './components/Client/HireForm/HireForm';
import OrderReceived from './components/Client/HireForm/OrderReceived';
import MemberInfo from './components/Client/MemberInfo';

class App extends Component {
    render() {
        return (
            <Router>
                <React.Fragment>
                    <Route exact path="/" component={LandingPage} />

                    {/* For Developers */}
                    <Route exact path="/developer/login" component={Login} />
                    <Route
                        exact
                        path="/developer/register"
                        component={Register}
                    />
                    <Route
                        exact
                        path="/developer/member/:userNicename"
                        component={Member}
                    />
                    <Route
                        exact
                        path="/developer/member/:userNicename/details"
                        component={MemberDetails}
                    />

                    {/* For Client */}
                    <Route exact path="/members" component={Members} />
                    <Route
                        exact
                        path="/members/:member"
                        component={MemberInfo}
                    />
                    <Route exact path="/hire" component={HireForm} />
                    <Route exact path="/order" component={OrderReceived} />
                </React.Fragment>
            </Router>
        );
    }
}

export default App;
