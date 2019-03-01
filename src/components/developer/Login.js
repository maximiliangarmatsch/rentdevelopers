import React, { Component } from 'react';
import axios from 'axios';

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
      <div>
        <h1>Header</h1>
        <form onSubmit={this.onSubmit}>
          <input id="title" type="text" placeholder="title" />
          <input id="content" type="text" placeholder="content" />
          <input type="submit" />
        </form>
        <br />
      </div>
    )
  }
}

export default Login;