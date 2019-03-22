import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import faker from "faker";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBBtn
} from "mdbreact";
import axios from "axios";
import "./Members.css";

class Members extends Component {
  state = {
    employees: [],
    media: [],
    pickedTeam: [],
    cost: 0,
    defaultProfile: ""
  };

  componentDidMount() {
    axios.get('http://ccapp.coder-consulting.com/wp-json/wp/v2/media/?per_page=100&page=1')
      .then(res => {
        this.setState({ media: res.data })
      })
      .catch(err => console.log(err))
    axios
      .get("http://ccapp.coder-consulting.com/wp-json/wp/v2/posts")
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
      this.setState({ pickedTeam, cost, pickedMember });
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
    this.props.history.push(`/members/${fullname}`)
  }

  render() {
    const { employees, pickedTeam, cost, defaultProfile } = this.state;
    // every card will change color till the end of array, then start again
    const colors = ["#6ED2CC"];
    let colorsIndex = -1;
    const members = employees.map((member, i) => {
      colorsIndex = colorsIndex >= colors.length - 1 ? -1 : colorsIndex;
      colorsIndex += 1;
      /////// Get Image ///////
      let membersImg = this.state.media.filter(img => {
        return img.author === member.author
      })
      if (membersImg.length === 0) {
        membersImg = this.state.media.filter(img => {
          return img.id === 234;
        })
      }
      //////////////////////////
      return (
        <MDBCard
          className={pickedTeam.length < 1 ? "withoutSidebar" : "withSidebar"}
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

            <MDBCardImage
              className="memberImage"
              src={membersImg[0] ?
                membersImg[0].guid.rendered :
                defaultProfile
              }
            />
          </div>

          <MDBCardBody className="memberCardBody">
            <h4 className="member-name dark-grey-text font-weight-bold mb-4">
              {member.acf.fullname}
            </h4>
            <hr />
            <div className="empty" />
            <div className="price-pick">
              <h3 className="price mt-4 price-color">{member.acf.price}$/h</h3>
              <MDBBtn
                disabled={member.picked}
                onClick={() => this.pickMe(i)}
                className="button-color"
                size="md"
              >
                Pick me
              </MDBBtn>
              <MDBBtn
                onClick={() => this.onAboutMe(member.acf.fullname)}
                className="button-color"
                size="md"
              >
                About me
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
          <hr />
        </div>
      );
    });
    const sidebar = (
      <MDBCol className="picked" md="3">
        <h1>Your team</h1>
        {pickedMembers}
        <p>Total cost: ${cost} per/h</p>
        <Link to={{ pathname: "/hire", state: { cost, pickedTeam } }}>
          <MDBBtn className="button-color">Submit</MDBBtn>
        </Link>
      </MDBCol>
    );

    return (
      <MDBContainer fluid className="membersContainer">
        <h2 className="h2-responsive font-weight-bold my-5">Pick a member</h2>
        <MDBRow>
          <MDBCol
            className="cardContainer"
            md={pickedTeam.length < 1 ? "12" : "9"}
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
