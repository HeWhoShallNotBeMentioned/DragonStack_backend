import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import Root from './components/Root';
import rootReducer from './reducers/index.js';
import { fetchAuthentiated } from './actions/account';
import './index.css';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk, logger),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

store.dispatch(fetchAuthentiated())
  .then(() => {
    render(
      <Provider store={store}>
        <Root />
      </Provider>,
      document.getElementById('root')
    );
  });

