import React, { Component } from 'react'
import axios from 'axios';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { MDBAnimation as Animation, MDBAlert, MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput, MDBCard, MDBCardBody } from 'mdbreact';
import Spinner from "../../client/Spinner/Spinner";
import '../../../styles/register.css';


class Register extends Component {
  state = {
    nonce: '',
    user_id: '',
    error: false,
    errMessage: '',
		isLoaded: false
  }

  componentDidMount() {
		setTimeout(() => {
			this.setState({ isLoaded: true })
		}, 1000);
	}

	getUserData(e) {

    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;

    // Validate username and password
    if (username === '' || password === '') {
      this.setState({ error: true, errMessage: 'Please fill all fields properly' })
      this.getOffError();
      return;
    }

    // Validate username
    if (username.length < 4) {
      this.setState({ error: true, errMessage: 'Username must have at least 4 caracters!' })
      this.getOffError();
      return;
    }

    //Validate password
    if (password.length < 4) {
      this.setState({ error: true, errMessage: 'Password must have at least 4 caracters!' })
      this.getOffError();
      return;
    }

    // Validate password
    if (confirmPassword !== password) {
      this.setState({ error: true, errMessage: 'Password and confirm password must be identical' });
      this.getOffError();
      return;
    }

    // Validate email
    if (email.indexOf('@') === -1) {
      this.setState({ error: true, errMessage: 'Please enter valid email' });
      this.getOffError();
      return;
    }

    e.preventDefault();

    axios.post('http://http://192.168.99.100:8000/rentdevapi/get_nonce/?controller=user&method=register').then(res => {
      this.setState({
        nonce: res.data.nonce
      })

      axios.post(`https://192.168.99.100:8000/rentdevapi/user/register/?username=${username}&email=${email}&nonce=${this.state.nonce}&display_name=${username}&user_pass=${password}&insecure=cool`)
        .then(res => {
          console.log(res.data)
          this.setState({
            user_id: res.data.user_id
          })
          this.props.history.push('/developer/login')
        })
    })
      .catch(err => console.log(err.response))

  }

  getOffError = () => {
    setTimeout(() => {
      this.setState({ error: false, errMessage: '' })
    }, 3000)
  }

  render() {
    let err = null;
    let {error,isLoaded} = this.state;
    if (error) {
      err = <MDBAlert color="danger" >
        <div dangerouslySetInnerHTML={{ __html: this.state.errMessage }}></div>
      </MDBAlert>
    }

    if (localStorage.getItem('token') !== '') {
      return <Redirect to={`/developer/member/${localStorage.getItem('username')}`} />
    }
		if (!isLoaded) {
			return (
				<Spinner />
			)
		}
    return (
    	<div className="backgroundImageRegister">
				<MDBContainer className=''>
					<MDBRow>
						<MDBCol md="6" className='register'>
							<Animation type="fadeInRight">
							<MDBCard>
								<MDBCardBody>
									<form>
										<p className="h5 text-center mb-4">Sign up</p>
										<div className="grey-text">
											<MDBInput
												id='username'
												label="Your name"
												icon="user"
												group
												type="text"
												validate
												error="wrong"
												success="right"
											/>
											<MDBInput
												id='email'
												label="Your email"
												icon="envelope"
												group
												type="email"
												validate
												error="wrong"
												success="right"
											/>
											<MDBInput
												id='password'
												label="Your password"
												icon="lock"
												group
												type="password"
												validate
											/>
											<MDBInput
												id='confirmPassword'
												label="Confirm your password"
												icon="exclamation-triangle"
												group
												type="password"
												validate
											/>
										</div>
										{err}
										<div className="text-center">
											<MDBBtn color="primary" onClick={this.getUserData.bind(this)}>Register</MDBBtn>
										</div>
									</form>
									<hr />
									<p style={{ textAlign: 'center' }}>Already have an account? <Link to='/developer/login'>Log in</Link></p>
								</MDBCardBody>
							</MDBCard>
							</Animation>
						</MDBCol>
					</MDBRow>
				</MDBContainer>
    	</div>
    )
  }
}

export default withRouter(Register);
