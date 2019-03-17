import React, {Component} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBInput, MDBCardBody, MDBBtn } from "mdbreact";
import {Link} from "react-router-dom";
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import 'rc-calendar/assets/index.css';
import "../../../styles/HireForm.css";

const formatStr = 'YYYY-MM-DD';
function format(v) {
	return v ? v.format(formatStr) : '';
}
// function onStandaloneSelect(value) {
// 	console.log('onSelect');
// 	console.log(format(value[0]), format(value[1]));
//
// 	const date2 = new Date(format(value[0]));
// 	const date1 = new Date(format(value[1]));
// 	const timeDiff = Math.abs(date2.getTime() - date1.getTime());
// 	window.dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
// 	// console.log("Dana oznaceno:" + dayDifference);
// }

class HireForm extends Component {
	state = {
		dailyInput: 0,
		weeklyInput: 0,
		dayDifference: 0
	}

	onChange = (value) => {
		console.log('onChange', value);
		const date2 = new Date(format(value[0]));
		const date1 = new Date(format(value[1]));
		const timeDiff = Math.abs(date2.getTime() - date1.getTime());
		const dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
		this.setState({ dayDifference });
	}

	onChangeDaily = (e) => {
		let { value, max } = e.target;
		value = Number(value) > Number(max) ? 24 : Number(value);
		this.setState({dailyInput: value });
	}

	onChangeWeekly = (e) => {
		let { value, max } = e.target;
		value = Number(value) > Number(max) ? Number(max) : Number(value);
		this.setState({weeklyInput: value})
	}

	render() {
		const {dailyInput, weeklyInput, dayDifference} = this.state;
		console.log(dayDifference,dailyInput, weeklyInput);
		const cost = this.props.location.state.cost ? this.props.location.state.cost : 0;
		const moreThanSevenDays = ((Math.floor(dayDifference / 7))  + (dayDifference % weeklyInput)) * weeklyInput;
		const workingDays = dayDifference > 7 ? moreThanSevenDays : weeklyInput;
		const totalHours = workingDays ? dailyInput * workingDays : 0;
		const totalCost = totalHours ? totalHours * cost : 0;
		const labelString = dayDifference ? `Max ${dayDifference > 7 ? "7" : dayDifference} days` : "Fill the calendar";
		return (
			<MDBContainer fluid className="hireForm">
						<MDBCard className="hireFormCard">
							<h1>Hire Form</h1>
							<MDBCardBody>
								<MDBRow>
									<MDBCol>
										<h2>Choose date</h2>
										<RangeCalendar onChange={this.onChange} />
										<MDBInput className="in" value={dailyInput ? String(dailyInput) : ""} max="24" onChange={this.onChangeDaily} label="Daily work hours" outline/>
										<MDBInput className="in" value={weeklyInput ? String(weeklyInput) : ""} max={dayDifference > 7 ? "7" : String(dayDifference)} onChange={this.onChangeWeekly} label={`Working days through week(${labelString})`} outline/>
										<h4>Total hours: {totalHours}h</h4>
										<hr/>
										<h1>Total Cost: ${totalCost}</h1>
										<div className="hireFormSubmit">
											{totalCost?<Link to="/order">
												<MDBBtn color="primary">Make an order</MDBBtn>
											</Link>: <MDBBtn color="#d84315 deep-orange darken-3">Please fill the calendar and inputs</MDBBtn> }

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
