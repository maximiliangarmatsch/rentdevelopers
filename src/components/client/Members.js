import React, { Component } from "react";
import { Link } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardImage, MDBCardBody, MDBBtn } from "mdbreact";
// import axios from "axios";
import "./Members.css";

class Members extends Component {
	state = {
		employees: [
			{
				name: "Junior001",
				img: "data:image/png;base64,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",
				price: 20,
				picked: false
			},
			{
				name: "Junior002",
				img: "data:image/png;base64,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",
				price: 15,
				picked: false
			},
			{
				name: "Junior003",
				img: "https://cdn2.iconfinder.com/data/icons/the-world-faces/512/Cool_Guy_Face_Avatar-512.png",
				price: 30,
				picked: false
			},
			{
				name: "Junior004",
				img: "https://previews.123rf.com/images/volmon/volmon1702/volmon170200103/72876729-cute-color-vector-illustration-of-beard-afro-black-guy-face-avatar-positive-young-black-guy-smiling-.jpg",
				price: 50,
				picked: false
			},
			{
				name: "Junior005",
				img: "https://previews.123rf.com/images/juliasart/juliasart1704/juliasart170400022/75406270-vector-girl-icon-woman-avatar-face-icon-cartoon-style-.jpg",
				price: 50,
				picked: false
			},
			{
				name: "Junior006",
				img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST9EkXUsZaPHocA-QG-d9xjn0kVCX3K6iXozMUkuQJIWOgHCDt",
				price: 5,
				picked: false
			},
			{
				name: "Junior007",
				img: "http://www.iconarchive.com/download/i47440/hopstarter/face-avatars/Female-Face-FI-5.ico",
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
		// every card will change color till the end of array, then start again
		const colors = ["#6ED2CC"];
		let colorsIndex = -1;
		const members = employees.map((member, i) => {
			colorsIndex = colorsIndex >= colors.length - 1 ? -1 : colorsIndex;
			colorsIndex += 1;
			console.log(colorsIndex);
			return (
					<MDBCard className={pickedTeam.length < 1 ? "withoutSidebar" : "withSidebar"} key={i}>
						<div className="memberUp" style={{background: `linear-gradient(${colors[colorsIndex]} 50%, transparent 50%) no-repeat`}}>
							<MDBCardImage className="memberImage" src={member.img} />
						</div>

						<MDBCardBody className="memberCardBody">
							<h4 className="member-name dark-grey-text font-weight-bold mb-4">{member.name}</h4>
							<hr />
							<div className="empty"/>
							<div className="price-pick">
							<h3 className="price mt-4 price-color" >
								{member.price}$/h
							</h3>
							<MDBBtn disabled={member.picked} onClick={() => this.pickMe(i)} className="button-color" size="md">
								Pick me
							</MDBBtn>
							</div>
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
					<MDBBtn className="button-color">Submit</MDBBtn>
				</Link>
			</MDBCol>
		);

		return (
			<MDBContainer fluid className="membersContainer">
				<h2 className="h2-responsive font-weight-bold my-5">
					Pick a member
				</h2>
				<MDBRow>
					<MDBCol className="cardContainer" md={pickedTeam.length < 1 ? "12" : "9"}>
						{members}
					</MDBCol>
					{pickedTeam.length > 0 && sidebar}
				</MDBRow>
			</MDBContainer>
		);
	}
}
export default Members;
