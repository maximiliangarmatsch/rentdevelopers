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
	window.dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
	// console.log("Dana oznaceno:" + dayDifference);
}

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
		const dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
		this.setState({ dayDifference });
	}

	onChangeDaily = (e) => {
		let { value, min, max } = e.target;
		value = Math.max(Number(min), Math.min(Number(max), Number(value)));
		this.setState({dailyInput: value });
	}
	onChangeWeekly = (e) => {
		let { value, min } = e.target;
		const dayDifference = window.dayDifference;
		value = Math.max(Number(min), Math.min(Number(dayDifference), Number(value)));
		this.setState({weeklyInput: value})
	}

	render() {
		console.log(window.dayDifference);
		const {dailyInput, weeklyInput} = this.state;
		const cost = this.props.location.state.cost ? this.props.location.state.cost : 0;
		const totalHours = dailyInput * weeklyInput;
		const totalCost = totalHours * cost;
		const labelString = window.dayDifference ? `Max ${window.dayDifference} days` : "Fill the calendar"
		return (
			<MDBContainer fluid className="hireForm">
						<MDBCard className="hireFormCard">
							<h1>Hire Form</h1>
							<MDBCardBody>
								<MDBRow>
									<MDBCol>
										<h2>Choose date</h2>
										<RangeCalendar onChange={this.onChange} onSelect={onStandaloneSelect}/>
										<MDBInput value={dailyInput ? String(dailyInput) : ""} min="1" max="24" onChange={this.onChangeDaily} label="Daily work hours" type="number" outline/>
										<MDBInput value={weeklyInput ? String(weeklyInput) : ""} onChange={this.onChangeWeekly} min="1" label={`Working days through week(${labelString})`} type="number" outline/>
										<h4>Total hours: {totalHours}/h</h4>
										<hr/>
										<h1>Total Cost: ${totalCost}</h1>
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
