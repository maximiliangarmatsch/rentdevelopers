import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LandingPage extends Component {
  render() {
    return (
      <div>
        <Link to='/developer/register'>I am Developer</Link>
        <hr />
        <Link to='/members'>I am Client</Link>
      </div>
    )
  }
}

export default LandingPage;
