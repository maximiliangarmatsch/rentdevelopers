import React, { Component } from 'react';
import {
	MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse
} from "mdbreact";
import "../../styles/header.css";
import { Link, withRouter } from 'react-router-dom';
import logo1 from '../Library/logo1.png';

class Header extends Component {
	state = {
		isOpen: false
	};

	toggleCollapse = () => {
		this.setState({ isOpen: !this.state.isOpen });
	};

	onLogout = (e) => {
		localStorage.setItem('token', '');
		localStorage.setItem('username', '');
		localStorage.setItem('user_id', '');
		this.props.history.push('/')
	}

	onUserDetails = (e) => {
		this.props.history.push(`/developer/member/${localStorage.getItem('username')}/details`);
		e.preventDefault()
	}

	/*DEV COMMENTARY AFTER IMPLEMENTING DELETE MenuItem1... texts AND QUOTES IN to ATTRIBUTE*/
	render() {
		let clientHeader = null;
		if (localStorage.getItem('username') === '') {
			clientHeader = <MDBNavbarNav right >
				<MDBNavItem>
					<MDBNavLink className="head-link-base head-link-4" to={this.props.route4}>{this.props.text4}</MDBNavLink>
				</MDBNavItem>
				<MDBNavItem>
					<MDBNavLink className="head-link-base head-link-5" to={this.props.route5}>{this.props.text5}</MDBNavLink>
				</MDBNavItem>
			</MDBNavbarNav>
		} else {
			clientHeader = <MDBNavbarNav right >
				<MDBNavItem>
					<MDBNavLink to={this.props.route1}>{this.props.text1}</MDBNavLink>
				</MDBNavItem>
				<MDBNavItem>
					<MDBNavLink className="head-link-base head-link-4" to="#" onClick={this.onUserDetails}>{this.props.text3}</MDBNavLink>
				</MDBNavItem>
				<MDBNavItem >
					<MDBNavLink to="#" onClick={this.onLogout}>{this.props.text2}</MDBNavLink>
				</MDBNavItem>
			</MDBNavbarNav>
		}

		return (
			<MDBNavbar className="nav-bar" style={{ lineHeight: "2em" }} dark expand="md">
				<div className="nav-display">
					<MDBNavbarToggler className="nav-toggler" onClick={this.toggleCollapse} />
					<MDBNavbarNav style={{ flexDirection: "row" }}>{/*active*/}
						<MDBNavbarBrand><Link to="/"><h3>CCAPP</h3></Link></MDBNavbarBrand>
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
					{clientHeader}
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

export default withRouter(Header);
