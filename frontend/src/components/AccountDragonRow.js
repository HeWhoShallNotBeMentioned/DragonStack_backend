import React, { Component } from 'react';
import DragonAvatar from './DragonAvatar';
import { Button } from 'react-bootstrap';

class AccountDragonRow extends Component {

  state = {
    nickname: this.props.dragon.nickname,
    edit: false
  }

  updateNickname = event => {
    this.setState({ nickname: event.target.value });
  }

  toggleEdit = () => {
    this.setState({ edit: !this.state.edit })
  }

  get SaveButton() {
    return <Button onClick={this.toggleEdit} variant="success" >Save</Button>
  }

  get EditButton() {
    return <Button onClick={this.toggleEdit} variant="info"  >Edit</Button>
  }

  render() {
    return (
      <div>
        <p>{this.props.dragon.nickname}</p>
        <input
          type="text"
          value={this.state.nickname}
          onChange={this.updateNickname}
          disabled={!this.state.edit}
        />
        <DragonAvatar dragon={this.props.dragon} />
        {
          this.state.edit
            ? this.SaveButton
            : this.EditButton
        }
      </div>
    )
  }

}

export default AccountDragonRow;
