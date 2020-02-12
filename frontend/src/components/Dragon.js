import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import regeneratorRuntime from "regenerator-runtime";
import DragonAvatar from './DragonAvatar';

const DEFAULT_DRAGON = { dragonId: '', birthdate: '', nickname: '', generationId: '', traits: [] }

class Dragon extends Component {


  state = { dragon: DEFAULT_DRAGON }

  componentDidMount() {
    this.fetchDragon();
  }

  async fetchDragon() {
    try {
      const data = await (await fetch('http://localhost:3000/dragon/new')).json()
      //console.log("dragon data", data);
      this.setState({ dragon: data.dragon })

    } catch (error) {
      console.error("Error in Dragon Component fetchDragon method", error)
    }
  }



  render() {
    //console.log("Dragon State", this.state);

    return (<div>

      <DragonAvatar dragon={this.state.dragon} />
      <Button type="button" className="btn btn-warning" onClick={() => { this.fetchDragon() }}>New Dragon</Button>
    </div>
    );

  };
};

export default Dragon;
