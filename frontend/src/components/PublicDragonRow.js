import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import DragonAvatar from './DragonAvatar';
import { BACKEND } from '../config';
import history from '../history';


class PublicDragonRow extends Component {

  buy = async () => {
    try {
      const { dragonId, saleValue } = this.props.dragon

      let response = await fetch(`${BACKEND.ADDRESS}/dragon/buy`,
        {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          credentials: "include",
          body: JSON.stringify({
            dragonId,
            saleValue
          })
        })
      let data = await response.json();

      alert(data.message);
      if (data.type !== 'error') {
        history.push('./account-dragons');
      }

    } catch (error) {
      alert(error.message)
    }
  }

  render() {
    return (

      <div>
        <div>{this.props.dragon.nickname}</div>
        <DragonAvatar dragon={this.props.dragon} />
        <div>Sale Value: {this.props.dragon.saleValue}</div>
        <br />
        <Button onClick={this.buy} >Buy</Button>
      </div>
    );
  }

}

export default PublicDragonRow;
