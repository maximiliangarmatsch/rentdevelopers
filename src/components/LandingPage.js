import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Footer from "./footer/Footer";

class LandingPage extends Component {
  render() {
    return (
      <div>
        <Link to='/developer/register'>I am Developer</Link>
        <hr />
        <Link to='/members'>I am Client</Link>
				<Footer/>
      </div>
    )
  }
}

export default LandingPage;
