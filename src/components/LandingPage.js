import React, { Component } from 'react';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import Members from './Client/Members';

class LandingPage extends Component {
    render() {
        return (
            <div>
                <Header
                    text1="User"
                    route1={`/developer/member/${localStorage.getItem(
                        'username'
                    )}`}
                    text4="Login"
                    text2="Logout"
                    route4="/developer/login"
                    text5="Register"
                    text3="Details"
                    route5="/developer/register"
                />
                <Members />
                <Footer />
            </div>
        );
    }
}

export default LandingPage;
