import React, { Component } from 'react'
import Header from '../../Header/Header';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdbreact';
import axios from 'axios';
import '../../../styles/member.css';

class MemberDetails extends Component {

  onSubmit = (e) => {
    const data = {
      title: 'title'
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
    const user_id = localStorage.getItem('user_id')
    axios.post(`https://rentdeveloper.000webhostapp.com/wp-json/acf/v3/users/${user_id}`, data, config)
      .then(res => console.log(res.data))
      .catch(err => console.log(err))

    e.preventDefault();
  }

  onAvatarClick = () => {
    console.log('aaaaaaaaaaaaa')
  }

  render() {
    return (
      <React.Fragment>
        <Header
          text1='User'
          route1={`/developer/member/${localStorage.getItem('username')}`}
          text2="Logout"
          route4="/developer/login"
          text3="Details"
          route5="/developer/register" />
        <MDBContainer className="member-details-container">
          <h1 className="h1-responsive" style={{ textAlign: 'center', marginTop: '30px' }}>Enter Your Details</h1>
          <MDBRow>
            <MDBCol></MDBCol>
            <MDBCol sm='12' md='8'>

              <MDBInput label='Nickname' size='md' id='nickname' style={{ marginBottom, width: '100%' }} />
              <MDBInput label='Title' size='md' id='title' style={{ marginBottom, width: '100%' }} />
              <MDBInput label='Communication skills' size='md' id='communication_skills' style={{ marginBottom, width: '100%' }} />
              <MDBInput label='Language' size='md' id='language' style={{ marginBottom, width: '100%' }} />
              <MDBInput label='Tech skills' size='md' id='tech_skills' style={{ marginBottom, width: '100%' }} />
              <MDBInput label='Personal skills' size='md' id='personal_skills' style={{ marginBottom, width: '100%' }} />
              <MDBInput label='Other skills' size='md' id='other_skills' style={{ marginBottom, width: '100%' }} />
              <MDBInput label='Price' size='md' id='price' style={{ marginBottom, width: '100%' }} />
              <MDBInput label='Position in CC' size='md' id='position_in_cc' style={{ marginBottom, width: '100%' }} />
              <MDBInput label='Previous projects' size='md' id='previous_projects' style={{ marginBottom, width: '100%' }} />
              <MDBInput label='Education' size='md' id='education' style={{ marginBottom, width: '100%' }} />
              <MDBInput label='Location' size='md' id='location' style={{ marginBottom, width: '100%' }} />
              <MDBInput label='Note' size='md' id='note' style={{ marginBottom, width: '100%' }} />

              <MDBBtn color="primary" style={{ width: '100%', marginLeft: '-1px' }} onClick={this.onSubmit} >Submit</MDBBtn>
            </MDBCol>
            <MDBCol></MDBCol>
          </MDBRow>
        </MDBContainer>

      </React.Fragment>
    )
  }
}

const marginBottom = '35px';

export default MemberDetails;
