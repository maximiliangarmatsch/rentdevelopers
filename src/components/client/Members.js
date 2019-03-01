import React, {Component} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardUp, MDBCardImage, MDBCardBody, MDBBtn } from "mdbreact";
import axios from "axios";
import "./Members.css";

class Members extends Component {
	state = {
		employees: [
			{
				name: "Zarko Popara",
				img: "https://pbs.twimg.com/profile_images/2599891129/775423_400x400.jpg",
				price: 20
			},
			{
				name: "Scepan Scekic",
				img: "https://ddl.rs/wp-content/uploads/2018/06/danilo05-305x208.jpg",
				price: 15
			},
			{
				name: "Ozren Soldatovic",
				img: "https://i.ytimg.com/vi/2RxeiiruGYc/hqdefault.jpg",
				price: 30
			},
			{
				name: "Sima",
				img: "https://m.media-amazon.com/images/M/MV5BZWFkYjZlYWYtMTVlNi00MDUzLTgzMjMtNTVhZjc5Y2QxN2FkXkEyXkFqcGdeQXVyNjcyOTkzNTI@._V1_.jpg",
				price: 50
			}
		],
		pickedTeam: [],
		cost: 0
	}

	// componentDidMount() {
	// 	axios.get("http://192.168.99.100:8000/wp-json/wp/v2/employees")
	// 		.then(res => {
	// 			console.log(res)
	// 			this.setState({employees: res.data, isLoaded: true})
	// 		})
	// 		.catch(err => console.log(err));
	// }

	pickMe = (index) => {
		const pickedTeam = this.state.pickedTeam.slice();
		const pickedMember = this.state.employees[index];
		let cost = this.state.cost;
		if(!pickedTeam.includes(pickedMember)) {
			pickedTeam.push(pickedMember);
			cost += pickedMember.price;
			this.setState({pickedTeam, cost});
		}
	}

	deletePickedMember = (index) => {
		const pickedTeam = this.state.pickedTeam.slice();
		const pickedMember = pickedTeam[index];
		let cost = this.state.cost;
		pickedTeam.splice(index, 1);
		cost -= pickedMember.price;
		this.setState({pickedTeam, cost});
	}

	render() {
		const {employees} = this.state;
		const members = employees.map((member, i) => {
			return (
				<MDBCol md="2">
					<MDBCard key={i}>
						<MDBCardImage className="memberImage" src={member.img} />
						<MDBCardBody className="memberCard">
							<h4 className="dark-grey-text font-weight-bold mb-4">{member.name}</h4>
							<hr />
							<p className="dark-grey-text mt-4">
								Rate per/hour {member.price}$
							</p>
							<MDBBtn onClick={() => this.pickMe(i)} color="primary" size="md">
								Pick me
							</MDBBtn>
						</MDBCardBody>
					</MDBCard>
				</MDBCol>
			);
		});
		const pickedTeam = this.state.pickedTeam.map((pick, i) => {
			return (
				<div className="pickedTeam" key={i}>
					<img className="white" width="100px" src={pick.img}/>
					<h3>{pick.name}</h3>
					<MDBBtn className="deleteBtn" onClick={() => this.deletePickedMember(i)} color="danger" size="sm">
						X
					</MDBBtn>
				</div>
			);
		});
		return (
			<MDBContainer fluid className="members-container">
					<h2 className="h2-responsive font-weight-bold my-5">
						Members
					</h2>
					<MDBRow>
						{members}
						<MDBCol md="4">
							<h1>Your team</h1>
							{pickedTeam}
							{/*<p>Izabrani developers -> desno</p>*/}
							<p>Total cost: ${this.state.cost} per/h</p>
							<button>Submit</button>
						</MDBCol>
					</MDBRow>
			</MDBContainer>
		);
	}
}
export default Members;
