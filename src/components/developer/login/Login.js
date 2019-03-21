import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { MDBAnimation as Animation, MDBAlert, MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import '../../../styles/login.css'
import Spinner from "../register/Register";
import {Link} from 'react-router-dom'


class Login extends Component {
	state = {
		error: false,
		errMessage: '',
		isLoaded: false
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({ isLoaded: true })
		}, 1500);
	}

	onSubmit(e) {
		let username = document.getElementById('username').value;
		let password = document.getElementById('password').value;

		if (username === '' || password === '') {
			this.setState({ error: true, errMessage: 'Please fill all fields properly' })
			this.getOffError();
			return;
		}

		let credentials = {
			username,
			password
		}
		if ((username !== '' || password !== '') || e.key === 'Enter') {
			axios.post(`http://ccapp.coder-consulting.com/wp-json/jwt-auth/v1/token`, credentials)
				.then(response => {
					console.log('### Login ', response.data);
					localStorage.setItem('token', response.data.token)
					localStorage.setItem('username', response.data.user_nicename);
					localStorage.setItem('user_id', response.data.user_id);
					this.props.history.push(`/developer/member/${response.data.user_nicename}`);

				}).catch(error => {
					console.log('### Login ', error.response);
					this.setState({ error: true, errMessage: error.response.data.message })
					this.getOffError()
				});
			e.preventDefault();

		}
	}

	getOffError = () => {
		setTimeout(() => {
			this.setState({ error: false, errMessage: '' })
		}, 3000)
	}


	render() {
		const { isLoaded } = this.state;
		let err = null;
		if (this.state.error) {
			err = <MDBAlert color="danger" >
				<div dangerouslySetInnerHTML={{ __html: this.state.errMessage }} />
			</MDBAlert>
		}

		if (!isLoaded) {
			return (
				<Spinner />
			)
		}
		return (
			<div className="backgroundImageLogin">
				<MDBContainer>
					<MDBRow>
						<MDBCol md="6" className="login">
							<Animation type="fadeInRight">
								<MDBCard>
									<MDBCardBody>
										<form>
											<p className="h4 text-center py-4">Login</p>
											<div className="grey-text">
												<MDBInput
													id='username'
													label="Type your username or email"
													icon="user"
													group
													type="text"
													validate
													error="wrong"
													success="right"
													onKeyPress={event => {
														if (event.key === 'Enter') {
															this.onSubmit(event)
														}
													}}
												/>
												<MDBInput
													id='password'
													label="Type your password"
													icon="lock"
													group
													type="password"
													validate
													onKeyPress={event => {
														if (event.key === 'Enter') {
															this.onSubmit(event)
														}
													}}
												/>
											</div>
											{err}
											<div className="text-center py-4 mt-3">

												<MDBBtn className="button-color" onClick={this.onSubmit.bind(this)}>
													Login
													</MDBBtn>
											</div>

											<div className="text-center py-4 mt-3">
												<Link to="/">Go back to homepage</Link>
											</div>

										</form>
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

export default withRouter(Login);
