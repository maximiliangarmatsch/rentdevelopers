import React, {Component} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardUp, MDBCardImage, MDBCardBody, MDBBtn } from "mdbreact";
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import 'rc-calendar/assets/index.css';
import "./HireForm.css";

class HireForm extends Component {
	render() {
		return (
			<MDBContainer fluid className="hireForm">

						<MDBCard className="hireFormCard">
							<h1>Hire Form</h1>
							<MDBCardBody>
								<MDBRow>
									<MDBCol>
										<h2>Choose date</h2>
										<RangeCalendar />
									</MDBCol>
								</MDBRow>
							</MDBCardBody>
						</MDBCard>

			</MDBContainer>
		)
	}
}

export default HireForm;
