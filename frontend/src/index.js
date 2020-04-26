import React, { Component } from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { render } from 'react-dom';
import thunk from 'redux-thunk';
import createBrowserHistory from 'history/createBrowserHistory';
import logger from 'redux-logger';
import Root from './components/Root';
import AccountDragons from './components/AccountDragons';
import rootReducer from './reducers/index.js';
import { fetchAuthentiated } from './actions/account';
import './index.css';

const history = createBrowserHistory();

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk, logger),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

class RedirectToAccountDragons extends Component {
  render() {
    return (
      <Redirect to={{ pathname: '/account-dragons' }} />
    )
  }
}

store.dispatch(fetchAuthentiated())
  .then(() => {
    render(
      <Provider store={store}>
        <Router history={history} >
          <Switch>
            <Route exact path='/' component={Root} />
            <Route path="/account-dragons" component={AccountDragons} />
            <Route path='/redirect-to-account-dragons' component={RedirectToAccountDragons} />
          </Switch>
        </Router>
      </Provider>,
      document.getElementById('root')
    );
  });

