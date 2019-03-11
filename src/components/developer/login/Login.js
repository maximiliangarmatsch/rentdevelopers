import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { MDBAlert, MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import '../../../styles/login.css'
import { Consumer } from '../../../context';

class Login extends Component {
  state = {
    error: false,
    errMessage: ''
  }

  onSubmit(dispatch, e) {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    if (username === '' || password === '') {
      this.setState({ error: true, errMessage: 'Please fill all fields properly' })
      this.getOffError();
      return;
    }

    axios.post(`https://rentdeveloper.000webhostapp.com/wp-json/jwt-auth/v1/token?username=${username}&password=${password}`)
      .then(response => {
        console.log('### Login ', response.data.token);
        localStorage.setItem('token', response.data.token)
        dispatch({ type: 'SET_TOKEN', payload: localStorage.getItem('token') })
      }).catch(error => {
        console.log('### Login ', error.response);
        this.setState({ error: true, errMessage: error.response.data.message })
        this.getOffError()
      });
    e.preventDefault();

  }

  getOffError = () => {
    setTimeout(() => {
      this.setState({ error: false, errMessage: '' })
    }, 3000)
  }


  render() {
    let err = null;
    if (this.state.error) {
      err = <MDBAlert color="danger" >
        <div dangerouslySetInnerHTML={{ __html: this.state.errMessage }}></div>
      </MDBAlert>
    }
    return (
      <Consumer>
        {value => {
          const { dispatch, token } = value;
          console.log(token)
          if (localStorage.getItem('token') !== '') {
            return <Redirect to='/developer/member' />
          }
          return (
                <div className="loginContainer col-centered align-middle">
                  <MDBContainer className='col-md-6 col-centered align-middle'>
                    <MDBRow>
                      <MDBCol>
                        <form>
                          <p className="h5 text-center mb-4">Log in</p>
                          <div className="grey-text">
                            <MDBInput
                              id='username'
                              label="Type your email"
                              icon="envelope"
                              group
                              type="email"
                              validate
                              error="wrong"
                              success="right"
                            />
                            <MDBInput
                              id='password'
                              label="Type your password"
                              icon="lock"
                              group
                              type="password"
                              validate
                            />
                          </div>
                          {err}
                          <div className="text-center">
                            <MDBBtn color='primary' onClick={this.onSubmit.bind(this, dispatch)}>Login</MDBBtn>
                          </div>
                        </form>
                      </MDBCol>
                    </MDBRow>

                  </MDBContainer>
                </div>
          )
        }}
      </Consumer>
    )
  }

}

export default Login;
