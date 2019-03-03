import React, {Component} from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { MDBCard, MDBCardTitle, MDBCardText } from "mdbreact";
import {MDBBtn, MDBIcon} from "mdbreact";
import "./footer.css";

class Footer extends Component{
	render(){
		return (
			<MDBFooter color="blue" className="footer font-small pt-4 mt-4">
				<MDBContainer fluid className="text-center text-md-left">
					<MDBRow>
						<MDBCol md="3" smd="3">
							<h5 className="title">Coder Consulting</h5>
							<p className=" par1 text-justify">
								Our core development team is located all across europe which let us attract talent from a wider pool.
								Through our international network of freelancers, we can call in short-term assistance when needed.
							</p>
						</MDBCol>
						<MDBCol md="6" smd="6"/>
						<MDBCol className="colCard" md="3" smd="3">
							<MDBCard className="card-body" style={{ width: "100%", marginTop: "0.1rem", background: "#4b99ff	"}}>
								<MDBCardTitle>Useful links</MDBCardTitle>
								<MDBCardText>
									Here are some useful links
								</MDBCardText>
								<div className="flex-row">
									<MDBBtn size="10" social="li" href="https://www.linkedin.com/company/coder-consulting/">
										<MDBIcon fab icon="linkedin-in" />
									</MDBBtn>
									<MDBBtn size="10" social="comm" href="http://coderconsulting.de/contact/">
										<MDBIcon icon="comments" />
									</MDBBtn>
								</div>
							</MDBCard>
						</MDBCol>
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
