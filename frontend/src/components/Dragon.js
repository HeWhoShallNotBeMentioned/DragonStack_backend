import React, { Component } from 'react';
import regeneratorRuntime from "regenerator-runtime";

const DEFAULT_DRAGON = { dragonId: '', birthdate: '', nickname: '', generationId: '', traits: [] }

class Dragon extends Component {


  state = { dragon: DEFAULT_DRAGON }

  componentDidMount() {
    this.fetchDragon();
  }

  async fetchDragon() {
    try {
      const data = await (await fetch('http://localhost:3000/dragon/new')).json()
      console.log("dragon data", data);
      this.setState({ dragon: data.dragon })

    } catch (error) {
      console.error("Error in Dragon Component fetchDragon method", error)
    }
  }



  render() {
    console.log("Dragon State", this.state);

    return (
      <div>
        <div>This is the Dragon Component</div>
        <span>Generation Id: {this.state.dragon.generationId}.</span>
        <span>Dragon Id:  {this.state.dragon.dragonId}.</span>
        {this.state.dragon.traits.map((trait, id) => {
          return (
            <span key={id}>{trait.traitType}-{trait.traitValue}, </span>)
        })}

      </div>
    );

  };
};

export default Dragon;
