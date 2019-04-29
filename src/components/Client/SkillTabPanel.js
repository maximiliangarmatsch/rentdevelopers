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
		let data = this.props.data;
		let chosenLanguage = "";
		let langName = "";
		let resBasic = {};
		let resAdvanced = {};
		let resExpert = {};
		if(typeof data.chosen_language !== "undefined") {
			 chosenLanguage = data.chosen_language;
			 langName = data.language.language_name;



		if (chosenLanguage === langName) {
			resBasic = data.language.basic;
			resAdvanced = data.language.advanced;
			resExpert = data.language.expert;

			return (
				<div>
					{langName}
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
		} else {
			return <div>NO LANGUAGE CHOOSEN</div>
		}
	}
}

export default SkillTabPanel;
