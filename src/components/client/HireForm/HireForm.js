import React, {Component} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBInput, MDBCardBody, MDBBtn } from "mdbreact";
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import 'rc-calendar/assets/index.css';
import "./HireForm.css";

class HireForm extends Component {
	state = {
		hours: 0,
		cost: 0
	}

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
										<h4>Daily work hours</h4>
										<MDBInput type="number" outline/>
										<h4>How many working days throughout this week </h4>
										<MDBInput type="number" outline/>
										<h4>Total hours: {this.state.hours}/h</h4>
										<hr/>
										<h1>Total Cost: ${this.state.cost}</h1>
										<div className="hireFormSubmit">
											<MDBBtn color="primary">Make an order</MDBBtn>
										</div>

									</MDBCol>
								</MDBRow>
							</MDBCardBody>
						</MDBCard>

			</MDBContainer>
		)
	}
}

export default HireForm;
