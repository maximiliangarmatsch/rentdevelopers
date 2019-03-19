import React, { Component } from 'react'
import Header from '../../Header/Header';
import Footer from '../../footer/Footer';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBInput, MDBAlert } from 'mdbreact';
import axios from 'axios';
import '../../../styles/member.css';
import '../../../styles/upload.css';

class MemberDetails extends Component {
  state = {
    fullname: '',
    nickname: localStorage.getItem('username'),
    title: '',
    communication_skills: '',
    language: '',
    tech_skills: '',
    personal_skills: '',
    other_skills: '',
    price: '',
    position_in_cc: '',
    previous_projects: '',
    location: '',
    education: '',
    note: '',
    fullnameExist: false,
    successMess: false,
    id: '',
    error: ''
  }

  componentDidMount() {
    axios.get(`http://ccapp.coder-consulting.com/wp-json/wp/v2/posts`)
      .then(res => {
        console.log(res.data)
        const userData = res.data.filter(data => {
          return data.slug.toLowerCase() === localStorage.getItem('username').toLowerCase()
        })

        console.log(userData)
        if (userData.length > 0) {
          this.setState({
            fullnameExist: true,
            id: userData[0].id,
            fullname: userData[0].acf.fullname,
            title: userData[0].acf.title,
            communication_skills: userData[0].acf.communication_skills,
            language: userData[0].acf.language,
            tech_skills: userData[0].acf.tech_skills,
            personal_skills: userData[0].acf.personal_skills,
            other_skills: userData[0].acf.other_skills,
            price: userData[0].acf.price,
            position_in_cc: userData[0].acf.position_in_cc,
            previous_projects: userData[0].acf.previous_projects,
            location: userData[0].acf.location,
            education: userData[0].acf.education,
            note: userData[0].acf.note
          });
        }
      })
  }

  onSubmit = (e) => {



    const fullname = document.getElementById('fullname').value;
    const title = document.getElementById('title').value;
    const communication_skills = document.getElementById('communication_skills').value;
    const language = document.getElementById('language').value;
    const tech_skills = document.getElementById('tech_skills').value;
    const personal_skills = document.getElementById('personal_skills').value;
    const other_skills = document.getElementById('other_skills').value;
    const price = document.getElementById('price').value;
    const position_in_cc = document.getElementById('position_in_cc').value;
    const previous_projects = document.getElementById('previous_projects').value;
    const location = document.getElementById('location').value;
    const education = document.getElementById('education').value;
    const note = document.getElementById('note').value;

    if (fullname === '') {
      this.setState({ error: 'Fullname must be filled' });
      return;
    }

    const nickname = this.state.nickname;

    if (this.state.fullnameExist) {
      axios.post(`http://ccapp.coder-consulting.com/wp-json/wp/v2/posts/${this.state.id}`, {
        fields: {
          fullname,
          nickname,
          title,
          communication_skills,
          language,
          tech_skills,
          personal_skills,
          other_skills,
          price,
          position_in_cc,
          previous_projects,
          location,
          education,
          note
        }
      }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(res => console.log(res.data))
        .catch(err => console.log(err.response))
    } else {
      axios.post(`http://ccapp.coder-consulting.com/wp-json/wp/v2/posts?title=${fullname}&status=publish`, {
        fields: {
          fullname,
          title,
          nickname,
          communication_skills,
          language,
          tech_skills,
          personal_skills,
          other_skills,
          price,
          position_in_cc,
          previous_projects,
          location,
          education,
          note
        }
      }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(res => console.log(res.data))
        .catch(err => console.log(err.response))
    }

    this.setState({ successMess: true })

    // e.preventDefault();
  }

  onFieldChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })

  }

  /////////////////////////////////////////////////////////////////
  fileUploadHandler = event => {
    const filechooser = document.getElementById('filechooser').files[0];
    const fd = new FormData();
    let imgName = filechooser.name.split('.');
    let fileType = imgName[imgName.length - 1];
    fd.append('file', filechooser, `${new Date().getTime()}.${fileType}`);
    axios.post(`http://ccapp.coder-consulting.com/wp-json/wp/v2/media`, fd, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err.response))
  };
  //////////////////////////////////////////////////////////////////////




  render() {
    const {
      fullname,
      title,
      communication_skills,
      language,
      tech_skills,
      personal_skills,
      other_skills,
      price,
      position_in_cc,
      previous_projects,
      location,
      education,
      note,
      error,
      successMess } = this.state;

    let err = null;
    if (error !== '') {
      err = <MDBAlert color="danger" >
        <div dangerouslySetInnerHTML={{ __html: error }}></div>
      </MDBAlert>
    }

    let message = null;
    if (successMess) {
      message = <MDBAlert className='mdb-color white-text'>
        <div dangerouslySetInnerHTML={{ __html: 'Thank you! Go back to User Overview to see changes!' }}></div>
      </MDBAlert>
    }


    console.log(this.state)
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

              {this.state.fullnameExist ? <MDBInput label='Fullname' value={fullname} size='md' id='fullname' style={{ marginBottom, width: '100%' }} disabled />
                : <MDBInput label='Fullname' value={fullname} name='fullname' onChange={this.onFieldChange} size='md' id='fullname' style={{ marginBottom, width: '100%' }} />
              }
              {err}

              <MDBInput label='Title' value={title} name='title' onChange={this.onFieldChange} size='md' id='title' style={{ marginBottom, width: '100%' }} />

              <MDBInput label='Communication skills' value={communication_skills} name='communication_skills' onChange={this.onFieldChange} size='md' id='communication_skills' style={{ marginBottom, width: '100%' }} />

              <MDBInput label='Language' value={language} name='language' onChange={this.onFieldChange} size='md' id='language' style={{ marginBottom, width: '100%' }} />

              <MDBInput label='Tech skills' value={tech_skills} name='tech_skills' onChange={this.onFieldChange} size='md' id='tech_skills' style={{ marginBottom, width: '100%' }} />

              <MDBInput label='Personal skills' value={personal_skills} name='personal_skills' onChange={this.onFieldChange} size='md' id='personal_skills' style={{ marginBottom, width: '100%' }} />

              <MDBInput label='Other skills' value={other_skills} name='other_skills' onChange={this.onFieldChange} size='md' id='other_skills' style={{ marginBottom, width: '100%' }} />

              <MDBInput label='Price' value={price} name='price' onChange={this.onFieldChange} size='md' id='price' style={{ marginBottom, width: '100%' }} />

              <MDBInput label='Position in CC' value={position_in_cc} name='position_in_cc' onChange={this.onFieldChange} size='md' id='position_in_cc' style={{ marginBottom, width: '100%' }} />

              <MDBInput label='Previous projects' value={previous_projects} name='previous_projects' onChange={this.onFieldChange} size='md' id='previous_projects' style={{ marginBottom, width: '100%' }} />

              <MDBInput label='Education' value={education} name='education' onChange={this.onFieldChange} size='md' id='education' style={{ marginBottom, width: '100%' }} />

              <MDBInput label='Location' value={location} name='location' onChange={this.onFieldChange} size='md' id='location' style={{ marginBottom, width: '100%' }} />

              <MDBInput label='Note' value={note} name='note' onChange={this.onFieldChange} size='md' id='note' style={{ marginBottom, width: '100%' }} />

              <div className="input-group">
                <div className="input-group-prepend">
                  <button className="input-group-text" id="inputGroupFileAddon01" onClick={this.fileUploadHandler}>Upload Image</button>
                </div>
                <div className="custom-file">
                  <input type="file" className="custom-file-input" id='filechooser' />
                  <label className="custom-file-label" for="inputGroupFile01">Choose your image!</label>
                </div>
              </div>

              {message}
              <MDBBtn color="primary" style={{ width: '100%', marginLeft: '-1px' }} onClick={(e) => { this.onSubmit(); this.fileUploadHandler(e); }} >Submit</MDBBtn>


            </MDBCol>
            <MDBCol></MDBCol>
          </MDBRow>
        </MDBContainer>

        <Footer />
      </React.Fragment>
    )
  }
}

const marginBottom = '35px';

export default MemberDetails;
