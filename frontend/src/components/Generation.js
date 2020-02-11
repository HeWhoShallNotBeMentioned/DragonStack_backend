import React, { Component } from 'react';
import regeneratorRuntime from "regenerator-runtime";

const DEFAULT_GENERATION = { generationId: '', expiration: '' };
const MINIMUM_DELAY = 3000;

class Generation extends Component {
  state = {
    generation: DEFAULT_GENERATION,
  };

  timer = null;

  componentDidMount() {
    this.fetchNextGeneration();
  };

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  async fetchGeneration() {
    try {

      const data = await (await fetch('http://localhost:3000/generation')).json();
      console.log("generation data", data);
      this.setState({ generation: data.generation })
    } catch (error) {
      console.error("Error in Generation Component fetchGeneration method.  ", error);
    }
  };

  fetchNextGeneration() {
    try {
      this.fetchGeneration();

      let delay = new Date(this.state.generation.expiration).getTime() - new Date().getTime();

      if (delay < MINIMUM_DELAY) {
        delay = MINIMUM_DELAY;
      }

      this.timer = setTimeout(() => this.fetchNextGeneration(), delay);
    } catch (error) {
      console.error("Error in Generation Componenet fetchNextGeneration method.   ", error);
    }
  }



  render() {
    console.log("state", this.state)

    return (<div>

      <h3>Generation {this.state.generation.generationId} Expires on: </h3>
      <h4>{new Date(this.state.generation.expiration).toString()}</h4>

    </div>)
  }
}

export default Generation;
