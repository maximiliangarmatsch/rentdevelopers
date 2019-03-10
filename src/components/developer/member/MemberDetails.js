import React, { Component } from 'react'
import Header from '../../Header/Header';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdbreact';
import axios from 'axios';

class MemberDetails extends Component {

  onSubmit = (e) => {

    const data = {
      title: 'title'
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    const user_id = localStorage.getItem('user_id')
    axios.options(`https://rentdeveloper.000webhostapp.com/wp-json/acf/v3/users/${user_id}`, data, { headers: headers })
      .then(res => console.log(res.data))
      .catch(err => console.log(err))


    e.preventDefault();
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
        <MDBContainer>
          <h1 className="h1-responsive" style={{ textAlign: 'center', marginTop: '30px' }}>Enter Your Details</h1>
          <MDBRow>
            <MDBCol></MDBCol>
            <MDBCol sm='12' md='8'>

              <MDBInput label='Nickname' size='md' id='nickname' style={{ marginBottom }} />
              <MDBInput label='Title' size='md' id='title' style={{ marginBottom }} />
              <MDBInput label='Communication skills' size='md' id='communication_skills' style={{ marginBottom }} />
              <MDBInput label='Language' size='md' id='language' style={{ marginBottom }} />
              <MDBInput label='Tech skills' size='md' id='tech_skills' style={{ marginBottom }} />
              <MDBInput label='Personal skills' size='md' id='personal_skills' style={{ marginBottom }} />
              <MDBInput label='Other skills' size='md' id='other_skills' style={{ marginBottom }} />
              <MDBInput label='Price' size='md' id='price' style={{ marginBottom }} />
              <MDBInput label='Position in CC' size='md' id='position_in_cc' style={{ marginBottom }} />
              <MDBInput label='Previous projects' size='md' id='previous_projects' style={{ marginBottom }} />
              <MDBInput label='Education' size='md' id='education' style={{ marginBottom }} />
              <MDBInput label='Location' size='md' id='location' style={{ marginBottom }} />
              <MDBInput label='Note' size='md' id='note' style={{ marginBottom }} />

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
