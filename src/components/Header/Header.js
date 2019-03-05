import React, {Component} from 'react';
import {
	MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse
} from "mdbreact";
import "../../styles/header.css";
class Header extends Component {
	state = {
		isOpen: false
	};

	toggleCollapse = () => {
		this.setState({ isOpen: !this.state.isOpen });
	};

   /*DEV COMMENTARY AFTER IMPLEMENTING DELETE MenuItem1... texts AND QUOTES IN to ATTRIBUTE*/
	render() {
		return (
			<MDBNavbar color="blue-gradient" dark expand="md">
        <div className="nav-display">
				<MDBNavbarToggler onClick={this.toggleCollapse} />
						<MDBNavbarNav   style={{flexDirection: "row"}}>{/*active*/}
							<MDBNavbarBrand><h3 className="nav-heading">CCAPP</h3></MDBNavbarBrand>
						</MDBNavbarNav>
				</div>
				<MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
					{/*	<MDBNavbarNav left>
						<MDBNavItem >
							<MDBNavLink to={this.props.route1}>{this.props.text1}</MDBNavLink>
						</MDBNavItem>
						<MDBNavItem>
							<MDBNavLink to={this.props.route2}>{this.props.text2}</MDBNavLink>
						</MDBNavItem>
						<MDBNavItem>
							<MDBNavLink to={this.props.route3}>{this.props.text3}</MDBNavLink>
						</MDBNavItem>
						<MDBNavItem>
						</MDBNavItem>
					</MDBNavbarNav> */}
					<MDBNavbarNav right >
						<MDBNavItem>
							<MDBNavLink className="HeadLink" to={this.props.route4}>{this.props.text4}</MDBNavLink>
						</MDBNavItem>
						<MDBNavItem>
							<MDBNavLink className="HeadLink" to={this.props.route5}>{this.props.text5}</MDBNavLink>
						</MDBNavItem>
					</MDBNavbarNav>
				</MDBCollapse>

			</MDBNavbar>
		);
	}
}

Header.defaultProps = {
  route1: "",
  route2: "",
	route3: "",
	route4: "",
	route5: "",
	text1: null,
	text2: null,
	text3: null,
	text4: null,
	text5: null
};

export default Header;
