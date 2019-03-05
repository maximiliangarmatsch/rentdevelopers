import React, { Component } from 'react';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';

class Login extends Component {
  state = {
    token: ''
  }

  componentDidMount() {
    axios.post('http://rentdeveloper.000webhostapp.com/wp-json/jwt-auth/v1/token', {
      username: 'admin',
      password: 'password'
    })
      .then(res => {
        console.log(res.data.token)
        this.setState({ token: res.data.token })
      })
      .catch(err => console.log(err));
  }

  onSubmit = (e) => {

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    axios.defaults.headers = {
      "Content-Type": "application/json;charset=utf-8",
      "Accept": "application/json, text/plain, */*",
      "Authorization": `Bearer ${this.state.token}`
    }

    let bookData = {
      title: title,
      content: content
    }

    axios.post('http://rentdeveloper.000webhostapp.com/wp-json/wp/v2/books', bookData)
      .then(res => {
        console.log(res.data)
      })
      .catch(err => console.log(err.response))

    e.preventDefault();
  }

  render() {
    return (
        <MDBContainer>
          <MDBRow>
            <MDBCol md="6" className="login">
              <MDBCard>
                <MDBCardBody>
                  <form>
                    <p className="h4 text-center py-4">Login</p>
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
                          label="Your password"
                          icon="lock"
                          group
                          type="password"
                          validate
                      />
                    </div>
                    <div className="text-center py-4 mt-3">
                      <MDBBtn color="cyan" type="submit">
                        Login
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

export default Login;