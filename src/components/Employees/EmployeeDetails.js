import React, { Component } from 'react';
import { MDBListGroup, MDBListGroupItem, MDBContainer, MDBRow, MDBCol } from "mdbreact";
import "../styles/employeeDetails.css";
const dummyEmployee = {
	avatar: "http://www.stickpng.com/assets/images/585e4bcdcb11b227491c3396.png",
	nick: "Lorem",
	title: "Lorem",
	communication_skills: "Lorem",
	language: "Lorem",
	tech_skills: "Lorem",
	other_skills: "Lorem",
	personal_skills: "Lorem",
	price: "Lorem",
	position_in_cc: "Lorem",
	previous_projects: "Lorem",
	education: "Lorem",
	location: "Lorem",
	note: "Lorem"
};
const center = "d-flex justify-content-center";

class EmployeeDetails extends Component{
	render () {
		return (
			<MDBContainer>
				<MDBRow className={center}>
					<h1 className="heading">Overview</h1>
				</MDBRow>
				<MDBRow  className={center}>
				<MDBCol md="13" >
					<img src={dummyEmployee.avatar} className="img-fluid" alt="employee avatar" />
				</MDBCol>
			  </MDBRow>
				<MDBRow className={center}>
					<h4 className="heading">Junior 001</h4>
				</MDBRow>
				<MDBRow  className={center}>
				<MDBListGroup style={{ width: "22rem" }}>
					<MDBListGroupItem>Nick: {dummyEmployee.nick}</MDBListGroupItem>
					<MDBListGroupItem>Title: {dummyEmployee.title}</MDBListGroupItem>
					<MDBListGroupItem>Communication skills: {dummyEmployee.communication_skills}</MDBListGroupItem>
					<MDBListGroupItem>Tech skills: {dummyEmployee.tech_skills}</MDBListGroupItem>
					<MDBListGroupItem>Other skills: {dummyEmployee.other_skills}</MDBListGroupItem>
					<MDBListGroupItem>Personal skills: {dummyEmployee.personal_skills}</MDBListGroupItem>
					<MDBListGroupItem>Price: {dummyEmployee.price}</MDBListGroupItem>
					<MDBListGroupItem>Position in CC: {dummyEmployee.position_in_cc}</MDBListGroupItem>
					<MDBListGroupItem>Previous projects: {dummyEmployee.previous_projects}</MDBListGroupItem>
					<MDBListGroupItem>Education: {dummyEmployee.education}</MDBListGroupItem>
					<MDBListGroupItem>Location: {dummyEmployee.location}</MDBListGroupItem>
					<MDBListGroupItem>Note: {dummyEmployee.note}</MDBListGroupItem>
				</MDBListGroup>
				</MDBRow>
			</MDBContainer>
			);
	}
}
export default EmployeeDetails;
