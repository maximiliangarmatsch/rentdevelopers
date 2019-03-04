import React, { Component } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBModalFooter,
  MDBIcon,
  MDBCardHeader,
  MDBBtn,
  MDBInput
} from "mdbreact";
import RegisterStyle from './RegisterStyle.css'


class Register extends Component {
  state = {
    nonce: '',
    user_id: '',
    token: ''
  }

  getUserData(e) {

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    e.preventDefault();
    console.log(this.state)
    axios.post('http://rentdeveloper.000webhostapp.com/rentdevapi/get_nonce/?controller=user&method=register').then(res => {
      this.setState({
        nonce: res.data.nonce
      })

      axios.post(`https://rentdeveloper.000webhostapp.com/rentdevapi/user/register/?username=${username}&email=${email}&nonce=${this.state.nonce}&display_name=test&user_pass=${password}&insecure=cool`)
        .then(res => {
          console.log(res)
          this.setState({
            user_id: res.data.user_id
          })
          this.props.history.push(`/developer/${this.state.user_id}`)
        })
    })
      .catch(err => console.log(err.response))

  }

  render() {
    console.log(this.state)
    return (
        <MDBContainer>
          <MDBRow>
            <MDBCol md="6" className="register">
              <MDBCard>
                <MDBCardBody>
                  <form>
                    <p className="h4 text-center py-4">Sign up</p>
                    <div className="grey-text">
                      <MDBInput
                          label="Your name"
                          icon="user"
                          group
                          type="text"
                          validate
                          error="wrong"
                          success="right"
                      />
                      <MDBInput
                          label="Type your email"
                          icon="envelope"
                          group
                          type="email"
                          validate
                          error="wrong"
                          success="right"
                      />
                      <MDBInput
                          label="Type your password"
                          icon="lock"
                          group
                          type="password"
                          validate
                      />
                    </div>

                    <div className="text-center py-4 mt-3">
                      <MDBBtn
                          color="cyan"
                          className="mb-3"
                          type="submit"
                      >
                        Register
                      </MDBBtn>
                    </div>
                  </form>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
    )
  }
}

export default withRouter(Register);