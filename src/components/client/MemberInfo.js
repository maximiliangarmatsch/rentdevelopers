import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardTitle, MDBCardBody } from 'mdbreact';
import Header from '../Header/Header';
import Spinner from "./Spinner/Spinner";
import Footer from '../footer/Footer';
import axios from 'axios';
import '../../styles/member.css';

class MemberInfo extends Component {
  state = {
    fullname: '',
    communication_skills: "",
    education: "",
    language: "",
    location: "",
    nickname: "",
    note: "",
    other_skills: "",
    personal_skills: "",
    position_in_cc: "",
    previous_projects: "",
    price: "",
    tech_skills: "",
    title: "",
    avatar: "",
    isLoaded: false
  }

  componentDidMount() {


    axios.get(`http://ccapp.coder-consulting.com/wp-json/wp/v2/posts`)
      .then(res => {

        const userData = res.data.filter(data => {
          return data.acf.fullname.toLowerCase() === localStorage.getItem('memberName').toLowerCase()
        })
        console.log(userData)
        axios.get('http://ccapp.coder-consulting.com/wp-json/wp/v2/media/?per_page=100&page=1')
          .then(res => {
            console.log(res.data)
            let userImgData = res.data.filter(data => {
              if (userData.length > 0) {
                return data.author === userData[0].author;
              }
            })

            if (userImgData.length === 0) {
              userImgData = res.data.filter(data => {
                return data.id === 234;
              })
            }

            this.setState({ avatar: userImgData[0].guid.rendered });
          })

        if (userData.length < 1) {
          this.setState({ isLoaded: true });
        } else {

          this.setState({
            fullname: userData[0].acf.fullname,
            communication_skills: userData[0].acf.communication_skills,
            education: userData[0].acf.education,
            language: userData[0].acf.language,
            location: userData[0].acf.location,
            nickname: userData[0].acf.nickname,
            note: userData[0].acf.note,
            other_skills: userData[0].acf.other_skills,
            personal_skills: userData[0].acf.personal_skills,
            position_in_cc: userData[0].acf.position_in_cc,
            previous_projects: userData[0].acf.previous_projects,
            price: userData[0].acf.price,
            tech_skills: userData[0].acf.tech_skills,
            title: userData[0].acf.title,
            isLoaded: true
          })
        }
      })
      .catch(err => console.log(err))
  }

  render() {

    if (!this.state.isLoaded) {
      return (
        <Spinner />
      )
    }

    let avatar = null;
    console.log(this.state.avatar)
    // this.state.avatar ? avatar = this.state.avatar : avatar = faker.image.avatar();
    avatar = this.state.avatar;

    return (
      <React.Fragment>
        <Header
          text1='User'
          route1={`/developer/member/${localStorage.getItem('username')}`}
          text4="Login"
          text2='Logout'
          route4="/developer/login"
          text5="Register"
          text3='Details'
          route5="/developer/register"
        />
        <MDBContainer className="member-container">
          <MDBRow>
            <MDBCol></MDBCol>
            <MDBCol sm='12' md='9'>
              <MDBCard className='face font mt-5'>
                {/* <Gravatar email="blahblah@blah.com" size={150} default='404' className="img-fluid rounded-circle hoverable mx-auto d-block mt-3 CustomAvatar-image" alt="aligment" /> */}
                <div className="avatar mx-auto white" style={{ width: '200px', height: '250px', overflow: 'hidden' }}>
                  <img src={avatar} className="img-fluid mx-auto d-block mt-3" alt="Avatar" style={{ width: '200px', height: 'auto' }} />
                </div>
                <MDBCardBody>
                  <MDBCardTitle className='mdb-color white-text text-left'>{this.state.position_in_cc}</MDBCardTitle>

                  <dl className="row">
                    <dt className="col-sm-3 mt-2">Nickname:</dt>
                    <dd className="col-sm-9 mt-2">{this.state.nickname}</dd>

                    <dt className="col-sm-3 mt-2">Title:</dt>
                    <dd className="col-sm-9 mt-2">{this.state.title}</dd>

                    <dt className="col-sm-3 mt-2">Comunication skills:</dt>
                    <dd className="col-sm-9 mt-2">{this.state.communication_skills}</dd>

                    <dt className="col-sm-3 mt-2">Language:</dt>
                    <dd className="col-sm-9 mt-2">{this.state.language}</dd>

                    <dt className="col-sm-3 mt-2">Tech Skills:</dt>
                    <dd className="col-sm-9 mt-2">{this.state.tech_skills}</dd>

                    <dt className="col-sm-3 mt-2">Other Skills:</dt>
                    <dd className="col-sm-9 mt-2">{this.state.other_skills}</dd>

                    <dt className="col-sm-3 mt-2">Personal Skills:</dt>
                    <dd className="col-sm-9 mt-2">{this.state.personal_skills}</dd>

                    <dt className="col-sm-3 mt-2">Price:</dt>
                    <dd className="col-sm-9 mt-2">{this.state.price} $</dd>

                    <dt className="col-sm-3 mt-2">Position In CC:</dt>
                    <dd className="col-sm-9 mt-2">{this.state.position_in_cc}</dd>

                    <dt className="col-sm-3 mt-2">Previous Projects:</dt>
                    <dd className="col-sm-9 mt-2">{this.state.previous_projects}</dd>

                    <dt className="col-sm-3 mt-2">Education:</dt>
                    <dd className="col-sm-9 mt-2">{this.state.education}</dd>

                    <dt className="col-sm-3 mt-2">Location:</dt>
                    <dd className="col-sm-9 mt-2">{this.state.location}</dd>

                    <dt className="col-sm-3 mt-2">Note:</dt>
                    <dd className="col-sm-9 mt-2">{this.state.note}</dd>
                  </dl>

                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol></MDBCol>
          </MDBRow>
        </MDBContainer>
        <Footer />
      </React.Fragment>
    )
  }
}

export default MemberInfo;