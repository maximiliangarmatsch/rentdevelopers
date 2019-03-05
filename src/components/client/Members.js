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
			},
			{
				name: "Zivko",
				img: "https://m.media-amazon.com/images/M/MV5BZWFkYjZlYWYtMTVlNi00MDUzLTgzMjMtNTVhZjc5Y2QxN2FkXkEyXkFqcGdeQXVyNjcyOTkzNTI@._V1_.jpg",
				price: 50
			},
			{
				name: "Rambo",
				img: "http://www.tarzanija.com/wp-content/uploads/2014/08/rambo.jpg",
				price: 5
			},
			{
				name: "Glavna medicinska sestra Antonija",
				img: "https://i.ytimg.com/vi/pMsMopOr1xU/hqdefault.jpg",
				price: 80
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
		const {employees, pickedTeam, cost} = this.state;
		const members = employees.map((member, i) => {
			return (
					<MDBCard className={pickedTeam.length < 1 ? "withoutSidebar" : "withSidebar"} key={i}>
						<MDBCardImage className="memberImage" src={member.img} />
						<MDBCardBody className="memberCardBody">
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
			);
		});
		const pickedMembers = pickedTeam.map((pick, i) => {
			return (
				<div className="pickedTeam" key={i}>
					<h3>{pick.name}</h3>
					<button className="deleteBtn" onClick={() => this.deletePickedMember(i)}>
						X
					</button>
				</div>
			);
		});
		const sidebar = (
			<MDBCol className="picked" md="3">
				<h1>Your team</h1>
				{pickedMembers}
				<p>Total cost: ${cost} per/h</p>
				<MDBBtn color="deep-orange">Submit</MDBBtn>
			</MDBCol>
		);

		return (
			<MDBContainer fluid className="membersContainer">
				<h2 className="h2-responsive font-weight-bold my-5">
					Pick a member
				</h2>
					<MDBRow>
						<MDBCol md={pickedTeam.length < 1 ? "12" : "9"}>
							{members}
						</MDBCol>
						{pickedTeam.length > 0 && sidebar}
					</MDBRow>
			</MDBContainer>
		);
	}
}
export default Members;
