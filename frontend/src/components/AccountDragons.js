import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAccountDragons } from '../actions/accountDragons';

class AccountDragons extends Component {

  componentDidMount() {
    this.props.fetchAccountDragons();
  }

  render() {
    return (<div><h3>Account Dragons</h3></div>)
  }

}

const mapStateToProps = (state) => {
  const accountDragons = state.accountDragons;
  return { accountDragons, }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAccountDragons: () => dispatch(fetchAccountDragons())

  }
}

const componentConnector = connect(mapStateToProps, mapDispatchToProps);

export default componentConnector(AccountDragons);
