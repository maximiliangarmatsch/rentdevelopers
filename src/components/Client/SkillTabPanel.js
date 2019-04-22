import React, {Component} from "react";
import {MDBRow,MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBContainer } from "mdbreact";

class SkillTabPanel extends Component{
	render () {
		const data = this.props.data;
		const lang = data.language.language_name;
		return (
			<div>
				{lang}
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
