import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import faker from 'faker';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardImage,
    MDBCardBody,
    MDBBtn,
    MDBIcon
} from 'mdbreact';
import axios from 'axios';
import '../../styles/Members.css';
import { Chart, Geom, Axis, Tooltip, Legend, Coord } from 'bizcharts';

class Members extends Component {
    state = {
        employees: [],
        media: [],
        pickedTeam: [],
        cost: 0,
        defaultProfile: '',
        graphData: [
            {skill: "Server", level: 0},
            {skill: "Database", level: 0},
            {skill: "Backend", level: 0},
            {skill: "Frontend", level: 0},
            {skill: "Styling", level: 0},
            {skill: "Photoshop", level: 0}
         ]
    };
    
    

     graphCols = {
        level: { tickInterval:2 }
      };

    componentDidMount() {
        axios
            .get(
                'http://ccapp.coder-consulting.com/wp-json/wp/v2/media/?per_page=100&page=1'
            )
            .then(res => {
                this.setState({ media: res.data });
            })
            .catch(err => console.log(err));
        axios
            .get(
                'http://ccapp.coder-consulting.com/wp-json/wp/v2/posts?per_page=100&page=1'
            )
            .then(res => {
                this.setState({
                    employees: res.data,
                    defaultProfile: faker.image.avatar()
                });
            })
            .catch(err => console.log(err));
    }

    pickMe = index => {
        const pickedTeam = this.state.pickedTeam.slice();
        const pickedMember = this.state.employees[index];
        console.log(faker.image.imageUrl);
        console.log(pickedMember);
        let cost = this.state.cost;
        if (!pickedTeam.includes(pickedMember)) {
            pickedTeam.push(pickedMember);
            cost += Number(pickedMember.acf.price);
            pickedMember.picked = true;
            this.setState({ pickedTeam, cost, pickedMember,
                graphData: [
                        {skill: "Server", level: pickedMember.acf.server_skills},
                        {skill: "Database", level: pickedMember.acf.database_skills},
                        {skill: "Backend", level: pickedMember.acf.backend_skills},
                        {skill: "Frontend", level: pickedMember.acf.frontend_skills},
                        {skill: "Styling", level: pickedMember.acf.styling_skills},
                        {skill: "Photoshop", level: pickedMember.acf.photoshop_skills}
                ] });
        }
    };

    deletePickedMember = index => {
        const pickedTeam = this.state.pickedTeam.slice();
        const pickedMember = pickedTeam[index];
        let cost = this.state.cost;
        pickedTeam.splice(index, 1);
        cost -= Number(pickedMember.acf.price);
        pickedMember.picked = false;
        this.setState({ pickedTeam, cost, pickedMember });
    };

    onAboutMe = (fullname, e) => {
        localStorage.setItem('memberName', fullname);
        this.props.history.push(`/members/${fullname}`);
    };

    render() {
        const { employees, pickedTeam, cost, defaultProfile } = this.state;
        // every card will change color till the end of array, then start again
        const colors = ['#1F83C6'];
        let colorsIndex = -1;
        const members = employees.map((member, i) => {
            colorsIndex = colorsIndex >= colors.length - 1 ? -1 : colorsIndex;
            colorsIndex += 1;
            /////// Get Image ///////
            let membersImg = this.state.media.filter(img => {
                return img.author === member.author;
            });
            if (membersImg.length === 0) {
                membersImg = this.state.media.filter(img => {
                    return img.id === 234;
                });
            }
            //////////////////////////
            return (
                <MDBCard
                    className={
                        pickedTeam.length < 1 ? 'withoutSidebar' : 'withSidebar'
                    }
                    key={i}
                >
                    <div
                        className="memberUp"
                        style={{
                            background: `linear-gradient(${
                                colors[colorsIndex]
                            } 50%, transparent 50%) no-repeat`
                        }}
                    >
                        <div
                            onClick={() => this.onAboutMe(member.acf.fullname)}
                            className="space-around-image"
                        >
                            <MDBCardImage
                                className="memberImage"
                                src={
                                    membersImg[0]
                                        ? membersImg[0].guid.rendered
                                        : defaultProfile
                                }
                            />
                        </div>
                    </div>

                    <MDBCardBody className="memberCardBody">
                        <h4 className="member-name dark-grey-text font-weight-bold mb-4">
                            {member.acf.fullname}
                        </h4>
                        <hr />
                        <h5>Available: 9 - 18h (GMT+1)</h5>
                        <div className="empty" />
                        <div className="price-pick">
                                {/*
                            <h3 className="price mt-4 price-color">
                                {member.acf.price}$/h
                            </h3>
                                */}
                            <MDBBtn
                                disabled={member.picked}
                                onClick={() => this.pickMe(i)}
                                className="button-color"
                                size="md"
                            >
                                <MDBIcon icon="shopping-cart"/>
                                &nbsp;Rent a developer
                            </MDBBtn>
                            <MDBBtn
                                onClick={() =>
                                    this.onAboutMe(member.acf.fullname)
                                }
                                className="button-color"
                                size="md"
                            >
                                <MDBIcon icon="user" />
                                &nbsp;About me
                            </MDBBtn>
                        </div>
                    </MDBCardBody>
                </MDBCard>
            );
        });
        const pickedMembers = pickedTeam.map((pick, i) => {
            return (
                <div className="pickedTeam" key={i}>
                    <h3>{pick.acf.fullname}</h3>
                    <button
                        className="deleteBtn"
                        onClick={() => this.deletePickedMember(i)}
                    >
                        X
                    </button>
                    <hr style={{border:0, borderBottom: "1px solid #767676"}}/>
                </div>
            );
        });
        const sidebar = (
            <MDBCol className="picked" md="8" lg="3">
                <h1>Your team</h1>
                <br/>
                <Chart padding={50} height={250} width={300} data={this.state.graphData} scale={this.graphCols} forceFit>
                    <Axis name="skill" />
                    <Axis name="level" />
                    <Tooltip />
                    <Geom type="interval" position="skill*level" color="skill" />
                </Chart>
                <br/>
                {pickedMembers}
               {/*} <p>Total cost: ${cost} per/h</p> */}
                <Link to={{ pathname: '/hire', state: { cost, pickedTeam } }}>
                    <MDBBtn className="button-color">Submit</MDBBtn>
                </Link>
            </MDBCol>
        );

        return (
            <MDBContainer fluid className="membersContainer">
                <h2 className="h2-responsive font-weight-bold my-5">
                    Rent developer(s) for your project
                </h2>
                <MDBRow>
                    <MDBCol
                        className="cardContainer"
                        md={pickedTeam.length < 1 ? '12' : '12'}
                        lg={pickedTeam.length < 1 ? '12' : '9'}
                    >
                        {members}
                    </MDBCol>
                    {pickedTeam.length > 0 && sidebar}
                </MDBRow>
            </MDBContainer>
        );
    }
}

export default withRouter(Members);
