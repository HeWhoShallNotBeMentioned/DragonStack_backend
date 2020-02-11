import React, { Component } from 'react';
import regeneratorRuntime from "regenerator-runtime";

const DEFAULT_GENERATION = { generationId: '', expiration: '' };

class Generation extends Component {
  state = {
    generation: DEFAULT_GENERATION,
  };

  async componentDidMount() {
    this.fetchGeneration();
  };

  async fetchGeneration() {
    try {

      const data = await (await fetch('http://localhost:3000/generation')).json();
      console.log("generation data", data);
      this.setState({ generation: data.generation })
    } catch (error) {
      console.error("Error in Generation Component fetchGeneration method.  ", error);
    }
  };

  render() {
    console.log("state", this.state)

    return (<div>

      <h3>Generation {this.state.generation.generationId} Expires on: </h3>
      <h4>{new Date(this.state.generation.expiration).toString()}</h4>

    </div>)
  }
}

export default Generation;
