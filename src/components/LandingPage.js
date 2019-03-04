import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBJumbotron } from "mdbreact";
import Logo from "../images/logo.png";
import Leftlogo from "../images/leftlogo.png";

import "./Land.css";

class LandingPage extends Component {
	render() {
		return (

			<MDBContainer>

				<MDBRow>
					<MDBJumbotron className="mx-auto">
						<img src={Logo} className="img-fluid" alt="Responsive image" />
					</MDBJumbotron>
				</MDBRow>

				<MDBRow className="links">
					<Link to='/developer/register'>I am Developer</Link>
					<hr />
					<Link to='/members'>I am Client</Link>
				</MDBRow>

			</MDBContainer>

		)
	}
}

export default LandingPage;
