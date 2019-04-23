import React, {Component} from "react";
import {MDBRow,MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBContainer } from "mdbreact";

class SkillTabPanel extends Component{
	render () {

		const data = this.props.data;

		const langName = data.language.language_name;
		const basic = data.language.php.basic;
		const array = Object.keys(basic).map(function(key) {
			return [String(key), basic[key]];
		});

		const basicResults = array.map((row) => {
			let name = "";
			let checked = false;
			 row.map((cell, index) => {
				if (index == 0){
					 name = cell;
				}else {
					if (cell){
						checked = true;
					}
				}
			});

			return (
				<div>
				<input type="checkbox" name="skill" value={name} checked={checked}/> {name.replace("_"," ")}
				<br/>
				</div>
			);
		});

		return (
			<div>
				{langName}
				<MDBRow>
					<MDBCol>
				<MDBContainer>
					<MDBCard className="card-body" style={{  marginTop: "1rem" }}>
						<MDBCardTitle>Basic</MDBCardTitle>
						<MDBCardBody>{basicResults}</MDBCardBody>
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
