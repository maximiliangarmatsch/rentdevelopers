import React, { Component } from 'react';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBInput,
    MDBCardBody,
    MDBBtn
} from 'mdbreact';
import { Link } from 'react-router-dom';
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import 'rc-calendar/assets/index.css';
import '../../../styles/HireForm.css';
import * as emailjs from 'emailjs-com';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';

const formatStr = 'YYYY-MM-DD';
function format(v) {
    return v ? v.format(formatStr) : '';
}

class HireForm extends Component {
    state = {
        from: 0,
        to: 0,
        dailyInput: 0,
        weeklyInput: 0,
        name: '',
        email: '',
        dayDifference: 0
    };

    onChange = value => {
        console.log('onChange', value);
        const date1 = new Date(format(value[0]));
        const date2 = new Date(format(value[1]));
        const timeDiff = Math.abs(date1.getTime() - date2.getTime());
        const dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
        const from =
            date1.getDate() +
            '/' +
            (date1.getMonth() + 1) +
            '/' +
            date1.getFullYear();
        const to =
            date2.getDate() +
            '/' +
            (date2.getMonth() + 1) +
            '/' +
            date2.getFullYear();
        this.setState({ dayDifference, from, to });
    };

    onChangeDaily = e => {
        let { value, max } = e.target;
        value = Number(value) > Number(max) ? 24 : Number(value);
        this.setState({ dailyInput: value });
    };

    onChangeWeekly = e => {
        let { value, max } = e.target;
        value = Number(value) > Number(max) ? Number(max) : Number(value);
        this.setState({ weeklyInput: value });
    };

    onChangeName = e => {
        this.setState({ name: e.target.value });
    };

    onChangeEmail = e => {
        this.setState({ email: e.target.value });
    };

    sendMail = () => {
        const {
            dailyInput,
            weeklyInput,
            dayDifference,
            from,
            to,
            email,
            name
        } = this.state;
        const cost = this.props.location.state.cost
            ? this.props.location.state.cost
            : 0;
        const moreThanSevenDays =
            (Math.floor(dayDifference / 7) + (dayDifference % weeklyInput)) *
            weeklyInput;
        const workingDays = dayDifference > 7 ? moreThanSevenDays : weeklyInput;
        const totalHours = workingDays ? dailyInput * workingDays : 0;
        const totalCost = totalHours ? totalHours * cost : 0;
        const listMembers = this.props.location.state.pickedTeam.map(
            (member, i) => {
                return `${i + 1}. ${member.acf.fullname}`;
            }
        );
        console.log(name);
        const message = `${name} made new order!<br>
										 Picked developers:${listMembers}<br>
										 From: ${from}<br>
										 To: ${to}<br>
										 Working days: ${workingDays}<br>
										 Total hours: ${totalHours}<br>
										 Total cost: ${totalCost}`;
        const userId = 'user_2z0rlg3ux2PHHOv8N27Hy';
        const templateParams = {
            reply_to: email,
            from_name: email,
            to_name: 'coderconsulting@yandex.ru',
            message_html: message
        };
        const service_id = 'default_service';
        const template_id = 'template_Q2WAHd6j';

        emailjs.send(service_id, template_id, templateParams, userId).then(
            response => {
                console.log('SUCCESS!', response.status, response.text);
            },
            err => {
                console.log('FAILED...', err);
            }
        );
    };

    render() {
        const {
            dailyInput,
            weeklyInput,
            dayDifference,
            name,
            email
        } = this.state;
        const listMembers = this.props.location.state.pickedTeam.map(
            (member, i) => {
                return `${i + 1}. ${member.acf.fullname}`;
            }
        );
        console.log(listMembers);
        console.log(
            dayDifference,
            dailyInput,
            weeklyInput,
            this.props.location.state
        );
        const cost = this.props.location.state.cost
            ? this.props.location.state.cost
            : 0;
        const moreThanSevenDays =
            (Math.floor(dayDifference / 7) + (dayDifference % weeklyInput)) *
            weeklyInput;
        const workingDays = dayDifference > 7 ? moreThanSevenDays : weeklyInput;
        const totalHours = workingDays ? dailyInput * workingDays : 0;
        const totalCost = totalHours ? totalHours * cost : 0;
        const labelString = dayDifference
            ? `Max ${dayDifference > 7 ? '7' : dayDifference} days`
            : 'Fill the calendar';
        return (
            <div>
                <Header
                    text1="User"
                    route1={`/developer/member/${localStorage.getItem(
                        'username'
                    )}`}
                    text4="Login"
                    text2="Logout"
                    route4="/developer/login"
                    text5="Register"
                    text3="Details"
                    route5="/developer/register"
                />
                <MDBContainer fluid className="hireForm">
                    <MDBCard className="hireFormCard">
                        <h1>Hire Form</h1>
                        <MDBCardBody>
                            <MDBRow>
                                <MDBCol>
                                    <h2>Choose date</h2>
                                    <RangeCalendar onChange={this.onChange} />
                                    <MDBInput
                                        className="in"
                                        value={
                                            dailyInput ? String(dailyInput) : ''
                                        }
                                        max="24"
                                        onChange={this.onChangeDaily}
                                        label={`\u00A0Daily work hours`}

                                    />

                                    <MDBInput
                                        className="in"
                                        value={
                                            weeklyInput
                                                ? String(weeklyInput)
                                                : ''
                                        }
                                        max={
                                            dayDifference > 7
                                                ? '7'
                                                : String(dayDifference)
                                        }
                                        onChange={this.onChangeWeekly}
                                        label={`\u00A0Working days through week(${labelString})`}

                                    />

                                    <MDBInput
                                        className="in"
                                        value={name}
                                        onChange={this.onChangeName}
                                        label={`\u00A0Your name`}

                                    />

                                    <MDBInput
                                        type="email"
                                        className="in"
                                        value={email}
                                        onChange={this.onChangeEmail}
                                        label={`\u00A0Your email`}

                                    />

                                    <h4>Total hours: {totalHours}h</h4>
                                    <hr />
                                    <h1>Total Cost: ${totalCost}</h1>
                                    <div
                                        onClick={this.sendMail}
                                        className="hireFormSubmit"
                                    >
                                        {totalCost && email && name ? (
                                            <Link to="/order">
                                                <MDBBtn color="primary">
                                                    Make an order
                                                </MDBBtn>
                                            </Link>
                                        ) : (
                                            <MDBBtn color="#d84315 deep-orange darken-3">
                                                Please fill the calendar and
                                                inputs
                                            </MDBBtn>
                                        )}
                                    </div>
                                </MDBCol>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>
                </MDBContainer>
                <Footer />
            </div>
        );
    }
}

export default HireForm;
