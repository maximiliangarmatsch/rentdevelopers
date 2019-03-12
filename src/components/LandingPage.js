import React, { Component } from 'react';
import Footer from "./footer/Footer";
import Header from "./Header/Header";

import "./Land.css";
import Members from "./client/Members";

class LandingPage extends Component {
	render() {
		return (
			<div>
				<Header
					text1='User'
					route1={`/developer/member/${localStorage.getItem('username')}`}
					text4="Login"
					text2='Logout'
					route4="/developer/login"
					text5="Register"
					text3='Details'
					route5="/developer/register"
				/>
				<Footer />
			</div>
		)
	}
}

export default LandingPage;
