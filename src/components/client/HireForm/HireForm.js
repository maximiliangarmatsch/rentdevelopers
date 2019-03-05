import React, {Component} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardUp, MDBCardImage, MDBCardBody, MDBBtn } from "mdbreact";
import Calendar from 'rc-calendar';

class HireForm extends Component {
	render() {
		return (
			<MDBContainer className="hireForm">
				<MDBRow>
					<MDBCol>
						<MDBCard>
							<MDBCardBody>
								Hire Form
								<Calendar />
							</MDBCardBody>
						</MDBCard>
					</MDBCol>
				</MDBRow>
			</MDBContainer>
		)
	}
}

export default HireForm;
