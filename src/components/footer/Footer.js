import React, {Component} from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import {MDBBtn, MDBIcon} from "mdbreact";
import "../../styles/footer.css";

class Footer extends Component{
	render(){
		return (
			<MDBFooter color="blue" className="footer font-small pt-4 mt-4">
				<MDBContainer fluid className="text-center text-md-left">
					<MDBRow>
						<MDBCol md="1" smd="1"/>

						<MDBCol md="3" smd="3">
								<p className="footer-text text-justify">
							Our core development team is located all across europe which let us attract talent from a wider pool.
							</p>
						</MDBCol>

						<MDBCol md="1" smd="1"/>

						<MDBCol md="3" smd="3">
						<p className="footer-text text-justify">
							Through our international network of freelancers, we can call in short-term assistance when needed.</p>
						</MDBCol>

						    <MDBCol md="1" smd="1"/>
						<MDBCol md="3" smd="3">
								<div className="flex-row text-center">
									<div className="footer-follow">Follow us:</div>
									<MDBBtn size="10" social="li" href="https://www.linkedin.com/company/coder-consulting/">
										<MDBIcon fab icon="linkedin-in" />
									</MDBBtn>
									<MDBBtn size="10" social="comm" href="http://coderconsulting.de/contact/">
										<MDBIcon icon="comments" />
									</MDBBtn>
								</div>
						</MDBCol>

						<MDBCol className="colCard" md="3" smd="3"/>
					</MDBRow>
				</MDBContainer>
				<div className="footer-copyright text-center py-3">
					<MDBContainer fluid>
						&copy; {new Date().getFullYear()} Copyright: <a href="http://coderconsulting.de/"> Coder Consulting </a>
					</MDBContainer>
				</div>
			</MDBFooter>
		)
	}
}
export default Footer;
