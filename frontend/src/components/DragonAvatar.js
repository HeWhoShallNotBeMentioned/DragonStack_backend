import React, { Component } from 'react';
import { patchy, plain, skinny, slender, spotted, stocky, striped, sporty } from '../assets/index'
import regeneratorRuntime from "regenerator-runtime";

const propertyMap = {
  backgroundColor: {
    black: '#263238',
    white: '#cfd8dc',
    green: '#a5d6a7',
    blue: '#0277bd'
  },
  build: { slender, stocky, sporty, skinny, },
  pattern: { plain, striped, spotted, patchy },
  size: { small: 100, medium: 140, large: 180, enormous: 220 }
}

class DragonAvatar extends Component {

  render() {
    console.log("DragonAvatar props", this.props);

    return (
      <div>

        <span>Generation Id: {this.props.dragon.generationId}.</span>
        <span>Dragon Id:  {this.props.dragon.dragonId}.</span>
        {this.props.dragon.traits.map((trait, id) => {
          return (
            <span key={id}>{trait.traitType === "backgroundColor"
              ? "background color" : trait.traitType}: {trait.traitValue}, </span>)
        })}

      </div>
    );

  };

}

export default DragonAvatar;
