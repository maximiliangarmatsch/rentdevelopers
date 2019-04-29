import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import {
	MDBContainer,
	MDBRow,
	MDBCol,
	MDBTable,
	MDBCollapse,
	MDBBtn
} from "mdbreact";
import Header from "../Header/Header";
import Spinner from "./Spinner/Spinner";
import Footer from "../Footer/Footer";
import axios from "axios";
import "../../styles/Member.css";
import { Chart, Geom, Axis, Tooltip, Legend, Coord } from "bizcharts";
import SkillTabPanel from "./SkillTabPanel";

class MemberInfo extends Component {
	state = {
		fullname         : "",
		language         : "",
		location         : "",
		nickname         : "",
		note             : "",
		other_skills     : "",
		previous_projects: "",
		price            : "",
		tech_skills      : "",
		avatar           : "",
		about            : "",
		stack            : "",
		backend			 : {},
		frontend		 : {},
		styling			 : {},
		isLoaded         : false,
		  graphData: [
		  { skill: "Server", knowledge: 0 },
		  { skill: "Database", knowledge: 0 },
		  { skill: "Backend", knowledge: 0 },
		  { skill: "Frontend", knowledge: 0 },
		  { skill: "Styling", knowledge: 0 }
		],
		collapseID: ""
	  };
	  /*graphCols = {
		level: { tickInterval: 2 }
	};*/

	componentDidMount () {
		axios
			.get(
				`http://ccapp.coder-consulting.com/wp-json/wp/v2/posts?per_page=100&page=1`
			)
			.then(res => {
				const userData = res.data.filter(data => {
					return (
						data.acf.fullname.toLowerCase() ===
						localStorage.getItem("memberName").toLowerCase()
					);
				});
				console.log(userData);
				axios
					.get(
						"http://ccapp.coder-consulting.com/wp-json/wp/v2/media/?per_page=100&page=1"
					)
					.then(res => {
						console.log(res.data);
						let userImgData = res.data.filter(data => {
							if ( userData.length > 0 ) {
								return data.author === userData[0].author;
							}
						});

						if ( userImgData.length === 0 ) {
							userImgData = res.data.filter(data => {
								return data.id === 234;
							});
						}

						this.setState({ avatar: userImgData[0].guid.rendered });
					});

				if ( userData.length < 1 ) {
					this.setState({ isLoaded: true });
				}else {
					this.setState(oldState => ({
						fullname         : userData[0].acf.fullname,
						language         : userData[0].acf.language,
						location         : userData[0].acf.location,
						nickname         : userData[0].acf.nickname,
						note             : userData[0].acf.note,
						other_skills     : userData[0].acf.other_skills,
						previous_projects: userData[0].acf.previous_projects,
						price            : userData[0].acf.price,
						tech_skills      : userData[0].acf.tech_skills,
						about            : userData[0].acf.about,
						stack            : userData[0].acf.stack,
						backend			 : userData[0].acf.backend,
						frontend		 : userData[0].acf.frontend,
						styling		 : userData[0].acf.styling,
						isLoaded         : true,
						 graphData: [
						  {
							skill: "Server",
							knowledge: parseInt(userData[0].acf.server_skills)
						  },
						  {
							skill: "Database",
							knowledge: parseInt(userData[0].acf.database_skills)
						  },
						  {
							skill: "Backend",
							knowledge: parseInt(userData[0].acf.backend_skills)
						  },
						  {
							skill: "Frontend",
							knowledge: parseInt(userData[0].acf.frontend_skills)
						  },
						  {
							skill: "Styling",
							knowledge: parseInt(userData[0].acf.styling_skills)
						  }
						]
					}));
				}
			})
			.catch(err => console.log(err));
	}

	toggleCollapse = collapseID => () => {
		this.setState(prevState => ({
			collapseID: prevState.collapseID !== collapseID ? collapseID : ""
		}));
	}

	render () {
		const techSkills = this.state.tech_skills.split(",");
		const otherSkills = this.state.other_skills.split(",");
		const languages = this.state.language.split(",");

		let styleTechSkills = {};
		if ( techSkills[0] === "" ) styleTechSkills = { display: "none" };
		let styleOtherSkills = {};
		if ( otherSkills[0] === "" ) styleOtherSkills = { display: "none" };
		let styleLanguages = {};
		if ( languages[0] === "" ) styleLanguages = { display: "none" };

		if ( !this.state.isLoaded ) {
			return <Spinner/>;
		}

		let avatar = null;
		console.log(this.state.avatar);
		// this.state.avatar ? avatar = this.state.avatar : avatar = faker.image.avatar();
		avatar = this.state.avatar;

		return (
			<React.Fragment>
				<Header
					text1="User"
					route1={`/developer/member/${localStorage.getItem("username")}`}
					text4="Login"
					text2="Logout"
					route4="/developer/login"
					text5="Register"
					text3="Details"
					route5="/developer/register"
				/>
				<MDBContainer className="member-container">
					<MDBRow className="member-first-row">
						<MDBCol sm="4">
							<img
								src={avatar}
								className="img-fluid member-image"
								alt="Avatar"
							/>
						</MDBCol>
						<MDBCol sm="8" fluid>
							<h1>{this.state.fullname}</h1>
							<h3>{this.state.stack} Developer</h3>
							<h6 style={{ fontStyle: "italic" }}>Languages: {this.state.language}</h6>
							<h6 style={{ fontStyle: "italic" }}>Location: {this.state.location}</h6>
							<hr style={{ borderBottom: "1px solid white" }}/>
							<p style={{ paddingTop: "2rem", textAlign: "center" }}>
								{this.state.about}
							</p>
						</MDBCol>
						<MDBRow/>
					</MDBRow>
					<MDBRow className="member-second-row">
						<MDBCol lg="12">
							<h3>
								About <span className="developer-about-span">Developer</span>
							</h3>
						</MDBCol>
						{/*  <MDBCol size="12" xs="12" sm="8" lg="6">
								<Chart padding={75} height={320} width={300} data={this.state.graphData} scale={this.graphCols} forceFit>
											<Coord transpose />
											<Axis name="skill" />
											<Axis name="knowledge" />
											<Tooltip />
											<Geom type="interval" position="skill*knowledge" color="skill" />
										</Chart>
									</MDBCol> */}
					</MDBRow>
					<MDBRow className="member-third-row">
						<MDBCol className="row">
							<MDBCol lg="4">
								<dl className="row">
									{/*<MDBTable bordered style={styleTechSkills}>
										<thead>
										<tr>
											<td style={{ borderColor: "#aaa" }}>
												<dt className="col-sm-3 mt-2">Tech Skills:</dt>
											</td>
											<td style={{ borderColor: "#aaa" }}>
												<dt className="col-sm-3 mt-2">Months:</dt>
											</td>
										</tr>
										</thead>
										<tbody>
										{techSkills.map(skill => {
											const show = skill.split("~");
											return (
												<tr>
													<td
														className="col-sm-9 mt-2"
														style={{ borderColor: "#aaa" }}
													>
														{show[0]}
													</td>
													<td
														className="col-sm-9 mt-2"
														style={{ borderColor: "#aaa" }}
													>
														{show[1]}
													</td>
												</tr>
											);
										})}
										</tbody>
									</MDBTable>*/}
									<MDBTable bordered style={styleTechSkills}>
										<thead>
										<tr>
											<td style={{ borderColor: "#aaa" }}>
												<dt className="col-sm-3 mt-2">Skills:</dt>
											</td>
											<td style={{ borderColor: "#aaa" }}>
												<dt className="col-sm-3 mt-2">Experience:</dt>
											</td>
										</tr>
										</thead>
										<tbody>
										{this.state.graphData.map((skill) => {
											return (
												<tr>
													<td
														className="col-sm-9 mt-2"
														style={{ borderColor: "#aaa" }}
													>
														{skill.skill}
													</td>
													<td
														className="col-sm-9 mt-2"
														style={{ borderColor: "#aaa" }}
													>
														{skill.knowledge}/50 concepts
													</td>
												</tr>
											);
										})}
										</tbody>
									</MDBTable>
									<dt className="col-sm-3 mt-2"/>
								</dl>
							</MDBCol>
							<MDBCol lg="4">
								<MDBTable bordered style={styleOtherSkills}>
									<thead>
									<tr>
										<td style={{ borderColor: "#aaa" }} colSpan={2}>
											<dt className="col-sm-3 mt-2">Business Skills:</dt>
										</td>
									</tr>
									</thead>
									<tbody>
									{otherSkills.map(skill => (
										<tr>
											<td
												className="col-sm-9 mt-2"
												style={{ borderColor: "#aaa" }}
											>
												{skill}
											</td>
										</tr>
									))}
									</tbody>
								</MDBTable>
							</MDBCol>
							<MDBCol lg="4">
								<dl className="row">

									<dt className="col-lg-12 mt-2"/>
									<dt className="col-sm-3 mt-2">Previous Projects:</dt>
									<dd className="col-sm-9 mt-2">
										{this.state.previous_projects}
									</dd>

								</dl>
							</MDBCol>
						</MDBCol>
						{/*<MDBCol lg='8'></MDBCol>*/}
					</MDBRow>
					<MDBRow className="member-fourth-row">

						<MDBCol>
							<MDBBtn color="info"
									onClick={this.toggleCollapse("basicCollapse")}
									style={{ marginBottom: "1rem" }}>
								Show More Details
							</MDBBtn>
							<MDBCollapse id="basicCollapse" isOpen={this.state.collapseID}>
								<Tabs>
									<TabList>
										<Tab>Server</Tab>
										<Tab>Database</Tab>
										<Tab>Backend</Tab>
										<Tab>Frontend</Tab>
										<Tab>Styling</Tab>
									</TabList>

									<TabPanel>
										<h2></h2>
									</TabPanel>
									<TabPanel>
										<h2></h2>
									</TabPanel>
									<TabPanel>
										<SkillTabPanel data={this.state.backend}/>
									</TabPanel>
									<TabPanel>
										<SkillTabPanel data={this.state.frontend}/>
									</TabPanel>
									<TabPanel>
										<SkillTabPanel data={this.state.styling}/>
									</TabPanel>
								</Tabs>
							</MDBCollapse>
						</MDBCol>

					</MDBRow>
				</MDBContainer>
				<Footer/>
			</React.Fragment>
		);
	}
}

export default MemberInfo;
