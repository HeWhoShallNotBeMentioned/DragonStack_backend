import React, { Component } from 'react';
import { Button, FormGroup, FormControl } from 'react-bootstrap';

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
    console.log("signup this.state", this.state)
  }

  login = () => {
    console.log("login this.state", this.state)
  }

  render() {
    return (

      <div><h2>Dragon Stack</h2>
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
            <Button variant="success" onClick={this.signup}>Sign Up</Button>
          </div>

        </form>

      </div>
    )


  }
}

export default AuthForm;
