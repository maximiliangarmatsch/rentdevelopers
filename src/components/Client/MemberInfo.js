import React, { Component } from 'react';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardTitle,
    MDBCardBody
} from 'mdbreact';
import Header from '../Header/Header';
import Spinner from './Spinner/Spinner';
import Footer from '../Footer/Footer';
import axios from 'axios';
import '../../styles/Member.css';
import { Chart, Geom, Axis, Tooltip, Legend, Coord } from 'bizcharts';

class MemberInfo extends Component {
    state = {
        fullname: '',
        education: '',
        language: '',
        location: '',
        nickname: '',
        note: '',
        other_skills: '',
        personal_skills: '',
        previous_projects: '',
        price: '',
        tech_skills: '',
        avatar: '',
        about: '',
        stack: '',
        isLoaded: false,
        graphData: [
            {skill: "Server", knowledge: 0},
            {skill: "Database", knowledge: 0},
            {skill: "Backend", knowledge: 0},
            {skill: "Frontend", knowledge: 0},
            {skill: "Styling", knowledge: 0},
            {skill: "Photoshop", knowledge: 0}
         ],
    };
    graphCols = {
        level: { tickInterval:2 }
      };
    componentDidMount() {
        axios
            .get(`http://ccapp.coder-consulting.com/wp-json/wp/v2/posts?per_page=100&page=1`)
            .then(res => {
                const userData = res.data.filter(data => {
                    return (
                        data.acf.fullname.toLowerCase() ===
                        localStorage.getItem('memberName').toLowerCase()
                    );
                });
                console.log(userData);
                axios
                    .get(
                        'http://ccapp.coder-consulting.com/wp-json/wp/v2/media/?per_page=100&page=1'
                    )
                    .then(res => {
                        console.log(res.data);
                        let userImgData = res.data.filter(data => {
                            if (userData.length > 0) {
                                return data.author === userData[0].author;
                            }
                        });

                        if (userImgData.length === 0) {
                            userImgData = res.data.filter(data => {
                                return data.id === 234;
                            });
                        }

                        this.setState({ avatar: userImgData[0].guid.rendered });
                    });

                if (userData.length < 1) {
                    this.setState({ isLoaded: true });
                } else {
                    this.setState(oldState =>({
                        fullname: userData[0].acf.fullname,
                        education: userData[0].acf.education,
                        language: userData[0].acf.language,
                        location: userData[0].acf.location,
                        nickname: userData[0].acf.nickname,
                        note: userData[0].acf.note,
                        other_skills: userData[0].acf.other_skills,
                        personal_skills: userData[0].acf.personal_skills,
                        previous_projects: userData[0].acf.previous_projects,
                        price: userData[0].acf.price,
                        tech_skills: userData[0].acf.tech_skills,
                        about: userData[0].acf.about,
                        stack: userData[0].acf.stack,
                        isLoaded: true,
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
                             },
                            {
                                skill: "Photoshop", 
                                knowledge: parseInt(userData[0].acf.photoshop_skills)
                            }
                    ]
                    }));
                }
            })
            .catch(err => console.log(err));
    }

    render() {
        if (!this.state.isLoaded) {
            return <Spinner />;
        }

        let avatar = null;
        console.log(this.state.avatar);
        // this.state.avatar ? avatar = this.state.avatar : avatar = faker.image.avatar();
        avatar = this.state.avatar;

        return (
            <React.Fragment>
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
                <MDBContainer className="member-container">
										<MDBRow className="member-first-row">
											<MDBCol sm='4'>
												<img
													src={avatar}
													className="img-fluid member-image"
													alt="Avatar"
												/>
											</MDBCol>
											<MDBCol sm='8' fluid>
												<h1>{this.state.fullname}</h1>
												<h3>{this.state.stack} Developer</h3>
                                                <hr style={{borderBottom:"1px solid white"}}/>
                                                <p style={{paddingTop:"2rem", textAlign:"center"}}>{this.state.about}</p>
											</MDBCol>
                    <MDBRow>
                        {/*<MDBCol />*/}
                        {/*<MDBCol sm="12" md="9">*/}
                            {/*<MDBCard className="face font mt-5">*/}
                                {/*/!* <Gravatar email="blahblah@blah.com" size={150} default='404' className="img-fluid rounded-circle hoverable mx-auto d-block mt-3 CustomAvatar-image" alt="aligment" /> *!/*/}
                                {/*<div*/}
                                    {/*className="avatar mx-auto white"*/}
                                    {/*style={{*/}
                                        {/*width: '200px',*/}
                                        {/*height: '250px',*/}
                                        {/*overflow: 'hidden'*/}
                                    {/*}}*/}
                                {/*>*/}
                                    {/*<img*/}
                                        {/*src={avatar}*/}
                                        {/*className="img-fluid mx-auto d-block mt-3"*/}
                                        {/*alt="Avatar"*/}
                                        {/*style={{*/}
                                            {/*width: '200px',*/}
                                            {/*height: 'auto'*/}
                                        {/*}}*/}
                                    {/*/>*/}
                                {/*</div>*/}
                                {/*<MDBCardBody>*/}
                                    {/*<MDBCardTitle className="developer-title mdb-color white-text text-left">*/}
                                        {/*{this.state.position_in_cc}*/}
                                    {/*</MDBCardTitle>*/}

                                    {/*<dl className="row">*/}
                                        {/*<dt className="col-sm-3 mt-2">*/}
                                            {/*Nickname:*/}
                                        {/*</dt>*/}
                                        {/*<dd className="col-sm-9 mt-2">*/}
                                            {/*{this.state.nickname}*/}
                                        {/*</dd>*/}

                                        {/*<dt className="col-sm-3 mt-2">*/}
                                            {/*Title:*/}
                                        {/*</dt>*/}
                                        {/*<dd className="col-sm-9 mt-2">*/}
                                            {/*{this.state.title}*/}
                                        {/*</dd>*/}

                                        {/*<dt className="col-sm-3 mt-2">*/}
                                            {/*Comunication skills:*/}
                                        {/*</dt>*/}
                                        {/*<dd className="col-sm-9 mt-2">*/}
                                            {/*{this.state.communication_skills}*/}
                                        {/*</dd>*/}

                                        {/*<dt className="col-sm-3 mt-2">*/}
                                            {/*Language:*/}
                                        {/*</dt>*/}
                                        {/*<dd className="col-sm-9 mt-2">*/}
                                            {/*{this.state.language}*/}
                                        {/*</dd>*/}

                                        {/*<dt className="col-sm-3 mt-2">*/}
                                            {/*Tech Skills:*/}
                                        {/*</dt>*/}
                                        {/*<dd className="col-sm-9 mt-2">*/}
                                            {/*{this.state.tech_skills}*/}
                                        {/*</dd>*/}

                                        {/*<dt className="col-sm-3 mt-2">*/}
                                            {/*Other Skills:*/}
                                        {/*</dt>*/}
                                        {/*<dd className="col-sm-9 mt-2">*/}
                                            {/*{this.state.other_skills}*/}
                                        {/*</dd>*/}

                                        {/*<dt className="col-sm-3 mt-2">*/}
                                            {/*Personal Skills:*/}
                                        {/*</dt>*/}
                                        {/*<dd className="col-sm-9 mt-2">*/}
                                            {/*{this.state.personal_skills}*/}
                                        {/*</dd>*/}
                                            {/*/!**/}
                                        {/*<dt className="col-sm-3 mt-2">*/}
                                            {/*Price:*/}
                                        {/*</dt>*/}
                                        {/*<dd className="col-sm-9 mt-2">*/}
                                            {/*{this.state.price} $*/}
                                        {/*</dd>*/}
                                        {/**!/*/}
                                        {/*<dt className="col-sm-3 mt-2">*/}
                                            {/*Position In CC:*/}
                                        {/*</dt>*/}
                                        {/*<dd className="col-sm-9 mt-2">*/}
                                            {/*{this.state.position_in_cc}*/}
                                        {/*</dd>*/}

                                        {/*<dt className="col-sm-3 mt-2">*/}
                                            {/*Previous Projects:*/}
                                        {/*</dt>*/}
                                        {/*<dd className="col-sm-9 mt-2">*/}
                                            {/*{this.state.previous_projects}*/}
                                        {/*</dd>*/}

                                        {/*<dt className="col-sm-3 mt-2">*/}
                                            {/*Education:*/}
                                        {/*</dt>*/}
                                        {/*<dd className="col-sm-9 mt-2">*/}
                                            {/*{this.state.education}*/}
                                        {/*</dd>*/}

                                        {/*<dt className="col-sm-3 mt-2">*/}
                                            {/*Location:*/}
                                        {/*</dt>*/}
                                        {/*<dd className="col-sm-9 mt-2">*/}
                                            {/*{this.state.location}*/}
                                        {/*</dd>*/}

                                        {/*<dt className="col-sm-3 mt-2">Note:</dt>*/}
                                        {/*<dd className="col-sm-9 mt-2">*/}
                                            {/*{this.state.note}*/}
                                        {/*</dd>*/}
                                    {/*</dl>*/}
                                {/*</MDBCardBody>*/}
                            {/*</MDBCard>*/}
                        {/*</MDBCol>*/}
                        {/*<MDBCol />*/}
                    </MDBRow>
										</MDBRow>
                                        <MDBRow className="member-second-row">
                                        <MDBCol lg='12'>
												<h3>About <span className="developer-about-span">Developer</span></h3>
										</MDBCol>
                                        <MDBCol>
                                        <Chart padding={75} height={320} width={300} data={this.state.graphData} scale={this.graphCols} forceFit>
                                                    <Coord transpose />
                                                    <Axis name="skill" />
                                                    <Axis name="knowledge" />
                                                    <Tooltip />
                                                    <Geom type="interval" position="skill*knowledge" color="skill" />
                                                </Chart>
                                            </MDBCol>
                                        </MDBRow>
										<MDBRow className="member-second-row">
											
											<MDBCol className="row">
												<MDBCol sm='6'>
													<dl className="row">
														<dt className="col-sm-3 mt-2">
														Tech Skills:
														</dt>
														<dd className="col-sm-9 mt-2">
														{this.state.tech_skills}
														</dd>

														<dt className="col-sm-3 mt-2">
														Other Skills:
														</dt>
														<dd className="col-sm-9 mt-2">
														{this.state.other_skills}
														</dd>

                                                        <dt className="col-sm-3 mt-2">
														Personal Skills:
														</dt>
														<dd className="col-sm-9 mt-2">
															{this.state.personal_skills}
														</dd>

														<dt className="col-sm-3 mt-2">
														Previous Projects:
														</dt>
														<dd className="col-sm-9 mt-2">
															{this.state.previous_projects}
														</dd>
                                                    </dl>
												</MDBCol>
												<MDBCol sm='6'>
													<dl className='row'>
                                                        <dt className="col-sm-3 mt-2">
														Nickname:
														</dt>
														<dd className="dev-info-data col-sm-9 mt-2">
														{this.state.nickname}
														</dd>

														<dt className="dev-info-data col-sm-3 mt-2">
														Language:
														</dt>
														<dd className="dev-info-data col-sm-9 mt-2">
														{this.state.language}
														</dd>

														<dt className="dev-info-data col-sm-3 mt-2">
															Education:
														</dt>
														<dd className="dev-info-data col-sm-9 mt-2">
															{this.state.education}
														</dd>

														<dt className="dev-info-data col-sm-3 mt-2">
															Location:
														</dt>
														<dd className="dev-info-data col-sm-9 mt-2">
															{this.state.location}
														</dd>
                                                        {/*
														<dt className="col-sm-3 mt-2">Note:</dt>
														<dd className="col-sm-9 mt-2">
															{this.state.note}
                                                        </dd>
                                                    {*/}
													</dl>
												</MDBCol>
											</MDBCol>
											{/*<MDBCol lg='8'></MDBCol>*/}
										</MDBRow>
                </MDBContainer>
                <Footer />
            </React.Fragment>
        );
    }
}

export default MemberInfo;
