import React, { Component } from 'react';
import DragonAvatar from './DragonAvatar';

class AccountDragonRow extends Component {

  render() {
    return (
      <div>
        <p>{this.props.dragon.nickname}</p>
        <DragonAvatar dragon={this.props.dragon} />
      </div>
    )
  }

}

export default AccountDragonRow;
