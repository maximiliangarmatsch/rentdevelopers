import React, {Component} from "react";
import {MDBRow,MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBContainer } from "mdbreact";

class SkillTabPanel extends Component{

	getResults = (res) => {

		const array = Object.keys(res).map(function(key) {
			return [String(key), res[key]];
		});

		const results = array.map((row) => {
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
					<input readOnly type="checkbox" name="skill" value={name} checked={checked}/> {name.replace(/_/g," ")}
					<br/>
				</div>
			);
		});

		return  results;
	};

	render () {

		const data = this.props.data;
		const langName = data.language.language_name;
		let resBasic = {};
		let resAdvanced = {};
		let resExpert = {};
		if(!data.language[langName]){
			return <h1>NO DATA</h1>
		}else {
			 resBasic = data.language[langName].basic;
			 resAdvanced = data.language[langName].advanced;
			 resExpert = data.language[langName].expert;
		}
			return (
				<div>
					<h2>{langName}</h2>
					<MDBRow>
						<MDBCol>
							<MDBContainer>
								<MDBCard className="card-body" style={{ marginTop: "1rem" }}>
									<MDBCardTitle>Basic</MDBCardTitle>
									<MDBCardBody>{this.getResults(resBasic)}</MDBCardBody>
								</MDBCard>
							</MDBContainer>
						</MDBCol>
						<MDBCol>
							<MDBContainer>
								<MDBCard className="card-body" style={{ marginTop: "1rem" }}>
									<MDBCardTitle>Advanced</MDBCardTitle>
									<MDBCardBody>{this.getResults(resAdvanced)}</MDBCardBody>
								</MDBCard>
							</MDBContainer>
						</MDBCol>
						<MDBCol>
							<MDBContainer>
								<MDBCard className="card-body" style={{ marginTop: "1rem" }}>
									<MDBCardTitle>Expert</MDBCardTitle>
									<MDBCardBody>{this.getResults(resExpert)}</MDBCardBody>
								</MDBCard>
							</MDBContainer>
						</MDBCol>
					</MDBRow>
				</div>
			)
		}


}

export default SkillTabPanel;
