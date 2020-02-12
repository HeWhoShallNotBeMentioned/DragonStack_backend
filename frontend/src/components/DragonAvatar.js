import React, { Component } from 'react';
import regeneratorRuntime from "regenerator-runtime";

class DragonAvatar extends Component {

  render() {
    console.log("DragonAvatar props", this.props);

    return (
      <div>

        <span>Generation Id: {this.props.dragon.generationId}.</span>
        <span>Dragon Id:  {this.props.dragon.dragonId}.</span>
        {this.props.dragon.traits.map((trait, id) => {
          return (
            <span key={id}>{trait.traitType}-{trait.traitValue}, </span>)
        })}

      </div>
    );

  };

}

export default DragonAvatar;
