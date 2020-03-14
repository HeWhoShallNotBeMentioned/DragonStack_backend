import React from 'react';
import { createStore } from 'redux';
import { render } from 'react-dom';
import Generation from './components/Generation';
import Dragon from './components/Dragon';

import './index.css';

const DEFAULT_GENERATION = { generationId: '', expiration: '' };

const GENERATION_ACTION_TYPE = 'GENERATION_ACTION_TYPE';

const generationReducer = (state, action) => {

  if (action.type === GENERATION_ACTION_TYPE) {
    return { generation: action.generation };
  }

  return { generation: DEFAULT_GENERATION };
};

const store = createStore(generationReducer);

store.subscribe(() => { return console.log('store state change', store.getState()) });

console.log('store ', store);
console.log('store.getState()', store.getState());

store.dispatch({ type: 'foo' });
store.dispatch({
  type: GENERATION_ACTION_TYPE,
  generation: { generationId: 'goo', expiration: 'bar' },
});

console.log('store.getState()', store.getState());

const generationActionCreator = (payload) => {
  return {
    type: GENERATION_ACTION_TYPE,
    generation: payload,
  }
}

fetch('http://localhost:3000/generation')
  .then(response => response.json())
  .then(json => {
    store.dispatch(generationActionCreator(json.generation))
  })



render(
  <div>
    <h2>Dragon Stack</h2>
    <Generation />
    <Dragon />
  </div>,
  document.getElementById('root')
);
