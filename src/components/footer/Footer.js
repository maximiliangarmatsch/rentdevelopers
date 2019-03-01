import React, {Component} from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { MDBCard, MDBCardTitle, MDBCardText } from "mdbreact";
import {MDBBtn, MDBIcon} from "mdbreact";
import "./footer.css";

class Footer extends Component{
	render(){
		return (
			<MDBFooter color="blue" className="font-small pt-4 mt-4">
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
							<MDBCard className="card-body" style={{ width: "22rem", marginTop: "0.1rem", background: "#4b99ff	"}}>
								<MDBCardTitle>Useful links</MDBCardTitle>
								<MDBCardText>
									Here are some useful links
								</MDBCardText>
								<div className="flex-row">
									<MDBBtn size="lg" social="li">
										<MDBIcon fab icon="linkedin-in" />
									</MDBBtn>
									<MDBBtn size="lg" social="fb">
										<MDBIcon fab icon="facebook-f" />
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
