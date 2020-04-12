import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import regeneratorRuntime from "regenerator-runtime";
import { fetchDragon } from '../actions/dragon';
import fetchStates from '../reducers/fetchStates';
import DragonAvatar from './DragonAvatar';

class Dragon extends Component {


  render() {
    //console.log("Dragon State", this.state);



    return (<div>

      <DragonAvatar dragon={this.props.dragon} />
      <Button type="button" variant="success" onClick={() => { this.props.fetchDragon() }}>New Dragon</Button>
    </div>
    );

  };
};

const mapStateToProps = (state) => {
  const dragon = state.dragon;
  return { dragon };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDragon: () => fetchDragon(dispatch)
  }
}

const componentConnector = connect(mapStateToProps, mapDispatchToProps);

export default componentConnector(Dragon);
