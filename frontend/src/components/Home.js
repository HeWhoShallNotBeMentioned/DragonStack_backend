import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import Generation from './Generation';
import Dragon from './Dragon';
import AccountDragons from "./AccountDragons";
import { logout } from '../actions/account';

class Home extends Component {
  state = {
    account: {}
  }

  componentDidMount() {
    this.setState({ account: this.props.account })
  }

  render() {
    return (
      <div>
        <Button variant="warning" onClick={this.props.logout} className="logout-button">Logout</Button>
        <h2>Dragon Stack</h2>
        <Generation />
        <Dragon />
        <br />
        <AccountDragons />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const account = state.account;
  return { account };
}


const mapDispatchToProps = (dispatch) => {
  return {
    logout: ({ account }) => dispatch(logout({ ...account }))
  }
}


const componentConnector = connect(mapStateToProps, mapDispatchToProps);




export default componentConnector(Home);
