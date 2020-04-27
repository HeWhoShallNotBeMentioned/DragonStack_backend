import React, { Component } from 'react';
import DragonAvatar from './DragonAvatar';
import { Button } from 'react-bootstrap';
import { Backend, BACKEND } from '../config';
import { Next } from 'react-bootstrap/PageItem';

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

  save = async () => {
    try {
      let nicknameUpdateResponse = await fetch(`${BACKEND.ADDRESS}/dragon/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dragonId: this.props.dragon.dragonId,
          nickname: this.state.nickname
        })
      })


      let js = nicknameUpdateResponse.json();


      if (js.type === 'error') {
        alert(nicknameUpdateResponse.message);
      } else {
        this.toggleEdit();
      }



    } catch (error) {
      console.error("AccountDragonRow Error.....", error)
    }
  }

  get SaveButton() {
    return <Button onClick={this.save} variant="success" >Save</Button>
  }

  get EditButton() {
    return <Button onClick={this.toggleEdit} variant="info"  >Edit</Button>
  }
  get CancelButton() {

    return <Button onClick={() => { this.toggleEdit(); this.setState({ nickname: this.props.dragon.nickname }) }} variant="info"  >Cancel</Button>
  }

  render() {
    return (
      <div>

        <input
          type="text"
          value={this.state.nickname}
          onChange={this.updateNickname}
          disabled={!this.state.edit}
        />
        <DragonAvatar dragon={this.props.dragon} />
        {
          this.state.edit
            ? <span> {this.SaveButton}{'    '}
              {this.CancelButton} </span>
            : this.EditButton
        }
      </div>
    )
  }

}

export default AccountDragonRow;
