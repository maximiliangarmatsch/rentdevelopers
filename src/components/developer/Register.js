import React, { Component } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';


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
      <div>
        <h1>Register</h1>
        <form onSubmit={this.getUserData.bind(this)}>
          <input id="username" type="username" placeholder="username" />
          <input id="email" type="email" placeholder="email" />
          <input id="password" type="password" placeholder="password" />
          <input type="submit" />
        </form>
      </div>
    )
  }
}

export default withRouter(Register);