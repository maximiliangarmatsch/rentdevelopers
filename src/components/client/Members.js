import React, { Component } from "react";
import { Link } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardImage, MDBCardBody, MDBBtn } from "mdbreact";
// import axios from "axios";
import "./Members.css";

class Members extends Component {
	state = {
		employees: [
			{
				name: "Zarko Popara",
				img: "https://pbs.twimg.com/profile_images/2599891129/775423_400x400.jpg",
				price: 20,
				picked: false
			},
			{
				name: "Scepan Scekic",
				img: "https://ddl.rs/wp-content/uploads/2018/06/danilo05-305x208.jpg",
				price: 15,
				picked: false
			},
			{
				name: "Ozren Soldatovic",
				img: "https://i.ytimg.com/vi/2RxeiiruGYc/hqdefault.jpg",
				price: 30,
				picked: false
			},
			{
				name: "Sima",
				img: "https://m.media-amazon.com/images/M/MV5BZWFkYjZlYWYtMTVlNi00MDUzLTgzMjMtNTVhZjc5Y2QxN2FkXkEyXkFqcGdeQXVyNjcyOTkzNTI@._V1_.jpg",
				price: 50,
				picked: false
			},
			{
				name: "Zivko",
				img: "https://m.media-amazon.com/images/M/MV5BZWFkYjZlYWYtMTVlNi00MDUzLTgzMjMtNTVhZjc5Y2QxN2FkXkEyXkFqcGdeQXVyNjcyOTkzNTI@._V1_.jpg",
				price: 50,
				picked: false
			},
			{
				name: "Rambo",
				img: "http://www.tarzanija.com/wp-content/uploads/2014/08/rambo.jpg",
				price: 5,
				picked: false
			},
			{
				name: "Glavna medicinska sestra Antonija",
				img: "https://i.ytimg.com/vi/pMsMopOr1xU/hqdefault.jpg",
				price: 80,
				picked: false
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
		if (!pickedTeam.includes(pickedMember)) {
			pickedTeam.push(pickedMember);
			cost += pickedMember.price;
			pickedMember.picked = true;
			this.setState({pickedTeam, cost, pickedMember});
		}
	}

	deletePickedMember = (index) => {
		const pickedTeam = this.state.pickedTeam.slice();
		const pickedMember = pickedTeam[index];
		let cost = this.state.cost;
		pickedTeam.splice(index, 1);
		cost -= pickedMember.price;
		pickedMember.picked = false;
		this.setState({pickedTeam, cost, pickedMember});
	}

	render() {
		const {employees, pickedTeam, cost} = this.state;
		const colors = ["#011627", "#FF3366", "#2EC4B6", "#20A4F3"];
		let colorsIndex = -1;
		const members = employees.map((member, i) => {
			colorsIndex = colorsIndex >= 3 ? -1 : colorsIndex;
			colorsIndex += 1;
			return (
					<MDBCard className={pickedTeam.length < 1 ? "withoutSidebar" : "withSidebar"} key={i}>
						<div className="memberUp" style={{background: `linear-gradient(${colors[3]} 50%, transparent 50%) no-repeat`}}>
							<MDBCardImage className="memberImage" src={member.img} />
						</div>

						<MDBCardBody className="memberCardBody">
							<h4 className="dark-grey-text font-weight-bold mb-4">{member.name}</h4>
							<hr />
							<h3 className="price mt-4">
								{member.price}$/h
							</h3>
							<MDBBtn disabled={member.picked} onClick={() => this.pickMe(i)} color="primary" size="md">
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
					<hr />
				</div>
			);
		});
		const sidebar = (
			<MDBCol className="picked" md="3">
				<h1>Your team</h1>
				{pickedMembers}
				<p>Total cost: ${cost} per/h</p>
				<Link to={{ pathname: '/hire', state: { cost } }}>
					<MDBBtn color="secondary">Submit</MDBBtn>
				</Link>
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
