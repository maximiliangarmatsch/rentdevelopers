import React, {Component} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardUp, MDBCardImage, MDBCardBody, MDBBtn } from "mdbreact";
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import 'rc-calendar/assets/index.css';
import "./HireForm.css";

const formatStr = 'YYYY-MM-DD';
function format(v) {
	return v ? v.format(formatStr) : '';
}

function onStandaloneSelect(value) {
	console.log('onSelect');
	console.log(format(value[0]), format(value[1]));

	const date2 = new Date(format(value[0]));
	const date1 = new Date(format(value[1]));
	const timeDiff = Math.abs(date2.getTime() - date1.getTime());
	const dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
	console.log("Dana oznaceno:" + dayDifference);
}

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
										<RangeCalendar onSelect={onStandaloneSelect}/>
									</MDBCol>
								</MDBRow>
							</MDBCardBody>
						</MDBCard>

			</MDBContainer>
		)
	}
}

export default HireForm;
