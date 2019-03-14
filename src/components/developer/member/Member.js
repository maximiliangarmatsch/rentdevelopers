import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardTitle, MDBCardBody } from 'mdbreact';
import Header from '../../Header/Header';
import Spinner from "../../client/Spinner/Spinner";
import axios from 'axios';
import Gravatar from 'react-gravatar';
import '../../../styles/member.css';

class Member extends Component {
  state = {
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
    isLoaded: false
  }

  componentDidMount() {

    axios.get(`https://rentdeveloper.000webhostapp.com/wp-json/acf/v3/users/${localStorage.getItem('user_id')}`)
      .then(res => {
        console.log(res.data.acf)
        this.setState({
          communication_skills: res.data.acf.communication_skills,
          education: res.data.acf.education,
          language: res.data.acf.language,
          location: res.data.acf.location,
          nickname: res.data.acf.nickname,
          note: res.data.acf.note,
          other_skills: res.data.acf.other_skills,
          personal_skills: res.data.acf.personal_skills,
          position_in_cc: res.data.acf.position_in_cc,
          previous_projects: res.data.acf.previous_projects,
          price: res.data.acf.price,
          tech_skills: res.data.acf.tech_skills,
          title: res.data.acf.title,
          isLoaded: true
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    console.log(this.state)
    if (localStorage.getItem('username') === '') {
      return <Redirect to='/' />
    }

    if (!this.state.isLoaded) {
      return (
        <Spinner />
      )
    }
    return (
      <React.Fragment>
        <Header
          text1='User'
          route1={`/developer/member/${localStorage.getItem('username')}`}
          text2="Logout"
          route4="/developer/login"
          text3="Details"
          route5="/developer/register" />
        <MDBContainer>
          <MDBRow>
            <MDBCol></MDBCol>
            <MDBCol sm='12' md='9'>
              <MDBCard className='face font mt-5'>
                <Gravatar email="blahblah@blah.com" size={150} default='monsterid' className="img-fluid rounded-circle hoverable mx-auto d-block mt-3 CustomAvatar-image" alt="aligment" />
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
      </React.Fragment>
    )


  }
}

export default withRouter(Member)
