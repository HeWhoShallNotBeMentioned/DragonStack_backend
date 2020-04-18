import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, FormControl } from 'react-bootstrap';
import { signup } from '../actions/account';
import fetchStates from '../reducers/fetchStates';

class AuthForm extends Component {

  state = {
    username: '',
    password: ''
  }

  updateUsername = (event) => {
    this.setState({ username: event.target.value })
  }

  updatePassword = (event) => {
    this.setState({ password: event.target.value })
  }

  signup = () => {

    const { username, password } = this.state;
    this.props.signup({ username, password })
  }

  login = () => {
    console.log("login this.state", this.state)
  }

  get Error() {

    if (this.props.account && this.props.account.status === fetchStates.error) {
      return <div>{this.props.account.message}</div>
    }
  }

  render() {
    console.log("AuthForm props ------  ", this.props)
    return (

      <div><h2>Dragon Stack</h2>
        {this.Error}
        <form>
          <FormGroup>
            <FormControl
              type="text"
              value={this.state.username}
              placeholder="username..."
              onChange={this.updateUsername}
            />
          </FormGroup>
          <FormGroup>
            <FormControl
              type="password"
              value={this.state.password}
              placeholder="password..."
              onChange={this.updatePassword}
            />
          </FormGroup>

          <div>
            <Button variant="success" onClick={this.login}>Sign In</Button>
            <span> or </span>
            <Button variant="primary" onClick={this.signup}>Sign Up</Button>
          </div>

        </form>

      </div>
    )
  }
}

const mapStateToProps = (state) => {

  const account = state.account;
  return {
    account
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signup: ({ username, password }) => dispatch(signup({ username, password }))
  }
}

const componentConnector = connect(mapStateToProps, mapDispatchToProps)

export default componentConnector(AuthForm);
