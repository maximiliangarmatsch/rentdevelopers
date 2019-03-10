import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Footer from "./footer/Footer";
import Header from "./Header/Header";

import "./Land.css";
import Members from "./client/Members";

class LandingPage extends Component {
  render() {
    return (
      <div>
				<Header
					text4="Login"
					route4="/developer/login"
					text5="Register"
				  route5="/developer/register"
				/>
				<Members/>
				<Footer/>
      </div>
    )
  }
}

export default LandingPage;
