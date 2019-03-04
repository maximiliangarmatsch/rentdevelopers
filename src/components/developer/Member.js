import React, { Component } from 'react'
import { Consumer } from '../../context';
import { Redirect } from 'react-router-dom';

class Member extends Component {
  onLogout = (dispatch, e) => {
    dispatch({ type: 'DELETE_TOKEN' })
    localStorage.setItem('token', '');
  }

  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch, token } = value;
          if (localStorage.getItem('token') === '') {
            return <Redirect to='/' />
          }
          return (
            <div>
              <h1>Hello User</h1>
              <button onClick={this.onLogout.bind(this, dispatch)}> Logout</button>
            </div>
          )
        }}

      </Consumer>
    )
  }
}

export default Member