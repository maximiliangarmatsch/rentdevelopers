import React, {Component} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBInput, MDBCardBody, MDBBtn } from "mdbreact";
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
	state = {
		dailyInput: 0,
		weeklyInput: 0,
		cost: 0
	}

	onChangeDaily = (e) => {
		this.setState({dailyInput: e.target.value})
	}
	onChangeWeekly = (e) => {
		this.setState({weeklyInput: e.target.value})
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
										<RangeCalendar onSelect={onStandaloneSelect}/>
										<MDBInput onChange={this.onChangeDaily} label="Daily work hours" type="number" outline/>
										<MDBInput onChange={this.onChangeWeekly} label="Working days through week" type="number" outline/>
										<h4>Total hours: {this.state.dailyInput * this.state.weeklyInput}/h</h4>
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
