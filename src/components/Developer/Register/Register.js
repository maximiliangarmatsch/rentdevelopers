import React, { Component } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import {
    MDBAnimation as Animation,
    MDBAlert,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBInput,
    MDBCard,
    MDBCardBody
} from 'mdbreact';
import Spinner from '../../Client/Spinner/Spinner';
import '../../../styles/Register.css';

class Register extends Component {
    state = {
        nonce: '',
        user_id: '',
        cookie: '',
        error: false,
        errMessage: '',
        isLoaded: false
    };

    componentDidMount() {
        setTimeout(() => {
            this.setState({ isLoaded: true });
        }, 1000);
    }

    getUserData(e) {
        let username = document.getElementById('username').value;
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        let confirmPassword = document.getElementById('confirmPassword').value;

        // Validate username and password
        if (username === '' || password === '') {
            this.setState({
                error: true,
                errMessage: 'Please fill all fields properly'
            });
            this.getOffError();
            return;
        }

        // Validate username
        if (username.length < 4) {
            this.setState({
                error: true,
                errMessage: 'Username must have at least 4 caracters!'
            });
            this.getOffError();
            return;
        }

        //Validate password
        if (password.length < 4) {
            this.setState({
                error: true,
                errMessage: 'Password must have at least 4 caracters!'
            });
            this.getOffError();
            return;
        }

        // Validate password
        if (confirmPassword !== password) {
            this.setState({
                error: true,
                errMessage: 'Password and confirm password must be identical'
            });
            this.getOffError();
            return;
        }

        // Validate email
        if (email.indexOf('@') === -1) {
            this.setState({
                error: true,
                errMessage: 'Please enter valid email'
            });
            this.getOffError();
            return;
        }

        e.preventDefault();
        if (username !== '' || password !== '' || e.key === 'Enter') {
            axios
                .post(
                    'http://ccapp.coder-consulting.com/rentdevapi/get_nonce/?controller=user&method=register'
                )
                .then(res => {
                    this.setState({
                        nonce: res.data.nonce
                    });

                    axios
                        .post(
                            `http://ccapp.coder-consulting.com/rentdevapi/user/register/?username=${username}&email=${email}&nonce=${
                                this.state.nonce
                            }&display_name=${username}&user_pass=${password}&insecure=cool`
                        )
                        .then(res => {
                            // console.log(res.data)
                            this.setState({
                                cookie: res.data.cookie
                            });

                            this.props.history.push('/developer/login');
                        });
                })
                .catch(err => console.log(err.response));
        }
    }
    getOffError = () => {
        setTimeout(() => {
            this.setState({ error: false, errMessage: '' });
        }, 3000);
    };

    render() {
        let err = null;
        let { error, isLoaded } = this.state;
        if (error) {
            err = (
                <MDBAlert color="danger">
                    <div
                        dangerouslySetInnerHTML={{
                            __html: this.state.errMessage
                        }}
                    />
                </MDBAlert>
            );
        }

        if (!isLoaded) {
            return <Spinner />;
        }
        return (
            <div className="backgroundImageRegister">
                <MDBContainer className="">
                    <MDBRow>
                        <MDBCol md="6" className="register">
                            <Animation type="fadeInRight">
                                <MDBCard>
                                    <MDBCardBody className="register-container">
                                        <form>
                                            <p className="h5 text-center mb-4">
                                                Sign up
                                            </p>
                                            <div className="grey-text">
                                                <MDBInput
                                                    id="username"
                                                    label="Your name"
                                                    icon="user"
                                                    group
                                                    type="text"
                                                    validate
                                                    error="wrong"
                                                    success="right"
                                                    onKeyPress={event => {
                                                        if (
                                                            event.key ===
                                                            'Enter'
                                                        ) {
                                                            this.getUserData(
                                                                event
                                                            );
                                                        }
                                                    }}
                                                />
                                                <MDBInput
                                                    id="email"
                                                    label="Your email"
                                                    icon="envelope"
                                                    group
                                                    type="email"
                                                    validate
                                                    error="wrong"
                                                    success="right"
                                                    onKeyPress={event => {
                                                        if (
                                                            event.key ===
                                                            'Enter'
                                                        ) {
                                                            this.getUserData(
                                                                event
                                                            );
                                                        }
                                                    }}
                                                />
                                                <MDBInput
                                                    id="password"
                                                    label="Your password"
                                                    icon="lock"
                                                    group
                                                    type="password"
                                                    validate
                                                    onKeyPress={event => {
                                                        if (
                                                            event.key ===
                                                            'Enter'
                                                        ) {
                                                            this.getUserData(
                                                                event
                                                            );
                                                        }
                                                    }}
                                                />
                                                <MDBInput
                                                    id="confirmPassword"
                                                    label="Confirm your password"
                                                    icon="exclamation-triangle"
                                                    group
                                                    type="password"
                                                    validate
                                                    onKeyPress={event => {
                                                        if (
                                                            event.key ===
                                                            'Enter'
                                                        ) {
                                                            this.getUserData(
                                                                event
                                                            );
                                                        }
                                                    }}
                                                />
                                            </div>
                                            {err}
                                            <div className="text-center">
                                                <MDBBtn
                                                    className="button-color"
                                                    onClick={this.getUserData.bind(
                                                        this
                                                    )}
                                                >
                                                    Register
                                                </MDBBtn>
                                            </div>
                                        </form>
                                        <hr />
                                        <p style={{ textAlign: 'center' }}>
                                            Already have an account?{' '}
                                            <Link to="/developer/login">
                                                Log in
                                            </Link>
                                        </p>
                                        <div className="text-center py-4 mt-3">
                                            <Link to="/">
                                                Go back to homepage
                                            </Link>
                                        </div>
                                    </MDBCardBody>
                                </MDBCard>
                            </Animation>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        );
    }
}

export default withRouter(Register);
