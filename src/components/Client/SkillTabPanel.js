import React, {Component} from "react";
import {MDBRow,MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBContainer } from "mdbreact";

class SkillTabPanel extends Component{
	render () {
		return (
			<div>
				{this.props.data.stack}
				<MDBRow>
					<MDBCol>
				<MDBContainer>
					<MDBCard className="card-body" style={{  marginTop: "1rem" }}>
						<MDBCardTitle>Basic</MDBCardTitle>
						<MDBCardBody>Checkboxes will go here.</MDBCardBody>
					</MDBCard>
				</MDBContainer>
					</MDBCol>
					<MDBCol>
				<MDBContainer>
					<MDBCard className="card-body" style={{  marginTop: "1rem" }}>
						<MDBCardTitle>Advanced</MDBCardTitle>
						<MDBCardBody>Checkboxes will go here.</MDBCardBody>
					</MDBCard>
				</MDBContainer>
					</MDBCol>
					<MDBCol>
				<MDBContainer>
					<MDBCard className="card-body" style={{  marginTop: "1rem" }}>
						<MDBCardTitle>Expert</MDBCardTitle>
						<MDBCardBody>Checkboxes will go here.</MDBCardBody>
					</MDBCard>
				</MDBContainer>
					</MDBCol>
				</MDBRow>
			</div>
		)
	}
}

export default SkillTabPanel;
