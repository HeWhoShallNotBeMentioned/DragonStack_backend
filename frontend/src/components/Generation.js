import React, { Component } from 'react';
import regeneratorRuntime from "regenerator-runtime";

class Generation extends Component {
  state = {
    generation: { generationId: 99999, expiration: "2020-05-01" },
  };

  async componentDidMount() {
    this.fetchGeneration();
  };

  async fetchGeneration() {
    const data = await fetch('http://localhost:3000/generation');
    console.log("generation data", data)
  };

  render() {


    return (<div>

      <h3>Generation {this.state.generation.generationId} Expires on: </h3>
      <h4>{new Date(this.state.generation.expiration).toString()}</h4>

    </div>)
  }
}

export default Generation;
