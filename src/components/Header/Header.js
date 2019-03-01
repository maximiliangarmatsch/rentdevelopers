import React, {Component} from 'react';
import {
	MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink} from "mdbreact";

class Header extends Component{

   /*DEV COMMENTARY AFTER IMPLEMENTING DELETE MenuItem1... texts AND QUOTES IN to ATTRIBUTE*/
	render() {
		return (
			<MDBNavbar color="blue-gradient" dark expand="md">
				<MDBNavbarBrand>
					<strong className="white-text">Coder Consulting</strong>
				</MDBNavbarBrand>
					<MDBNavbarNav left>
						<MDBNavItem active>
							<MDBNavLink to="{this.props.route1}">{this.props.text1} MenuItem1</MDBNavLink>
						</MDBNavItem>
						<MDBNavItem>
							<MDBNavLink to="{this.props.route2}">{this.props.text2}| MenuItem2</MDBNavLink>
						</MDBNavItem>
						<MDBNavItem>
							<MDBNavLink to="{this.props.route3}">{this.props.text3}| MenuItem3</MDBNavLink>
						</MDBNavItem>
						<MDBNavItem>
						</MDBNavItem>
					</MDBNavbarNav>
					<MDBNavbarNav right>
						<MDBNavItem>
							<MDBNavLink to="{this.props.route4}">{this.props.text4}| MenuItem4</MDBNavLink>
						</MDBNavItem>
						<MDBNavItem>
							<MDBNavLink to="{this.props.route5}">{this.props.text5}| MenuItem5</MDBNavLink>
						</MDBNavItem>
					</MDBNavbarNav>
			</MDBNavbar>
		);
	}
}
export default Header;
