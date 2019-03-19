import React, { Component } from 'react'
import Header from '../../Header/Header';
import { Link } from 'react-router-dom';

class FillData extends Component {
  render() {
    return (
      <div>
				<Header
					text1='User'
					route1={`/developer/member/${localStorage.getItem('username')}`}
					text2="Logout"
					route4="/developer/login"
					text3="Details"
					route5="/developer/register" />
        <h3 style={{marginTop: "5rem", textAlign:"center"}}>
					Welcome {localStorage.getItem('username')}, please fill your
					<Link to={`/developer/member/${localStorage.getItem('username')}/details`}>	profile</Link> first</h3>
      </div>
    )
  }
}

export default FillData;
